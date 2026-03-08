import { NextRequest, NextResponse } from 'next/server';

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  discipline: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactData = await request.json();

    // Validation basique
    if (!data.firstName || !data.lastName || !data.email) {
      return NextResponse.json(
        { error: 'Prénom, nom et email sont obligatoires.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      );
    }

    // Envoi via Brevo si la clé est configurée
    const brevoKey = process.env.BREVO_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || 'contact@onamidojo.fr';

    if (brevoKey) {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': brevoKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Onami Dojo - Site Web', email: 'noreply@onamidojo.fr' },
          to: [{ email: recipientEmail, name: 'Onami Dojo' }],
          replyTo: { email: data.email, name: `${data.firstName} ${data.lastName}` },
          subject: `Demande d'essai - ${data.firstName} ${data.lastName} (${data.discipline})`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1e1b4b; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Onami Dojo</h1>
                <p style="margin: 5px 0 0; opacity: 0.8; font-size: 14px;">Nouvelle demande de cours d'essai</p>
              </div>
              <div style="padding: 30px; background: #faf9f6;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #64748b; width: 130px;">Prénom</td><td style="padding: 8px 0; font-weight: bold;">${data.firstName}</td></tr>
                  <tr><td style="padding: 8px 0; color: #64748b;">Nom</td><td style="padding: 8px 0; font-weight: bold;">${data.lastName}</td></tr>
                  <tr><td style="padding: 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
                  <tr><td style="padding: 8px 0; color: #64748b;">Téléphone</td><td style="padding: 8px 0;">${data.phone || 'Non renseigné'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #64748b;">Discipline</td><td style="padding: 8px 0; font-weight: bold; color: #dc2626;">${data.discipline}</td></tr>
                </table>
                ${data.message ? `
                  <div style="margin-top: 20px; padding: 15px; background: white; border-left: 4px solid #1e1b4b;">
                    <p style="margin: 0 0 5px; color: #64748b; font-size: 12px; text-transform: uppercase;">Message</p>
                    <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
                  </div>
                ` : ''}
              </div>
              <div style="padding: 15px; text-align: center; color: #94a3b8; font-size: 12px; background: #f1f5f9;">
                Envoyé depuis le formulaire de contact onamidojo.fr
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
      console.log('📧 Nouvelle demande de contact (Brevo non configuré):', data);
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error('Erreur API contact');
    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}
