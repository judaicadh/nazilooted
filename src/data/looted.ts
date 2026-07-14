// Data model + helpers for the Penn "Nazi Looted Books" site.
// The register (RECORDS) is ingested from the JCR/OAD markings spreadsheet
// (src/data/records.json); the marking, step, case and source content is drawn
// from Bruce Nielsen's provenance essay.
import recordsData from './records.json';

export type TierKey = 'direct' | 'namelist' | 'context' | 'possible';
export type EvidenceKind = 'direct' | 'inferred' | 'possible';

export interface Mark {
  slug: string;
  name: string;
  body: string;
  where: string;
  count: number;
  hue: number;
  desc: string;
  obscured: string;
  note: string;
  bodyFull: string;
  bencowitz: string;
}

export interface EvidenceRow {
  what: string;
  whatSlug: string | null;
  where: string;
  says: string;
  says2?: string;
  source: string;
  kind: EvidenceKind;
}

export interface BookRecord {
  id: string;
  title: string;
  bib: string;
  tier: TierKey;
  series: string;
  country: string;
  city: string;
  call?: string;
  inCatalog: boolean;
  ownerSlug: string | null;
  owner: string | null;
  marks: string[];
  catalog: string;
  tierWhy: string;
  evidence: EvidenceRow[];
}

export interface Step { n: string; title: string; body: string; }

export interface Case {
  slug: string;
  title: string;
  blurb: string;
  lede: string;
  sections: string[];
  recordId: string | null;
  recordLabel: string;
}

export interface Source {
  name: string;
  type: string;
  region: string;
  question: string;
}

export interface Owner {
  slug: string;
  name: string;
  bio: string;
  dbNote: string;
  bookIds: string[];
  recovered?: number;
  known?: number;
}

export interface AnatomyMark { name: string; note: string; }
export interface AnatomyLoc {
  n: number;
  name: string;
  where: string;
  count: number;
  marks: AnatomyMark[];
  hint?: string;
}

export const MARK_NAMES: Record<string, string> = {
  oad: 'OAD stamp', jcr: 'JCR bookplate', gift: 'Gift-of-JCR note', err: 'ERR stamp',
  rsha: 'RSHA stamp', pohl: 'Pohl pastedown', disinf: 'Disinfection stamp', ajdc: 'AJDC Library stamp', owner: 'Owner stamp',
};

