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
    // --- Hero Section ---
    {
      name: 'hero',
      type: 'group',
      label: 'Section Hero',
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'Badge (texte du bandeau)',
          defaultValue: 'Inscriptions ouvertes 2025-2026',
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
        },
        {
          name: 'ctaPrimary',
          type: 'text',
          label: 'Bouton principal',
          defaultValue: 'Découvrir nos cours',
        },
        {
          name: 'ctaSecondary',
          type: 'text',
          label: 'Bouton secondaire',
          defaultValue: 'Essai gratuit',
        },
      ],
    },

    // --- Disciplines Section ---
    {
      name: 'disciplines',
      type: 'group',
      label: 'Section Disciplines',
      fields: [
        {
          name: 'kempo',
          type: 'group',
          label: 'Kempo Karaté',
          fields: [
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
              defaultValue: 'Combat Libre Japonais',
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
            },
          ],
        },
        {
          name: 'kyokushin',
          type: 'group',
          label: 'Kyokushinkai',
          fields: [
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
              defaultValue: 'Full Contact Traditionnel',
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
            },
          ],
        },
      ],
    },

    // --- Features Section ("Pourquoi choisir") ---
    {
      name: 'whyChooseUs',
      type: 'group',
      label: 'Section "Pourquoi choisir Onami Dojo ?"',
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
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icône',
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

    // --- Contact Section ---
    {
      name: 'contact',
      type: 'group',
      label: 'Section Contact',
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
        },
        {
          name: 'trialDescription',
          type: 'text',
          label: 'Description essai',
          defaultValue: 'Venez découvrir nos disciplines sans engagement. Prévoyez une tenue de sport et de l\'eau.',
        },
      ],
    },

    // --- Schedule Note ---
    {
      name: 'scheduleNote',
      type: 'textarea',
      label: 'Note planning',
      defaultValue: 'Les cours du samedi sont sur autorisation selon l\'assiduité et le niveau. Reprise des cours : 16 septembre 2025.',
      admin: {
        description: 'Note affichée sous le planning des cours',
      },
    },

    // --- Schedule (Planning des cours) ---
    {
      name: 'schedule',
      type: 'array',
      label: 'Planning des cours',
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
          fields: [
            {
              name: 'time',
              type: 'text',
              label: 'Horaire',
              required: true,
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
              options: [
                { label: 'Rouge', value: 'red' },
                { label: 'Ardoise', value: 'slate' },
                { label: 'Violet', value: 'purple' },
                { label: 'Bleu', value: 'blue' },
                { label: 'Orange', value: 'orange' },
                { label: 'Indigo', value: 'indigo' },
              ],
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
          courses: [
            { time: '19h00 - 20h15', name: 'Prépa Physique Kumite', location: '24 rue des Cordeliers', color: 'orange' },
          ],
        },
        {
          day: 'Dimanche',
          courses: [
            { time: '10h00 - 11h30', name: 'Kempo Enfants & Ados', location: '24 rue des Cordeliers', color: 'indigo' },
          ],
        },
      ],
    },

    // --- Dojo Info ---
    {
      name: 'dojo',
      type: 'group',
      label: 'Informations Dojo',
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
        },
        {
          name: 'phoneLink',
          type: 'text',
          label: 'Lien téléphone',
          defaultValue: '0766222745',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email',
          defaultValue: 'onamidojo@yahoo.com',
        },
      ],
    },

    // --- Documents ---
    {
      name: 'documents',
      type: 'array',
      label: 'Documents téléchargeables',
      maxRows: 8,
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
        },
        {
          name: 'file',
          type: 'text',
          label: 'Chemin du fichier',
          required: true,
          admin: {
            description: 'Ex: /documents/licence-ffk-2025-2026.pdf',
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
}
