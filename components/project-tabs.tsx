'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { ProjectDetail } from '@/components/project-detail'
import type { Project } from '@/lib/projects'

type ProjectTabsProps = {
  projects: Project[]
}

export function ProjectTabs({ projects }: ProjectTabsProps) {
  const searchParams = useSearchParams()
  const selectedProject = searchParams.get('project')
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug)
  const activeProject = projects.find((project) => project.slug === activeSlug) ?? projects[0]

  useEffect(() => {
    if (selectedProject && projects.some((project) => project.slug === selectedProject)) {
      setActiveSlug(selectedProject)
    }
  }, [projects, selectedProject])

  if (!activeProject) {
    return null
  }

  return (
    <section className="page-shell project-showcase">
      <div className="section-header project-tabs-header">
        <div>
          <p className="section-kicker">Our projects</p>
          <h2 className="section-title">Quality Work You Can Depend On</h2>
          <p className="section-copy">
            Choose a recent project to see the work stages, finishing details and final result.
          </p>
        </div>
      </div>

      <div className="project-tabs" aria-label="Project list">
        {projects.map((project, index) => {
          const isActive = project.slug === activeProject.slug

          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="project-tab"
              data-active={isActive}
            >
              <span className="project-tab-topline">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <ArrowRight className="h-4 w-4" />
              </span>
              <span className="project-tab-image">
                <Image
                  src={project.heroImage}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                  className="object-cover"
                />
              </span>
              <span className="project-tab-copy">
                <span>{project.category}</span>
                <strong>{project.shortTitle}</strong>
                <small>{project.summary}</small>
              </span>
            </Link>
          )
        })}
      </div>

      <ProjectDetail project={activeProject} />
    </section>
  )
}
