// Trinity Web Co. — small enhancements. The page works without this file.

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

if (toggle && nav) {
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
}

// Footer year
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

// Contact form: validate, then send with fetch so the visitor stays on the page
const form = document.querySelector('.contact-form');

if (form) {
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');

  const showStatus = (message, kind) => {
    status.textContent = message;
    status.classList.toggle('is-error', kind === 'error');
    status.classList.toggle('is-success', kind === 'success');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const invalid = [...form.querySelectorAll('[required]')].filter((field) => !field.checkValidity());
    form.querySelectorAll('[aria-invalid]').forEach((field) => field.removeAttribute('aria-invalid'));
    if (invalid.length) {
      invalid.forEach((field) => field.setAttribute('aria-invalid', 'true'));
      invalid[0].focus();
      showStatus('Please fill in your name, business, a valid email and what you need help with.', 'error');
      return;
    }

    if (form.action.includes('REPLACE_WITH_FORM_ID')) {
      showStatus('This form isn’t connected yet. Please email hello@trinitywebco.com instead.', 'error');
      return;
    }

    button.disabled = true;
    button.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      showStatus('Request sent. I’ll reply within one business day.', 'success');
      button.textContent = 'Request sent';
    } catch {
      showStatus('Your request didn’t go through. Try again, or email hello@trinitywebco.com.', 'error');
      button.disabled = false;
      button.textContent = 'Send my request';
    }
  });
}
