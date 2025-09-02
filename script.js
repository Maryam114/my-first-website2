// Contact form handling
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

function setStatus(msg, isError = false){
    statusEl.textContent = msg;
    statusEl.style.color = isError ? '#b91c1c' : '#065f46';
}

form.addEventListener('submit', async function(e){
    e.preventDefault();
    setStatus('Sending...');

    const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim()
    };

    // If a data-endpoint attribute is set, POST JSON to it (for services like Formspree)
    const endpoint = form.getAttribute('data-endpoint');
    if(endpoint){
        try{
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            });
            if(res.ok){
                setStatus('Message sent. Thank you!');
                form.reset();
            } else {
                setStatus('Failed to send message. Please try again later.', true);
            }
        } catch(err){
            setStatus('Network error. Please try again later.', true);
        }
        return;
    }

    // Fallback: open user's mail client with a prefilled mailto
    const mailto = `mailto:your.email@example.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
    window.location.href = mailto;
    setStatus('Opening your email client...');
});

// Theme toggle
const themeBtn = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme){
    if(theme === 'dark'){
        root.setAttribute('data-theme','dark');
        themeBtn.setAttribute('aria-pressed','true');
        themeBtn.textContent = '☀️';
    } else {
        root.removeAttribute('data-theme');
        themeBtn.setAttribute('aria-pressed','false');
        themeBtn.textContent = '🌙';
    }
}

function loadTheme(){
    const saved = localStorage.getItem('theme');
    if(saved) return applyTheme(saved);
    // respect system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
}

themeBtn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
});

loadTheme();
