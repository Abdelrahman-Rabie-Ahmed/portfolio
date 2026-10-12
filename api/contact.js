// Vercel serverless function: POST /api/contact -> sends through EmailJS.
// EmailJS credentials come from environment variables, never frontend code.
const hits = new Map(); // best-effort rate limit (per warm instance)
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'Method not allowed' }); }

  const config = {
    serviceId: process.env.EMAILJS_SERVICE_ID?.trim(),
    templateId: process.env.EMAILJS_TEMPLATE_ID?.trim(),
    publicKey: process.env.EMAILJS_PUBLIC_KEY?.trim(),
    privateKey: process.env.EMAILJS_PRIVATE_KEY?.trim(),
    contactEmail: process.env.CONTACT_EMAIL?.trim()
  };
  if (Object.values(config).some(value => !value))
    return res.status(503).json({ ok: false, error: 'The contact form is not configured yet. Please email me directly.' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now(), recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60 * 1000);
  if (recent.length >= 3) return res.status(429).json({ ok: false, error: 'Too many messages. Please try again later.' });

  let b;
  try { b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body; } catch { return res.status(400).json({ ok: false, error: 'Invalid request.' }); }
  if (!b || typeof b !== 'object' || Array.isArray(b)) return res.status(400).json({ ok: false, error: 'Invalid request.' });
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: silently drop bots

  const field = value => typeof value === 'string' ? value.trim() : '';
  const name = field(b.name), email = field(b.email);
  const subject = field(b.subject), message = field(b.message);
  if (!name || name.length > 100 || !subject || subject.length > 150 || message.length < 5 || message.length > 5000 ||
      email.length > 200 || !/^[^@\s]{1,64}@[^@\s]+\.[^@\s]+$/.test(email))
    return res.status(400).json({ ok: false, error: 'Please check the form fields and try again.' });

  hits.set(ip, [...recent, now]);
  try {
    const r = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.publicKey,
        accessToken: config.privateKey,
        template_params: {
          to_email: config.contactEmail,
          from_name: esc(name),
          from_email: esc(email),
          reply_to: email,
          subject: subject.replace(/[\r\n]/g, ' '),
          subject_html: esc(subject),
          message: esc(message)
        }
      })
    });
    if (!r.ok) {
      const details = (await r.text()).slice(0, 300);
      console.error('EmailJS returned status', r.status, details);
      return res.status(502).json({ ok: false, error: 'Could not send your message. Please email me directly.' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('EmailJS request failed:', error.name || 'unknown error');
    return res.status(502).json({ ok: false, error: 'Could not send your message. Please email me directly.' });
  }
};
