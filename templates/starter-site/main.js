// Starter site — small enhancements. The page works without this file.

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
      showStatus('Please fill in your name, a valid email and how we can help.', 'error');
      return;
    }

    if (form.action.includes('{{FORMSPREE_ID}}') || form.action.includes('%7B%7B')) {
      showStatus('This form isn’t connected yet. Please call or email us instead.', 'error');
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
      showStatus('Message sent. We’ll get back to you soon.', 'success');
      button.textContent = 'Message sent';
    } catch {
      showStatus('Your message didn’t go through. Try again, or give us a call.', 'error');
      button.disabled = false;
      button.textContent = 'Send message';
    }
  });
}
