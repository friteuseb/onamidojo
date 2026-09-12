// 6ème Camp d'automne WKB France — Amiens, 16-18 octobre 2026
// Source : public/documents/camp-automne-wkb-amiens-2026.pdf

export const CAMP = {
  path: '/camp-automne-kyokushin-2026',
  title: 'Camp d\'automne WKB France',
  edition: '6ème édition',
  dates: '16, 17 et 18 octobre 2026',
  startDate: '2026-10-16T20:00:00+02:00',
  endDate: '2026-10-18T11:00:00+02:00',
  poster: '/images/camp-automne-2026/affiche-camp-automne-wkb-amiens-2026.jpg',
  photo: '/images/camp-automne-2026/kancho-pedro-roiz-sensei-xavier-gadoux.jpg',
  pdf: '/documents/camp-automne-wkb-amiens-2026.pdf',
  email: 'wkbfrance@gmail.com',
  phone: '07 66 22 27 45',
  phoneLink: '0766222745',
};

export const CAMP_FORMULES: Record<string, { title: string; label: string; price: number }> = {
  '3-jours': { title: '3 jours', label: '3 jours (16, 17 et 18 octobre)', price: 90 },
  '1-jour': { title: '1 jour', label: '1 jour', price: 65 },
};

export const CAMP_DAYS = ['Vendredi 16 octobre', 'Samedi 17 octobre', 'Dimanche 18 octobre'];

export function isCampUpcoming(now = new Date()) {
  return now < new Date(CAMP.endDate);
}
