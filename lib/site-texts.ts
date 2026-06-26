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
        key: 'home.conversations_link',
        label: 'Buton conversații',
        group: 'Acasă',
        defaultValue: 'Ascultă arhiva',
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
      {
        key: 'home.videos_link',
        label: 'Buton videoclipuri',
        group: 'Acasă',
        defaultValue: 'Vezi toate',
      },
      {
        key: 'home.video_badge_fallback',
        label: 'Etichetă video fără context',
        group: 'Acasă',
        defaultValue: 'Video',
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
      {
        key: 'video.archive_kicker',
        label: 'Etichetă arhivă',
        group: 'Video',
        defaultValue: 'Arhivă video',
      },
      {
        key: 'video.featured_button',
        label: 'Buton video principal',
        group: 'Video',
        defaultValue: 'Vezi pagina episodului',
      },
      {
        key: 'video.card_button',
        label: 'Buton card video',
        group: 'Video',
        defaultValue: 'Vezi pagina episodului',
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
      {
        key: 'conversations.archive_kicker',
        label: 'Etichetă arhivă',
        group: 'Conversații',
        defaultValue: 'Ascultă',
      },
      {
        key: 'conversations.source_featured',
        label: 'Buton sursă episod principal',
        group: 'Conversații',
        defaultValue: 'Deschide sursa RVS',
      },
      {
        key: 'conversations.source_card',
        label: 'Buton sursă card',
        group: 'Conversații',
        defaultValue: 'Sursa RVS',
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
      {
        key: 'about.english_kicker',
        label: 'Etichetă engleză',
        group: 'Despre',
        defaultValue: 'In English',
      },
      {
        key: 'about.english_paragraph_1',
        label: 'Paragraf engleză 1',
        group: 'Despre',
        defaultValue:
          'I hold a Master’s degree in Pastoral Ministry, focusing on biblical studies, ecclesiastical leadership, and pastoral care. My research engages contemporary issues in ministry, biblical exegesis, and the practical integration of theology into pastoral contexts. Currently, I serve as a pastor in the Adventist Church in Romania, where I seek to unite academic reflection with pastoral practice to foster spiritual growth and contribute to theological discourse.',
        multiline: true,
      },
      {
        key: 'about.english_paragraph_2',
        label: 'Paragraf engleză 2',
        group: 'Despre',
        defaultValue:
          'I am a Seventh-day Adventist pastor in Onești, Romania, and I hold an M.A. from Friedensau Adventist University, Germany. I have published a book, contributed articles to Curierul Adventist, Ministry, and TheoRhēma, and presented at several academic conferences. My research interests include Theology, Biblical Studies, The Book of Revelation, Textual Criticism, and Intertextuality.',
        multiline: true,
      },
    ],
  },
  {
    title: 'Newsletter',
    description: 'Textele din formularul de abonare.',
    texts: [
      {
        key: 'newsletter.kicker',
        label: 'Etichetă',
        group: 'Newsletter',
        defaultValue: 'Newsletter',
      },
      {
        key: 'newsletter.title',
        label: 'Titlu',
        group: 'Newsletter',
        defaultValue: 'Primești texte noi, în ritmul potrivit pentru tine.',
        multiline: true,
      },
      {
        key: 'newsletter.description',
        label: 'Descriere',
        group: 'Newsletter',
        defaultValue:
          'Dacă îți place să citești cu atenție și să te oprești asupra lucrurilor care contează, îți voi trimite doar texte simple, sincere și rare.',
        multiline: true,
      },
      {
        key: 'newsletter.placeholder',
        label: 'Placeholder email',
        group: 'Newsletter',
        defaultValue: 'Adresă de email',
      },
      {
        key: 'newsletter.button',
        label: 'Buton',
        group: 'Newsletter',
        defaultValue: 'Mă înscriu',
      },
      {
        key: 'newsletter.loading',
        label: 'Text trimitere',
        group: 'Newsletter',
        defaultValue: 'Se trimite...',
      },
      {
        key: 'newsletter.success',
        label: 'Mesaj succes',
        group: 'Newsletter',
        defaultValue: 'Mulțumesc! Te-ai înscris cu succes.',
      },
      {
        key: 'newsletter.error',
        label: 'Mesaj eroare',
        group: 'Newsletter',
        defaultValue: 'Nu am putut salva abonarea.',
      },
    ],
  },
  {
    title: 'Autor',
    description: 'Textele din cardul Despre autor de sub articole.',
    texts: [
      {
        key: 'author.kicker',
        label: 'Etichetă card autor',
        group: 'Autor',
        defaultValue: 'Despre autor',
      },
      {
        key: 'author.name',
        label: 'Nume afișat',
        group: 'Autor',
        defaultValue: 'Albert-Beniamin Cucu',
      },
      {
        key: 'author.bio',
        label: 'Biografie sub articole',
        group: 'Autor',
        defaultValue:
          'ALBERT BENIAMIN CUCU este pastor Adventist de Ziua a Șaptea în Onești, România. Deține un Master în Arte în Slujire Pastorală (Pastoral Ministry) obținut la Universitatea Adventistă Friedensau (Friedensau Adventist University), Germania. A publicat o carte, Conversații cu Dumnezeu: un altfel de comentariu biblic la epistola Romani; a contribuit cu articole în Curierul Adventist, Ministry și TheoRhēma, și a prezentat lucrări științifice la mai multe conferințe academice, naționale și internaționale. Interesele sale de cercetare includ Teologia, Studiile Biblice (Vechiul și Noul Testament), Cartea Apocalipsei, Critica Textuală și Intertextualitatea.',
        multiline: true,
      },
    ],
  },
  {
    title: 'Donații',
    description: 'Textele pentru pagina de donații și pop-up-ul discret.',
    texts: [
      {
        key: 'donations.nav_label',
        label: 'Link footer',
        group: 'Donații',
        defaultValue: 'Donații',
      },
      {
        key: 'donations.kicker',
        label: 'Etichetă pagină',
        group: 'Donații',
        defaultValue: 'Susține proiectul',
      },
      {
        key: 'donations.title',
        label: 'Titlu pagină',
        group: 'Donații',
        defaultValue: 'Ajută-mă să păstrez acest spațiu viu.',
        multiline: true,
      },
      {
        key: 'donations.description',
        label: 'Descriere pagină',
        group: 'Donații',
        defaultValue:
          'Dacă articolele, conversațiile sau materialele publicate aici ți-au fost de folos, poți susține munca din spatele lor printr-o donație. Fiecare contribuție ajută la documentare, editare, publicare și menținerea site-ului.',
        multiline: true,
      },
      {
        key: 'donations.primary_button',
        label: 'Buton principal',
        group: 'Donații',
        defaultValue: 'Donează',
      },
      {
        key: 'donations.secondary_button',
        label: 'Buton secundar',
        group: 'Donații',
        defaultValue: 'Află mai multe',
      },
      {
        key: 'donations.url',
        label: 'Link donație',
        group: 'Donații',
        defaultValue: '#modalitati',
      },
      {
        key: 'donations.methods_title',
        label: 'Titlu modalități',
        group: 'Donații',
        defaultValue: 'Modalități de susținere',
      },
      {
        key: 'donations.methods_description',
        label: 'Descriere modalități',
        group: 'Donații',
        defaultValue:
          'Poți folosi un link extern de plată sau poți completa aici detalii pentru transfer bancar/Revolut. Recomandarea practică: creează un link de plată și pune-l în câmpul „Link donație”.',
        multiline: true,
      },
      {
        key: 'donations.details',
        label: 'Detalii donație',
        group: 'Donații',
        defaultValue:
          'Completează din panoul de admin detaliile pe care vrei să le afișezi aici: Revolut, PayPal, transfer bancar sau un alt link sigur de plată.',
        multiline: true,
      },
      {
        key: 'donations.note',
        label: 'Notă de transparență',
        group: 'Donații',
        defaultValue:
          'Donațiile sunt voluntare și susțin activitatea editorială, tehnică și de documentare a acestui site.',
        multiline: true,
      },
      {
        key: 'donations.popup_title',
        label: 'Titlu pop-up',
        group: 'Donații',
        defaultValue: 'Susții acest proiect?',
      },
      {
        key: 'donations.popup_description',
        label: 'Descriere pop-up',
        group: 'Donații',
        defaultValue:
          'Dacă materialele de aici ți-au fost de folos, o donație ajută ca acest spațiu să rămână viu și bine îngrijit.',
        multiline: true,
      },
      {
        key: 'donations.popup_button',
        label: 'Buton pop-up',
        group: 'Donații',
        defaultValue: 'Susțin',
      },
      {
        key: 'donations.popup_later',
        label: 'Buton închidere pop-up',
        group: 'Donații',
        defaultValue: 'Poate mai târziu',
      },
    ],
  },
  {
    title: 'Footer',
    description: 'Textele de identitate și drepturi de autor din subsolul site-ului.',
    texts: [
      {
        key: 'footer.tagline',
        label: 'Descriere scurtă footer',
        group: 'Footer',
        defaultValue:
          'Eseuri, reflecții biblice și materiale editoriale semnate de Albert-Beniamin Cucu.',
        multiline: true,
      },
      {
        key: 'footer.copyright',
        label: 'Rând copyright',
        group: 'Footer',
        defaultValue:
          '© 2026 Albert-Beniamin Cucu. Toate drepturile rezervate.',
      },
      {
        key: 'footer.rights_notice',
        label: 'Notă drepturi de autor',
        group: 'Footer',
        defaultValue:
          'Articolele, eseurile și materialele publicate pe acest site sunt texte personale. Reproducerea, distribuirea sau republicarea lor se poate face doar cu menționarea autorului și a sursei, iar folosirea comercială necesită acord scris.',
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