export const MARKINGS: Mark[] = [
  { slug: 'oad', name: 'OAD stamp', body: 'Offenbach Archival Depot', where: 'Title page, its verso, and the last-page verso', count: 435, hue: 270,
    desc: 'The stamp applied at the Offenbach depot, where looted books were gathered for sorting after the war. It is mostly black or red, sometimes purple, blue or green; whether the colour signifies anything — a batch, a date — is an open question.',
    obscured: 'under a Penn bookplate', note: 'Often on the verso of the title page rather than the recto, and sometimes at the very back of the book or under a later bookplate — surfaces a hurried survey skips.',
    bodyFull: 'Offenbach Archival Depot, U.S. Military Government (1946–49)', bencowitz: '— (a depot stamp; documented in the OAD monthly reports)' },
  { slug: 'jcr', name: 'JCR bookplate', body: 'Jewish Cultural Reconstruction', where: 'Front pastedown', count: 1042, hue: 150,
    desc: 'The bookplate of Jewish Cultural Reconstruction, Inc., the body that distributed heirless Jewish cultural property after the war. Its presence marks the route by which a book reached Penn.',
    obscured: 'beneath a later Annenberg plate', note: 'Frequently pasted over an older owner’s bookplate — the earlier layer is still there underneath.',
    bodyFull: 'Jewish Cultural Reconstruction, Inc. (1947–52)', bencowitz: '—' },
  { slug: 'gift', name: 'Gutter source note', body: '“Gift of JCR”', where: 'Gutter behind the title page', count: 1016, hue: 150,
    desc: 'A pencilled or stamped note, “Gift of Jewish Cultural Reconstruction,” usually with a date. It sits down in the fold, where a closed book hides it.',
    obscured: 'in deep gutter shadow', note: 'The source date alone can place a book: western European volumes are dated 1949–1951, Baltic ones always 1952 — never the reverse. Easy to miss unless the book is opened flat.',
    bodyFull: 'Dropsie accessioning, via JCR', bencowitz: '—' },
  { slug: 'err', name: 'ERR stamp', body: 'Einsatzstab Reichsleiter Rosenberg', where: 'Title page and front pastedown', count: 4, hue: 20,
    desc: 'The mark of Rosenberg’s task force, which looted Jewish libraries to stock a planned institute in Frankfurt. Over a dozen sub-variants exist; the form seen in these books is “Sichergestellt durch Einsatzstab RR Reval” — secured by the ERR at Reval (Tallinn).',
    obscured: 'ink-cancelled after the war', note: 'One of more than a dozen distinct Nazi confiscation stamps recorded in these books; the ERR competed with the RSHA for the same libraries.',
    bodyFull: 'Einsatzstab Reichsleiter Rosenberg (ERR)', bencowitz: 'Bencowitz, Library Markings (1946), NLI' },
  { slug: 'pohl', name: 'Johannes Pohl pastedown', body: 'ERR (Pohl)', where: 'Inside the upper board', count: 41, hue: 20,
    desc: 'A pastedown, usually inside the upper board, carrying a handwritten transliteration of the title, author and publication details in the hand of Johannes Pohl — special assistant to Alfred Rosenberg at the ERR. Often only a torn fragment of it survives.',
    obscured: 'torn out, or a surviving fragment', note: 'Pohl, a Catholic priest turned NSDAP Hebraist, ran the January 1942 looting of the Vilnius libraries: he shipped the most valuable books to the planned Nazi museum in Frankfurt and sold the rest to a paper mill.',
    bodyFull: 'Johannes Pohl, for the Einsatzstab Reichsleiter Rosenberg', bencowitz: '—' },
  { slug: 'disinf', name: 'Disinfection stamp', body: 'Offenbach intake', where: 'Flyleaf and title-page verso', count: 93, hue: 200,
    desc: '“desinf. Lk. Sept 45” — desinfektion Landkreis, September 1945: fumigated against mould and insects in the administrative district. When it sits on the flyleaf verso rather than the board, the binding was already gone at the time of treatment.',
    obscured: 'overstamped', note: 'Not a provenance mark in itself, but a firm tie to the Offenbach timeline; occasionally it is the only OAD evidence a book still carries.',
    bodyFull: 'Offenbach Archival Depot, intake', bencowitz: '—' },
  { slug: 'ajdc', name: 'AJDC Library stamp', body: 'the “Joint”', where: 'Inside back board (lower) / rear cover', count: 17, hue: 210,
    desc: 'The stamp “A.J.D.C. LIBRARY — NOT TO BE REMOVED FROM THE PREMISES,” applied to some of the roughly twenty thousand books the American Jewish Joint Distribution Committee borrowed from Offenbach for use in the Displaced Persons camps of the American Zone.',
    obscured: 'on the lower board', note: 'With OAD, JCR or Nazi evidence it confirms looting; on its own it is ambiguous, since some DP-camp books were donated by other Jewish organisations rather than routed through Offenbach.',
    bodyFull: 'American Jewish Joint Distribution Committee', bencowitz: '—' },
  { slug: 'owner', name: 'Pre-war owner stamps', body: 'personal & institutional', where: 'Throughout — title page, boards, flyleaf', count: 1034, hue: 40,
    desc: 'The stamps and bookplates of the people and institutions who owned these books before they were taken — synagogues, schools, community libraries, and private collectors.',
    obscured: 'under a later bookplate', note: 'The mark that can name an owner, and the one most often deliberately covered over — checked against Yad Vashem, the Wiesbaden privately-owned-collections list, and community records.',
    bodyFull: 'Various pre-war owners', bencowitz: 'Bencowitz, Library Markings (1946), vols. I–II, NLI' },
];

