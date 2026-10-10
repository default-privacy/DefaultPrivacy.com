"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DirectorySearchTrigger } from "@/components/common/directory-search-trigger"
import { SHOP_LIVE, SHOP_URL } from "@/lib/shop"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const NAV = [
  { href: "/directory", label: "Directory" },
  { href: "/tools", label: "Free Tools" },
  { href: "/privacy-score", label: "Privacy Score" },
  { href: "/stacks", label: "Stacks" },
  { href: "/guides", label: "Field Guide" },
  { href: "/glossary", label: "Glossary" },
] as const

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path)

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/72">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 rounded-md brand2-focus">
            <Image
              src="/logo-icon.svg"
              alt="Default Privacy"
              width={28}
              height={28}
              className="h-7 w-7 opacity-90"
            />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Default Privacy
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex h-9 items-center rounded-md px-3 text-sm font-medium tracking-tight transition-colors brand2-focus hover:bg-foreground/[0.04] hover:text-foreground ${
                    active ? "text-foreground" : "text-foreground/70"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {SHOP_LIVE && (
              <a
                href={SHOP_URL}
                rel="noopener"
                className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium tracking-tight text-foreground/70 transition-colors brand2-focus hover:bg-foreground/[0.04] hover:text-foreground"
              >
                Shop
              </a>
            )}
          </nav>
        </div>

        {/* Desktop right — search */}
        <div className="hidden items-center gap-2 lg:flex">
          <DirectorySearchTrigger />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <DirectorySearchTrigger showShortcut={false} className="border-0 bg-transparent px-2" />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 brand2-focus"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="w-[300px] sm:w-[340px]">
            <SheetHeader className="pb-2">
              <SheetTitle className="flex items-center gap-2 font-semibold tracking-tight">
                <Image src="/logo-icon.svg" alt="Default Privacy" width={20} height={20} className="h-5 w-5" />
                Default Privacy
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-2 flex flex-col gap-1 px-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-md px-3 py-2.5 text-sm font-medium tracking-tight brand2-focus ${
                    isActive(item.href)
                      ? "bg-foreground/[0.06] text-foreground"
                      : "text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {SHOP_LIVE && (
                <a
                  href={SHOP_URL}
                  rel="noopener"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium tracking-tight text-foreground/70 brand2-focus hover:bg-foreground/[0.04] hover:text-foreground"
                >
                  Shop
                </a>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
