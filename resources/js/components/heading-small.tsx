export default function HeadingSmall({
  title,
  description
}: {
  title: string
  description?: string
}) {
  return (
    <header>
      <h3 className="font-bold text-base">{title}</h3>
      {description && <p className="text-muted-foreground text-sm">{description}</p>}
    </header>
  )
}