export const STEPS: Step[] = [
  { n: '1', title: 'Read the Dropsie card catalog, card by card', body: 'In the Freidus Classification Shelf List, the card is often the only written record of a book’s source — including the note “Gift of Jewish Cultural Reconstruction.” Yet it records no more than about nine hundred JCR books, and nearly half of those are neither in the catalog nor on the shelf. For several dozen that remain, the card is the only JCR evidence there is — and some of those were printed after the war, trace to known individuals, or carry American ownership marks, each of which casts doubt on the note.' },
  { n: '2', title: 'Check the rare-manuscripts accession list', body: 'A battered handwritten accession list is the sole evidence that Dropsie received six rare manuscripts. Nothing on the manuscripts themselves marks them as looted; without the list they would be invisible.' },
  { n: '3', title: 'Hunt the incunables named in the JCR report', body: 'A JCR report stated that Dropsie received three incunables. With no titles given and no mark to match, every Dropsie incunable had to be pulled and inspected by hand to find the three.' },
  { n: '4', title: 'Reconnect empty bindings with their textblocks', body: 'Rebinding discarded the old covers, and with them JCR bookplates and sometimes OAD or Nazi stamps. A marked empty binding can prove that a rebound, unmarked textblock belongs in the record — as with the Nedarim binding whose owner’s autograph matched a volume in the Rare Book Room that had been left out.' },
  { n: '5', title: 'Shelf-read the entire collection', body: 'The most tedious step, and not a clean one. Books whose spine date is post-war but whose title page predates 1941 still carried OAD/JCR evidence, which forced the shelf read to widen and include spine dates through 1948.' },
];

export const CASES: Case[] = [
  { slug: 'nedarim-binding', title: 'The empty Nedarim binding', blurb: 'A 43-cm binding stamped and bookplated at Offenbach, whose rebound textblock sat unmarked in the Rare Book Room — and had been left out of the database.',
    lede: 'The binding carried the evidence; the pages did not. An owner’s autograph, on the last leaf of each, is what proved they were one book.',
    sections: ['An empty binding turned up in the shelf read: boards and spine, 43 cm, a JCR bookplate, “desinf. Lk. Sept 1945” on the spine, “RBR 1739” inside the upper board, and an owner’s autograph on the inside of the lower board. Empty bindings are usually discarded. This one was kept because its marks made it evidence.', 'A hard-copy printout of the old Aleph titles gave RBR #1739 as a large-folio מסכת נדרים, Slabodka 1804 — an edition unrecorded in Vinograd, Steinschneider or Van Straalen. In the Rare Book Room stood a volume of the same size, Nedarim Nazir (Slavita, 1804), “Hb 9” penciled on the title page. Rebound, with no JCR bookplate and no OAD or Nazi stamp, it had originally been excluded.', 'Only after the empty binding was found, and the volume re-examined, did the same owner’s autograph — on the verso of the last page — reunite them. It is the case that taught the project to treat spines and empty bindings as places to look.'],
    recordId: null, recordLabel: 'browse the register' },
  { slug: 'loc-29', title: 'The Library of Congress twenty-nine', blurb: 'Twenty-nine Yiddish and Hebrew titles from seven eastern-European cities, tied to JCR not by any stamp in the book but by the Library of Congress’s own records.',
    lede: 'None of the twenty-nine carries direct OAD, JCR or Nazi evidence. The Library of Congress catalog is the only thing that places them.',
    sections: ['The group is unmistakable as a batch: all printed between 1912 and 1941, all from Moscow, Minsk, Kiev, Kharkov, Vilna, Kaunas or Warsaw, all bearing the same Library of Congress stamp and receipt date. Seventeen are marked “exchange — Library of Congress” on dates between 1953 and 1959; two carry a LoC Surplus Duplicate stamp on the front cover.', 'Searching the LoC online catalog, eleven of the titles carry a local note that copy 1 “was presented to the Library of Congress by Jewish Cultural Reconstruction, Inc.” and added on Sept 5, 1950, under the Holocaust-Era Judaic Heritage Library. One bears the stamp “Sichergestellt durch Einsatzstab RR Reval” — the Nazi confiscation mark that anchors the provenance of the whole group.', 'The likeliest history: JCR sent multiple copies of each title to the Library of Congress, copy 1 stayed, and over nine years of exchanges Dropsie received the duplicates. Like the card-catalog books, these were looted and are part of the collection — but the LoC record is their only evidence, so they are not counted among the titles JCR sent directly to Dropsie.'],
    recordId: null, recordLabel: 'these sit outside the JCR-to-Dropsie count' },
  { slug: 'incunables', title: 'The three incunables', blurb: 'A single line in a JCR report — that Dropsie received three incunables — sent the search through every incunable on the shelf.',
    lede: 'The report gave a number and nothing else: no titles, no marks to match. Three books had to be found among all the rest, by hand.',
    sections: ['JCR’s own paperwork recorded that Dropsie had received three incunables. None was identified there by title, and an incunable need carry no OAD or JCR mark at all.', 'The only way through was physical: pull every incunable in the Dropsie collection and examine it for any trace of the JCR route. It is the kind of step a database query cannot replace — where the evidence exists, it is in the object.'],
    recordId: null, recordLabel: 'see the method' },
  { slug: 'broken-set', title: 'The broken set', blurb: 'A six-part work where only part one is marked, and a 208-issue newspaper run where only ten issues are stamped — both, on balance, entirely looted.',
    lede: 'When part of a set carries OAD/JCR evidence and the rest does not, the honest reading is usually that all of it came the same way.',
    sections: ['Of a six-part set, part one — and a second copy of part one — carries OAD/JCR evidence; parts two and three do not, and parts four through six are absent. It is far easier to believe the whole set came from JCR, and only the two copies of part one were marked, than that two copies of part one were added to a pre-existing broken set.', 'The same logic holds for a full four-year run of a Russian-language newspaper — 208 issues in individual folders, of which only ten bear an OAD stamp. Imagining that Dropsie held 198 issues and JCR happened to supply exactly the ten missing ones is the harder story to tell.'],
    recordId: null, recordLabel: 'a reasoning, not a single record' },
  { slug: '5549-2391', title: '2,100 against 2,391–5,549', blurb: 'Three records, three different totals for what Dropsie received — and no list of titles to settle it.',
    lede: 'The JCR said 5,549. Dropsie’s own two records said 2,391, or 2,591. They never reconciled, and no list of the titles received has been found.',
    sections: ['A JCR document, “Distribution of Books in the U.S. from July 1, 1949 to Jan. 31, 1952,” records that Dropsie received 5,549 books processed at Offenbach. Two Dropsie Library records from the same years give the number as either 2,391 or 2,591. Almost from the moment the books arrived, then, more than half may never have been acknowledged.', 'More than 2,100 titles have now been identified. We publish the found number against the stated range rather than choosing one, and hold the distance open on the Gaps page. The point is not to assign blame for chaotic post-war record-keeping, but to keep what is unaccounted for in view.'],
    recordId: null, recordLabel: 'see the Gaps page' },
];

