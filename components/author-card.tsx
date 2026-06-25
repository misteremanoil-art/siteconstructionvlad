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
          Despre autor
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-foreground">
          Albert-Beniamin Cucu
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">ALBERT BENIAMIN CUCU</strong> este
          pastor Adventist de Ziua a Șaptea în Onești, România. Deține un Master în Arte în
          Slujire Pastorală (Pastoral Ministry) obținut la Universitatea Adventistă Friedensau
          (Friedensau Adventist University), Germania. A publicat o carte,{' '}
          <em className="italic">
            Conversații cu Dumnezeu: un altfel de comentariu biblic la epistola Romani
          </em>{'; '}
          a contribuit cu articole în{' '}
          <em className="italic">Curierul Adventist, Ministry și TheoRhēma</em>, și a prezentat
          lucrări științifice la mai multe conferințe academice, naționale și internaționale.
          Interesele sale de cercetare includ Teologia, Studiile Biblice (Vechiul și Noul
          Testament), Cartea Apocalipsei, Critica Textuală și Intertextualitatea.
        </p>
      </div>
    </div>
  )
}
