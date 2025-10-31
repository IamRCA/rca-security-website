# RCA Security Group Website

A professional cybersecurity consulting website showcasing RCA Security Group's services, expertise, and team. Built with modern web technologies and optimized for lead generation.

## 🚀 Features

- **Professional Design** - Clean, modern interface with subtle animations
- **Responsive Layout** - Fully optimized desktop and mobile experiences
- **Lead Generation Focus** - Free Security Discovery Call offering to convert visitors
- **Service Portfolio** - Comprehensive cybersecurity services clearly presented
- **Team Showcase** - Expert team with certifications and experience highlights
- **Contact Integration** - EmailJS-powered contact forms with automatic notifications
- **Performance Optimized** - Fast loading with Canvas-based animations

## 🛠️ Technology Stack

- **HTML5** - Semantic structure and modern markup
- **CSS3** - Advanced animations, gradients, and responsive design
- **JavaScript (ES6+)** - Interactive elements, form handling, and animations
- **Canvas API** - High-performance background animations
- **EmailJS** - Client-side email notifications
- **Font Awesome** - Professional icon library
- **Google Fonts** - Orbitron & Inter font families
- **GitHub Pages** - Hosting and automatic deployment

## 📁 File Structure

```
Website/
├── index.html              # Main desktop website
├── mobile.html             # Mobile-optimized version
├── styles.css              # All CSS styling and animations
├── script.js               # JavaScript functionality
├── security-checklist.html # Security checklist download page
├── build.js                # Production build script
├── deploy.ps1              # Deployment script
├── deploy-production.ps1   # Production deployment script
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 📋 Website Sections

### Desktop Version (index.html)
- **Hero Section** - Compelling headline with call-to-action buttons
- **Services** - Detailed cybersecurity service offerings with feature tags
- **About** - Company background and statistics
- **Team** - Professional team bios with certifications
- **Contact** - Contact form with EmailJS integration

### Mobile Version (mobile.html)
- Optimized mobile navigation
- Touch-friendly interface
- Streamlined content presentation
- Mobile-specific animations

## 🎯 Key Features

### Services Offered
- **Free Security Discovery Call** - "Foot in the door" offering for lead generation
- **Penetration Testing** - Web applications, networks, wireless, social engineering
- **Security Consulting** - Risk assessments, compliance readiness, policy development
- **Access & Identity Management** - Microsoft 365 security, MFA setup, PAM
- **Incident Response** - Full investigation to resolution
- **Security Operations** - SOC oversight, vulnerability management, training
- **Web Development & Design** - Secure coding and modern UI/UX

### Contact Integration
- EmailJS-powered contact forms
- Automatic email notifications
- Fallback to mailto links if EmailJS fails
- Form validation and error handling

### Professional Animations
- Subtle data stream backgrounds
- Canvas-based particle systems
- Smooth scroll animations
- Performance-optimized for mobile

## 🚀 Deployment

This website is deployed to GitHub Pages. Changes pushed to the `master` branch are live within 2-3 minutes.

### Quick Deploy
```powershell
.\deploy.ps1
```

### Production Deploy (with obfuscation)
```powershell
.\deploy-production.ps1
```

## 🔄 Making Updates

1. Make changes to your local files
2. Test locally in a browser
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin master
   ```
4. Website updates automatically on GitHub Pages

## 💡 Customization

### Colors & Branding
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0066ff;
    --secondary-color: #00aaff;
    /* ... */
}
```

### EmailJS Configuration
Update EmailJS settings in `index.html` and `mobile.html`:
```javascript
emailjs.init('YOUR_PUBLIC_KEY');
emailjs.send('service_your_service_id', 'template_your_template_id', {...});
```

### Content Updates
- Edit HTML files directly for content changes
- Services, team, and contact info in `index.html` and `mobile.html`
- Animation timing adjustable in JavaScript

## 📱 Mobile Optimization

The website includes a dedicated mobile version (`mobile.html`) that:
- Automatically redirects mobile users
- Provides touch-optimized navigation
- Streamlines content for smaller screens
- Maintains all core functionality

## 🔒 Security Features

- Input validation and sanitization
- XSS prevention
- CSRF protection
- Rate limiting
- Secure email handling

## 🌐 Live Website

**Production URL:** https://www.rcasecuritygroup.com/  
**Mobile URL:** https://www.rcasecuritygroup.com/mobile.html

## 📝 Development Notes

- **Branch:** `master` (GitHub Pages default)
- **Build Process:** Optional production build with obfuscation
- **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)
- **Performance:** Optimized for mobile and desktop

---

**RCA Security Group** - Professional cybersecurity consulting protecting businesses from evolving cyber threats with enterprise-level expertise.
