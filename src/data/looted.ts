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
  { slug: 'oad', name: 'OAD stamp', body: 'Offenbach Archival Depot', where: 'Title page, its verso, and the last-page verso', count: 1180, hue: 270,
    desc: 'The stamp applied at the Offenbach depot, where looted books were gathered for sorting after the war. It appears in black, red, purple, blue and green — the colour often distinguishing one processing batch from another.',
    obscured: 'under a Penn bookplate', note: 'The single most common marking, and the one most often on the verso rather than the recto — half are on the back of the title page.',
    bodyFull: 'Offenbach Archival Depot, U.S. Military Government (1946–49)', bencowitz: 'Bencowitz (1946), plate group I' },
  { slug: 'jcr', name: 'JCR bookplate', body: 'Jewish Cultural Reconstruction', where: 'Front pastedown', count: 512, hue: 150,
    desc: 'The bookplate of Jewish Cultural Reconstruction, Inc., the body that distributed heirless Jewish cultural property after the war. Its presence marks the route by which a book reached Penn.',
    obscured: 'beneath a later Annenberg plate', note: 'Frequently pasted over an older owner’s bookplate — the earlier layer is still there underneath.',
    bodyFull: 'Jewish Cultural Reconstruction, Inc. (1947–52)', bencowitz: '—' },
  { slug: 'gift', name: 'Gutter source note', body: '“Gift of JCR”', where: 'Gutter behind the title page', count: 276, hue: 150,
    desc: 'A pencilled or stamped note, “Gift of Jewish Cultural Reconstruction,” usually with a date. It sits down in the fold, where a closed book hides it.',
    obscured: 'in deep gutter shadow', note: 'Easy to miss entirely unless the book is opened flat and the gutter examined.',
    bodyFull: 'Penn Libraries accessioning, via JCR', bencowitz: '—' },
  { slug: 'err', name: 'ERR stamp', body: 'Einsatzstab Reichsleiter Rosenberg', where: 'Title page and front pastedown', count: 61, hue: 20,
    desc: 'The mark of the Nazi task force that systematically looted Jewish libraries. Over a dozen sub-variants exist; the eagle-and-code forms are the most recognisable.',
    obscured: 'ink-cancelled after the war', note: 'One of more than a dozen distinct Nazi confiscation stamps recorded in these books.',
    bodyFull: 'Einsatzstab Reichsleiter Rosenberg (ERR)', bencowitz: 'Bencowitz (1946), plate group III' },
  { slug: 'pohl', name: 'Johannes Pohl pastedown', body: 'ERR (Pohl)', where: 'Inside the upper board', count: 18, hue: 20,
    desc: 'A pastedown, usually inside the upper board, carrying a handwritten transliteration of the title, author and publication details in the hand of Johannes Pohl — special assistant to Alfred Rosenberg at the ERR. Often only a torn fragment of it survives.',
    obscured: 'torn out, or a surviving fragment', note: 'Pohl, a Catholic priest turned NSDAP Hebraist, ran the January 1942 looting of the Vilnius libraries: he shipped the most valuable books to the planned Nazi museum in Frankfurt and sold the rest to a paper mill.',
    bodyFull: 'Johannes Pohl, for the Einsatzstab Reichsleiter Rosenberg', bencowitz: '—' },
  { slug: 'disinf', name: 'Disinfection stamp', body: 'Offenbach intake', where: 'Flyleaf and title-page verso', count: 143, hue: 200,
    desc: '“desinf. Lk. Sept 45” and similar — applied when books were fumigated on intake at the depot. A small, bureaucratic mark that reliably dates the book’s passage through Offenbach.',
    obscured: 'overstamped', note: 'Not a provenance mark in itself, but a firm tie to the Offenbach timeline.',
    bodyFull: 'Offenbach Archival Depot, intake', bencowitz: '—' },
  { slug: 'ajdc', name: 'AJDC Library stamp', body: 'the “Joint”', where: 'Inside back board (lower) / rear cover', count: 208, hue: 210,
    desc: 'The stamp “A.J.D.C. LIBRARY — NOT TO BE REMOVED FROM THE PREMISES,” applied to some of the roughly twenty thousand books the American Jewish Joint Distribution Committee borrowed from Offenbach for use in the Displaced Persons camps of the American Zone.',
    obscured: 'on the lower board', note: 'With OAD, JCR or Nazi evidence it confirms looting; on its own it is ambiguous, since some DP-camp books were donated by other Jewish organisations rather than routed through Offenbach.',
    bodyFull: 'American Jewish Joint Distribution Committee', bencowitz: '—' },
  { slug: 'owner', name: 'Pre-war owner stamps', body: 'personal & institutional', where: 'Throughout — title page, boards, flyleaf', count: 690, hue: 40,
    desc: 'The stamps and bookplates of the people and institutions who owned these books before they were taken — synagogues, schools, community libraries, and private collectors.',
    obscured: 'under a later bookplate', note: 'The mark that can name an owner, and the one most often deliberately covered over.',
    bodyFull: 'Various pre-war owners', bencowitz: 'partly in Bencowitz (1946), vol. II' },
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
    recordId: '04821', recordLabel: 'Sefer Nedarim (no. 04821)' },
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
  { slug: '5549-2391', title: '2,100 against 2,391–5,549', blurb: 'Why the number found sits so far below the only figure ever stated for how many books were sent.',
    lede: 'The range on the homepage is a single stated estimate that was never confirmed — not a count we have reconciled.',
    sections: ['The identification has reached more than 2,100 titles. The figure of 2,391–5,549 is the estimated total sent to Dropsie — stated, but never confirmed, and spanning a range of more than three thousand volumes on its own.', 'We publish the found number against the estimate rather than choosing one, and hold the distance open on the Gaps page. The shelf read is not finished; the gap is part of the record, not a footnote to it.'],
    recordId: null, recordLabel: 'see the Gaps page' },
];

