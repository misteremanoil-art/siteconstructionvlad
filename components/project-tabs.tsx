'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react'
import type { Project } from '@/lib/projects'

type ProjectTabsProps = {
  projects: Project[]
}

export function ProjectTabs({ projects }: ProjectTabsProps) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug)
  const activeProject = projects.find((project) => project.slug === activeSlug) ?? projects[0]

  if (!activeProject) {
    return null
  }

  return (
    <section className="page-shell project-showcase">
      <div className="project-tabs" aria-label="Project list">
        {projects.map((project) => {
          const isActive = project.slug === activeProject.slug

          return (
            <button
              key={project.slug}
              type="button"
              className="project-tab"
              data-active={isActive}
              onClick={() => setActiveSlug(project.slug)}
              aria-pressed={isActive}
            >
              <span className="project-tab-image">
                <Image
                  src={project.heroImage}
                  alt=""
                  fill
                  sizes="5rem"
                  className="object-cover"
                />
              </span>
              <span className="project-tab-copy">
                <span>{project.category}</span>
                <strong>{project.shortTitle}</strong>
              </span>
            </button>
          )
        })}
      </div>

      <article className="project-feature-card" key={activeProject.slug}>
        <div className="project-feature-media">
          <Image
            src={activeProject.heroImage}
            alt={activeProject.shortTitle}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 54vw"
            className="object-cover"
          />
          <span>{activeProject.category}</span>
        </div>
        <div className="project-feature-copy">
          <p className="section-kicker">Selected project</p>
          <h2>{activeProject.title}</h2>
          {activeProject.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="project-location">
            <MapPin className="h-4 w-4" />
            {activeProject.location}
          </div>
          <div className="project-result">
            <span>Final result</span>
            <p>{activeProject.finalResult}</p>
          </div>
          <h3 className="project-services-title">Services included</h3>
          <ul>
            {activeProject.servicesIncluded.map((item) => (
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

      <div className="section-header project-detail-header">
        <div>
          <p className="section-kicker">Before & after</p>
          <h2 className="section-title">Clear progress from preparation to final finish.</h2>
          <p className="section-copy project-caption">{activeProject.caption}</p>
        </div>
      </div>
      <div className="before-after-grid">
        <figure className="before-after-card">
          <Image
            src={activeProject.beforeImage}
            alt={`${activeProject.shortTitle} before completion`}
            fill
            sizes="(max-width: 780px) 100vw, 50vw"
            className="object-cover"
          />
          <figcaption>Before</figcaption>
        </figure>
        <figure className="before-after-card">
          <Image
            src={activeProject.afterImage}
            alt={`${activeProject.shortTitle} after completion`}
            fill
            sizes="(max-width: 780px) 100vw, 50vw"
            className="object-cover"
          />
          <figcaption>After</figcaption>
        </figure>
      </div>

      <div className="section-header project-detail-header">
        <div>
          <p className="section-kicker">Project gallery</p>
          <h2 className="section-title">Work stages and finishing details.</h2>
        </div>
      </div>
      <div className="project-gallery-grid">
        {activeProject.gallery.map((item) => (
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
  )
}
