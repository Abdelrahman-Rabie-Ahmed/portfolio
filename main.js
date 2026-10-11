(function () {
  const S = window.SITE, $ = s => document.querySelector(s), H = document.documentElement;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const li = a => a.map(x => `<li>${esc(x)}</li>`).join('');

  // ---- render content ----
  $('#sk').innerHTML = S.skills.map(s => `<div class="sk"><h3>${esc(s[0])}</h3><div class="tags">${s[1].split(', ').map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div></div>`).join('');
  $('#tl').innerHTML = S.experience.map(e => `<div class="it"><div class="d">${esc(e[2])}</div><h3>${esc(e[0])}<span class="badge">${esc(e[3])}</span></h3><div class="o">${esc(e[1])}</div><ul>${li(e[4])}</ul></div>`).join('');
  $('#cr').innerHTML = S.credentials.map(c => `<div class="row"><span class="d">${esc(c[0])}</span><span>${esc(c[1])}</span></div>`).join('');
  $('#pc').innerHTML = S.projects.map(p => `<a class="card${p.featured ? ' feat' : ''}" href="#project-${p.slug}"><small>${esc(p.category)} · ${esc(p.period)}</small><h3>${esc(p.title)}</h3><p>${esc(p.short)}</p><em>View details →</em></a>`).join('');
  $('#pd').innerHTML = S.projects.map(p => {
    const photos = p.photos.slice(0, 3).map((ph, i) => `<figure><img src="${esc(ph[0])}" alt="${esc(p.title)} — ${esc(ph[1] || 'photo ' + (i + 1))}" loading="lazy" data-slot="${esc(ph[0])}"></figure>`).join('');
    const block = (t, body) => body ? `<div><h3>${t}</h3>${body}</div>` : '';
    const steps = p.steps.length ? `<div><h3>How it works</h3><ol class="pipe">${li(p.steps)}</ol></div>` : '';
    const links = [p.github && `<a class="btn s" href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">GitHub repository</a>`, p.demo && `<a class="btn s" href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">Live demo</a>`].filter(Boolean).join('');
    return `<section class="pd" id="project-${p.slug}"><div class="w rv"><div class="eyebrow">${esc(p.category)}</div><h2>${esc(p.title)}</h2><p class="meta">${esc(p.period)}</p>
      <div class="gal">${photos}</div>
      <div class="pdg">${block('Overview', `<p>${esc(p.short)}</p>`)}${block('Problem', `<p>${esc(p.problem)}</p>`)}${block('My role', `<p>${esc(p.role)}</p>`)}${block('Technologies', `<div class="tags">${p.tech.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>`)}${steps}${block('Results', p.results.length ? `<ul>${li(p.results)}</ul>` : '')}${block('More details', p.notes.length ? `<ul>${li(p.notes)}</ul>` : '')}</div>
      ${p.note ? `<p class="note">${esc(p.note)}</p>` : ''}${links ? `<div class="pl">${links}</div>` : ''}</div></section>`;
  }).join('');
  // photo fallback: shows a labelled placeholder until you add the real file
  document.querySelectorAll('.gal img').forEach(img => img.addEventListener('error', () => {
    const d = document.createElement('div'); d.className = 'ph'; d.setAttribute('role', 'img'); d.setAttribute('aria-label', 'Photo placeholder');
    d.innerHTML = `<b>Photo coming soon</b><span>${esc(img.dataset.slot)}</span>`; img.replaceWith(d);
  }));
  $('#ol').innerHTML = `<a class="btn" href="${esc(S.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>` + (S.github ? `<a class="btn" href="${esc(S.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>` : '') + `<a class="btn" href="mailto:${esc(S.email)}">${esc(S.email)}</a><button class="btn" id="cp" type="button">Copy email</button>`;
  $('#yr').textContent = new Date().getFullYear();
  $('#cp').onclick = async e => { const b = e.currentTarget; try { await navigator.clipboard.writeText(S.email); b.textContent = 'Copied'; } catch { b.textContent = 'Copy failed'; } setTimeout(() => b.textContent = 'Copy email', 1800); };

  // ---- theme ----
  const sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', moon = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
  const dark = () => H.dataset.theme ? H.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches;
  const paint = () => { const d = dark(); $('#thi').innerHTML = d ? sun : moon; $('#th').setAttribute('aria-label', d ? 'Switch to light mode' : 'Switch to dark mode'); };
  $('#th').onclick = () => { const t = dark() ? 'light' : 'dark'; H.dataset.theme = t; try { localStorage.setItem('theme', t); } catch {} paint(); };
  paint();

  // ---- nav ----
  const L = $('#links'), mb = $('#mb');
  mb.onclick = () => { const o = L.classList.toggle('open'); mb.setAttribute('aria-expanded', o); mb.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); };
  L.addEventListener('click', e => { if (e.target.tagName === 'A') { L.classList.remove('open'); mb.setAttribute('aria-expanded', false); } });
  const lk = [...L.querySelectorAll('a')], map = id => id.startsWith('project-') ? 'projects' : id;
  const so = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) lk.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + map(x.target.id))); }), { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => so.observe(s));
  const ro = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); ro.unobserve(x.target); } }), { threshold: .05 });
  document.querySelectorAll('.rv').forEach(r => ro.observe(r));

  // ---- contact form -> /api/contact ----
  const f = $('#f'), st = $('#st'), sb = $('#sb');
  const show = (cls, html) => { st.hidden = false; st.className = cls; st.innerHTML = html; };
  f.addEventListener('submit', async ev => {
    ev.preventDefault(); st.hidden = true; let ok = true; const v = {};
    const chk = (n, msg, test) => { const i = f.elements[n], er = i.parentNode.querySelector('.err'); v[n] = i.value.trim(); const bad = !test(v[n]); i.setAttribute('aria-invalid', bad); er.textContent = bad ? msg : ''; if (bad && ok) { i.focus(); ok = false; } };
    chk('name', 'Please enter your name.', x => x); chk('email', 'Please enter a valid email address.', x => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x));
    chk('subject', 'Please enter a subject.', x => x); chk('message', 'Please write a message (at least 5 characters).', x => x.length >= 5);
    if (!ok) return;
    v.website = f.elements.website.value; sb.disabled = true; sb.textContent = 'Sending…';
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) { show('ok', 'Thank you — your message was sent. I\'ll get back to you soon.'); f.reset(); }
      else show('bad', esc(j.error || 'Something went wrong.') + ` You can also email <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>.`);
    } catch { show('bad', `Network error. Please try again or email <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>.`); }
    sb.disabled = false; sb.textContent = 'Send message';
  });
})();
