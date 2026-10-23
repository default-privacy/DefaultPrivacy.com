import Link from "next/link"

/**
 * A list-page card for a guide or stack, in the reading pages' vocabulary: the
 * same file number as the page it opens, mono labels in grey, no coloured pills.
 * The footer sits at the bottom so a row of cards lines up whatever the text length.
 */
export function ReadingCard({
  href,
  file,
  category,
  title,
  description,
  fields,
}: {
  href: string
  file: string
  category: string
  title: string
  description: string
  /** Mono footer fields, e.g. reading time and difficulty. */
  fields: string[]
}) {
  const mono = "font-mono text-[11.5px] uppercase tracking-[0.08em] text-foreground/50"
  return (
    <Link
      href={href}
      className="brand2-focus group flex flex-col rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.04]"
    >
      <p className={`mb-3 ${mono}`}>
        <span className="font-semibold text-foreground">{file}</span>
        <span className="before:mx-2 before:content-['·']">{category}</span>
      </p>
      <h2 className="mb-2 text-[17px] font-semibold leading-snug tracking-tight text-foreground/90 group-hover:text-foreground">
        {title}
      </h2>
      <p className="mb-4 text-[14px] leading-relaxed text-foreground/60">{description}</p>
      <p className={`mt-auto border-t border-foreground/10 pt-3 ${mono}`}>
        {fields.map((f, i) => (
          <span key={f} className={i > 0 ? "before:mx-2 before:content-['·']" : undefined}>
            {f}
          </span>
        ))}
      </p>
    </Link>
  )
}
