import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

interface TeamMember {
  id: number
  name: string
  title: string
  credentials: string
  years: number
  specialties: string[]
  favoriteAnimal: string
  photo: string
  department: 'Veterinary' | 'Grooming' | 'Training' | 'Boarding'
  bio: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Dr. Priya Nair',
    title: 'Lead Veterinarian',
    credentials: 'DVM, MS Internal Medicine',
    years: 10,
    specialties: ['Small Animals', 'Exotic Pets', 'Internal Medicine'],
    favoriteAnimal: 'Dogs',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
    department: 'Veterinary',
    bio: 'Dr. Nair brings 10 years of dedicated experience in small animal and exotic pet medicine. She graduated top of her class from UC Davis School of Veterinary Medicine.',
  },
  {
    id: 2,
    name: 'Dr. James Carter',
    title: 'Emergency Veterinarian',
    credentials: 'DVM, DACVECC',
    years: 8,
    specialties: ['Emergency Care', 'Critical Care', 'Surgery'],
    favoriteAnimal: 'Cats',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
    department: 'Veterinary',
    bio: 'Dr. Carter specializes in emergency and critical care, available around the clock to handle any urgent situation your pet may face.',
  },
  {
    id: 3,
    name: 'Dr. Elena Rossi',
    title: 'Dental & Surgery Specialist',
    credentials: 'DVM, AVDC',
    years: 7,
    specialties: ['Dental Care', 'Orthopedic Surgery', 'Oncology'],
    favoriteAnimal: 'Rabbits',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80',
    department: 'Veterinary',
    bio: 'Dr. Rossi is our dental and surgical specialist with advanced training in orthopedics and soft tissue surgery.',
  },
  {
    id: 4,
    name: 'Amara Osei',
    title: 'Senior Vet Technician',
    credentials: 'CVT, Fear Free Certified',
    years: 6,
    specialties: ['Anesthesia', 'Lab Diagnostics', 'Patient Care'],
    favoriteAnimal: 'Cats',
    photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&q=80',
    department: 'Veterinary',
    bio: 'Amara is our lead vet tech who ensures every patient receives compassionate care during their visit.',
  },
  {
    id: 5,
    name: 'Tyler Brooks',
    title: 'Vet Technician',
    credentials: 'RVT, ISVMA Member',
    years: 4,
    specialties: ['Radiology', 'Pharmacy', 'Client Education'],
    favoriteAnimal: 'Dogs',
    photo: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&q=80',
    department: 'Veterinary',
    bio: 'Tyler handles our diagnostic imaging and pharmacy operations, and is passionate about educating pet owners.',
  },
  {
    id: 6,
    name: 'Sophie Green',
    title: 'Senior Groomer & Stylist',
    credentials: 'Certified Master Groomer',
    years: 6,
    specialties: ['Breed Styling', 'Show Prep', 'Sensitive Pets'],
    favoriteAnimal: 'Poodles',
    photo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    department: 'Grooming',
    bio: 'Sophie is our award-winning groomer with expertise in all breeds, from tiny Chihuahuas to large Great Danes.',
  },
  {
    id: 7,
    name: 'Luisa Fernandez',
    title: 'Pet Groomer',
    credentials: 'NDGAA Certified',
    years: 3,
    specialties: ['Cats', 'De-shedding', 'Puppy First Grooms'],
    favoriteAnimal: 'Cats',
    photo: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=600&q=80',
    department: 'Grooming',
    bio: 'Luisa specializes in cat grooming and working with nervous first-time clients, using only gentle, fear-free techniques.',
  },
  {
    id: 8,
    name: 'Jordan Kim',
    title: 'Groomer & Bather',
    credentials: 'Professional Pet Stylist Certified',
    years: 2,
    specialties: ['Creative Grooming', 'Nail Art', 'Teeth Brushing'],
    favoriteAnimal: 'Small Dogs',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    department: 'Grooming',
    bio: 'Jordan brings creativity and precision to every grooming session, offering both classic and creative styling.',
  },
  {
    id: 9,
    name: 'Marcus Webb',
    title: 'Lead Training Specialist',
    credentials: 'CPDT-KA, AKC CGC Evaluator',
    years: 5,
    specialties: ['Obedience Training', 'Behavioral Modification', 'Puppy Classes'],
    favoriteAnimal: 'German Shepherds',
    photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80',
    department: 'Training',
    bio: 'Marcus uses science-based positive reinforcement methods to help dogs of all ages and backgrounds become well-behaved companions.',
  },
  {
    id: 10,
    name: 'Rachel Tran',
    title: 'Boarding Manager',
    credentials: 'Pet CPR Certified, Animal Behavior Specialist',
    years: 7,
    specialties: ['Boarding', 'Daycare', 'Senior Pet Care'],
    favoriteAnimal: 'Senior Dogs',
    photo: 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=600&q=80',
    department: 'Boarding',
    bio: 'Rachel oversees our boarding and daycare operations, ensuring every pet feels safe, loved, and comfortable during their stay.',
  },
]

type Department = 'All' | 'Veterinary' | 'Grooming' | 'Training' | 'Boarding'

const departments: Department[] = ['All', 'Veterinary', 'Grooming', 'Training', 'Boarding']

