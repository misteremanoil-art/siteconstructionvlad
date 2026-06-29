export const projects = [
  {
    slug: 'bathroom-floor-renovation',
    title: 'Before & After - Bathroom Floor Renovation',
    shortTitle: 'Bathroom floor renovation',
    category: 'Bathroom Renovation',
    location: 'Edgware, HA8',
    summary:
      'Bathroom floor upgraded with electric underfloor heating and new tiles, carefully installed and grouted for a clean, modern and comfortable finish.',
    caption:
      'A complete bathroom floor renovation with electric underfloor heating, finished with modern tiles for a warmer, cleaner and more practical space.',
    description: [
      'For this project, the existing bathroom floor was fully renovated and upgraded with an electric underfloor heating system. The work included preparing the floor surface, installing the heating mat, carefully laying the new floor tiles and finishing the area with clean grouting for a neat, practical and long-lasting result.',
      'The new tiled floor improves both the look and comfort of the bathroom, creating a warmer and more modern space for everyday use. Special attention was given to the layout, tile alignment, edges around the toilet and shower area, and the final finish to ensure the floor looks clean, consistent and well completed.',
    ],
    servicesIncluded: [
      'Bathroom floor preparation',
      'Electric underfloor heating installation',
      'Installation of new floor tiles',
      'Careful tile alignment and levelling',
      'Cutting and fitting around bathroom fixtures',
      'Grouting and final finishing',
      'Clean-up and completion',
    ],
    finalResult:
      'A modern, warmer and more comfortable bathroom floor with a durable tiled finish, improved practicality and a clean overall appearance.',
    heroImage: '/images/projects/bathroom-floor-renovation/finished-floor-toilet.jpeg',
    beforeImage: '/images/projects/bathroom-floor-renovation/underfloor-heating-layout.jpeg',
    afterImage: '/images/projects/bathroom-floor-renovation/finished-floor-toilet.jpeg',
    highlights: [
      'Electric underfloor heating installation',
      'New floor tiles fitted and levelled',
      'Clean grouting and final finishing',
      'Warmer, cleaner and more practical bathroom floor',
    ],
    gallery: [
      {
        src: '/images/projects/bathroom-floor-renovation/underfloor-heating-layout.jpeg',
        alt: 'Electric underfloor heating mat layout before tiling',
        label: 'Before',
      },
      {
        src: '/images/projects/bathroom-floor-renovation/heating-mat-full-bathroom.jpeg',
        alt: 'Underfloor heating mat installed across the bathroom floor',
        label: 'Heating install',
      },
      {
        src: '/images/projects/bathroom-floor-renovation/heating-around-toilet.jpeg',
        alt: 'Underfloor heating fitted around the bathroom toilet area',
        label: 'Detail work',
      },
      {
        src: '/images/projects/bathroom-floor-renovation/tiling-start.jpeg',
        alt: 'Bathroom floor tiles being fitted over electric underfloor heating',
        label: 'Tiling',
      },
      {
        src: '/images/projects/bathroom-floor-renovation/tiling-progress.jpeg',
        alt: 'Bathroom floor tiling progress with tile spacers and levelling clips',
        label: 'Progress',
      },
      {
        src: '/images/projects/bathroom-floor-renovation/finished-floor-close.jpeg',
        alt: 'Finished bathroom floor tiles after grouting',
        label: 'After',
      },
      {
        src: '/images/projects/bathroom-floor-renovation/finished-floor-entry.jpeg',
        alt: 'Completed tiled bathroom floor viewed from the doorway',
        label: 'After',
      },
      {
        src: '/images/projects/bathroom-floor-renovation/finished-floor-toilet.jpeg',
        alt: 'Finished bathroom floor renovation with new tiles fitted around fixtures',
        label: 'Final finish',
      },
    ],
  },
  {
    slug: 'kitchen-floor-renovation',
    title: 'Kitchen Floor Renovation',
    shortTitle: 'Kitchen floor renovation',
    category: 'Kitchen Renovation',
    location: 'Edgware, HA8',
    summary:
      'Old kitchen flooring removed and replaced with a modern, durable finish. The project included subfloor preparation, careful installation, levelling and final detailing for a clean and long-lasting result.',
    caption:
      'A complete kitchen floor renovation, finished with a clean, modern and durable look suitable for everyday family use.',
    description: [
      'For this project, the old kitchen flooring was removed and replaced with a fresh, durable and modern finish. The work included preparing the existing subfloor, carefully fitting the new flooring, aligning each section properly and finishing the surface for a clean, practical result.',
      'The new floor gives the kitchen a warmer and more refined look while also making the space easier to maintain for everyday use. Attention was given to the layout, level, edges and overall finish to ensure the final result looks neat, consistent and long-lasting.',
    ],
    servicesIncluded: [
      'Removal of the old kitchen flooring',
      'Subfloor preparation',
      'Installation of new kitchen flooring',
      'Careful alignment and levelling',
      'Edge detailing and finishing',
      'Final clean-up and completion',
    ],
    finalResult:
      'A cleaner, brighter and more comfortable kitchen space with a modern floor finish that is durable, practical and easy to maintain.',
    heroImage: '/images/projects/kitchen-floor-renovation/final-tiled-kitchen-floor.jpeg',
    beforeImage: '/images/projects/kitchen-floor-renovation/subfloor-preparation.jpeg',
    afterImage: '/images/projects/kitchen-floor-renovation/final-tiled-kitchen-floor.jpeg',
    highlights: [
      'Old kitchen flooring removed',
      'Subfloor prepared for a reliable finish',
      'New flooring aligned and levelled',
      'Clean, durable and easy-to-maintain result',
    ],
    gallery: [
      {
        src: '/images/projects/kitchen-floor-renovation/subfloor-preparation.jpeg',
        alt: 'Kitchen floor after old flooring removal and preparation',
        label: 'Before',
      },
      {
        src: '/images/projects/kitchen-floor-renovation/tile-installation-progress.jpeg',
        alt: 'New kitchen floor tiles being aligned and levelled during installation',
        label: 'Installation',
      },
      {
        src: '/images/projects/kitchen-floor-renovation/tile-levelling-progress.jpeg',
        alt: 'Kitchen floor renovation in progress with tile levelling clips',
        label: 'Levelling',
      },
      {
        src: '/images/projects/kitchen-floor-renovation/final-tiled-kitchen-floor.jpeg',
        alt: 'Finished kitchen floor renovation with a clean modern floor finish',
        label: 'Final finish',
      },
    ],
  },
]

export type Project = (typeof projects)[number]
