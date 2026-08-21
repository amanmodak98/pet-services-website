import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const hoursData: { day: string; hours: string; isEmergency?: boolean }[] = [
  { day: 'Monday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Tuesday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Thursday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Friday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Saturday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Sunday', hours: '9:00 AM – 5:00 PM' },
  { day: 'Emergency', hours: '24/7 Available', isEmergency: true },
]

const firstVisitItems: string[] = [
  'Previous veterinary records (if applicable)',
  'List of current medications',
  "Your pet's favorite treats",
  'Photo ID and proof of address',
  'Payment method or pet insurance card',
]

const inputClass =
  'bg-[#1a2b1a] border border-[rgba(74,222,128,0.2)] text-[#f0fdf4] rounded-xl p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#16a34a] transition-all'

const labelClass = 'block text-sm font-semibold text-[#86efac] mb-1.5'

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isEmergency, setIsEmergency] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.subject.trim() !== '' &&
    formData.message.trim() !== ''

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    if (isFormValid) {
      setSubmitted(true)
    }
  }

  function handleReset(): void {
    setSubmitted(false)
    setFormData(initialFormData)
    setIsEmergency(false)
  }

  return (
    <div className="min-h-screen bg-[#0f1a0f]">
      {/* HERO SECTION */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.75)' }}
        />
        <div className="relative z-10 text-center pt-24 px-4">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <nav className="flex items-center justify-center gap-2 text-sm text-[#86efac] mb-6">
              <Link to="/" className="hover:text-[#4ade80] transition-colors">
                Home
              </Link>
              <span className="text-[#4ade80]">/</span>
              <span className="text-[#f0fdf4]">Contact</span>
            </nav>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#f0fdf4] mb-4 leading-tight">
              Get In Touch
            </h1>
            <p className="text-lg text-[#86efac] max-w-xl mx-auto">
              We're here to help with any questions about your pet's care
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="py-16 bg-[#0f1a0f]">
        <AnimatedSection>
          <a
            href="https://maps.google.com/?q=123+Paws+Avenue,+San+Francisco,+CA+94101"
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-5xl mx-auto px-4"
          >
            <div
              className="relative flex flex-col items-center justify-center rounded-2xl h-80 w-full cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                background: '#1a2b1a',
                border: '1px solid rgba(74,222,128,0.2)',
              }}
            >
              <span className="text-6xl mb-3">📍</span>
              <p className="text-lg font-semibold text-[#f0fdf4] text-center px-4">
                123 Paws Avenue, Green Park, San Francisco, CA 94101
              </p>
              <p className="text-sm text-[#86efac] mt-2">
                Click to view in Google Maps
              </p>
            </div>
          </a>
        </AnimatedSection>
      </section>

      {/* CONTACT METHODS CARDS */}
      <section className="py-12 bg-[#0f1a0f]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone Card */}
            <AnimatedSection delay={0}>
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background: '#1a2b1a',
                  border: '1px solid rgba(74,222,128,0.1)',
                }}
              >
                <div className="text-4xl mb-3">📞</div>
                <h3 className="text-xl font-bold text-[#f0fdf4] mb-4">Call Us</h3>
                <div className="mb-3">
                  <p className="text-sm text-[#86efac] mb-1">Main Line</p>
                  <a
                    href="tel:+18007294357"
                    className="text-lg font-bold text-[#4ade80] hover:opacity-80 transition-opacity"
                  >
                    +1-800-PAW-HELP
                  </a>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-[#86efac] mb-1">Emergency 24/7</p>
                  <a
                    href="tel:+18008384357"
                    className="text-lg font-bold hover:opacity-80 transition-opacity"
                    style={{ color: '#f97316' }}
                  >
                    +1-800-VET-HELP
                  </a>
                </div>
                <div>
                  <p className="text-sm text-[#86efac] mb-1">Boarding</p>
                  <a
                    href="tel:+18007829729"
                    className="text-lg font-bold text-[#4ade80] hover:opacity-80 transition-opacity"
                  >
                    +1-800-STAY-PAW
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Email Card */}
            <AnimatedSection delay={0.15}>
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background: '#1a2b1a',
                  border: '1px solid rgba(74,222,128,0.1)',
                }}
              >
                <div className="text-4xl mb-3">📧</div>
                <h3 className="text-xl font-bold text-[#f0fdf4] mb-4">Email Us</h3>
                <div className="mb-3">
                  <p className="text-sm text-[#86efac] mb-1">General Inquiries</p>
                  <a
                    href="mailto:hello@pawcare.vet"
                    className="text-lg font-bold text-[#4ade80] hover:opacity-80 transition-opacity"
                  >
                    hello@pawcare.vet
                  </a>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-[#86efac] mb-1">Appointments</p>
                  <a
                    href="mailto:book@pawcare.vet"
                    className="text-lg font-bold text-[#4ade80] hover:opacity-80 transition-opacity"
                  >
                    book@pawcare.vet
                  </a>
                </div>
                <div>
                  <p className="text-sm text-[#86efac] mb-1">Boarding Reservations</p>
                  <a
                    href="mailto:stay@pawcare.vet"
                    className="text-lg font-bold text-[#4ade80] hover:opacity-80 transition-opacity"
                  >
                    stay@pawcare.vet
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Visit Card */}
            <AnimatedSection delay={0.3}>
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background: '#1a2b1a',
                  border: '1px solid rgba(74,222,128,0.1)',
                }}
              >
                <div className="text-4xl mb-3">📍</div>
                <h3 className="text-xl font-bold text-[#f0fdf4] mb-4">Visit Us</h3>
                <p className="text-sm text-[#86efac] leading-relaxed mb-3">
                  123 Paws Avenue, Green Park,<br />
                  San Francisco, CA 94101
                </p>
                <a
                  href="https://maps.google.com/?q=123+Paws+Avenue,+San+Francisco,+CA+94101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#4ade80] hover:opacity-80 transition-opacity"
                >
                  Get Directions →
                </a>
                <p className="text-xs text-[#86efac] mt-2">Free parking available</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="py-16 bg-[#1a2b1a]">
        <div className="max-w-2xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl font-extrabold text-[#f0fdf4] text-center mb-3">
              Send Us a Message
            </h2>
            <p className="text-center text-[#86efac] mb-8">
              We typically respond within 2 hours during business hours
            </p>

            {/* Emergency checkbox */}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="emergency"
                checked={isEmergency}
                onChange={(e) => setIsEmergency(e.target.checked)}
                className="w-5 h-5 rounded cursor-pointer"
                style={{ accentColor: '#f97316' }}
              />
              <label
                htmlFor="emergency"
                className="font-semibold text-[#f0fdf4] cursor-pointer select-none"
              >
                🚨 This is a medical emergency
              </label>
            </div>

            {isEmergency && (
              <div
                className="p-4 rounded-r-lg mb-6"
                style={{
                  background: 'rgba(220,38,38,0.1)',
                  borderLeft: '4px solid #dc2626',
                }}
              >
                <p className="text-sm text-[#f0fdf4]">
                  ⚠️ For immediate medical emergencies, please call us directly at{' '}
                  <strong style={{ color: '#f97316' }}>+1-800-VET-HELP</strong> or
                  visit our clinic. This form is not monitored 24/7.
                </p>
              </div>
            )}

            {/* Submitted success state */}
            {submitted ? (
              <div
                className="rounded-2xl p-6 sm:p-8 text-center py-12"
                style={{
                  background: '#243524',
                  border: '1px solid rgba(74,222,128,0.1)',
                }}
              >
                <div className="flex justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: '#16a34a' }}
                  >
                    <span className="text-3xl text-white">✓</span>
                  </motion.div>
                </div>
                <h3 className="text-2xl font-extrabold text-[#f0fdf4] mt-6 mb-3">
                  Message Sent! 🐾
                </h3>
                <p className="text-[#86efac] mb-8">
                  We'll get back to you within 2 hours during business hours.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-[#16a34a] text-white font-bold py-3 px-8 rounded-full hover:bg-[#15803d] transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              /* Form */
              <form
                onSubmit={handleSubmit}
                noValidate
              >
                <div
                  className="rounded-2xl p-6 sm:p-8"
                  style={{
                    background: '#243524',
                    border: '1px solid rgba(74,222,128,0.1)',
                  }}
                >
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className={labelClass}>
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Appointment Question">Appointment Question</option>
                      <option value="Boarding Reservation">Boarding Reservation</option>
                      <option value="Billing Question">Billing Question</option>
                      <option value="Feedback / Compliment">Feedback / Compliment</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help..."
                      required
                      rows={6}
                      className={inputClass}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className="bg-[#16a34a] text-white font-bold py-3 px-8 rounded-full w-full hover:bg-[#15803d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* HOURS SECTION */}
      <section className="py-12 bg-[#0f1a0f]">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <h3 className="text-2xl font-bold text-[#f0fdf4] text-center mb-8">
              Hours of Operation
            </h3>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: '#1a2b1a', border: '1px solid rgba(74,222,128,0.1)' }}
            >
              {hoursData.map((row, index) => (
                <div
                  key={row.day}
                  className="flex justify-between py-3 px-6"
                  style={{
                    borderBottom:
                      index < hoursData.length - 1
                        ? '1px solid rgba(74,222,128,0.05)'
                        : undefined,
                  }}
                >
                  <span className="font-semibold text-[#4ade80]">{row.day}</span>
                  <span
                    className="font-medium"
                    style={{ color: row.isEmergency ? '#f97316' : '#f0fdf4' }}
                  >
                    {row.hours}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FIRST VISIT INFO */}
      <section className="py-12 bg-[#1a2b1a]">
        <div className="max-w-3xl mx-auto px-4">
          <AnimatedSection>
            <h3 className="text-2xl font-bold text-[#f0fdf4] mb-6">
              First Visit? Bring These:
            </h3>
            <ul className="space-y-0">
              {firstVisitItems.map((item) => (
                <li key={item} className="flex items-start gap-3 mb-3">
                  <span className="text-xl text-[#4ade80] mt-0.5 shrink-0">✓</span>
                  <span className="text-[#86efac]">{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* SOCIAL LINKS */}
      <section className="py-12 bg-[#0f1a0f] text-center">
        <AnimatedSection>
          <h3 className="text-xl font-bold text-[#f0fdf4] mb-4">Follow Us</h3>
          <div className="flex items-center justify-center gap-4">
            {/* Instagram */}
            <a
              href="https://instagram.com/pawcare"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow PawCare on Instagram"
              className="w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ background: '#243524' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4ade80"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="#4ade80" stroke="none" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com/pawcare"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow PawCare on Facebook"
              className="w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ background: '#243524' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="#4ade80"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Twitter / X */}
            <a
              href="https://twitter.com/pawcare"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow PawCare on Twitter"
              className="w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ background: '#243524' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4ade80"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* CLOSING CTA */}
      <section
        className="py-16 text-center"
        style={{ background: 'linear-gradient(to bottom, #16a34a, #0f1a0f)' }}
      >
        <AnimatedSection>
          <h2 className="text-3xl font-extrabold text-white mb-3">
            Ready to Book?
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            Schedule your pet's appointment today
          </p>
          <Link
            to="/book"
            className="inline-block bg-white text-[#16a34a] font-bold rounded-full px-8 py-3 hover:bg-green-50 transition-colors"
          >
            Book Now
          </Link>
        </AnimatedSection>
      </section>
    </div>
  )
}
