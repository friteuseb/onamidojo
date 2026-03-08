'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cookie = document.cookie.split('; ').find(c => c.startsWith('cookie_consent='));
    if (!cookie) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    document.cookie = 'cookie_consent=essential,analytics; path=/; max-age=34560000; SameSite=Lax';
    window.dispatchEvent(new Event('analytics-consent'));
    setVisible(false);
  }

  function refuse() {
    document.cookie = 'cookie_consent=essential; path=/; max-age=34560000; SameSite=Lax';
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-in">
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 shadow-2xl rounded-sm p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-slate-700 font-medium mb-1">Ce site utilise des cookies</p>
          <p className="text-xs text-slate-500">
            Nous utilisons des cookies essentiels au fonctionnement du site et, avec votre accord,
            des cookies analytiques pour améliorer votre expérience.{' '}
            <a href="/confidentialite" className="underline hover:text-slate-700">En savoir plus</a>
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={refuse}
            className="px-5 py-2.5 text-sm font-medium text-slate-600 border border-slate-300 hover:bg-slate-50 transition-colors rounded-sm cursor-pointer"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-950 hover:bg-red-700 transition-colors rounded-sm cursor-pointer"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
