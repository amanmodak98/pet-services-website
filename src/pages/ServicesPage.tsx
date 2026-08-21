import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Variants, motion, useInView } from 'framer-motion'

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const listItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface PricingRow {
  label: string
  price: string
  note?: string
}

interface ServiceSectionProps {
  backgroundColor: string
  imageUrl: string
  imagePosition: 'left' | 'right'
  icon: string
  title: string
  description: string
  serviceItems: string[]
  pricingRows: PricingRow[]
  buttonLabel: string
  buttonHref: string
  pricingLabel?: string
  extraContent?: React.ReactNode
}

// ─── Reusable Service Section Component ──────────────────────────────────────

function ServiceSection({
  backgroundColor,
  imageUrl,
  imagePosition,
  icon,
  title,
  description,
  serviceItems,
  pricingRows,
  buttonLabel,
  buttonHref,
  pricingLabel,
  extraContent,
}: ServiceSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const imageBlock = (
    <motion.div
      variants={imagePosition === 'left' ? fadeLeft : fadeRight}
      className="w-full lg:w-[40%] flex-shrink-0"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-80 lg:h-[480px] object-cover rounded-2xl shadow-2xl"
        loading="lazy"
      />
    </motion.div>
  )

  const contentBlock = (
    <motion.div
      variants={imagePosition === 'left' ? fadeRight : fadeLeft}
      className="w-full lg:w-[60%] flex flex-col gap-6"
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-3">
        <span className="text-4xl">{icon}</span>
        <h2 className="text-3xl font-extrabold" style={{ color: '#f0fdf4' }}>
          {title}
        </h2>
      </div>

      {/* Description */}
      <p className="text-base leading-relaxed" style={{ color: '#86efac' }}>
        {description}
      </p>

      {/* Services List */}
      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 gap-2"
      >
        {serviceItems.map((item) => (
          <motion.li
            key={item}
            variants={listItem}
            className="flex items-start gap-2 text-sm"
            style={{ color: '#f0fdf4' }}
          >
            <span style={{ color: '#4ade80' }} className="mt-0.5 flex-shrink-0">
              ✓
            </span>
            {item}
          </motion.li>
        ))}
      </motion.ul>

      {/* Pricing Table */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#86efac' }}>
          {pricingLabel ?? 'Pricing'}
        </h3>
        <div className="rounded-xl overflow-hidden border" style={{ borderColor: '#243524' }}>
          {pricingRows.map((row, index) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-4 py-3 text-sm"
              style={{
                backgroundColor: index % 2 === 0 ? '#243524' : '#1a2b1a',
                color: '#f0fdf4',
              }}
            >
              <span>
                {row.label}
                {row.note && (
                  <span className="ml-2 text-xs" style={{ color: '#4ade80' }}>
                    ({row.note})
                  </span>
                )}
              </span>
              <span className="font-bold" style={{ color: '#4ade80' }}>
                {row.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Extra Content */}
      {extraContent}

      {/* CTA Button */}
      <div>
        <Link
          to={buttonHref}
          className="inline-block px-6 py-3 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
          style={{ backgroundColor: '#16a34a' }}
        >
          {buttonLabel}
        </Link>
      </div>
    </motion.div>
  )

  return (
    <section ref={sectionRef} className="py-20" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={`flex flex-col ${
            imagePosition === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
          } items-center gap-12`}
        >
          {imageBlock}
          {contentBlock}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={heroRef}
      className="relative min-h-[60vh] flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 pt-24 pb-16 flex flex-col items-center gap-6">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 text-sm" style={{ color: '#86efac' }}>
            <li>
              <Link
                to="/"
                className="hover:underline transition-colors"
                style={{ color: '#86efac' }}
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" style={{ color: '#4ade80' }}>
              Services
            </li>
          </ol>
        </motion.nav>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl lg:text-6xl font-extrabold"
          style={{ color: '#f0fdf4' }}
        >
          Our Pet Services
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg max-w-xl"
          style={{ color: '#86efac' }}
        >
          Premium care across 6 specialized service areas
        </motion.p>
      </div>
    </section>
  )
}

// ─── Final CTA Section ────────────────────────────────────────────────────────

function FinalCTASection() {
  const ctaRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ctaRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={ctaRef}
      className="py-16"
      style={{
        background: 'linear-gradient(135deg, #16a34a, #0f1a0f)',
      }}
    >
      <div className="max-w-3xl mx-auto px-4 text-center flex flex-col items-center gap-6">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-4xl font-extrabold"
          style={{ color: '#f0fdf4' }}
        >
          Ready to Book?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="text-lg"
          style={{ color: '#86efac' }}
        >
          Our team is standing by to care for your pet
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/book"
            className="inline-block px-10 py-4 rounded-full text-lg font-bold transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 shadow-xl"
            style={{ backgroundColor: '#ffffff', color: '#16a34a' }}
          >
            Book Now
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: '#0f1a0f' }}>
      {/* Hero */}
      <HeroSection />

      {/* Section 1 — Veterinary Care */}
      <ServiceSection
        backgroundColor="#0f1a0f"
        imageUrl="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80"
        imagePosition="left"
        icon="🏥"
        title="Veterinary Care"
        description="Our licensed veterinarians provide compassionate, evidence-based medical care for dogs, cats, and small animals. From routine wellness visits to complex surgeries, our clinic is equipped with state-of-the-art diagnostic tools to keep your pet healthy at every stage of life."
        serviceItems={[
          'Wellness exams & vaccinations',
          'Diagnostic imaging (X-ray, ultrasound)',
          'Surgery & post-op care',
          'Dental cleaning & oral health',
          'Emergency 24/7 care',
          'Prescription medications',
        ]}
        pricingRows={[
          { label: 'Wellness Checkup', price: '$45' },
          { label: 'Vaccinations (per dose)', price: '$30' },
          { label: 'Emergency Consultation', price: '$120' },
        ]}
        buttonLabel="Book Appointment"
        buttonHref="/book?service=veterinary"
      />

      {/* Section 2 — Professional Grooming */}
      <ServiceSection
        backgroundColor="#1a2b1a"
        imageUrl="https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=800&q=80"
        imagePosition="right"
        icon="✂️"
        title="Professional Grooming"
        description="Our certified groomers transform your pet with breed-specific styling and spa-quality treatments. We use only pet-safe, hypoallergenic products in a calm, stress-free environment designed to make every grooming session a pleasant experience."
        serviceItems={[
          'Full bath & blow dry',
          'Breed-specific haircuts',
          'Nail trimming & filing',
          'Ear cleaning',
          'Teeth brushing',
          'De-shedding treatment',
        ]}
        pricingLabel="Pricing by Size"
        pricingRows={[
          { label: 'Small', price: '$35', note: 'under 20 lbs' },
          { label: 'Medium', price: '$55', note: '20–50 lbs' },
          { label: 'Large', price: '$75+', note: '50+ lbs' },
        ]}
        buttonLabel="Book Grooming"
        buttonHref="/book?service=grooming"
      />

      {/* Section 3 — Pet Boarding */}
      <ServiceSection
        backgroundColor="#0f1a0f"
        imageUrl="https://images.unsplash.com/photo-1600369672770-985a3f5f7146?w=800&q=80"
        imagePosition="left"
        icon="🏠"
        title="Pet Boarding & Daycare"
        description="Our cage-free boarding facility provides a home-away-from-home experience for your pet. With spacious play areas, cozy sleeping quarters, and round-the-clock staff supervision, your furry family member will be safe, stimulated, and loved while you're away."
        serviceItems={[
          'Spacious play areas',
          'Climate-controlled rooms',
          '24/7 staff supervision',
          'Webcam access for owners',
          'Customized feeding schedules',
          'Medication administration',
        ]}
        pricingRows={[
          { label: 'Daycare (per day)', price: '$35' },
          { label: 'Overnight Boarding', price: '$55/night' },
          { label: 'Weekly Rate (7 nights)', price: '$350' },
        ]}
        buttonLabel="Reserve Spot"
        buttonHref="/book?service=boarding"
      />

      {/* Section 4 — Obedience Training */}
      <ServiceSection
        backgroundColor="#1a2b1a"
        imageUrl="https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&q=80"
        imagePosition="right"
        icon="🎓"
        title="Obedience & Behavioral Training"
        description="Our certified professional dog trainers use positive-reinforcement techniques to build a stronger bond between you and your pet. Whether you have a new puppy or a dog with challenging behaviors, we have a program tailored to your goals."
        serviceItems={[
          'Basic obedience (sit, stay, come)',
          'Leash training',
          'Socialization classes',
          'Behavior modification',
          'Advanced tricks',
          'Puppy kindergarten',
        ]}
        pricingLabel="Packages"
        pricingRows={[
          { label: 'Single Session', price: '$80' },
          { label: '5-Session Package', price: '$360', note: 'save $40' },
          { label: '10-Session Package', price: '$650', note: 'save $150' },
          { label: 'Group Classes', price: '$120/month' },
        ]}
        buttonLabel="Enroll Now"
        buttonHref="/book?service=training"
      />

      {/* Section 5 — Pet Taxi */}
      <ServiceSection
        backgroundColor="#0f1a0f"
        imageUrl="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80"
        imagePosition="left"
        icon="🚗"
        title="Pet Taxi & Transport"
        description="Safe, air-conditioned, and stress-free transportation for your pet. Our professional drivers are trained in pet handling and first aid, ensuring your companion arrives at every destination calm and comfortable. All vehicles are sanitized between rides."
        serviceItems={[
          'Vet appointments',
          'Grooming pickups',
          'Airport transport',
          'Emergency transport',
          'Senior pet assistance',
        ]}
        pricingRows={[
          { label: 'Base Rate (0–5 miles)', price: '$25' },
          { label: 'Per Additional Mile', price: '$3' },
          { label: 'Airport Run', price: '$75 flat' },
          { label: 'Emergency Transport', price: '$100' },
        ]}
        buttonLabel="Request Ride"
        buttonHref="/book?service=taxi"
        extraContent={
          <div>
            <p className="text-sm font-semibold mb-2" style={{ color: '#86efac' }}>
              Coverage Areas
            </p>
            <div className="flex flex-wrap gap-2">
              {['San Francisco', 'Oakland', 'Berkeley', 'San Mateo'].map((city) => (
                <span
                  key={city}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: '#243524', color: '#4ade80' }}
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        }
      />

      {/* Section 6 — Pet Store */}
      <ServiceSection
        backgroundColor="#1a2b1a"
        imageUrl="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80"
        imagePosition="right"
        icon="🛒"
        title="Premium Pet Store"
        description="Our on-site pet store is stocked with the highest-quality nutrition, accessories, and wellness products sourced from trusted brands. Our knowledgeable staff can guide you to the right food, toy, or supplement to support your pet's unique needs."
        serviceItems={[
          'Premium dog & cat food',
          'Raw & freeze-dried options',
          'Toys & enrichment',
          'Beds & crates',
          'Collars, leashes & harnesses',
          'Health supplements',
        ]}
        pricingRows={[]}
        buttonLabel=""
        buttonHref=""
        extraContent={
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold mb-2" style={{ color: '#86efac' }}>
                Brands We Stock
              </p>
              <div className="flex flex-wrap gap-2">
                {['Royal Canin', 'Hills Science Diet', 'Blue Buffalo', 'Wellness', 'Orijen'].map(
                  (brand) => (
                    <span
                      key={brand}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: '#243524', color: '#4ade80' }}
                    >
                      {brand}
                    </span>
                  )
                )}
              </div>
            </div>
            <p className="text-sm font-medium" style={{ color: '#86efac' }}>
              🛍️ Shop In-Store — visit us in person to browse our full selection.
            </p>
          </div>
        }
      />

      {/* Final CTA */}
      <FinalCTASection />
    </div>
  )
}
