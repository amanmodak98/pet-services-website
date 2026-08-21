import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#0a100a' }}>
      <div
        className="h-0.5"
        style={{ background: 'linear-gradient(90deg, transparent, #16a34a, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐾</span>
              <span className="text-xl font-extrabold" style={{ color: '#4ade80' }}>
                PawCare
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#86efac' }}>
              Premium veterinary care, grooming, boarding, and training — all under one roof.
              Your pet's wellbeing is our top priority.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: '#243524' }}
                aria-label="Instagram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: '#243524' }}
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#4ade80">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: '#243524' }}
                aria-label="Twitter / X"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.863v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: '#4ade80' }}
            >
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {[
                'Veterinary Care',
                'Professional Grooming',
                'Pet Boarding',
                'Obedience Training',
                'Pet Taxi',
                'Pet Store',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm transition-colors duration-200 hover:opacity-80"
                    style={{ color: '#86efac' }}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: '#4ade80' }}
            >
              Contact Us
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <span className="text-lg mt-0.5" aria-hidden="true">📍</span>
                <span className="text-sm leading-relaxed" style={{ color: '#86efac' }}>
                  123 Paws Avenue, Green Park
                  <br />
                  San Francisco, CA 94101
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg" aria-hidden="true">📞</span>
                <a
                  href="tel:+18007294357"
                  className="text-sm transition-colors duration-200 hover:opacity-80"
                  style={{ color: '#86efac' }}
                >
                  +1-800-PAW-HELP
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg" aria-hidden="true">📧</span>
                <a
                  href="mailto:hello@pawcare.vet"
                  className="text-sm transition-colors duration-200 hover:opacity-80"
                  style={{ color: '#86efac' }}
                >
                  hello@pawcare.vet
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg" aria-hidden="true">🕐</span>
                <span className="text-sm" style={{ color: '#86efac' }}>
                  Mon–Sat 8am–7pm | Sun 9am–5pm
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg" aria-hidden="true">🚨</span>
                <span className="text-sm font-semibold" style={{ color: '#fbbf24' }}>
                  Emergency: 24/7
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links Row */}
        <div className="mt-10 pt-6 flex flex-wrap gap-4" style={{ borderTop: '1px solid rgba(134,239,172,0.08)' }}>
          {[
            { label: 'Book Appointment', to: '/book' },
            { label: 'Our Team', to: '/team' },
            { label: 'Gallery', to: '/gallery' },
            { label: 'Contact', to: '/contact' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-xs font-semibold transition-colors duration-200 hover:opacity-70"
              style={{ color: '#4ade80' }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(134,239,172,0.1)' }}
        >
          <p className="text-sm font-semibold" style={{ color: '#86efac' }}>
            Because every pet deserves the best 🐾
          </p>
          <p className="text-xs" style={{ color: '#4ade80', opacity: 0.5 }}>
            © {new Date().getFullYear()} PawCare. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#4ade80', opacity: 0.5 }}>Designed &amp; Developed by <a href="https://www.infirexa.tech" target="_blank" rel="noopener noreferrer">Infirexa</a></p>
        </div>
      </div>
    </footer>
  )
}
