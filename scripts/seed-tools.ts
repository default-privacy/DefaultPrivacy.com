#!/usr/bin/env bun
// NOTE (2026-10-09): accepts_crypto, no_kyc and security_audited are retired from display (site, API, MCP); this script may still write the columns but they must not be shown.

/**
 * Seed Tools from V2 Database Backup
 * 
 * Imports tools, categories, and tags from V2 Prisma backup JSON
 * into V4 Drizzle database.
 * 
 * Usage:
 *   bun run scripts/seed-tools.ts
 *   bun run scripts/seed-tools.ts --backup-file ./path/to/backup.json
 */

import { existsSync, readdirSync, readFileSync } from "fs"
import { db } from "../src/lib/db"
import { categories, tags, tools, toolsToCategories } from "../src/lib/db/schema"

// V2 Backup structure
type V2Tool = {
  id: string
  name: string
  slug: string
  websiteUrl: string
  affiliateUrl: string | null
  tagline: string | null
  description: string | null
  content: string | null
  faviconUrl: string | null
  screenshotUrl: string | null
  isFeatured: boolean
  submitterName: string | null
  submitterEmail: string | null
  submitterNote: string | null
  status: "Draft" | "Scheduled" | "Published"
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  ownerId: string | null
  acceptsCrypto: boolean
  followWith: string | null
    githubUrl: string | null
    hasAndroidApp: boolean
    hasIosApp: boolean
    isAffiliated: boolean
    isNoKyc: boolean
    isOpenSource: boolean
    isSecurityAudited: boolean
    isUrlValid: boolean
    mainCategory: string | null
    subCategory: string | null
    subreddit: string | null
    tosdrId: string | null // V2 field — not in V4 schema
  }

type V2Category = {
  id: string
  name: string
  slug: string
  label: string | null
  createdAt: string
  updatedAt: string
}

