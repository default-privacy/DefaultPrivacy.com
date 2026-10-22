import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import Link from "next/link"

export default function ToolNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-16">
        <div className="text-center max-w-md mx-auto">
          <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-medium tracking-cinematic text-foreground mb-4">Tool Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn&apos;t find the privacy tool you&apos;re looking for. It may have been
            removed or the URL might be incorrect.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/directory">Browse All Tools</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
