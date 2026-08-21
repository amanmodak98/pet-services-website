import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface PetInfo {
  name: string
  type: string
  breed: string
  ageValue: string
  ageUnit: 'months' | 'years'
  weightValue: string
  weightUnit: 'kg' | 'lbs'
  medicalConditions: string
}

interface ServiceInfo {
  category: string
  specificService: string
  preferredStaff: string
  specialInstructions: string
}

interface TimeInfo {
  date: string
  timeSlot: string
}

interface OwnerInfo {
  name: string
  email: string
  phone: string
  emergencyContactName: string
  emergencyContactPhone: string
  howDidYouFind: string
}

const petTypes = [
  { label: 'Dog', icon: '🐕' },
  { label: 'Cat', icon: '🐈' },
  { label: 'Bird', icon: '🦜' },
  { label: 'Rabbit', icon: '🐰' },
  { label: 'Small Animal', icon: '🐹' },
  { label: 'Reptile', icon: '🦎' },
  { label: 'Other', icon: '🐾' },
]

const serviceCategories = [
  { label: 'Veterinary Care', icon: '🏥' },
  { label: 'Grooming', icon: '✂️' },
  { label: 'Boarding', icon: '🏠' },
  { label: 'Training', icon: '🎓' },
  { label: 'Pet Taxi', icon: '🚗' },
]

const specificServices: Record<string, string[]> = {
  'Veterinary Care': [
    'Wellness Exam',
    'Vaccinations',
    'Dental Cleaning',
    'Emergency Visit',
    'Surgery Consultation',
    'Follow-up Visit',
  ],
  Grooming: [
    'Full Groom + Bath',
    'Bath Only',
    'Nail Trim',
    'Teeth Brushing',
    'De-shedding Treatment',
    'Puppy First Groom',
  ],
  Boarding: [
    'Day Care',
    'Overnight Stay (1 night)',
    'Weekend Stay (2-3 nights)',
    'Weekly Stay (7 nights)',
    'Extended Stay',
  ],
  Training: [
    'Puppy Class',
    'Basic Obedience',
    'Advanced Training',
    'Private Session',
    'Behavioral Consultation',
    'Group Class',
  ],
  'Pet Taxi': ['One-Way Trip', 'Round Trip', 'Airport Run', 'Emergency Transport'],
}

const staffMembers = [
  'No preference',
  'Dr. Priya Nair',
  'Dr. James Carter',
  'Dr. Elena Rossi',
  'Sophie Green',
  'Luisa Fernandez',
  'Jordan Kim',
  'Marcus Webb',
  'Rachel Tran',
]

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
]

const fullSlotIndexes = [1, 4, 7]

const durationEstimates: Record<string, string> = {
  'Veterinary Care': '30–60 minutes',
  Grooming: '1–3 hours',
  Boarding: 'All day / overnight',
  Training: '45–60 minutes',
  'Pet Taxi': 'Varies by distance',
}

const howDidYouFindOptions = [
  'Google Search',
  'Social Media',
  'Friend/Family Referral',
  'Vet Referral',
  'Walk-By / Local',
  'Other',
]

const inputStyle: React.CSSProperties = {
  backgroundColor: '#243524',
  border: '1px solid rgba(74,222,128,0.2)',
  color: '#f0fdf4',
  borderRadius: '0.75rem',
  padding: '0.75rem 1rem',
  width: '100%',
  fontFamily: 'Nunito, sans-serif',
  outline: 'none',
  boxSizing: 'border-box',
}

const stepVariants = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
}

const defaultPetInfo: PetInfo = {
  name: '',
  type: '',
  breed: '',
  ageValue: '',
  ageUnit: 'years',
  weightValue: '',
  weightUnit: 'kg',
  medicalConditions: '',
}

const defaultServiceInfo: ServiceInfo = {
  category: '',
  specificService: '',
  preferredStaff: 'No preference',
  specialInstructions: '',
}

const defaultTimeInfo: TimeInfo = {
  date: '',
  timeSlot: '',
}

const defaultOwnerInfo: OwnerInfo = {
  name: '',
  email: '',
  phone: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  howDidYouFind: '',
}