type V2Tag = {
  id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

type V2Backup = {
  metadata: {
    timestamp: string
    version: string
    type: string
  }
  data: {
    tools: V2Tool[]
    categories: V2Category[]
    tags: V2Tag[]
  }
}

async function seed() {
  // Find backup file
  let backupPath = process.argv[2] === "--backup-file" ? process.argv[3] : null
  
  if (!backupPath) {
    // Look for most recent backup in V2 backups folder
    const v2BackupsDir = "../defaultprivacy-git/backups"
    if (existsSync(v2BackupsDir)) {
      const files = readdirSync(v2BackupsDir)
        .filter((f: string) => f.endsWith(".json"))
        .sort()
        .reverse()
      
      if (files.length > 0) {
        backupPath = `${v2BackupsDir}/${files[0]}`
      }
    }
  }
  
  if (!backupPath || !existsSync(backupPath)) {
    console.error("❌ No backup file found. Please specify with --backup-file")
    console.error("   bun run scripts/seed-tools.ts --backup-file ./path/to/backup.json")
    process.exit(1)
  }
  
  console.log(`📂 Loading backup from: ${backupPath}`)
  
  const backup: V2Backup = JSON.parse(readFileSync(backupPath, "utf-8"))
  
  console.log(`\n📊 Backup metadata:`)
  console.log(`   Timestamp: ${backup.metadata.timestamp}`)
  console.log(`   Version: ${backup.metadata.version}`)
  console.log(`   Tools: ${backup.data.tools.length}`)
  console.log(`   Categories: ${backup.data.categories.length}`)
  console.log(`   Tags: ${backup.data.tags.length}`)
  
  // Create a map of mainCategory+subCategory to category IDs for later linking
  const categoryMap = new Map<string, string>()
  
  // 1. Seed Categories
  console.log("\n🗂️  Seeding categories...")
  
  for (const cat of backup.data.categories) {
    try {
      const existing = await db.query.categories.findFirst({
        where: (c, { eq }) => eq(c.slug, cat.slug),
      })
      
      if (!existing) {
        await db.insert(categories).values({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          label: cat.label,
          createdAt: new Date(cat.createdAt),
          updatedAt: new Date(cat.updatedAt),
        })
      }
      
      categoryMap.set(cat.name.toLowerCase(), cat.id)
    } catch (error) {
      console.error(`   ❌ Failed to insert category ${cat.name}:`, error)
    }
  }
  
  console.log(`   ✅ ${backup.data.categories.length} categories processed`)
  
  // 2. Seed Tags
  console.log("\n🏷️  Seeding tags...")
  
  const tagMap = new Map<string, string>()
  
  for (const tag of backup.data.tags) {
    try {
      const existing = await db.query.tags.findFirst({
        where: (t, { eq }) => eq(t.slug, tag.slug),
      })
      
      if (!existing) {
        await db.insert(tags).values({
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
          createdAt: new Date(tag.createdAt),
          updatedAt: new Date(tag.updatedAt),
        })
      }
      
      tagMap.set(tag.name.toLowerCase(), tag.id)
    } catch (error) {
      console.error(`   ❌ Failed to insert tag ${tag.name}:`, error)
    }
  }
  
  console.log(`   ✅ ${backup.data.tags.length} tags processed`)
  
  // 3. Seed Tools
  console.log("\n🔧 Seeding tools...")
  
  let toolsInserted = 0
  let toolsSkipped = 0
  let toolsFailed = 0
  
  for (const tool of backup.data.tools) {
    try {
      // Check if tool already exists
      const existing = await db.query.tools.findFirst({
        where: (t, { eq }) => eq(t.slug, tool.slug),
      })
      
      if (existing) {
        toolsSkipped++
        continue
      }
      
      // Insert tool
      await db.insert(tools).values({
        id: tool.id,
        name: tool.name,
        slug: tool.slug,
        websiteUrl: tool.websiteUrl,
        affiliateUrl: tool.affiliateUrl,
        tagline: tool.tagline,
        description: tool.description,
        content: tool.content,
        faviconUrl: tool.faviconUrl,
        screenshotUrl: tool.screenshotUrl,
        isFeatured: tool.isFeatured,
        submitterName: tool.submitterName,
        submitterEmail: tool.submitterEmail,
        submitterNote: tool.submitterNote,
        status: tool.status,
        publishedAt: tool.publishedAt ? new Date(tool.publishedAt) : null,
        ownerId: tool.ownerId,
        acceptsCrypto: tool.acceptsCrypto,
        githubUrl: tool.githubUrl,
        isAffiliated: tool.isAffiliated,
        isNoKyc: tool.isNoKyc,
        isOpenSource: tool.isOpenSource,
        isSecurityAudited: tool.isSecurityAudited,
        isUrlValid: tool.isUrlValid,
        subreddit: tool.subreddit,
        createdAt: new Date(tool.createdAt),
        updatedAt: new Date(tool.updatedAt),
      })
      
      // Link categories. V2 used coarse mainCategory + specific subCategory fields;
      // we keep both to avoid dropping category links for most tools.
      const categoryCandidates = [
        tool.mainCategory,
        tool.subCategory,
      ]
        .map((value) => value?.toLowerCase().trim())
        .filter((value): value is string => Boolean(value))

      for (const categoryName of new Set(categoryCandidates)) {
        const categoryId = categoryMap.get(categoryName)
        if (!categoryId) continue

        try {
          await db.insert(toolsToCategories).values({
            toolId: tool.id,
            categoryId,
          }).onConflictDoNothing()
        } catch {
          // Ignore duplicate key errors
        }
      }
      
      toolsInserted++
      
      if (toolsInserted % 100 === 0) {
        console.log(`   ... ${toolsInserted} tools inserted`)
      }
    } catch (error) {
      toolsFailed++
      console.error(`   ❌ Failed to insert tool ${tool.name}:`, error)
    }
  }
  
  console.log(`\n✅ Seeding complete!`)
  console.log(`   Tools inserted: ${toolsInserted}`)
  console.log(`   Tools skipped (already exist): ${toolsSkipped}`)
  console.log(`   Tools failed: ${toolsFailed}`)
}

// Run the seed
seed()
  .then(() => {
    console.log("\n🎉 Done!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n💥 Seeding failed:", error)
    process.exit(1)
  })
