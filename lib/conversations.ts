export type ConversationItem = {
  slug: string
  title: string
  show: string
  date: string
  sourceUrl: string
  audioUrl: string
  description: string
}

export const conversations: ConversationItem[] = [
  {
    slug: 'comoara-ascunsa-si-margaritarul-pretios-2',
    title: 'Comoara ascunsă și mărgăritarul prețios (2)',
    show: 'Cuvinte cu har',
    date: '21.05.2026',
    sourceUrl: 'https://rvs.ro/arhiva/40226',
    audioUrl:
      'https://storage.rvs.ro/emisiuni/2026/05%20mai/cuvinte%20cu%20har/cch_520_Comoara_ascunsa_si_margaritarul_pretios%20%282%29_21_05_2026.mp3',
    description:
      'O reflecție audio despre valoarea Împărăției lui Dumnezeu și despre felul în care adevărul schimbă ordinea priorităților.',
  },
  {
    slug: 'comoara-ascunsa-si-margaritarul-pretios-1',
    title: 'Comoara ascunsă și mărgăritarul prețios (1)',
    show: 'Cuvinte cu har',
    date: '14.05.2026',
    sourceUrl: 'https://rvs.ro/arhiva/40154',
    audioUrl:
      'https://storage.rvs.ro/emisiuni/2026/05%20mai/cuvinte%20cu%20har/cch_519_Comoara_ascunsa_si_margaritarul_pretios%20%281%29_14_05_2026.mp3',
    description:
      'Prima parte a unei conversații despre căutare, descoperire și bucuria unei credințe care merită totul.',
  },
  {
    slug: 'sa-nu-furi-2',
    title: 'Să nu furi (2)',
    show: 'Cuvinte cu har',
    date: '25.12.2025',
    sourceUrl: 'https://rvs.ro/arhiva/38672',
    audioUrl:
      'https://storage.rvs.ro/emisiuni/2025/12%20Decembrie/cuvinte%20cu%20har/cch_500_Sa_nu_furi%20%282%29_25_12_2025.mp3',
    description:
      'O discuție despre porunca a opta, integritate și formele mai subtile prin care omul poate lua ceea ce nu îi aparține.',
  },
  {
    slug: 'sa-nu-furi-1',
    title: 'Să nu furi (1)',
    show: 'Cuvinte cu har',
    date: '18.12.2025',
    sourceUrl: 'https://rvs.ro/arhiva/38544',
    audioUrl:
      'https://storage.rvs.ro/emisiuni/2025/12%20Decembrie/cuvinte%20cu%20har/cch_499_Sa_nu_furi%20%281%29_18_12_2025.mp3',
    description:
      'Prima parte a unei explorări biblice despre proprietate, responsabilitate și caracter în lumina Decalogului.',
  },
  {
    slug: 'cele-trei-solii-ingeresti-2',
    title: 'Cele trei solii îngerești (2)',
    show: 'Cuvinte cu har',
    date: '22.03.2025',
    sourceUrl: 'https://rvs.ro/arhiva/35546',
    audioUrl:
      'https://storage.rvs.ro/emisiuni/2025/03%20Martie/cuvinte%20cu%20har/cch_460_Cele_trei_Solii_Ingeresti%20%282%29_22_03_2025.mp3',
    description:
      'A doua parte a unei prezentări despre mesajele din Apocalipsa 14 și relevanța lor pentru credința contemporană.',
  },
  {
    slug: 'cele-trei-solii-ingeresti-1',
    title: 'Cele trei solii îngerești (1)',
    show: 'Cuvinte cu har',
    date: '15.03.2025',
    sourceUrl: 'https://rvs.ro/arhiva/35450',
    audioUrl:
      'https://storage.rvs.ro/emisiuni/2025/03%20Martie/cuvinte%20cu%20har/cch_459_Cele_trei_Solii_Ingeresti%20%281%29_15_03_2025.mp3',
    description:
      'O introducere în mesajele celor trei îngeri, cu accent pe speranță, judecată și chemarea la închinare.',
  },
]

export function getRecentConversations(limit = 3) {
  return conversations.slice(0, limit)
}
