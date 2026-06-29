import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProjectTabs } from '@/components/project-tabs'
import { projects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Recent VPPCONSTRUCT LTD project work, including bathroom floor renovation, kitchen floor renovation, underfloor heating and floor tiling in Edgware.',
  alternates: {
    canonical: '/projects',
  },
}

export default function ProjectsPage() {
  return (
    <main className="construction-page">
      <section className="projects-hero">
        <div className="page-shell projects-hero-shell">
          <div>
            <p className="section-kicker">Projects</p>
            <h1 className="page-title">Recent renovation work with clear progress and practical finishes.</h1>
            <p className="page-intro projects-intro">
              Select a project to view the work stages, services included and final result.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <ProjectTabs projects={projects} />
      </Suspense>
    </main>
  )
}
