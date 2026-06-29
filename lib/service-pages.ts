export type ServicePage = {
  slug: string
  title: string
  shortTitle: string
  eyebrow: string
  summary: string
  metaDescription: string
  heroImage: string
  intro: string[]
  highlights: string[]
  included: string[]
  process: string[]
  suitableFor: string[]
}

export const servicePages: ServicePage[] = [
  {
    slug: 'driveways',
    title: 'Driveways & Block Paving in Edgware',
    shortTitle: 'Driveways',
    eyebrow: 'Driveways & paving',
    summary: 'Durable driveway and block paving work with clean preparation, neat edges and a practical finish for everyday use.',
    metaDescription:
      'Driveway and block paving services in Edgware and North West London, including ground preparation, edging, paving layout and finishing.',
    heroImage: '/images/projects/garden-clearance-fence-installation/timber-fence-final.jpeg',
    intro: [
      'VPPCONSTRUCT LTD helps homeowners improve the front or rear of their property with practical driveway and paving work planned around durability, drainage and everyday use.',
      'The focus is on correct preparation, clean lines, sensible material choices and a finish that improves both the look and usability of the outside space.',
    ],
    highlights: ['Block paving', 'Driveway preparation', 'Edging and finishing'],
    included: [
      'Site clearance and preparation',
      'Groundwork and sub-base preparation',
      'Block paving or slab layout',
      'Edge detailing and level checks',
      'Finishing, clean-up and practical handover',
    ],
    process: [
      'Review the area, access and preferred finish',
      'Prepare the ground and set levels properly',
      'Install paving with neat alignment and edge detail',
      'Complete the finish and leave the area tidy',
    ],
    suitableFor: ['Front driveways', 'Garden paths', 'Patio areas', 'Small paving repairs'],
  },
  {
    slug: 'roofing',
    title: 'Roofing Services in Edgware',
    shortTitle: 'Roofing',
    eyebrow: 'Roofing',
    summary: 'Roofing support for repairs, maintenance and improvement work, handled with careful inspection and tidy completion.',
    metaDescription:
      'Roofing services in Edgware and North West London for repairs, maintenance and practical roof improvement work.',
    heroImage: '/images/vppconstruct-extension.png',
    intro: [
      'Roofing work needs a careful look at the existing condition, access, materials and any signs of water ingress before the right solution is recommended.',
      'VPPCONSTRUCT LTD can help with practical roofing repairs and improvement work, keeping the process clear and the site as tidy as possible.',
    ],
    highlights: ['Roof repairs', 'Maintenance work', 'Clear inspection'],
    included: [
      'Initial roof condition review',
      'Repair planning and material advice',
      'Practical roofing repair work',
      'Associated exterior finishing',
      'Clean-up after completion',
    ],
    process: [
      'Check the visible issue and access requirements',
      'Explain the likely repair route',
      'Carry out the agreed roofing work',
      'Review the finish and tidy the working area',
    ],
    suitableFor: ['Small roof repairs', 'Roof maintenance', 'Exterior improvement work', 'Leak investigation'],
  },
  {
    slug: 'extensions',
    title: 'Home Extensions in Edgware',
    shortTitle: 'Extensions',
    eyebrow: 'Extensions',
    summary: 'Extension and home improvement work planned around useful space, practical construction and a clean final finish.',
    metaDescription:
      'Home extension services in Edgware and North West London, from practical building support to interior finishing.',
    heroImage: '/images/vppconstruct-hero.png',
    intro: [
      'A good extension should feel useful, well connected to the existing property and finished in a way that suits everyday living.',
      'VPPCONSTRUCT LTD can support extension and home improvement projects with a practical approach to stages, coordination and final finishing.',
    ],
    highlights: ['Home extensions', 'Structural support', 'Interior completion'],
    included: [
      'Project scope review',
      'Building and construction support',
      'Coordination of practical work stages',
      'Internal finishing and detail work',
      'Final tidy-up and handover',
    ],
    process: [
      'Discuss the space you want to create',
      'Review the existing property and constraints',
      'Plan the work stages clearly',
      'Build, finish and complete the agreed scope',
    ],
    suitableFor: ['Rear extensions', 'Side-return improvements', 'Open-plan upgrades', 'Property layout changes'],
  },
  {
    slug: 'renovations',
    title: 'Renovations in Edgware',
    shortTitle: 'Renovations',
    eyebrow: 'Renovations',
    summary: 'Reliable renovation work for homes and commercial spaces, from preparation and repairs to flooring, walls and final finishes.',
    metaDescription:
      'Renovation services in Edgware and North West London for homes and commercial spaces, including repairs, flooring, walls and finishing.',
    heroImage: '/images/projects/custom-arched-feature-wall/final-arched-media-wall.jpeg',
    intro: [
      'Renovation work is about making a space cleaner, more practical and better finished without losing sight of how it will be used every day.',
      'From smaller updates to larger refurbishments, VPPCONSTRUCT LTD keeps the work organised, clear and focused on a durable result.',
    ],
    highlights: ['Property refreshes', 'Repairs and upgrades', 'Final finishing'],
    included: [
      'Preparation and strip-out where needed',
      'General building and repair work',
      'Flooring, walls and finishing details',
      'Coordination of related trades where required',
      'Clean completion and practical handover',
    ],
    process: [
      'Understand what needs changing',
      'Agree the practical scope and finish',
      'Complete preparation and core works',
      'Finish details cleanly and leave the space usable',
    ],
    suitableFor: ['Home renovations', 'Rental property updates', 'Commercial refreshes', 'Room-by-room improvements'],
  },
  {
    slug: 'bathrooms-kitchens',
    title: 'Bathroom & Kitchen Renovations in Edgware',
    shortTitle: 'Bathrooms & kitchens',
    eyebrow: 'Bathrooms & kitchens',
    summary: 'Kitchen and bathroom renovation work with careful fitting, tiling, flooring and clean finishing around everyday use.',
    metaDescription:
      'Bathroom and kitchen renovation services in Edgware and North West London, including fitting, tiling, flooring and finishing.',
    heroImage: '/images/projects/bathroom-floor-renovation/finished-floor-toilet.jpeg',
    intro: [
      'Bathrooms and kitchens need careful work because they are used every day and small details make a big difference to the final result.',
      'VPPCONSTRUCT LTD can help with practical upgrades, flooring, tiling, fitting and finishing so the space looks cleaner and works better.',
    ],
    highlights: ['Bathroom upgrades', 'Kitchen flooring', 'Tiling and finishing'],
    included: [
      'Room preparation and protection',
      'Flooring and tiling work',
      'Fitting support and fixture detailing',
      'Cutting around existing features',
      'Grouting, finishing and clean-up',
    ],
    process: [
      'Review the room and what needs upgrading',
      'Prepare surfaces and protect surrounding areas',
      'Fit, tile or finish the agreed areas',
      'Complete final details and clean the space',
    ],
    suitableFor: ['Bathroom floor renovations', 'Kitchen flooring', 'Tiling repairs', 'Modern room updates'],
  },
]

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug)
}
