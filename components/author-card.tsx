export function AuthorCard() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center">
      <span
        aria-hidden="true"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-brand font-serif text-2xl font-semibold text-brand-foreground"
      >
        AC
      </span>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
        Autor
      </p>
      <h3 className="font-serif text-xl font-semibold text-foreground">
        Albert-Beniamin Cucu
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        Master în Teologie Pastorală. Pasionat de explorarea sensului prin
        rigoare academică și credință vie.
      </p>
    </div>
  )
}
