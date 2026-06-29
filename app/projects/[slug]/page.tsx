import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { ProjectDetail } from '@/components/project-detail'
import { projects } from '@/lib/projects'

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return {}
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | VPPCONSTRUCT LTD`,
      description: project.summary,
      images: [
        {
          url: project.heroImage,
          alt: project.shortTitle,
        },
      ],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="construction-page">
      <section className="projects-hero">
        <div className="page-shell projects-hero-shell">
          <div>
            <Link href="/projects" className="project-back-link">
              <ArrowLeft className="h-4 w-4" />
              All projects
            </Link>
            <p className="section-kicker">{project.category}</p>
            <h1 className="page-title">{project.title}</h1>
            <p className="page-intro projects-intro">{project.caption}</p>
          </div>
        </div>
      </section>

      <section className="page-shell project-showcase">
        <ProjectDetail project={project} />
      </section>
    </main>
  )
}
