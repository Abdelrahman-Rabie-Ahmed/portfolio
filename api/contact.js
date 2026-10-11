// Vercel serverless function: POST /api/contact -> sends an email through Resend.
// Secrets come from environment variables only (never put them in frontend code).
const hits = new Map(); // best-effort rate limit (per warm instance)
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'Method not allowed' }); }

  const { RESEND_API_KEY, CONTACT_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_EMAIL || !CONTACT_FROM_EMAIL)
    return res.status(503).json({ ok: false, error: 'The contact form is not configured yet. Please email me directly.' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now(), recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60 * 1000);
  if (recent.length >= 3) return res.status(429).json({ ok: false, error: 'Too many messages. Please try again later.' });

  let b = {};
  try { b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {}); } catch { return res.status(400).json({ ok: false, error: 'Invalid request.' }); }
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: silently drop bots

  const name = String(b.name || '').trim(), email = String(b.email || '').trim();
  const subject = String(b.subject || '').trim(), message = String(b.message || '').trim();
  if (!name || name.length > 100 || !subject || subject.length > 150 || message.length < 5 || message.length > 5000 ||
      email.length > 200 || !/^[^@\s]{1,64}@[^@\s]+\.[^@\s]+$/.test(email))
    return res.status(400).json({ ok: false, error: 'Please check the form fields and try again.' });

  hits.set(ip, [...recent, now]);
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `Portfolio Contact <${CONTACT_FROM_EMAIL}>`,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject.replace(/[\r\n]/g, ' ')}`,
        html: `<p><b>From:</b> ${esc(name)} &lt;${esc(email)}&gt;</p><p><b>Subject:</b> ${esc(subject)}</p><hr><p style="white-space:pre-wrap">${esc(message)}</p>`,
        text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`
      })
    });
    if (!r.ok) { console.error('Resend returned status', r.status); return res.status(502).json({ ok: false, error: 'Could not send your message. Please email me directly.' }); }
    return res.status(200).json({ ok: true });
  } catch {
    console.error('Send failed'); // message contents are never logged
    return res.status(502).json({ ok: false, error: 'Could not send your message. Please email me directly.' });
  }
};
