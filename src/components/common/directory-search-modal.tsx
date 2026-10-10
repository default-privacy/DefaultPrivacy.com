"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SearchIcon, XIcon } from "lucide-react"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react"
import { cn } from "@/lib/utils"

type QuickSearchResult = {
  slug: string
  name: string
  tagline: string | null
  faviconUrl: string | null
}

type DirectorySearchModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function DirectorySearchModal({
  isOpen,
  onClose,
}: DirectorySearchModalProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<QuickSearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setResults([])
      setSelectedIndex(-1)
      const t = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setIsLoading(false)
      return
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(async () => {
      setIsLoading(true)
      try {
        const res = await fetch(
          `/api/directory/quick-search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        )
        if (!res.ok) throw new Error("search failed")
        const data = (await res.json()) as { results: QuickSearchResult[] }
        setResults(data.results ?? [])
        setSelectedIndex(-1)
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setResults([])
        }
      } finally {
        setIsLoading(false)
      }
    }, 150)

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [query])

  const goToDirectory = useCallback(
    (term: string) => {
      router.push(`/directory?search=${encodeURIComponent(term)}`)
      onClose()
    },
    [router, onClose],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, -1))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          router.push(`/directory/${results[selectedIndex].slug}`)
          onClose()
        } else if (query.trim()) {
          goToDirectory(query.trim())
        }
      }
    },
    [results, selectedIndex, query, router, onClose, goToDirectory],
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[12vh] px-4">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-background/80 backdrop-blur-sm"
        aria-label="Close search"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search privacy tools"
        className="relative w-full max-w-xl overflow-hidden rounded-xl border border-foreground/12 bg-background shadow-2xl brand2-surface"
      >
        <div className="relative border-b border-foreground/10">
          <SearchIcon
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45"
            aria-hidden
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search privacy tools…"
            className="h-12 w-full bg-transparent pl-11 pr-11 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-foreground/45 brand2-focus hover:bg-foreground/[0.06] hover:text-foreground"
            aria-label="Close"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[min(50vh,360px)] overflow-y-auto p-2">
          {query.length < 2 && (
            <p className="px-3 py-6 text-center text-[12px] text-foreground/45">
              Type at least 2 characters, or press Enter to open the full directory.
            </p>
          )}

          {query.length >= 2 && isLoading && (
            <p className="px-3 py-4 text-center text-[12px] text-foreground/45">
              Searching…
            </p>
          )}

          {query.length >= 2 && !isLoading && results.length === 0 && (
            <p className="px-3 py-4 text-center text-[12px] text-foreground/45">
              No tools found.{" "}
              <button
                type="button"
                className="underline brand2-focus"
                onClick={() => goToDirectory(query)}
              >
                Search directory
              </button>
            </p>
          )}

          <ul className="flex flex-col gap-0.5">
            {results.map((tool, index) => (
              <li key={tool.slug}>
                <Link
                  href={`/directory/${tool.slug}`}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors brand2-focus",
                    selectedIndex === index
                      ? "bg-foreground/[0.08] text-foreground"
                      : "hover:bg-foreground/[0.05]",
                  )}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-foreground/10 bg-foreground/[0.04]">
                    {tool.faviconUrl ? (
                      <Image
                        src={tool.faviconUrl}
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    ) : (
                      <span className="text-[10px] font-medium text-foreground/50">
                        {tool.name.slice(0, 1)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium tracking-tight">
                      {tool.name}
                    </div>
                    {tool.tagline && (
                      <div className="truncate text-[11px] text-foreground/50">
                        {tool.tagline}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between border-t border-foreground/8 px-3 py-2 text-[10px] text-foreground/40">
          <span>↑↓ navigate · ↵ open · esc close</span>
          {query.trim().length >= 2 && (
            <button
              type="button"
              className="underline brand2-focus hover:text-foreground/60"
              onClick={() => goToDirectory(query.trim())}
            >
              View all in directory
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
