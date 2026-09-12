'use client';

import { useState, FormEvent } from 'react';
import { CAMP_DAYS, CAMP_FORMULES } from '@/data/camp-automne-2026';

const inputClass =
  'w-full bg-slate-50 border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-red-700 focus:border-transparent transition-all outline-none';
const labelClass = 'text-[11px] font-bold uppercase tracking-widest text-slate-600';

export default function CampRegistrationForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formule, setFormule] = useState('3-jours');
  const [participants, setParticipants] = useState(1);

  const total = (Number.isInteger(participants) && participants > 0 ? participants : 0) * CAMP_FORMULES[formule].price;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      club: formData.get('club') as string,
      grade: formData.get('grade') as string,
      formule: formData.get('formule') as string,
      day: (formData.get('day') as string) || '',
      participants: Number(formData.get('participants')),
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/camp-inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setFormule('3-jours');
        setParticipants(1);
      } else {
        const result = await response.json();
        setErrorMessage(result.error || 'Une erreur est survenue.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Impossible de contacter le serveur. Veuillez réessayer.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12" role="status" aria-live="polite">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-serif font-bold text-indigo-950 mb-2">Pré-inscription envoyée&nbsp;!</h3>
        <p className="text-slate-600 max-w-md mx-auto">
          WKB France vous recontacte rapidement pour confirmer votre place et vous transmettre les
          modalités de paiement. La place est réservée à réception du règlement.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-red-700 font-medium hover:underline cursor-pointer"
        >
          Inscrire une autre personne
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="camp-firstName" className={labelClass}>Prénom</label>
          <input id="camp-firstName" name="firstName" type="text" required autoComplete="given-name" className={inputClass} placeholder="Votre prénom" />
        </div>
        <div className="space-y-1">
          <label htmlFor="camp-lastName" className={labelClass}>Nom</label>
          <input id="camp-lastName" name="lastName" type="text" required autoComplete="family-name" className={inputClass} placeholder="Votre nom" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="camp-email" className={labelClass}>Email</label>
          <input id="camp-email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="votre@email.com" />
        </div>
        <div className="space-y-1">
          <label htmlFor="camp-phone" className={labelClass}>Téléphone</label>
          <input id="camp-phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} placeholder="06 XX XX XX XX" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="camp-club" className={labelClass}>Dojo / club</label>
          <input id="camp-club" name="club" type="text" required className={inputClass} placeholder="Ex. Onami Dojo Amiens" />
        </div>
        <div className="space-y-1">
          <label htmlFor="camp-grade" className={labelClass}>Grade (optionnel)</label>
          <input id="camp-grade" name="grade" type="text" className={inputClass} placeholder="Ex. 4ème kyu, 1er dan" />
        </div>
      </div>

      <fieldset className="space-y-2">
        <legend className={labelClass}>Formule</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {Object.entries(CAMP_FORMULES).map(([value, f]) => (
            <label
              key={value}
              className={`flex items-center justify-between gap-3 border px-4 py-3 cursor-pointer transition-colors ${
                formule === value ? 'border-red-700 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="formule"
                  value={value}
                  checked={formule === value}
                  onChange={() => setFormule(value)}
                  className="accent-red-700"
                />
                <span className="font-bold text-slate-900">{f.title}</span>
              </span>
              <span className="font-serif font-bold text-slate-900">{f.price}&nbsp;€</span>
            </label>
          ))}
        </div>
      </fieldset>

      {formule === '1-jour' && (
        <div className="space-y-1">
          <label htmlFor="camp-day" className={labelClass}>Jour de participation</label>
          <select id="camp-day" name="day" required defaultValue="" className={`${inputClass} appearance-none cursor-pointer`}>
            <option value="" disabled>Choisir un jour</option>
            {CAMP_DAYS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="camp-participants" className={labelClass}>Nombre de participants</label>
        <input
          id="camp-participants"
          name="participants"
          type="number"
          min={1}
          max={50}
          required
          value={Number.isNaN(participants) ? '' : participants}
          onChange={(e) => setParticipants(e.target.valueAsNumber)}
          className={inputClass}
        />
        <p className="text-xs text-slate-500">
          Inscription groupée par dojo&nbsp;: indiquez le nombre total et listez les participants ci-dessous.
        </p>
      </div>

      <div className="space-y-1">
        <label htmlFor="camp-message" className={labelClass}>Participants / message (optionnel)</label>
        <textarea
          id="camp-message"
          name="message"
          className={`${inputClass} h-28 resize-none`}
          placeholder="Noms et grades des participants, question sur l'hébergement..."
        ></textarea>
      </div>

      <div className="flex items-center justify-between bg-indigo-950 text-white px-4 py-3">
        <span className="text-sm text-indigo-200">Montant indicatif</span>
        <span className="font-serif font-bold text-2xl" aria-live="polite">{total} €</span>
      </div>

      <div aria-live="assertive">
        {status === 'error' && (
          <div role="alert" className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm">
            {errorMessage}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-red-700 text-white font-bold py-4 rounded-sm shadow-lg hover:bg-red-800 transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma pré-inscription'}
      </button>
      <p className="text-[11px] text-slate-400 text-center mt-4">
        Vos informations sont transmises à WKB France pour organiser le camp. Consultez notre{' '}
        <a href="/confidentialite" className="underline hover:text-slate-600">politique de confidentialité</a>.
      </p>
    </form>
  );
}
