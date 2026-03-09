'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav aria-label="Navigation principale" className="fixed w-full z-50 bg-[#faf9f6]/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-950 rounded-full flex items-center justify-center">
              <span className="text-white font-serif font-bold text-sm leading-none">大<br/>波</span>
            </div>
            <div>
              <span className="block text-xl font-serif font-black tracking-tight text-indigo-950 leading-none">ONAMI DOJO</span>
              <span className="block text-[10px] tracking-[0.2em] text-red-700 font-bold uppercase">Kempo & Kyokushin</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#disciplines" className="text-slate-600 hover:text-indigo-900 transition-colors font-medium">Disciplines</Link>
            <Link href="/#instructeurs" className="text-slate-600 hover:text-indigo-900 transition-colors font-medium">Instructeurs</Link>
            <Link href="/#horaires" className="text-slate-600 hover:text-indigo-900 transition-colors font-medium">Horaires</Link>
            <Link href="/#dojos" className="text-slate-600 hover:text-indigo-900 transition-colors font-medium">Notre Dojo</Link>
            <Link href="/blog" className="text-slate-600 hover:text-indigo-900 transition-colors font-medium">Blog</Link>
            <Link href="/#contact" className="bg-indigo-950 text-white px-6 py-2.5 rounded-sm font-bold hover:bg-red-700 transition-all duration-300 shadow-md">
              Essai Gratuit
            </Link>
          </div>
          <button
            className="md:hidden p-2 text-indigo-950"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu de navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-4 space-y-3">
            <Link href="/#disciplines" className="block py-2 text-slate-600 hover:text-indigo-900 font-medium" onClick={() => setMobileMenuOpen(false)}>Disciplines</Link>
            <Link href="/#instructeurs" className="block py-2 text-slate-600 hover:text-indigo-900 font-medium" onClick={() => setMobileMenuOpen(false)}>Instructeurs</Link>
            <Link href="/#horaires" className="block py-2 text-slate-600 hover:text-indigo-900 font-medium" onClick={() => setMobileMenuOpen(false)}>Horaires</Link>
            <Link href="/#dojos" className="block py-2 text-slate-600 hover:text-indigo-900 font-medium" onClick={() => setMobileMenuOpen(false)}>Notre Dojo</Link>
            <Link href="/blog" className="block py-2 text-slate-600 hover:text-indigo-900 font-medium" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/#contact" className="block py-3 bg-indigo-950 text-white text-center font-bold rounded-sm" onClick={() => setMobileMenuOpen(false)}>
              Essai Gratuit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