function Step1Pet({
  petInfo,
  setPetInfo,
}: {
  petInfo: PetInfo
  setPetInfo: React.Dispatch<React.SetStateAction<PetInfo>>
}) {
  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{
        backgroundColor: '#1a2b1a',
        border: '1px solid rgba(74,222,128,0.1)',
      }}
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#f0fdf4' }}>
        Tell Us About Your Pet
      </h2>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          Pet's Name *
        </label>
        <input
          type="text"
          placeholder="e.g. Bella"
          value={petInfo.name}
          onChange={(e) => setPetInfo({ ...petInfo, name: e.target.value })}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #16a34a'
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none'
          }}
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          Pet Type *
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-2">
          {petTypes.map((pet) => (
            <button
              key={pet.label}
              type="button"
              onClick={() => setPetInfo({ ...petInfo, type: pet.label })}
              className="rounded-xl p-3 text-center flex flex-col items-center gap-1 text-sm font-semibold transition-all"
              style={{
                backgroundColor: petInfo.type === pet.label ? '#16a34a' : '#243524',
                border:
                  petInfo.type === pet.label
                    ? '2px solid #16a34a'
                    : '2px solid rgba(74,222,128,0.2)',
                color: petInfo.type === pet.label ? '#ffffff' : '#86efac',
              }}
            >
              <span className="text-2xl">{pet.icon}</span>
              <span className="text-xs">{pet.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          Breed (optional)
        </label>
        <input
          type="text"
          placeholder="e.g. Golden Retriever"
          value={petInfo.breed}
          onChange={(e) => setPetInfo({ ...petInfo, breed: e.target.value })}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #16a34a'
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none'
          }}
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          Age
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="0"
            value={petInfo.ageValue}
            onChange={(e) => setPetInfo({ ...petInfo, ageValue: e.target.value })}
            style={{ ...inputStyle, width: '70%' }}
            onFocus={(e) => {
              e.target.style.outline = '2px solid #16a34a'
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none'
            }}
          />
          <select
            value={petInfo.ageUnit}
            onChange={(e) =>
              setPetInfo({ ...petInfo, ageUnit: e.target.value as 'months' | 'years' })
            }
            style={{ ...inputStyle, width: '30%' }}
            onFocus={(e) => {
              e.target.style.outline = '2px solid #16a34a'
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none'
            }}
          >
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          Weight
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="0"
            value={petInfo.weightValue}
            onChange={(e) => setPetInfo({ ...petInfo, weightValue: e.target.value })}
            style={{ ...inputStyle, width: '70%' }}
            onFocus={(e) => {
              e.target.style.outline = '2px solid #16a34a'
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none'
            }}
          />
          <select
            value={petInfo.weightUnit}
            onChange={(e) =>
              setPetInfo({ ...petInfo, weightUnit: e.target.value as 'kg' | 'lbs' })
            }
            style={{ ...inputStyle, width: '30%' }}
            onFocus={(e) => {
              e.target.style.outline = '2px solid #16a34a'
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none'
            }}
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          Medical Conditions / Allergies (optional)
        </label>
        <textarea
          rows={4}
          placeholder="Any conditions we should know about..."
          value={petInfo.medicalConditions}
          onChange={(e) => setPetInfo({ ...petInfo, medicalConditions: e.target.value })}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #16a34a'
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none'
          }}
        />
      </div>
    </div>
  )
}

