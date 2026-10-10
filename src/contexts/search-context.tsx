"use client"

import {
  createContext,
  use,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react"
import { DirectorySearchModal } from "@/components/common/directory-search-modal"

type SearchContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const SearchContext = createContext<SearchContextType | null>(null)

export function SearchProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
      <DirectorySearchModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </SearchContext.Provider>
  )
}

export function useSearch(): SearchContextType {
  const context = use(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider")
  }
  return context
}
