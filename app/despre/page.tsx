import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Despre — Albert-Beniamin Cucu",
  description:
    "Albert-Beniamin Cucu — pastor și absolvent de Master în Teologie Pastorală, cu interes pentru studiile biblice și îngrijirea pastorală.",
}

export default function DesprePage() {
  return (
    <main className="page-shell max-w-4xl">
      <div className="flex flex-col items-center text-center">
        <div className="relative h-44 w-44 overflow-hidden rounded-full ring-1 ring-border">
          <Image
            src="/images/author.jpg"
            alt="Albert-Beniamin Cucu"
            fill
            sizes="176px"
            className="object-cover object-top"
          />
        </div>
        <p className="page-kicker mt-6">Despre mine</p>
        <h1 className="page-title mt-2">Albert-Beniamin Cucu</h1>
        <p className="mt-3 text-muted-foreground">Pastor • Teolog • Autor</p>
      </div>

      <section className="surface-card mt-14 space-y-6 p-6 text-lg leading-relaxed text-foreground/90 sm:p-8">
        <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-brand">
          Sunt absolvent al unui program de Master în Teologie Pastorală (Pastoral Ministry), cu un
          interes deosebit pentru studiile biblice, leadership-ul ecleziastic și îngrijirea
          pastorală. Cercetarea mea se concentrează pe provocările contemporane ale slujirii,
          exegeza biblică și integrarea practică a teologiei în contextul pastoral cotidian.
        </p>
        <p>
          În prezent, slujesc ca pastor în cadrul Bisericii Adventiste din România, unde caut să
          unesc reflecția academică cu practica pastorală pentru a susține creșterea spirituală, a
          întări angajamentul comunitar și a contribui la discursul teologic actual.
        </p>
        <p>
          Am publicat o carte și am contribuit cu articole în publicații precum{" "}
          <em className="italic">Curierul Adventist</em>, <em className="italic">Ministry</em> și{" "}
          <em className="italic">TheoRhēma</em>, prezentând totodată lucrări la diverse conferințe
          academice. Interesele mele de cercetare includ Teologia, Studiile Biblice (Vechiul și
          Noul Testament), Cartea Apocalipsei, Critica Textuală și Intertextualitatea.
        </p>
      </section>

      <hr className="my-12 border-border" />

      <section className="surface-card p-6 text-lg leading-relaxed text-muted-foreground sm:p-8">
        <div className="border-l-2 border-brand pl-5 md:pl-6">
          <p className="section-kicker">In English</p>
          <div className="mt-6 space-y-6">
            <p>
              I hold a Master&apos;s degree in Pastoral Ministry, focusing on biblical studies,
              ecclesiastical leadership, and pastoral care. My research engages contemporary issues
              in ministry, biblical exegesis, and the practical integration of theology into
              pastoral contexts. Currently, I serve as a pastor in the Adventist Church in Romania,
              where I seek to unite academic reflection with pastoral practice to foster spiritual
              growth and contribute to theological discourse.
            </p>
            <p>
              I am a Seventh-day Adventist pastor in Onești, Romania, and I hold an M.A. from
              Friedensau Adventist University, Germany. I have published a book, contributed
              articles to <em className="italic">Curierul Adventist</em>,{" "}
              <em className="italic">Ministry</em>, and <em className="italic">TheoRhēma</em>, and
              presented at several academic conferences. My research interests include Theology,
              Biblical Studies, The Book of Revelation, Textual Criticism, and Intertextuality.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