export const SOURCES: Source[] = [
  { name: 'Yad Vashem — Names Database', type: 'victims', region: 'international', question: 'Who owned this book?' },
  { name: 'USHMM Resource Center', type: 'victims', region: 'international', question: 'Who owned this book?' },
  { name: 'OAD monthly reports (NARA)', type: 'shipping', region: 'Germany / U.S.', question: 'Was it sent here, and when?' },
  { name: 'Freidus card catalog (Dropsie)', type: 'bibliographic', region: 'Philadelphia', question: 'Was it ours before the war?' },
  { name: 'Bencowitz, Stamps (1946)', type: 'reference', region: 'Germany', question: 'What stamp is this?' },
  { name: 'JDC Archives', type: 'displaced persons', region: 'Europe', question: 'Where did it travel after?' },
];
export const SOURCE_CATS = ['all', 'victims', 'shipping', 'bibliographic', 'reference'];

export const OWNERS: Record<string, Owner> = {
  'rabbiner-seminar': { slug: 'rabbiner-seminar', name: 'Rabbiner-Seminar zu Frankfurt a. M.', bio: 'The Orthodox rabbinical seminary founded in Frankfurt in 1873. Its library, one of the finest of its kind, was seized by the ERR after the seminary was forced to close in 1938.', dbNote: 'Institutional record, Yad Vashem — collections seized 1938–41', bookIds: ['04821'] },
  'mendel-cohn': { slug: 'mendel-cohn', name: 'Mendel Cohn', bio: 'A private collector in Vienna. His name appears, stamped, on the title page of at least one volume now at Penn. He was deported in 1942; the database record confirms the date and does not record a return.', dbNote: 'Central Database of Shoah Victims’ Names — deported 1942', bookIds: ['07733'] },
  'mordecai-kremer': { slug: 'mordecai-kremer', name: 'Rabbi Mordecai Kremer (Kaunas)', bio: 'A rabbi of Kaunas (Kovno), Lithuania, whose personal library the Nazis seized. Penn holds roughly 118 of the 162 known books from it — one of five cases where more than seventy percent of an identified personal library survived, together, in this collection. His stamped volumes are marked out on the Lithuanian sheet of the register.', dbNote: 'Kremer ownership stamps, cross-referenced against the Offenbach monthly processing lists', bookIds: [] },
};

