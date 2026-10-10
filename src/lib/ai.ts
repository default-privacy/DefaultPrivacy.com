/**
 * Shared AI Provider — Venice.ai
 *
 * Centralized Venice API client used by:
 * - Policy Analyzer
 * - AI Red Flag Auditor
 * - Content Engine
 * - AI Mentor
 *
 * Uses Venice's OpenAI-compatible REST API.
 */

export type VeniceModel = "llama-3.3-70b" | "deepseek-v3.2" | (string & {})

export type VeniceOptions = {
  model?: VeniceModel
  maxTokens?: number
  temperature?: number
  systemPrompt?: string
}

export type VeniceMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

const VENICE_API_URL = "https://api.venice.ai/api/v1/chat/completions"

/**
 * Get the Venice API key, throwing if not configured
 */
function getApiKey(): string {
  const apiKey = process.env.VENICE_API_KEY
  if (!apiKey) throw new Error("VENICE_API_KEY not configured")
  return apiKey
}

/**
 * Low-level Venice chat completion call
 */
export async function veniceChat(
  messages: VeniceMessage[],
  options: VeniceOptions = {},
): Promise<string> {
  const {
    model = process.env.VENICE_MODEL || "llama-3.3-70b",
    maxTokens = 2000,
    temperature = 0.3,
  } = options

  const response = await fetch(VENICE_API_URL, {
    method: "POST",
    signal: AbortSignal.timeout(5000),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Venice API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error("No content returned from Venice AI")

  return content.trim()
}

/**
 * Simple system + user prompt call (most common pattern)
 */
export async function veniceGenerate(
  systemPrompt: string,
  userPrompt: string,
  options: VeniceOptions = {},
): Promise<string> {
  return veniceChat(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    options,
  )
}

/**
 * Parse JSON from AI response (handles markdown code blocks)
 */
export function parseAIJson<T = unknown>(text: string): T | null {
  try {
    let jsonStr = text.trim()

    // Remove markdown code blocks if present
    if (jsonStr.startsWith("```json")) {
      jsonStr = jsonStr.slice(7)
    } else if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.slice(3)
    }
    if (jsonStr.endsWith("```")) {
      jsonStr = jsonStr.slice(0, -3)
    }
    jsonStr = jsonStr.trim()

    // Try direct parse first
    try {
      return JSON.parse(jsonStr) as T
    } catch {
      // Try extracting JSON object from response
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as T
      }
    }

    return null
  } catch {
    console.error("Failed to parse AI JSON response")
    return null
  }
}

/**
 * Check if Venice API is configured
 */
export function isVeniceConfigured(): boolean {
  return Boolean(process.env.VENICE_API_KEY)
}
