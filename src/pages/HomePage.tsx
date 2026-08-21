import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

interface ServiceCard {
  icon: string
  name: string
  description: string
  price: string
}

interface WhyCard {
  icon: string
  title: string
  description: string
}

interface StatItem {
  number: string
  label: string
}

interface TeamMember {
  name: string
  title: string
  credentials: string
  photo: string
}

interface Testimonial {
  quote: string
  author: string
  pet: string
}

interface FormState {
  petName: string
  service: string
  phone: string
}

const services: ServiceCard[] = [
  {
    icon: '🏥',
    name: 'Veterinary Care',
    description: 'Comprehensive checkups, vaccinations, diagnostics & surgery by certified vets',
    price: 'From $45',
  },
  {
    icon: '✂️',
    name: 'Professional Grooming',
    description: 'Full bath, breed-specific cuts, nail trim, ear cleaning & teeth brushing',
    price: 'From $35',
  },
  {
    icon: '🏠',
    name: 'Pet Boarding',
    description: 'Cage-free, safe & loving overnight stays with 24/7 staff supervision',
    price: 'From $35/night',
  },
  {
    icon: '🎓',
    name: 'Obedience Training',
    description: 'Science-based obedience training, behavioral correction & socialization',
    price: 'From $80/session',
  },
  {
    icon: '🚗',
    name: 'Pet Taxi',
    description: 'Safe, air-conditioned transport to vet appointments or grooming sessions',
    price: 'From $25',
  },
  {
    icon: '🛒',
    name: 'Pet Store',
    description: 'Premium food, accessories, toys & health supplies for all animals',
    price: 'Shop In-Store',
  },
]

const whyCards: WhyCard[] = [
  {
    icon: '🩺',
    title: 'Certified Veterinarians',
    description: 'All vets hold DVM degrees with ongoing specialist training',
  },
  {
    icon: '🌿',
    title: 'Cage-Free Boarding',
    description: 'Spacious, natural environments for stress-free stays',
  },
  {
    icon: '🚨',
    title: '24/7 Emergency Care',
    description: 'Round-the-clock emergency vet services, every day of the year',
  },
  {
    icon: '💛',
    title: 'Personalized Care Plans',
    description: 'Tailored health and wellness plans for every individual pet',
  },
]

const stats: StatItem[] = [
  { number: '5,000+', label: 'Happy Pets Served' },
  { number: '8 Years', label: 'In Business' },
  { number: '20+', label: 'Expert Staff Members' },
  { number: '98%', label: 'Client Return Rate' },
]

const team: TeamMember[] = [
  {
    name: 'Dr. Priya Nair',
    title: 'Lead Veterinarian',
    credentials: 'DVM, 10+ years | Specialist in small animals & exotic pets',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
  },
  {
    name: 'Sophie Green',
    title: 'Senior Groomer',
    credentials: '6 years experience | Certified in breed-specific styling',
    photo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
  },
  {
    name: 'Marcus Webb',
    title: 'Training Specialist',
    credentials: 'CPDT-KA certified | 5 years | Positive reinforcement expert',
    photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80',
  },
]

const galleryPhotos: string[] = [
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80',
  'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=600&q=80',
  'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=600&q=80',
  'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&q=80',
]

const testimonials: Testimonial[] = [
  {
    quote:
      'Bella absolutely loves coming here! The staff treats her like royalty. Dr. Nair is phenomenal — thorough, caring, and always explains everything clearly.',
    author: 'Sarah M.',
    pet: 'French Bulldog Owner',
  },
  {
    quote:
      "Dr. Nair literally saved our cat's life during an emergency last winter. The 24/7 service is no gimmick — they were there when we needed them most.",
    author: 'James T.',
    pet: 'Cat Owner',
  },
  {
    quote:
      'Best groomer in the entire city! Sophie knows exactly what my Golden needs and Max always leaves looking and smelling incredible. Highly recommend!',
    author: 'Priya K.',
    pet: 'Golden Retriever Owner',
  },
]