export const TIERS: Record<TierKey, { label: string; order: number }> = {
  direct: { label: 'Direct marking', order: 0 },
  namelist: { label: 'Inferred — name match', order: 1 },
  context: { label: 'Inferred — context', order: 2 },
  possible: { label: 'Possible', order: 3 },
};
export const SERIES: Record<string, string> = { dropsie: 'Dropsie / JCR', kaplan: 'Kaplan — Cape Town', other: 'Other acquisitions' };

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

// ---- featured records (full evidence) ----
export const FEATURED: Record<string, BookRecord> = {
  '04821': { id: '04821', title: 'ספר נדרים עם פירוש · Sefer Nedarim, with commentary',
    bib: 'Frankfurt am Main, 1720 · folio · Dropsie / JCR series',
    tier: 'direct', series: 'dropsie', country: 'Germany', city: 'Frankfurt', inCatalog: true, ownerSlug: 'rabbiner-seminar', owner: 'Rabbiner-Seminar zu Frankfurt a. M.',
    marks: ['oad', 'jcr', 'gift', 'owner'], catalog: 'Franklin b7291140',
    tierWhy: 'Three independent markings place this volume at the Offenbach depot and name its pre-war institutional owner. The evidence is physical and mutually corroborating.',
    evidence: [
      { what: 'OAD stamp', whatSlug: 'oad', where: 'Title-page verso', says: 'OFFENBACH ARCHIVAL DEPOT', says2: 'in purple', source: 'OAD monthly report, Nov 1948 (NARA)', kind: 'direct' },
      { what: 'JCR bookplate', whatSlug: 'jcr', where: 'Inside front board', says: 'Jewish Cultural Reconstruction, Inc.', source: 'JCR distribution list, 1949', kind: 'direct' },
      { what: 'Owner stamp', whatSlug: 'owner', where: 'Title page', says: 'Bibliothek d. Rabbiner-Seminars, Frankfurt a. M.', source: 'Yad Vashem — institutional collection record', kind: 'direct' },
    ] },
  '05930': { id: '05930', title: 'Homiletical commentary — title page wanting',
    bib: 'Place and date unknown · Dropsie / JCR series (attributed)',
    tier: 'possible', series: 'dropsie', country: 'Unknown', city: '—', inCatalog: false, ownerSlug: null, owner: null,
    marks: [], catalog: 'not in Franklin',
    tierWhy: 'The only trace is a pencilled note on a catalog card. No marking survives in the book itself — and the title page, where one would expect a stamp, is gone. We record it so the possibility is visible rather than lost. This is a thin case, and we show it as thin.',
    evidence: [
      { what: 'Card-catalog annotation', whatSlug: null, where: '—', says: 'ex JCR? — check Offenbach', source: 'Freidus card catalog, Dropsie College', kind: 'possible' },
    ] },
  '07733': { id: '07733', title: 'Siddur — daily prayer book',
    bib: 'Vienna, 1911 · Dropsie / JCR series',
    tier: 'namelist', series: 'dropsie', country: 'Austria', city: 'Vienna', inCatalog: true, ownerSlug: 'mendel-cohn', owner: 'Mendel Cohn',
    marks: ['owner', 'disinf'], catalog: 'Franklin b5510092',
    tierWhy: 'An owner stamp names a private individual; the name matches a single record in the Shoah victims’ database with a consistent place and date. No depot stamp survives, so the Offenbach passage is inferred from the disinfection mark alone.',
    evidence: [
      { what: 'Owner stamp', whatSlug: 'owner', where: 'Front flyleaf', says: 'M. Cohn, Wien II.', source: 'Yad Vashem — Central Database of Shoah Victims’ Names', kind: 'inferred' },
      { what: 'Disinfection stamp', whatSlug: 'disinf', where: 'Title-page verso', says: 'desinf. Lk. Sept 45', source: 'OAD intake procedure (contextual)', kind: 'inferred' },
    ] },
};

