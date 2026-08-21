import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/team', label: 'Our Team' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(15,26,15,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(22,163,74,0.2)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl" aria-hidden="true">🐾</span>
          <span
            className="text-xl md:text-2xl"
            style={{ fontWeight: 800, color: '#4ade80', fontFamily: 'Nunito, sans-serif' }}
          >
            PawCare
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-sm font-semibold transition-colors duration-200 hover:opacity-80"
              style={({ isActive }) => ({
                color: isActive ? '#4ade80' : '#f0fdf4',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/book"
            className="px-5 py-2 rounded-full text-sm font-bold transition-all duration-200"
            style={{ background: '#16a34a', color: '#fff' }}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: '#f0fdf4',
              transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{ background: '#f0fdf4', opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: '#f0fdf4',
              transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(15,26,15,0.98)',
              borderTop: '1px solid rgba(22,163,74,0.2)',
            }}
          >
            <div className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="text-base font-semibold py-3 border-b transition-colors duration-200"
                  style={({ isActive }) => ({
                    color: isActive ? '#4ade80' : '#f0fdf4',
                    borderColor: 'rgba(134,239,172,0.12)',
                  })}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/book"
                className="mt-3 px-5 py-3 rounded-full text-center text-sm font-bold"
                style={{ background: '#16a34a', color: '#fff' }}
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
