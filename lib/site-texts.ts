import { createSupabaseClient } from '@/lib/supabase'

export type SiteTextDefinition = {
  key: string
  label: string
  group: string
  defaultValue: string
  multiline?: boolean
}

export const siteTextGroups: { title: string; description: string; texts: SiteTextDefinition[] }[] = [
  {
    title: 'Acasă',
    description: 'Textele principale de pe prima pagină.',
    texts: [
      {
        key: 'home.featured_label',
        label: 'Etichetă articol principal',
        group: 'Acasă',
        defaultValue: 'Articol principal',
      },
      {
        key: 'home.articles_title',
        label: 'Titlu articole recente',
        group: 'Acasă',
        defaultValue: 'Articole recente',
      },
      {
        key: 'home.conversations_title',
        label: 'Titlu conversații recente',
        group: 'Acasă',
        defaultValue: 'Conversații recente',
      },
      {
        key: 'home.conversations_description',
        label: 'Descriere conversații recente',
        group: 'Acasă',
        defaultValue: 'Reflecții audio și dialoguri biblice din emisiunea Cuvinte cu har.',
        multiline: true,
      },
      {
        key: 'home.videos_title',
        label: 'Titlu videoclipuri recente',
        group: 'Acasă',
        defaultValue: 'Videoclipuri recente',
      },
      {
        key: 'home.videos_description',
        label: 'Descriere videoclipuri recente',
        group: 'Acasă',
        defaultValue: 'Emisiuni, interviuri și conversații publice despre credință, teologie și slujire.',
        multiline: true,
      },
    ],
  },
  {
    title: 'Articole',
    description: 'Textele de pe pagina listei de articole.',
    texts: [
      {
        key: 'articles.kicker',
        label: 'Etichetă pagină',
        group: 'Articole',
        defaultValue: 'Arhivă',
      },
      {
        key: 'articles.title',
        label: 'Titlu pagină',
        group: 'Articole',
        defaultValue: 'Toate articolele',
      },
      {
        key: 'articles.description',
        label: 'Descriere pagină',
        group: 'Articole',
        defaultValue:
          'O colecție de eseuri și reflecții despre rugăciune, credință și redescoperirea comuniunii personale cu Dumnezeu.',
        multiline: true,
      },
    ],
  },
  {
    title: 'Video',
    description: 'Textele de introducere pentru pagina video.',
    texts: [
      {
        key: 'video.kicker',
        label: 'Etichetă pagină',
        group: 'Video',
        defaultValue: 'Video',
      },
      {
        key: 'video.title',
        label: 'Titlu pagină',
        group: 'Video',
        defaultValue: 'Emisiuni, interviuri și conversații.',
      },
      {
        key: 'video.description',
        label: 'Descriere pagină',
        group: 'Video',
        defaultValue:
          'Un spațiu dedicat aparițiilor video, dialogurilor publice și emisiunilor în care reflecția teologică se întâlnește cu întrebările comunității.',
        multiline: true,
      },
      {
        key: 'video.archive_title',
        label: 'Titlu arhivă',
        group: 'Video',
        defaultValue: 'Apariții recente',
      },
    ],
  },
  {
    title: 'Conversații',
    description: 'Textele pentru zona audio.',
    texts: [
      {
        key: 'conversations.kicker',
        label: 'Etichetă pagină',
        group: 'Conversații',
        defaultValue: 'Audio',
      },
      {
        key: 'conversations.title',
        label: 'Titlu pagină',
        group: 'Conversații',
        defaultValue: 'Conversații',
      },
      {
        key: 'conversations.description',
        label: 'Descriere pagină',
        group: 'Conversații',
        defaultValue: 'Emisiuni audio, reflecții biblice și dialoguri despre credință, Scriptură și viața spirituală.',
        multiline: true,
      },
      {
        key: 'conversations.archive_title',
        label: 'Titlu arhivă',
        group: 'Conversații',
        defaultValue: 'Arhivă audio',
      },
    ],
  },
  {
    title: 'Despre',
    description: 'Textele biografice de pe pagina Despre.',
    texts: [
      {
        key: 'about.kicker',
        label: 'Etichetă pagină',
        group: 'Despre',
        defaultValue: 'Despre mine',
      },
      {
        key: 'about.role',
        label: 'Roluri sub nume',
        group: 'Despre',
        defaultValue: 'Pastor • Teolog • Autor',
      },
      {
        key: 'about.paragraph_1',
        label: 'Paragraf 1',
        group: 'Despre',
        defaultValue:
          'Sunt absolvent al unui program de Master în Teologie Pastorală (Pastoral Ministry), cu un interes deosebit pentru studiile biblice, leadership-ul ecleziastic și îngrijirea pastorală. Cercetarea mea se concentrează pe provocările contemporane ale slujirii, exegeza biblică și integrarea practică a teologiei în contextul pastoral cotidian.',
        multiline: true,
      },
      {
        key: 'about.paragraph_2',
        label: 'Paragraf 2',
        group: 'Despre',
        defaultValue:
          'În prezent, slujesc ca pastor în cadrul Bisericii Adventiste din România, unde caut să unesc reflecția academică cu practica pastorală pentru a susține creșterea spirituală, a întări angajamentul comunitar și a contribui la discursul teologic actual.',
        multiline: true,
      },
      {
        key: 'about.paragraph_3',
        label: 'Paragraf 3',
        group: 'Despre',
        defaultValue:
          'Am publicat o carte și am contribuit cu articole în publicații precum Curierul Adventist, Ministry și TheoRhēma, prezentând totodată lucrări la diverse conferințe academice. Interesele mele de cercetare includ Teologia, Studiile Biblice (Vechiul și Noul Testament), Cartea Apocalipsei, Critica Textuală și Intertextualitatea.',
        multiline: true,
      },
    ],
  },
  {
    title: 'Footer',
    description: 'Textul de drepturi de autor din subsolul site-ului.',
    texts: [
      {
        key: 'footer.copyright',
        label: 'Copyright',
        group: 'Footer',
        defaultValue:
          '© 2026 Albert-Beniamin Cucu. Toate articolele, eseurile și materialele publicate pe acest site sunt texte personale și sunt protejate prin drepturi de autor. Reproducerea lor se poate face doar cu menționarea autorului și a sursei.',
        multiline: true,
      },
    ],
  },
]

export const siteTextDefinitions = siteTextGroups.flatMap((group) => group.texts)

export const defaultSiteTexts = Object.fromEntries(
  siteTextDefinitions.map((definition) => [definition.key, definition.defaultValue]),
) as Record<string, string>

export async function getSiteTexts(keys?: string[]) {
  const wantedKeys = keys ?? siteTextDefinitions.map((definition) => definition.key)
  const values = Object.fromEntries(
    wantedKeys.map((key) => [key, defaultSiteTexts[key] ?? '']),
  ) as Record<string, string>

  const supabase = createSupabaseClient()
  if (!supabase) return values

  const { data, error } = await supabase
    .from('site_texts')
    .select('key, value')
    .in('key', wantedKeys)

  if (error || !data) return values

  for (const row of data as { key: string; value: string }[]) {
    values[row.key] = row.value || values[row.key] || ''
  }

  return values
}

export async function getSiteText(key: string) {
  const texts = await getSiteTexts([key])
  return texts[key] ?? defaultSiteTexts[key] ?? ''
}
