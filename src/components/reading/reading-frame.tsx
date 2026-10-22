/**
 * The case-file frame above a reading page (the locked C2 layout): title, the
 * italic dek, then one mono label row under an ink rule. The file number comes
 * from fileNumber(), never typed by hand.
 */
export function ReadingFrame({
  file,
  title,
  dek,
  fields = [],
  right,
}: {
  file: string
  title: string
  dek?: string
  /** Left-hand typed fields after the file number, e.g. a date or a reading time. */
  fields?: string[]
  /** Right-aligned field, e.g. "Privacy · Beginner". */
  right?: string
}) {
  return (
    <header className="reading-frame">
      <h1>{title}</h1>
      {dek && <p className="reading-dek">{dek}</p>}
      <p className="reading-file">
        <span className="reading-file-no">File {file}</span>
        {fields.map((f) => (
          <span key={f}>{f}</span>
        ))}
        {right && <span className="reading-file-right">{right}</span>}
      </p>
    </header>
  )
}

export function formatReadingDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}
