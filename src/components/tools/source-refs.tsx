/** Small numbered [n] links to a claim's sources, shown beside a fact. */
export function SourceRefs({ urls, index }: { urls: string[] | undefined; index: (url: string) => number }) {
  if (!urls?.length) return null
  return (
    <sup className="ml-1 whitespace-nowrap text-[10px]">
      {urls.map((u) => (
        <a
          key={u}
          href={`#source-${index(u)}`}
          className="px-px text-muted-foreground underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm"
          aria-label={`Source ${index(u)}`}
        >
          [{index(u)}]
        </a>
      ))}
    </sup>
  )
}