export const SOURCES: Source[] = [
  { name: 'Yad Vashem — Names Database', type: 'victims', region: 'international', question: 'Who owned this book?' },
  { name: 'USHMM — Survivors & Victims Database', type: 'victims', region: 'international', question: 'Who owned this book?' },
  { name: 'Bundesarchiv Gedenkbuch', type: 'victims', region: 'Germany', question: 'Who was the owner, and their fate?' },
  { name: 'Looted Cultural Assets', type: 'victims', region: 'Germany', question: 'Whose bookplate is this?' },
  { name: 'JewishGen — Yizkor & community lists', type: 'victims', region: 'Eastern Europe', question: 'Which community, and who lived there?' },
  { name: 'OAD monthly reports (NARA / fold3)', type: 'shipping', region: 'Germany / U.S.', question: 'Was it sent here, and when?' },
  { name: 'OAD list — 582 Jewish libraries (Sep 1946)', type: 'shipping', region: 'Germany', question: 'Which institution held it? (58,667 books)' },
  { name: 'OAD list — 35 libraries (Jul 1946)', type: 'shipping', region: 'Germany', question: 'Which institution held it? (33,499 books)' },
  { name: '“Privately-owned Book Collections,” Wiesbaden (1949)', type: 'shipping', region: 'Germany', question: 'Whose private library was it?' },
  { name: 'Freidus Classification Shelf List (Dropsie)', type: 'bibliographic', region: 'Philadelphia', question: 'Was it sourced as a JCR gift?' },
  { name: 'Rare-manuscripts accession list (Dropsie)', type: 'bibliographic', region: 'Philadelphia', question: 'Did the manuscript come from JCR?' },
  { name: 'Bencowitz, Library Markings (1946), NLI', type: 'reference', region: 'Offenbach', question: 'What stamp is this?' },
];
export const SOURCE_CATS = ['all', 'victims', 'shipping', 'bibliographic', 'reference'];