export default function HomePage() {
  const [form, setForm] = useState<FormState>({
    petName: '',
    service: '',
    phone: '',
  })

  const servicesRef = useRef<HTMLElement>(null)
  const whyRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)
  const teamRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  const servicesInView = useInView(servicesRef, { once: true, margin: '-80px' })
  const whyInView = useInView(whyRef, { once: true, margin: '-80px' })
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })
  const teamInView = useInView(teamRef, { once: true, margin: '-80px' })
  const galleryInView = useInView(galleryRef, { once: true, margin: '-80px' })
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-80px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div style={{ backgroundColor: '#0f1a0f', minHeight: '100vh' }}>
      {/* SECTION 1: Hero */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.6), transparent)',
          }}
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <button
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 mb-6"
                style={{
                  borderColor: '#16a34a',
                  color: '#4ade80',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                }}
              >
                🐾 Trusted by 5,000+ Pet Owners
              </button>
              <h1
                className="font-extrabold text-3xl sm:text-5xl lg:text-7xl mb-6"
                style={{ color: '#f0fdf4', lineHeight: '1.1' }}
              >
                Premium Care for Your Beloved Pet
              </h1>
              <p
                className="text-lg mb-8"
                style={{ color: '#86efac', maxWidth: '600px' }}
              >
                Veterinary care, grooming, boarding and training — all under one roof
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/book"
                  className="px-8 py-4 rounded-full font-bold text-white transition-transform hover:scale-105"
                  style={{ backgroundColor: '#16a34a' }}
                >
                  Book Appointment
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-4 rounded-full font-bold transition-transform hover:scale-105"
                  style={{
                    border: '2px solid #4ade80',
                    color: '#4ade80',
                  }}
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div
                className="rounded-2xl p-8 backdrop-blur-md"
                style={{
                  backgroundColor: 'rgba(36,53,36,0.9)',
                  border: '1px solid rgba(74,222,128,0.3)',
                }}
              >
                <h3
                  className="text-2xl font-bold mb-6"
                  style={{ color: '#f0fdf4' }}
                >
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🐾</span>
                    <div>
                      <div
                        className="font-bold text-xl"
                        style={{ color: '#4ade80' }}
                      >
                        5,000+
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: '#86efac' }}
                      >
                        Happy Pets
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📅</span>
                    <div>
                      <div
                        className="font-bold text-xl"
                        style={{ color: '#4ade80' }}
                      >
                        8 Years
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: '#86efac' }}
                      >
                        Experience
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">👨‍⚕️</span>
                    <div>
                      <div
                        className="font-bold text-xl"
                        style={{ color: '#4ade80' }}
                      >
                        20+
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: '#86efac' }}
                      >
                        Expert Staff
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Emergency Banner */}
      <div
        className="w-full py-3 text-center text-white font-semibold"
        style={{ backgroundColor: 'rgba(220,38,38,0.9)' }}
      >
        <span>🚨 24/7 Emergency Vet Available — Call </span>
        <motion.span
          className="font-bold"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          +1-800-PAW-HELP
        </motion.span>
        <span> | Walk-ins Welcome</span>
      </div>

      {/* SECTION 3: Services */}
      <section
        ref={servicesRef}
        className="py-20 px-6 lg:px-8"
        style={{ backgroundColor: '#0f1a0f' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="text-sm uppercase mb-2"
              style={{
                color: '#4ade80',
                letterSpacing: '0.15em',
                fontWeight: '600',
              }}
            >
              OUR SERVICES
            </div>
            <h2
              className="text-3xl lg:text-4xl font-extrabold mb-3"
              style={{ color: '#f0fdf4' }}
            >
              Everything Your Pet Needs
            </h2>
            <p style={{ color: '#86efac' }}>
              Premium care across 6 specialized services
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? 'visible' : 'hidden'}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-6 transition-all duration-300"
                style={{
                  backgroundColor: '#243524',
                  border: '1px solid rgba(74,222,128,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(74,222,128,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(74,222,128,0.1)'
                }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: '#f0fdf4' }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: '#86efac' }}
                >
                  {service.description}
                </p>
                <div
                  className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4"
                  style={{
                    backgroundColor: 'rgba(22,163,74,0.2)',
                    color: '#4ade80',
                  }}
                >
                  {service.price}
                </div>
                <div className="mt-4">
                  <Link
                    to="/book"
                    className="text-sm font-semibold hover:underline"
                    style={{ color: '#fbbf24' }}
                  >
                    Book Now →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Why PawCare */}
      <section
        ref={whyRef}
        className="py-20 px-6 lg:px-8"
        style={{ backgroundColor: '#1a2b1a' }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl lg:text-4xl font-extrabold text-center mb-12"
            style={{ color: '#f0fdf4' }}
          >
            Why Choose PawCare?
          </h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={whyInView ? 'visible' : 'hidden'}
          >
            {whyCards.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="rounded-2xl p-6 text-center"
                style={{ backgroundColor: '#243524' }}
              >
                <div className="text-4xl mb-3">{card.icon}</div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: '#f0fdf4' }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: '#86efac' }}
                >
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Stats Strip */}
      <section
        ref={statsRef}
        className="py-16 px-6 lg:px-8"
        style={{ backgroundColor: '#16a34a' }}
      >
        <motion.div
          className="max-w-7xl mx-auto flex flex-wrap gap-8 justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div className="text-4xl font-extrabold text-white">
                {stat.number}
              </div>
              <div
                className="text-sm font-semibold mt-1"
                style={{ color: '#dcfce7' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 6: Team Preview */}
      <section
        ref={teamRef}
        className="py-20 px-6 lg:px-8"
        style={{ backgroundColor: '#0f1a0f' }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl lg:text-4xl font-extrabold text-center mb-12"
            style={{ color: '#f0fdf4' }}
          >
            Meet Our Experts
          </h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#243524' }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5">
                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#f0fdf4' }}
                  >
                    {member.name}
                  </h3>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: '#4ade80' }}
                  >
                    {member.title}
                  </div>
                  <p
                    className="text-sm mt-2"
                    style={{ color: '#86efac' }}
                  >
                    {member.credentials}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link
              to="/team"
              className="text-lg font-semibold hover:underline"
              style={{ color: '#4ade80' }}
            >
              Meet Full Team →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: Gallery Teaser */}
      <section
        ref={galleryRef}
        className="py-20 px-6 lg:px-8"
        style={{ backgroundColor: '#1a2b1a' }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl lg:text-4xl font-extrabold text-center mb-12"
            style={{ color: '#f0fdf4' }}
          >
            Happy Pets 🐾
          </h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
            variants={containerVariants}
            initial="hidden"
            animate={galleryInView ? 'visible' : 'hidden'}
          >
            {galleryPhotos.map((photo, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl overflow-hidden relative"
                style={{ paddingTop: '100%' }}
              >
                <img
                  src={photo}
                  alt={`Happy pet ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="text-lg font-semibold hover:underline"
              style={{ color: '#4ade80' }}
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: Testimonials */}
      <section
        ref={testimonialsRef}
        className="py-20 px-6 lg:px-8"
        style={{ backgroundColor: '#0f1a0f' }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl lg:text-4xl font-extrabold text-center mb-12"
            style={{ color: '#f0fdf4' }}
          >
            What Pet Parents Say
          </h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={testimonialsInView ? 'visible' : 'hidden'}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: '#1a2b1a',
                  border: '1px solid rgba(74,222,128,0.1)',
                }}
              >
                <div className="mb-3">⭐⭐⭐⭐⭐</div>
                <p
                  className="italic text-sm mb-4"
                  style={{ color: '#86efac' }}
                >
                  "{testimonial.quote}"
                </p>
                <div
                  className="font-bold"
                  style={{ color: '#f0fdf4' }}
                >
                  {testimonial.author}
                </div>
                <div
                  className="text-xs"
                  style={{ color: '#4ade80' }}
                >
                  {testimonial.pet}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 9: Book CTA */}
      <section
        ref={ctaRef}
        className="py-20 px-6 lg:px-8"
        style={{
          background: 'linear-gradient(135deg, #1a2b1a, #0f1a0f)',
        }}
      >
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2
              className="text-3xl lg:text-4xl font-extrabold mb-3"
              style={{ color: '#f0fdf4' }}
            >
              Book Your Pet's Next Visit
            </h2>
            <p style={{ color: '#86efac' }}>
              Quick and easy — we'll confirm your booking within 2 hours
            </p>
          </div>

          <form
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              name="petName"
              placeholder="Pet's Name"
              value={form.petName}
              onChange={handleFormChange}
              className="w-full p-3 rounded-xl text-sm"
              style={{
                backgroundColor: '#243524',
                border: '1px solid rgba(74,222,128,0.2)',
                color: '#f0fdf4',
              }}
            />
            <select
              name="service"
              value={form.service}
              onChange={handleFormChange}
              className="w-full p-3 rounded-xl text-sm"
              style={{
                backgroundColor: '#243524',
                border: '1px solid rgba(74,222,128,0.2)',
                color: form.service ? '#f0fdf4' : '#86efac',
              }}
            >
              <option value="">Select Service</option>
              <option value="veterinary">Veterinary Care</option>
              <option value="grooming">Grooming</option>
              <option value="boarding">Boarding</option>
              <option value="training">Training</option>
              <option value="taxi">Pet Taxi</option>
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={form.phone}
              onChange={handleFormChange}
              className="w-full p-3 rounded-xl text-sm"
              style={{
                backgroundColor: '#243524',
                border: '1px solid rgba(74,222,128,0.2)',
                color: '#f0fdf4',
              }}
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm transition-transform hover:scale-105"
              style={{
                backgroundColor: '#0f1a0f',
                color: '#4ade80',
                border: '1px solid #4ade80',
              }}
            >
              Book Now
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  )
}