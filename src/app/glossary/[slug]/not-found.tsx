import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function GlossaryTermNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="geist-empty text-center px-4">
          <div className="geist-empty-icon">
            <BookOpen className="h-8 w-8" aria-hidden="true" />
          </div>
          <p className="geist-empty-title">Term Not Found</p>
          <p className="geist-empty-body">
            We couldn&apos;t find that glossary term. It may have been moved or doesn&apos;t exist.
          </p>
          <Button asChild className="brand2-btn-primary mt-4">
            <Link href="/glossary">Browse Glossary</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