// The one personal library resolved to a named owner in the register so far.
// Kremer's volumes are the pink-flagged rows of the Lithuanian sheet; their
// records carry ownerSlug 'mordecai-kremer', so the owner page lists them live.
export const OWNERS: Record<string, Owner> = {
  'kaunas-rabbi': { slug: 'kaunas-rabbi', name: 'Rabbi Mordecai Kremer of Kaunas', recovered: 118, known: 162, bio: 'A rabbi of Kaunas (Kovno), Lithuania, whose personal library the Nazis seized. The Katz Center has recovered roughly 118 of the 162 known books from it — one of five personal libraries of which more than seventy percent survived, together, in this collection. His stamped volumes are the pink-flagged rows of the Lithuanian sheet.', dbNote: 'Kremer ownership stamps, cross-referenced against the Offenbach monthly processing lists', bookIds: [] },
};

export const TIERS: Record<TierKey, { label: string; order: number }> = {
  direct: { label: 'Direct marking', order: 0 },
  namelist: { label: 'Inferred — name match', order: 1 },
  context: { label: 'Inferred — context', order: 2 },
  possible: { label: 'Possible', order: 3 },
};
// The six sheets of the source spreadsheet, in evidence order.
export const SERIES: Record<string, string> = {
  western: 'Western European collection',
  lithuanian: 'Lithuanian / Baltic',
  inferred: 'Inferred provenance',
  'loc-exchange': 'Library of Congress exchange',
  'card-catalog': 'Card-catalog only',
  manuscripts: 'Rare manuscripts',
};

export function chip(tier: string): string {
  const base = "font:500 10px/1 'IBM Plex Mono',monospace;letter-spacing:.04em;text-transform:uppercase;padding:5px 9px;border-radius:3px;white-space:nowrap;";
  if (tier === 'direct') return base + 'background:var(--ink);color:var(--pp);';
  if (tier === 'namelist') return base + 'background:none;color:var(--ink2);border:1px solid rgba(var(--inkrgb),.45);';
  if (tier === 'context') return base + 'background:none;color:var(--mut);border:1px dashed rgba(var(--inkrgb),.4);';
  return base + 'background:none;color:var(--fn);border:1px dotted rgba(var(--inkrgb),.34);';
}
export function leftBorder(tier: string): string {
  const base = 'padding-left:14px;';
  if (tier === 'direct') return base + 'border-left:3px solid var(--ink);';
  if (tier === 'namelist') return base + 'border-left:3px solid rgba(var(--inkrgb),.4);';
  if (tier === 'context') return base + 'border-left:3px dashed rgba(var(--inkrgb),.34);';
  return base + 'border-left:3px dotted rgba(var(--inkrgb),.3);';
}
export function evRowStyle(kind: string): string {
  const base = 'padding:16px 18px;border-radius:4px;background:var(--sf);';
  if (kind === 'direct') return base + 'border:1px solid rgba(var(--inkrgb),.16);border-left:3px solid var(--ink);';
  if (kind === 'inferred') return base + 'border:1px dashed rgba(var(--inkrgb),.3);border-left:3px dashed rgba(var(--inkrgb),.4);';
  return base + 'border:1px dotted rgba(var(--inkrgb),.28);border-left:3px dotted rgba(var(--inkrgb),.34);background:var(--sf3);';
}

// Real register, ingested from the JCR/OAD markings spreadsheet: one record per
// distinct call number, deduped across the six sheets, tier and marks derived
// from the evidence columns. See scripts note in the project README.
export const RECORDS: BookRecord[] = recordsData as unknown as BookRecord[];
export const COUNTRIES: string[] = [...new Set(RECORDS.map((r) => r.country))]
  .filter((c): c is string => !!c && c !== 'Unknown')
  .sort();

export const EDITIONS = [
  { ver: 'working', date: 'in progress', note: 'Shelf read of the Katz Center collection under way; more than 2,100 titles identified so far.' },
  { ver: 'planned', date: 'on completion', note: 'First public edition and a citable DOI will follow completion of the shelf read.' },
];