function Step2Service({
  serviceInfo,
  setServiceInfo,
}: {
  serviceInfo: ServiceInfo
  setServiceInfo: React.Dispatch<React.SetStateAction<ServiceInfo>>
}) {
  const handleCategoryChange = (category: string) => {
    setServiceInfo({
      ...serviceInfo,
      category,
      specificService: '',
    })
  }

  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{
        backgroundColor: '#1a2b1a',
        border: '1px solid rgba(74,222,128,0.1)',
      }}
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#f0fdf4' }}>
        Select a Service
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3" style={{ color: '#86efac' }}>
          Service Category *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {serviceCategories.map((category) => (
            <button
              key={category.label}
              type="button"
              onClick={() => handleCategoryChange(category.label)}
              className="rounded-2xl p-4 flex flex-col items-center gap-2 transition-all"
              style={{
                backgroundColor:
                  serviceInfo.category === category.label ? '#16a34a' : '#243524',
                border:
                  serviceInfo.category === category.label
                    ? '2px solid #16a34a'
                    : '2px solid rgba(74,222,128,0.2)',
                color: serviceInfo.category === category.label ? '#ffffff' : '#86efac',
              }}
            >
              <span className="text-3xl">{category.icon}</span>
              <span className="text-sm font-bold text-center">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {serviceInfo.category && (
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-3" style={{ color: '#86efac' }}>
            Specific Service *
          </label>
          <div className="space-y-2">
            {specificServices[serviceInfo.category].map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => setServiceInfo({ ...serviceInfo, specificService: service })}
                className="w-full rounded-xl p-3 px-4 text-left flex items-center justify-between transition-all"
                style={{
                  backgroundColor:
                    serviceInfo.specificService === service
                      ? 'rgba(74,222,128,0.1)'
                      : '#243524',
                  border:
                    serviceInfo.specificService === service
                      ? '2px solid #4ade80'
                      : '2px solid rgba(74,222,128,0.2)',
                  color: '#f0fdf4',
                }}
              >
                <span className="font-semibold text-sm">{service}</span>
                {serviceInfo.specificService === service && (
                  <span style={{ color: '#4ade80' }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          Preferred Staff Member (optional)
        </label>
        <select
          value={serviceInfo.preferredStaff}
          onChange={(e) => setServiceInfo({ ...serviceInfo, preferredStaff: e.target.value })}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #16a34a'
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none'
          }}
        >
          {staffMembers.map((staff) => (
            <option key={staff} value={staff}>
              {staff}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          Special Instructions (optional)
        </label>
        <textarea
          rows={3}
          placeholder="Any special instructions or notes..."
          value={serviceInfo.specialInstructions}
          onChange={(e) =>
            setServiceInfo({ ...serviceInfo, specialInstructions: e.target.value })
          }
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #16a34a'
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none'
          }}
        />
      </div>
    </div>
  )
}

function Step3Time({
  timeInfo,
  setTimeInfo,
  serviceCategory,
}: {
  timeInfo: TimeInfo
  setTimeInfo: React.Dispatch<React.SetStateAction<TimeInfo>>
  serviceCategory: string
}) {
  const minDate = new Date().toISOString().split('T')[0]

  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{
        backgroundColor: '#1a2b1a',
        border: '1px solid rgba(74,222,128,0.1)',
      }}
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#f0fdf4' }}>
        Choose Date & Time
      </h2>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          Select Date *
        </label>
        <input
          type="date"
          min={minDate}
          value={timeInfo.date}
          onChange={(e) => setTimeInfo({ ...timeInfo, date: e.target.value })}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #16a34a'
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none'
          }}
        />
      </div>

      {serviceCategory && durationEstimates[serviceCategory] && (
        <div
          className="rounded-xl p-3 mb-5"
          style={{
            backgroundColor: '#243524',
            border: '1px solid rgba(74,222,128,0.2)',
          }}
        >
          <p className="text-sm" style={{ color: '#86efac' }}>
            <span className="font-semibold">Estimated duration:</span>{' '}
            {durationEstimates[serviceCategory]}
          </p>
        </div>
      )}

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-3" style={{ color: '#86efac' }}>
          Select Time Slot *
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {timeSlots.map((slot, index) => {
            const isFull = fullSlotIndexes.includes(index)
            const isSelected = timeInfo.timeSlot === slot

            return (
              <button
                key={slot}
                type="button"
                onClick={() => !isFull && setTimeInfo({ ...timeInfo, timeSlot: slot })}
                disabled={isFull}
                className="rounded-xl p-3 text-center font-semibold text-sm transition-all relative"
                style={{
                  backgroundColor: isFull
                    ? '#1a2b1a'
                    : isSelected
                    ? '#16a34a'
                    : '#243524',
                  border: isFull
                    ? '1px solid rgba(134,239,172,0.1)'
                    : isSelected
                    ? '2px solid #16a34a'
                    : '2px solid rgba(74,222,128,0.2)',
                  color: isFull
                    ? 'rgba(134,239,172,0.5)'
                    : isSelected
                    ? '#ffffff'
                    : '#f0fdf4',
                  cursor: isFull ? 'not-allowed' : 'pointer',
                  opacity: isFull ? 0.5 : 1,
                }}
              >
                {slot}
                {isFull && (
                  <span
                    className="block text-xs mt-1"
                    style={{ color: 'rgba(134,239,172,0.5)' }}
                  >
                    Full
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Step4Owner({
  ownerInfo,
  setOwnerInfo,
}: {
  ownerInfo: OwnerInfo
  setOwnerInfo: React.Dispatch<React.SetStateAction<OwnerInfo>>
}) {
  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{
        backgroundColor: '#1a2b1a',
        border: '1px solid rgba(74,222,128,0.1)',
      }}
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#f0fdf4' }}>
        Contact Information
      </h2>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          Your Name *
        </label>
        <input
          type="text"
          placeholder="Full name"
          value={ownerInfo.name}
          onChange={(e) => setOwnerInfo({ ...ownerInfo, name: e.target.value })}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #16a34a'
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none'
          }}
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          Email *
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={ownerInfo.email}
          onChange={(e) => setOwnerInfo({ ...ownerInfo, email: e.target.value })}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #16a34a'
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none'
          }}
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          Phone *
        </label>
        <input
          type="tel"
          placeholder="+1 234 567 8900"
          value={ownerInfo.phone}
          onChange={(e) => setOwnerInfo({ ...ownerInfo, phone: e.target.value })}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #16a34a'
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none'
          }}
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          Emergency Contact Name *
        </label>
        <input
          type="text"
          placeholder="Full name"
          value={ownerInfo.emergencyContactName}
          onChange={(e) =>
            setOwnerInfo({ ...ownerInfo, emergencyContactName: e.target.value })
          }
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #16a34a'
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none'
          }}
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          Emergency Contact Phone *
        </label>
        <input
          type="tel"
          placeholder="+1 234 567 8900"
          value={ownerInfo.emergencyContactPhone}
          onChange={(e) =>
            setOwnerInfo({ ...ownerInfo, emergencyContactPhone: e.target.value })
          }
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #16a34a'
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none'
          }}
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: '#86efac' }}>
          How did you find us?
        </label>
        <select
          value={ownerInfo.howDidYouFind}
          onChange={(e) => setOwnerInfo({ ...ownerInfo, howDidYouFind: e.target.value })}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #16a34a'
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none'
          }}
        >
          <option value="">Select an option</option>
          {howDidYouFindOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

function ConfirmationScreen({
  petInfo,
  serviceInfo,
  timeInfo,
  ownerInfo,
  onBookAnother,
}: {
  petInfo: PetInfo
  serviceInfo: ServiceInfo
  timeInfo: TimeInfo
  ownerInfo: OwnerInfo
  onBookAnother: () => void
}) {
  return (
    <div className="py-20 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
        style={{ backgroundColor: '#16a34a' }}
      >
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="#ffffff"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>

      <h2 className="text-3xl font-extrabold mt-6" style={{ color: '#f0fdf4' }}>
        Booking Request Received! 🐾
      </h2>

      <p className="text-base mt-3" style={{ color: '#86efac' }}>
        We'll confirm your appointment via SMS within 2 hours.
      </p>

      <div
        className="rounded-2xl p-6 mt-8 max-w-md mx-auto"
        style={{
          backgroundColor: '#1a2b1a',
          border: '1px solid rgba(74,222,128,0.2)',
        }}
      >
        <h3 className="text-lg font-bold mb-4" style={{ color: '#f0fdf4' }}>
          Appointment Summary
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm" style={{ color: '#86efac' }}>
              Pet
            </span>
            <span className="text-sm font-semibold" style={{ color: '#f0fdf4' }}>
              {petInfo.name} ({petInfo.type})
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm" style={{ color: '#86efac' }}>
              Service
            </span>
            <span className="text-sm font-semibold text-right" style={{ color: '#f0fdf4' }}>
              {serviceInfo.specificService} — {serviceInfo.category}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm" style={{ color: '#86efac' }}>
              Date
            </span>
            <span className="text-sm font-semibold" style={{ color: '#f0fdf4' }}>
              {timeInfo.date}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm" style={{ color: '#86efac' }}>
              Time
            </span>
            <span className="text-sm font-semibold" style={{ color: '#f0fdf4' }}>
              {timeInfo.timeSlot}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm" style={{ color: '#86efac' }}>
              Owner
            </span>
            <span className="text-sm font-semibold" style={{ color: '#f0fdf4' }}>
              {ownerInfo.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm" style={{ color: '#86efac' }}>
              Phone
            </span>
            <span className="text-sm font-semibold" style={{ color: '#f0fdf4' }}>
              {ownerInfo.phone}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <Link
          to="/"
          className="rounded-full px-8 py-3 font-bold inline-block transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#16a34a', color: '#ffffff' }}
        >
          Back to Home
        </Link>

        <button
          onClick={onBookAnother}
          className="rounded-full px-8 py-3 font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#243524', color: '#86efac' }}
        >
          Book Another
        </button>
      </div>
    </div>
  )
}

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [petInfo, setPetInfo] = useState<PetInfo>(defaultPetInfo)
  const [serviceInfo, setServiceInfo] = useState<ServiceInfo>(defaultServiceInfo)
  const [timeInfo, setTimeInfo] = useState<TimeInfo>(defaultTimeInfo)
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo>(defaultOwnerInfo)
  const [confirmed, setConfirmed] = useState(false)

  const isStep1Valid = petInfo.name.trim() !== '' && petInfo.type !== ''
  const isStep2Valid = serviceInfo.category !== '' && serviceInfo.specificService !== ''
  const isStep3Valid = timeInfo.date !== '' && timeInfo.timeSlot !== ''
  const isStep4Valid =
    ownerInfo.name.trim() !== '' &&
    ownerInfo.email.trim() !== '' &&
    ownerInfo.phone.trim() !== '' &&
    ownerInfo.emergencyContactName.trim() !== '' &&
    ownerInfo.emergencyContactPhone.trim() !== ''

  const stepValidation = [isStep1Valid, isStep2Valid, isStep3Valid, isStep4Valid]
  const isCurrentStepValid = stepValidation[step - 1]

  const handleNext = () => {
    if (step < 4 && isCurrentStepValid) {
      setStep(step + 1)
    } else if (step === 4 && isStep4Valid) {
      setConfirmed(true)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleBookAnother = () => {
    setStep(1)
    setConfirmed(false)
    setPetInfo(defaultPetInfo)
    setServiceInfo(defaultServiceInfo)
    setTimeInfo(defaultTimeInfo)
    setOwnerInfo(defaultOwnerInfo)
  }

  const stepLabels = ['Your Pet', 'Service', 'Pick Time', 'Your Details']

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f1a0f' }}>
      <div className="max-w-3xl mx-auto px-4 py-12 pt-28">
        <h1 className="text-3xl font-extrabold text-center mb-2" style={{ color: '#f0fdf4' }}>
          Book an Appointment
        </h1>

        {!confirmed && (
          <div className="py-8">
            <div className="flex items-center justify-center">
              {stepLabels.map((label, index) => {
                const stepNumber = index + 1
                const isCompleted = step > stepNumber
                const isActive = step === stepNumber
                const isFuture = step < stepNumber

                return (
                  <div key={stepNumber} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
                        style={{
                          backgroundColor: isCompleted
                            ? '#4ade80'
                            : isActive
                            ? '#16a34a'
                            : 'transparent',
                          border: isFuture ? '2px solid rgba(134,239,172,0.3)' : 'none',
                          color: isCompleted
                            ? '#0f1a0f'
                            : isActive
                            ? '#ffffff'
                            : '#86efac',
                        }}
                      >
                        {isCompleted ? '✓' : stepNumber}
                      </div>
                      <span
                        className="text-xs mt-1 font-semibold hidden sm:block"
                        style={{
                          color: isActive ? '#4ade80' : isFuture ? '#86efac' : '#4ade80',
                          fontWeight: isActive ? 700 : 400,
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    {index < stepLabels.length - 1 && (
                      <div
                        className="h-0.5 w-12 sm:w-20 mx-1 mb-5 sm:mb-0 transition-all duration-300"
                        style={{
                          backgroundColor:
                            step > stepNumber ? '#4ade80' : 'rgba(134,239,172,0.2)',
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {confirmed ? (
          <ConfirmationScreen
            petInfo={petInfo}
            serviceInfo={serviceInfo}
            timeInfo={timeInfo}
            ownerInfo={ownerInfo}
            onBookAnother={handleBookAnother}
          />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <Step1Pet petInfo={petInfo} setPetInfo={setPetInfo} />
              )}
              {step === 2 && (
                <Step2Service serviceInfo={serviceInfo} setServiceInfo={setServiceInfo} />
              )}
              {step === 3 && (
                <Step3Time
                  timeInfo={timeInfo}
                  setTimeInfo={setTimeInfo}
                  serviceCategory={serviceInfo.category}
                />
              )}
              {step === 4 && (
                <Step4Owner ownerInfo={ownerInfo} setOwnerInfo={setOwnerInfo} />
              )}

              <div className="flex justify-between mt-6">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="rounded-xl px-6 py-3 font-semibold transition-opacity"
                    style={{ backgroundColor: '#243524', color: '#86efac' }}
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}
                <button
                  onClick={handleNext}
                  disabled={!isCurrentStepValid}
                  className="rounded-xl px-6 py-3 font-bold transition-opacity"
                  style={{
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    opacity: isCurrentStepValid ? 1 : 0.5,
                    cursor: isCurrentStepValid ? 'pointer' : 'not-allowed',
                  }}
                >
                  {step === 4 ? 'Confirm Booking' : 'Next'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
