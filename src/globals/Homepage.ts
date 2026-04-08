import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '@/access/roles'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Page d\'accueil',
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ─── Tab Hero ───
        {
          label: 'Hero',
          description: 'Configurez le bandeau principal affiché en haut de la page d\'accueil',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Section Hero',
              admin: {
                description: 'Textes et boutons visibles dès l\'arrivée sur le site',
              },
              fields: [
                {
                  name: 'badge',
                  type: 'text',
                  label: 'Badge (texte du bandeau)',
                  defaultValue: 'Inscriptions ouvertes 2025-2026',
                  admin: {
                    description: 'Petit texte mis en avant au-dessus du titre (ex: annonce de rentrée)',
                  },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Sous-titre',
                  defaultValue: 'L\'Art du Karaté Traditionnel à Amiens',
                },
                {
                  name: 'baseline',
                  type: 'textarea',
                  label: 'Baseline',
                  defaultValue: 'Découvrez la puissance du Kyokushin et la polyvalence du Kempo dans un environnement dédié à l\'excellence, au respect et au dépassement de soi.',
                  admin: {
                    description: 'Texte de présentation affiché sous le sous-titre',
                  },
                },
                {
                  name: 'ctaPrimary',
                  type: 'text',
                  label: 'Bouton principal',
                  defaultValue: 'Découvrir nos cours',
                  admin: {
                    description: 'Libellé du bouton d\'action principal',
                  },
                },
                {
                  name: 'ctaSecondary',
                  type: 'text',
                  label: 'Bouton secondaire',
                  defaultValue: 'Essai gratuit',
                  admin: {
                    description: 'Libellé du bouton d\'action secondaire',
                  },
                },
              ],
            },
          ],
        },

        // ─── Tab Disciplines ───
        {
          label: 'Disciplines',
          description: 'Présentez les deux disciplines enseignées au dojo : Kempo et Kyokushin',
          fields: [
            {
              name: 'disciplines',
              type: 'group',
              label: 'Section Disciplines',
              admin: {
                description: 'Chaque discipline possède sa tagline, sa description, ses points forts et son public cible',
              },
              fields: [
                {
                  name: 'kempo',
                  type: 'group',
                  label: 'Kempo Karaté',
                  admin: {
                    description: 'Carte de présentation du Kempo Karaté sur la page d\'accueil',
                  },
                  fields: [
                    {
                      name: 'tagline',
                      type: 'text',
                      label: 'Tagline',
                      defaultValue: 'Combat Libre Japonais',
                      admin: {
                        description: 'Courte accroche affichée en haut de la carte',
                      },
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Description',
                      defaultValue: 'Une approche moderne et complète intégrant frappes, projections et travail au sol. Le Kempo à l\'Onami Dojo privilégie l\'efficacité en combat réel tout en conservant l\'esprit martial japonais.',
                    },
                    {
                      name: 'features',
                      type: 'array',
                      label: 'Points forts',
                      admin: {
                        description: 'Liste à puces affichée sur la carte de la discipline',
                      },
                      fields: [{ name: 'label', type: 'text', required: true }],
                      defaultValue: [
                        { label: 'Système polyvalent pieds-poings' },
                        { label: 'Self-défense réaliste' },
                        { label: 'Combat libre (Kumite)' },
                        { label: 'Technique et polyvalence' },
                      ],
                    },
                    {
                      name: 'audience',
                      type: 'text',
                      label: 'Public',
                      defaultValue: 'Enfants, Ados, Adultes',
                      admin: {
                        description: 'Tranches d\'âge concernées, affichées en bas de la carte',
                      },
                    },
                  ],
                },
                {
                  name: 'kyokushin',
                  type: 'group',
                  label: 'Kyokushinkai',
                  admin: {
                    description: 'Carte de présentation du Kyokushinkai sur la page d\'accueil',
                  },
                  fields: [
                    {
                      name: 'tagline',
                      type: 'text',
                      label: 'Tagline',
                      defaultValue: 'Full Contact Traditionnel',
                      admin: {
                        description: 'Courte accroche affichée en haut de la carte',
                      },
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Description',
                      defaultValue: 'L\'école de l\'ultime vérité. Un style à frappes réelles, réputé pour sa rigueur physique. Forgez un corps de fer et un mental d\'acier à travers la tradition de Sosai Mas Oyama.',
                    },
                    {
                      name: 'features',
                      type: 'array',
                      label: 'Points forts',
                      admin: {
                        description: 'Liste à puces affichée sur la carte de la discipline',
                      },
                      fields: [{ name: 'label', type: 'text', required: true }],
                      defaultValue: [
                        { label: 'Conditionnement physique intensif' },
                        { label: 'Technique traditionnelle (Kihon)' },
                        { label: 'Katas et Bunkai' },
                        { label: 'Kumite plein contact' },
                      ],
                    },
                    {
                      name: 'audience',
                      type: 'text',
                      label: 'Public',
                      defaultValue: 'Ados & Adultes',
                      admin: {
                        description: 'Tranches d\'âge concernées, affichées en bas de la carte',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ─── Tab Avantages ───
        {
          label: 'Avantages',
          description: 'Section « Pourquoi choisir Onami Dojo ? » avec les points forts du club',
          fields: [
            {
              name: 'whyChooseUs',
              type: 'group',
              label: 'Section "Pourquoi choisir Onami Dojo ?"',
              admin: {
                description: 'Titre, sous-titre et liste des avantages mis en avant sur la page d\'accueil',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Titre',
                  defaultValue: 'Pourquoi choisir Onami Dojo ?',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Sous-titre',
                  defaultValue: 'Plus qu\'un simple club de sport, un centre de formation humaine et martiale au cœur d\'Amiens.',
                },
                {
                  name: 'features',
                  type: 'array',
                  label: 'Avantages',
                  maxRows: 6,
                  admin: {
                    description: 'Jusqu\'à 6 avantages affichés sous forme de cartes avec icône, titre et description',
                  },
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      label: 'Icône',
                      admin: {
                        description: 'Icône affichée à gauche de l\'avantage',
                      },
                      options: [
                        { label: 'Trophée', value: 'award' },
                        { label: 'Personnes', value: 'users' },
                        { label: 'Flamme', value: 'flame' },
                        { label: 'Bouclier', value: 'shield' },
                        { label: 'Localisation', value: 'mappin' },
                      ],
                    },
                    { name: 'title', type: 'text', label: 'Titre', required: true },
                    { name: 'description', type: 'textarea', label: 'Description', required: true },
                  ],
                },
              ],
            },
          ],
        },

        // ─── Tab Planning ───
        {
          label: 'Planning',
          description: 'Planning hebdomadaire des cours. Chaque jour peut contenir plusieurs créneaux.',
          fields: [
            {
              name: 'schedule',
              type: 'array',
              label: 'Planning des cours',
              admin: {
                description: 'Ajoutez un élément par jour de la semaine, puis définissez les créneaux de cours pour chaque jour',
              },
              fields: [
                {
                  name: 'day',
                  type: 'text',
                  label: 'Jour',
                  required: true,
                },
                {
                  name: 'courses',
                  type: 'array',
                  label: 'Cours',
                  admin: {
                    description: 'Liste des créneaux de cours pour cette journée',
                  },
                  fields: [
                    {
                      name: 'time',
                      type: 'text',
                      label: 'Horaire',
                      required: true,
                      admin: {
                        description: 'Format libre (ex: 19h30 - 21h00)',
                      },
                    },
                    {
                      name: 'name',
                      type: 'text',
                      label: 'Nom du cours',
                      required: true,
                    },
                    {
                      name: 'location',
                      type: 'text',
                      label: 'Lieu',
                      defaultValue: '24 rue des Cordeliers',
                    },
                    {
                      name: 'color',
                      type: 'select',
                      label: 'Couleur',
                      admin: {
                        description: 'Couleur de la bordure du créneau dans le planning',
                      },
                      options: [
                        { label: 'Rouge', value: 'red' },
                        { label: 'Ardoise', value: 'slate' },
                        { label: 'Violet', value: 'purple' },
                        { label: 'Bleu', value: 'blue' },
                        { label: 'Orange', value: 'orange' },
                        { label: 'Indigo', value: 'indigo' },
                      ],
                    },
                    {
                      name: 'disabled',
                      type: 'checkbox',
                      label: 'Grisé (à venir)',
                      defaultValue: false,
                      admin: {
                        description: 'Affiche le créneau en grisé pour indiquer qu\'il n\'est pas encore actif',
                      },
                    },
                  ],
                },
              ],
              defaultValue: [
                {
                  day: 'Lundi',
                  courses: [
                    { time: '19h30 - 21h00', name: 'Kempo Adultes & Ados', location: '24 rue des Cordeliers', color: 'red' },
                  ],
                },
                {
                  day: 'Mardi',
                  courses: [
                    { time: '19h00 - 20h30', name: 'Kyokushin Adultes & Ados', location: '24 rue des Cordeliers', color: 'slate' },
                  ],
                },
                {
                  day: 'Mercredi',
                  courses: [
                    { time: '16h45 - 18h15', name: 'Kempo Enfants - Groupe 1 (petits)', location: '24 rue des Cordeliers', color: 'purple' },
                    { time: '18h30 - 20h00', name: 'Kempo Enfants - Groupe 2 (grands & gradés)', location: '24 rue des Cordeliers', color: 'blue' },
                  ],
                },
                {
                  day: 'Jeudi',
                  courses: [
                    { time: '20h30 - 22h00', name: 'Kempo Adultes & Ados', location: '24 rue des Cordeliers', color: 'red' },
                  ],
                },
                {
                  day: 'Vendredi',
                  courses: [
                    { time: '19h00 - 20h30', name: 'Kyokushin Adultes & Ados', location: '24 rue des Cordeliers', color: 'slate' },
                  ],
                },
                {
                  day: 'Samedi',
                  courses: [],
                },
                {
                  day: 'Dimanche',
                  courses: [
                    { time: '10h00 - 11h30', name: 'Kempo Enfants & Ados', location: '24 rue des Cordeliers', color: 'indigo' },
                  ],
                },
              ],
            },
            {
              name: 'scheduleNote',
              type: 'textarea',
              label: 'Note planning',
              defaultValue: 'Les cours du samedi sont sur autorisation selon l\'assiduité et le niveau. Reprise des cours : 16 septembre 2025.',
              admin: {
                description: 'Note affichée sous le planning des cours (informations complémentaires, dates de reprise, etc.)',
              },
            },
          ],
        },

        // ─── Tab Dojo ───
        {
          label: 'Dojo',
          description: 'Coordonnées du dojo affichées dans la section localisation et le pied de page',
          fields: [
            {
              name: 'dojo',
              type: 'group',
              label: 'Informations Dojo',
              admin: {
                description: 'Adresse, téléphone et email utilisés sur le site et dans le pied de page',
              },
              fields: [
                {
                  name: 'address',
                  type: 'text',
                  label: 'Adresse',
                  defaultValue: '24 rue des Cordeliers',
                },
                {
                  name: 'city',
                  type: 'text',
                  label: 'Ville',
                  defaultValue: '80000 Amiens',
                },
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Téléphone',
                  defaultValue: '07 66 22 27 45',
                  admin: {
                    description: 'Numéro affiché sur le site (format lisible)',
                  },
                },
                {
                  name: 'phoneLink',
                  type: 'text',
                  label: 'Lien téléphone',
                  defaultValue: '0766222745',
                  admin: {
                    description: 'Numéro utilisé dans le lien tel: (sans espaces)',
                  },
                },
                {
                  name: 'email',
                  type: 'text',
                  label: 'Email',
                  defaultValue: 'onamidojo@yahoo.com',
                },
              ],
            },
          ],
        },

        // ─── Tab Documents ───
        {
          label: 'Documents',
          description: 'Documents PDF téléchargeables affichés sous le planning (licences, inscriptions, etc.)',
          fields: [
            {
              name: 'documents',
              type: 'array',
              label: 'Documents téléchargeables',
              maxRows: 8,
              admin: {
                description: 'Jusqu\'à 8 documents PDF proposés au téléchargement sur la page d\'accueil',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Titre',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  label: 'Description',
                  admin: {
                    description: 'Courte description affichée sous le titre du document',
                  },
                },
                {
                  name: 'file',
                  type: 'text',
                  label: 'Chemin du fichier',
                  required: true,
                  admin: {
                    description: 'Chemin relatif du fichier PDF (ex: /documents/mon-fichier.pdf)',
                  },
                },
              ],
              defaultValue: [
                { title: 'Licence FFK', description: 'Demande de licence 2025/2026', file: '/documents/licence-ffk-2025-2026.pdf' },
                { title: 'Inscription Onami', description: 'Formulaire d\'inscription club', file: '/documents/inscription-onami-2025-2026.pdf' },
                { title: 'Équipements', description: 'Catalogue protections & dogis', file: '/documents/equipements-protection-onami.pdf' },
                { title: 'Broderies', description: 'Personnalisations & broderies', file: '/documents/personnalisations-broderies-onami.pdf' },
              ],
            },
          ],
        },

        // ─── Tab Contact ───
        {
          label: 'Contact',
          description: 'Section d\'appel à l\'action et informations sur les cours d\'essai',
          fields: [
            {
              name: 'contact',
              type: 'group',
              label: 'Section Contact',
              admin: {
                description: 'Textes affichés dans la section contact / appel à l\'action en bas de la page d\'accueil',
              },
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  label: 'Titre principal',
                  defaultValue: 'Commencez votre parcours martial dès aujourd\'hui.',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  defaultValue: 'Le karaté est une quête de vie. Que vous cherchiez la forme physique, la self-défense ou une discipline mentale, l\'Onami Dojo vous accompagne à chaque étape.',
                },
                {
                  name: 'trialText',
                  type: 'text',
                  label: 'Texte essai gratuit',
                  defaultValue: '2 cours d\'essai gratuits !',
                  admin: {
                    description: 'Titre de l\'encart « essai gratuit »',
                  },
                },
                {
                  name: 'trialDescription',
                  type: 'text',
                  label: 'Description essai',
                  defaultValue: 'Venez découvrir nos disciplines sans engagement. Prévoyez une tenue de sport et de l\'eau.',
                  admin: {
                    description: 'Texte explicatif sous le titre de l\'essai gratuit',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