// ---- anatomy ("where to look") ----
export const LOCS: AnatomyLoc[] = [
  { n: 1, name: 'Spine', where: 'outer edge of the binding', count: 47,
    marks: [{ name: 'OAD stamp', note: 'on empty bindings whose textblock is shelved elsewhere' }, { name: 'Owner stamp, remnant', note: 'partial, at head or tail' }],
    hint: 'Sometimes the only surviving trace, once a book has come apart from its cover.' },
  { n: 2, name: 'Front board', where: 'outside of the front cover', count: 63,
    marks: [{ name: 'Pre-war owner stamp', note: 'institutional — synagogue, school, community library' }, { name: 'Later Penn / Annenberg bookplate', note: 'applied directly over the older mark' }] },
  { n: 3, name: 'Inside front board', where: 'front pastedown', count: 512,
    marks: [{ name: 'JCR bookplate', note: 'Jewish Cultural Reconstruction, Inc.' }, { name: 'Johannes Pohl pastedown', note: 'handwritten Hebrew transliteration, ERR' }, { name: 'Nazi stamp', note: 'often lies beneath a later bookplate' }],
    hint: 'Look through — or under — a later bookplate. The earliest evidence is usually the layer nobody removed.' },
  { n: 4, name: 'Front flyleaf', where: 'first free leaf', count: 188,
    marks: [{ name: 'Owner inscription', note: 'a name, a dedication, a date' }, { name: 'Disinfection stamp', note: 'applied on intake' }] },
  { n: 5, name: 'Title page', where: 'recto', count: 604,
    marks: [{ name: 'OAD stamp', note: 'black, red, purple, blue or green' }, { name: 'Owner stamp', note: 'personal or institutional' }, { name: 'ERR / RSHA stamp', note: 'Nazi confiscation apparatus' }] },
  { n: 6, name: 'Title-page verso', where: 'reverse of the title page', count: 331,
    marks: [{ name: 'OAD stamp', note: 'frequently placed on the verso, not the recto' }, { name: '“desinf. Lk. Sept 45”', note: 'disinfection stamp, Offenbach' }],
    hint: 'Turn the title page over. A large share of depot stamps are on the back of it.' },
  { n: 7, name: 'Gutter behind the title page', where: 'inner margin, in the fold', count: 276,
    marks: [{ name: 'Gift-of-JCR source note', note: '“Gift of Jewish Cultural Reconstruction,” often dated' }],
    hint: 'Open the fold fully. A closed book hides the note down in the gutter.' },
  { n: 8, name: 'Table of contents', where: 'first page of contents', count: 92,
    marks: [{ name: 'Owner stamp', note: 'personal or institutional' }] },
  { n: 9, name: 'Last-page verso', where: 'reverse of the final leaf', count: 141,
    marks: [{ name: 'OAD stamp', note: 'placed at the very end' }, { name: 'Owner stamp', note: 'personal or institutional' }],
    hint: 'The last surface in the book. Almost nobody thinks to check it.' },
  { n: 10, name: 'Inside back board', where: 'rear pastedown — the lower board', count: 208,
    marks: [{ name: 'AJDC Library stamp', note: 'books lent to Displaced Persons camps' }, { name: 'Owner stamp', note: 'on the inside of the lower board' }],
    hint: 'The lower board, not the upper one — the surface a hurried survey skips.' },
  { n: 11, name: 'Behind the card pocket', where: 'under a later library pocket', count: 34,
    marks: [{ name: 'Owner stamp / OAD stamp', note: 'concealed when the pocket was pasted in' }],
    hint: 'A pocket added decades later can sit squarely on top of the evidence.' },
];

// ---- URL map (real Astro file routes) ----
export const urls = {
  home: '/',
  about: '/about/',
  gaps: '/about/gaps/',
  method: '/about/method/',
  steps: '/about/steps/',
  markings: '/markings/',
  marking: (slug: string) => `/markings/${slug}/`,
  anatomy: '/markings/anatomy/',
  cases: '/stories/',
  case: (slug: string) => `/stories/${slug}/`,
  register: '/register/',
  record: (id: string) => `/register/${id}/`,
  download: '/register/download/',
  owners: '/owners/',
  owner: (slug: string) => `/owners/${slug}/`,
  sources: '/sources/',
};
