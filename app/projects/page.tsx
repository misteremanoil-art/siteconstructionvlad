import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react'
import { projects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Recent VPPCONSTRUCT LTD project work, including bathroom floor renovation, underfloor heating and floor tiling in Edgware.',
  alternates: {
    canonical: '/projects',
  },
}

export default function ProjectsPage() {
  const project = projects[0]

  return (
    <main className="construction-page">
      <section className="projects-hero">
        <div className="page-shell projects-hero-shell">
          <div>
            <p className="section-kicker">Projects</p>
            <h1 className="page-title">Real work, clear progress and practical finishes.</h1>
            <p className="page-intro projects-intro">
              A closer look at recent building and renovation work completed by VPPCONSTRUCT LTD.
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell project-showcase">
        <article className="project-feature-card">
          <div className="project-feature-media">
            <Image
              src={project.heroImage}
              alt={project.shortTitle}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 54vw"
              className="object-cover"
            />
            <span>{project.category}</span>
          </div>
          <div className="project-feature-copy">
            <p className="section-kicker">Featured project</p>
            <h2>{project.title}</h2>
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="project-location">
              <MapPin className="h-4 w-4" />
              {project.location}
            </div>
            <div className="project-result">
              <span>Final result</span>
              <p>{project.finalResult}</p>
            </div>
            <h3 className="project-services-title">Services included</h3>
            <ul>
              {project.servicesIncluded.map((item) => (
                <li key={item}>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/#contact" className="primary-action project-quote-action">
              Request a similar quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </section>

      <section className="page-shell before-after-section">
        <div className="section-header">
          <div>
            <p className="section-kicker">Before & after</p>
            <h2 className="section-title">From heating mat installation to a clean tiled finish.</h2>
            <p className="section-copy project-caption">{project.caption}</p>
          </div>
        </div>
        <div className="before-after-grid">
          <figure className="before-after-card">
            <Image
              src={project.beforeImage}
              alt="Bathroom floor before tiling with underfloor heating fitted"
              fill
              sizes="(max-width: 780px) 100vw, 50vw"
              className="object-cover"
            />
            <figcaption>Before</figcaption>
          </figure>
          <figure className="before-after-card">
            <Image
              src={project.afterImage}
              alt="Bathroom floor after new tiles and grout were completed"
              fill
              sizes="(max-width: 780px) 100vw, 50vw"
              className="object-cover"
            />
            <figcaption>After</figcaption>
          </figure>
        </div>
      </section>

      <section className="page-shell">
        <div className="section-header">
          <div>
            <p className="section-kicker">Project gallery</p>
            <h2 className="section-title">Installation, tiling and final details.</h2>
          </div>
        </div>
        <div className="project-gallery-grid">
          {project.gallery.map((item) => (
            <figure key={item.src} className="project-gallery-item">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                className="object-cover"
              />
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  )
}