const CITIES: [string, string][] = [['Frankfurt', 'Germany'], ['Vienna', 'Austria'], ['Berlin', 'Germany'], ['Vilna', 'Lithuania'], ['Warsaw', 'Poland'], ['Amsterdam', 'Netherlands'], ['Prague', 'Czechoslovakia'], ['Kraków', 'Poland']];
const TITLES = ['Talmud Bavli, tractate', 'Mishnah with commentary', 'Shulḥan Arukh', 'Responsa collection', 'Biblical commentary', 'Prayer book (Siddur)', 'Passover Haggadah', 'Grammar of the Hebrew tongue', 'Sermons and homilies', 'History of the Jews', 'Philosophical treatise', 'Kabbalistic miscellany'];

function buildRecords(): BookRecord[] {
  const recs: BookRecord[] = [FEATURED['04821'], FEATURED['07733']];
  const plan: [TierKey, number][] = [['direct', 12], ['namelist', 9], ['context', 7], ['possible', 5]];
  let seed = 42;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const pick = <T,>(a: T[]): T => a[Math.floor(rnd() * a.length)];
  let id = 4400;
  plan.forEach(([tier, n]) => {
    for (let i = 0; i < n; i++) {
      id += Math.floor(rnd() * 180) + 40;
      const [city, country] = pick(CITIES);
      const yr = 1680 + Math.floor(rnd() * 250);
      const series = rnd() < 0.72 ? 'dropsie' : (rnd() < 0.6 ? 'kaplan' : 'other');
      let marks: string[];
      if (tier === 'direct') marks = [pick(['oad', 'jcr', 'err']), 'owner'];
      else if (tier === 'namelist') marks = ['owner', pick(['disinf', 'ajdc'])];
      else if (tier === 'context') marks = [pick(['disinf', 'gift'])];
      else marks = [];
      const hasOwner = tier === 'direct' || tier === 'namelist' || rnd() < 0.2;
      recs.push({
        id: String(id), title: pick(TITLES), bib: city + ', ' + yr + ' · ' + SERIES[series],
        tier, series, country, city, inCatalog: tier !== 'possible' ? true : rnd() < 0.3,
        ownerSlug: null, owner: hasOwner ? 'recorded, not yet linked' : null, marks, catalog: 'Franklin b' + (5000000 + Math.floor(rnd() * 900000)),
        tierWhy: ({ direct: 'A physical marking ties this volume to the looting route.', namelist: 'An owner name matches a victims-database record; the depot passage is inferred.', context: 'No marking names an owner; documentary context places the volume among looted material.', possible: 'A faint or ambiguous trace only. Recorded so the possibility is not lost.' } as Record<TierKey, string>)[tier],
        evidence: [{ what: marks.length ? MARK_NAMES[marks[0]] : 'Catalog note', whatSlug: marks.length ? marks[0] : null, where: tier === 'possible' ? '—' : 'Title page', says: tier === 'possible' ? 'ex JCR?' : '—', source: tier === 'direct' ? 'OAD monthly report (NARA)' : (tier === 'namelist' ? 'Yad Vashem — Names Database' : 'OAD shipping records'), kind: tier === 'direct' ? 'direct' : (tier === 'possible' ? 'possible' : 'inferred') }],
      });
    }
  });
  recs.push(FEATURED['05930']);
  return recs;
}

export const RECORDS: BookRecord[] = buildRecords();
export const COUNTRIES: string[] = [...new Set(RECORDS.map((r) => r.country))].filter((c) => c !== 'Unknown');

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
  claims: '/about/claims/',
  method: '/about/method/',
  steps: '/about/steps/',
  markings: '/markings/',
  marking: (slug: string) => `/markings/${slug}/`,
  anatomy: '/markings/anatomy/',
  cases: '/cases/',
  case: (slug: string) => `/cases/${slug}/`,
  register: '/register/',
  record: (id: string) => `/register/${id}/`,
  download: '/register/download/',
  owners: '/owners/',
  owner: (slug: string) => `/owners/${slug}/`,
  sources: '/sources/',
};
