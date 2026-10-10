import { notFound } from "next/navigation"

// Formation playbook is unpublished. next.config redirects /playbook to /guides;
// this is the fallback if a request reaches the route.
export default function PlaybookPage() {
  notFound()
}
