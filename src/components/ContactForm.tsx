'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
      discipline: formData.get('discipline') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
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
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-xl font-serif font-bold text-indigo-950 mb-2">Demande envoyée !</h4>
        <p className="text-slate-600">Nous vous recontacterons dans les plus brefs délais pour organiser votre essai gratuit.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-red-700 font-medium hover:underline cursor-pointer"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="firstName" className="text-[11px] font-bold uppercase tracking-widest text-slate-600">Prénom</label>
          <input id="firstName" name="firstName" type="text" required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-red-700 focus:border-transparent transition-all outline-none" placeholder="Votre prénom" />
        </div>
        <div className="space-y-1">
          <label htmlFor="lastName" className="text-[11px] font-bold uppercase tracking-widest text-slate-600">Nom</label>
          <input id="lastName" name="lastName" type="text" required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-red-700 focus:border-transparent transition-all outline-none" placeholder="Votre nom" />
        </div>
      </div>
      <div className="space-y-1">
        <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-slate-600">Email</label>
        <input id="email" name="email" type="email" required className="w-full bg-slate-50 border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-red-700 focus:border-transparent transition-all outline-none" placeholder="votre@email.com" />
      </div>
      <div className="space-y-1">
        <label htmlFor="phone" className="text-[11px] font-bold uppercase tracking-widest text-slate-600">Téléphone</label>
        <input id="phone" name="phone" type="tel" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-red-700 focus:border-transparent transition-all outline-none" placeholder="06 XX XX XX XX" />
      </div>
      <div className="space-y-1">
        <label htmlFor="discipline" className="text-[11px] font-bold uppercase tracking-widest text-slate-600">Discipline souhaitée</label>
        <select id="discipline" name="discipline" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-red-700 focus:border-transparent transition-all outline-none appearance-none cursor-pointer">
          <option value="" disabled>Choisir une discipline</option>
          <option>Kempo Karaté</option>
          <option>Kyokushin Karaté</option>
          <option>Cours Enfants (6-13 ans)</option>
          <option>Cours Ados (13+ ans)</option>
        </select>
      </div>
      <div className="space-y-1">
        <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-widest text-slate-600">Message (optionnel)</label>
        <textarea id="message" name="message" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-red-700 focus:border-transparent transition-all outline-none h-24 resize-none" placeholder="Précisez votre niveau, vos disponibilités..."></textarea>
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
        className="w-full bg-indigo-950 text-white font-bold py-4 rounded-sm shadow-lg hover:bg-red-700 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma demande'}
      </button>
      <p className="text-[11px] text-slate-400 text-center mt-4">
        En soumettant ce formulaire, vous acceptez d&apos;être contacté pour organiser votre essai.
        Consultez notre <a href="/confidentialite" className="underline hover:text-slate-600">politique de confidentialité</a>.
      </p>
    </form>
  );
}
