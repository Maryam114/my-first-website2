# Maryam — Portfolio

This is a simple static portfolio site for Maryam, an IT System Analyst.

## Local files
- `index.html` — portfolio content and contact form
- `style.css` — styles
- `script.js` — client-side form handling (mailto fallback and optional POST to endpoint)

## Contact form
The site is static. By default the Contact form uses a mailto fallback which opens the visitor's email client. To capture messages on the web, use a form backend service like Formspree.

Example (Formspree):

1. Sign up at https://formspree.io and create a new form to get an endpoint URL.
2. Add the endpoint to the form tag in `index.html`:

	<form id="contactForm" data-endpoint="https://formspree.io/f/your-id">

3. The page will POST JSON to that endpoint and show a status message on success/failure.

## Deploy to AWS Amplify via GitHub
1. Initialize a git repo in this folder and push to GitHub:

```powershell
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

2. In the AWS Management Console, open AWS Amplify and choose "Get started" under Deploy.
3. Connect your GitHub repository and pick the branch (main). Amplify will detect a static site and deploy the contents.

## Notes
- Replace the mailto address in `script.js` with your real email if you keep the fallback.
- For production contact forms, use a verified form backend (Formspree, Netlify Forms, or a simple Lambda API) to avoid exposing your email.

