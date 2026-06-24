import Image from 'next/image'

export function AuthorCard() {
  return (
    <div className="flex flex-col gap-5 border-y border-border py-8 sm:flex-row sm:items-center">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border">
        <Image
          src="/images/author.jpg"
          alt="Albert-Beniamin Cucu"
          fill
          sizes="96px"
          className="object-cover object-top"
        />
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
          Autor
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-foreground">
          Albert-Beniamin Cucu
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Master în Teologie Pastorală. Pasionat de explorarea sensului prin
          rigoare academică și credință vie.
        </p>
      </div>
    </div>
  )
}