interface StatItemProps {
  value: string
  label: string
}

function StatItem({ value, label }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center gap-1"
    >
      <span
        className="text-4xl font-extrabold"
        style={{ color: '#4ade80' }}
      >
        {value}
      </span>
      <span
        className="text-sm text-center"
        style={{ color: '#86efac' }}
      >
        {label}
      </span>
    </motion.div>
  )
}

interface TeamCardProps {
  member: TeamMember
  index: number
}

function TeamCard({ member, index }: TeamCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const firstName = member.name.replace(/^Dr\.\s*/, '').split(' ')[0]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 4) * 0.1 }}
      className="rounded-2xl overflow-hidden relative flex flex-col"
      style={{
        backgroundColor: '#243524',
        border: '1px solid rgba(74,222,128,0.1)',
      }}
    >
      <div className="relative">
        <img
          src={member.photo}
          alt={`Photo of ${member.name}`}
          className="w-full h-52 object-cover object-top"
        />
        <span
          className="absolute top-3 left-3 text-xs font-bold text-white px-2 py-1 rounded-full"
          style={{ backgroundColor: 'rgba(22,163,74,0.9)' }}
        >
          {member.department}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-lg font-bold"
          style={{ color: '#f0fdf4' }}
        >
          {member.name}
        </h3>
        <p
          className="text-sm font-semibold mt-0.5"
          style={{ color: '#4ade80' }}
        >
          {member.title}
        </p>
        <p
          className="text-xs mt-1"
          style={{ color: '#86efac' }}
        >
          {member.credentials}
        </p>
        <p
          className="text-xs mt-1"
          style={{ color: '#86efac' }}
        >
          {member.years} years experience
        </p>

        <div className="flex flex-wrap gap-1 mt-3">
          {member.specialties.map((specialty) => (
            <span
              key={specialty}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: 'rgba(22,163,74,0.15)',
                color: '#4ade80',
              }}
            >
              {specialty}
            </span>
          ))}
        </div>

        <p
          className="text-xs mt-2"
          style={{ color: '#fbbf24' }}
        >
          Fav: {member.favoriteAnimal}
        </p>

        <p
          className="text-xs mt-3 leading-relaxed overflow-hidden"
          style={{
            color: '#86efac',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {member.bio}
        </p>

        <Link
          to="/book"
          className="block mt-4 py-2 text-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: '#16a34a' }}
        >
          Book with {firstName}
        </Link>
      </div>
    </motion.div>
  )
}

export default function TeamPage() {
  const [deptFilter, setDeptFilter] = useState<string>('All')

  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { once: true })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  const filteredMembers = teamMembers.filter(
    (member) => deptFilter === 'All' || member.department === deptFilter
  )

  return (
    <div style={{ backgroundColor: '#0f1a0f', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center min-h-[60vh] pt-24"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          aria-hidden="true"
        />
        <div
          ref={heroRef}
          className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center gap-6"
          >
            <span
              className="inline-block text-sm font-bold px-4 py-2 rounded-full"
              style={{
                backgroundColor: 'rgba(22,163,74,0.85)',
                color: '#f0fdf4',
              }}
            >
              🏆 Award-Winning Care Team
            </span>
            <h1
              className="text-5xl lg:text-6xl font-extrabold leading-tight"
              style={{ color: '#f0fdf4' }}
            >
              Meet Our Pet Experts
            </h1>
            <p
              className="text-lg max-w-xl leading-relaxed"
              style={{ color: '#86efac' }}
            >
              Passionate, certified professionals dedicated to your pet's health and happiness
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Stats Strip */}
      <section
        ref={statsRef}
        className="py-12"
        style={{ backgroundColor: '#1a2b1a' }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="10+" label="Certified Veterinarians" />
            <StatItem value="20+" label="Years Combined Experience" />
            <StatItem value="15+" label="Specialty Certifications" />
            <StatItem value="5,000+" label="Pets Treated" />
          </div>
        </div>
      </section>

      {/* Team Grid Section */}
      <section
        ref={gridRef}
        className="py-20"
        style={{ backgroundColor: '#0f1a0f' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className="rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: deptFilter === dept ? '#16a34a' : '#243524',
                  color: deptFilter === dept ? '#ffffff' : '#86efac',
                  // focusRingColor: '#4ade80',
                }}
                aria-pressed={deptFilter === dept}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section
        ref={ctaRef}
        className="py-16"
        style={{ backgroundColor: '#1a2b1a' }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col items-center text-center gap-6"
          >
            <h2
              className="text-3xl font-extrabold"
              style={{ color: '#f0fdf4' }}
            >
              Join Our Team
            </h2>
            <p
              className="text-base max-w-md leading-relaxed"
              style={{ color: '#86efac' }}
            >
              We're always looking for passionate animal lovers to join PawCare
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="rounded-full px-8 py-3 font-bold text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  border: '2px solid #4ade80',
                  color: '#4ade80',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget
                  btn.style.backgroundColor = 'rgba(74,222,128,0.1)'
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget
                  btn.style.backgroundColor = 'transparent'
                }}
              >
                View Open Positions
              </button>
              <Link
                to="/book"
                className="rounded-full px-8 py-3 font-bold text-base text-white transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: '#16a34a' }}
              >
                Book an Appointment
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
