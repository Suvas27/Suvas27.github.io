# Suvas T V - Personal Portfolio

A static portfolio website for an ECE Undergraduate specializing in VLSI Physical Design, FPGA, and Embedded Systems. Built with pure HTML, CSS, and vanilla JavaScript.

## 🚀 Live Demo

The site is hosted on GitHub Pages: **[Your GitHub Pages URL will go here]**

## 📂 File Structure

```text
/
├── index.html        # Home page (Hero, Stats, Featured Projects)
├── projects.html     # Projects showcase and case studies
├── about.html        # Education, Skills, Achievements
├── contact.html      # Contact form, direct links, blog placeholder
├── style.css         # Main stylesheet (custom CSS vars, responsive design)
├── script.js         # UI logic (navbar scroll, mobile menu, skill bars, gallery modal)
├── favicon.ico       # SVG Data URI embedded inside HTML files directly (no separate file needed)
├── assets/
│   ├── Suvas_TV_Resume.pdf
│   └── images/
│       ├── heartguard-sim-waveform.png
│       ├── ecostreet-wokwi-circuit.png
│       ├── ecostreet-hardware-photo.jpg
│       ├── lif-membrane-potential.png
│       └── lif-firing-rate.png
└── README.md
```

## 🛠 Features

- **No Frameworks:** Built cleanly with vanilla HTML5, CSS3, and JS. Zero build steps required.
- **Responsive Design:** Fluid layouts that scale down gracefully to mobile devices.
- **Animated Interactions:** IntersectionObserver for scroll animations and subtle CSS transitions.
- **Dark Mode Aesthetic:** Circuit/technical theme matching the VLSI/FPGA focus.

## 📦 How to Deploy to GitHub Pages

1. **Upload Files:** Push all files and folders (including `assets/`) to a new GitHub repository named `username.github.io` or to any repository.
2. **Add Your Media:**
   - Drop your real image files into `assets/images/` using the exact filenames listed above.
   - Drop your resume into `assets/` and name it `Suvas_TV_Resume.pdf`.
3. **Enable Pages:**
   - Go to your repository **Settings**.
   - Navigate to **Pages** on the left sidebar.
   - Under **Source**, select `Deploy from a branch`.
   - Select the `main` (or `master`) branch and save.
4. **View Site:** After a minute or two, your site will be live at `https://[your-github-username].github.io/[repo-name]/`.

## ✏️ Customizing the Contact Form

Currently, the contact form uses a `mailto:` action since this is a static site. When a user submits the form, a simulated success message appears via JavaScript. 

To use a backend-less email service:
1. Sign up for [Formspree](https://formspree.io/) or [Netlify Forms].
2. Replace the `<form action="mailto:...">` with your unique endpoint URL provided by the service.
3. Update `script.js` to perform an AJAX POST request if you prefer a seamless submission without redirects.
