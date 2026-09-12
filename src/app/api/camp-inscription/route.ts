import { NextRequest, NextResponse } from 'next/server';
import { escapeHtml } from '@/lib/escape-html';
import { CAMP_DAYS, CAMP_FORMULES } from '@/data/camp-automne-2026';

interface CampRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  club: string;
  grade: string;
  formule: string;
  day: string;
  participants: number;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: CampRegistrationData = await request.json();

    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.club) {
      return NextResponse.json(
        { error: 'Prénom, nom, email, téléphone et dojo sont obligatoires.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 });
    }

    const formule = Object.hasOwn(CAMP_FORMULES, data.formule) ? CAMP_FORMULES[data.formule] : undefined;
    if (!formule) {
      return NextResponse.json({ error: 'Veuillez choisir une formule.' }, { status: 400 });
    }
    if (data.formule === '1-jour' && !CAMP_DAYS.includes(data.day)) {
      return NextResponse.json({ error: 'Veuillez choisir le jour de participation.' }, { status: 400 });
    }

    const participants = Number(data.participants);
    if (!Number.isInteger(participants) || participants < 1 || participants > 50) {
      return NextResponse.json(
        { error: 'Le nombre de participants doit être compris entre 1 et 50.' },
        { status: 400 }
      );
    }

    const formuleLabel = data.formule === '1-jour' ? `${formule.label} — ${data.day}` : formule.label;
    const total = participants * formule.price;

    const brevoKey = process.env.BREVO_API_KEY;
    const recipientEmail = process.env.CAMP_EMAIL || 'wkbfrance@gmail.com';

    if (brevoKey) {
      const row = (label: string, value: string, style = '') =>
        `<tr><td style="padding: 8px 0; color: #64748b; width: 150px;">${label}</td><td style="padding: 8px 0; ${style}">${value}</td></tr>`;

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': brevoKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Onami Dojo - Site Web', email: 'noreply@onamidojo.fr' },
          to: [{ email: recipientEmail, name: 'WKB France' }],
          replyTo: { email: data.email, name: `${data.firstName} ${data.lastName}` },
          subject: `Inscription Camp d'automne 2026 - ${data.firstName} ${data.lastName} (${data.club}) - ${participants} participant${participants > 1 ? 's' : ''}`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1e1b4b; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">6ème Camp d'automne WKB France</h1>
                <p style="margin: 5px 0 0; opacity: 0.8; font-size: 14px;">Nouvelle inscription — Amiens, 16-18 octobre 2026</p>
              </div>
              <div style="padding: 30px; background: #faf9f6;">
                <table style="width: 100%; border-collapse: collapse;">
                  ${row('Prénom', escapeHtml(data.firstName), 'font-weight: bold;')}
                  ${row('Nom', escapeHtml(data.lastName), 'font-weight: bold;')}
                  ${row('Email', `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`)}
                  ${row('Téléphone', escapeHtml(data.phone))}
                  ${row('Dojo / club', escapeHtml(data.club), 'font-weight: bold;')}
                  ${row('Grade', escapeHtml(data.grade || 'Non renseigné'))}
                  ${row('Formule', escapeHtml(formuleLabel), 'font-weight: bold; color: #dc2626;')}
                  ${row('Participants', String(participants), 'font-weight: bold;')}
                  ${row('Montant indicatif', `${total} €`, 'font-weight: bold;')}
                </table>
                ${data.message ? `
                  <div style="margin-top: 20px; padding: 15px; background: white; border-left: 4px solid #1e1b4b;">
                    <p style="margin: 0 0 5px; color: #64748b; font-size: 12px; text-transform: uppercase;">Message / liste des participants</p>
                    <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
                  </div>
                ` : ''}
              </div>
              <div style="padding: 15px; text-align: center; color: #94a3b8; font-size: 12px; background: #f1f5f9;">
                Envoyé depuis le formulaire d'inscription au camp d'automne sur onamidojo.fr
              </div>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        console.error('Erreur Brevo:', await response.text());
        return NextResponse.json(
          { error: 'Erreur lors de l\'envoi. Veuillez réessayer.' },
          { status: 500 }
        );
      }
    } else {
      // Sans Brevo, log en console (dev)
      console.log('📧 Nouvelle inscription au camp d\'automne (Brevo non configuré):', data);
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error('Erreur API camp-inscription');
    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}
