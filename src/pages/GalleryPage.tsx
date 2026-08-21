import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

interface Photo {
  id: number
  url: string
  category: string
  label: string
}

const photos: Photo[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80', category: 'Dogs', label: 'Golden Retriever' },
  { id: 2, url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80', category: 'Cats', label: 'British Shorthair' },
  { id: 3, url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80', category: 'Dogs', label: 'Beagle' },
  { id: 4, url: 'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=600&q=80', category: 'Cats', label: 'Tabby Cat' },
  { id: 5, url: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=600&q=80', category: 'Dogs', label: 'Bulldog' },
  { id: 6, url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&q=80', category: 'Cats', label: 'Orange Cat' },
  { id: 7, url: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=600&q=80', category: 'Grooming', label: 'Spa Day' },
  { id: 8, url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80', category: 'Dogs', label: 'Labrador' },
  { id: 9, url: 'https://images.unsplash.com/photo-1573865526739-10c1d3a1b3d4?w=600&q=80', category: 'Cats', label: 'White Cat' },
  { id: 10, url: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&q=80', category: 'Training', label: 'Obedience Class' },
  { id: 11, url: 'https://images.unsplash.com/photo-1600369672770-985a3f5f7146?w=600&q=80', category: 'Boarding', label: 'Playroom' },
  { id: 12, url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80', category: 'Dogs', label: 'Husky' },
  { id: 13, url: 'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=600&q=80', category: 'Exotic', label: 'Parrot' },
  { id: 14, url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80', category: 'Dogs', label: 'Pomeranian' },
  { id: 15, url: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=600&q=80', category: 'Cats', label: 'Siamese Cat' },
  { id: 16, url: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&q=80', category: 'Exotic', label: 'Rabbit' },
  { id: 17, url: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&q=80', category: 'Grooming', label: 'Haircut' },
  { id: 18, url: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&q=80', category: 'Boarding', label: 'Nap Time' },
]

const filterCategories: string[] = ['All', 'Dogs', 'Cats', 'Grooming', 'Boarding', 'Training', 'Exotic']

interface GalleryCardProps {
  photo: Photo
  index: number
  onOpen: (index: number) => void
}

function GalleryCard({ photo, index, onOpen }: GalleryCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{ backgroundColor: '#243524' }}
      onClick={() => onOpen(index)}
      role="button"
      tabIndex={0}
      aria-label={`Open photo: ${photo.label}`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen(index)
        }
      }}
    >
      <img
        src={photo.url}
        alt={photo.label}
        className="w-full h-64 object-cover block"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
        <span className="text-white text-lg font-bold drop-shadow">{photo.label}</span>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: '#16a34a', color: '#f0fdf4' }}
        >
          {photo.category}
        </span>
      </div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filteredPhotos: Photo[] = filter === 'All'
    ? photos
    : photos.filter((photo) => photo.category === filter)

  function openLightbox(index: number): void {
    setLightbox(index)
  }

  function closeLightbox(): void {
    setLightbox(null)
  }

  function navigatePrev(): void {
    setLightbox((current) => {
      if (current === null) return null
      return current > 0 ? current - 1 : current
    })
  }

  function navigateNext(): void {
    setLightbox((current) => {
      if (current === null) return null
      return current < filteredPhotos.length - 1 ? current + 1 : current
    })
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (lightbox === null) return
      if (event.key === 'Escape') {
        closeLightbox()
      } else if (event.key === 'ArrowLeft') {
        navigatePrev()
      } else if (event.key === 'ArrowRight') {
        navigateNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightbox, filteredPhotos.length])

  const activePhoto: Photo | null = lightbox !== null ? filteredPhotos[lightbox] ?? null : null

  return (
    <div style={{ backgroundColor: '#0f1a0f', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: '50vh' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920&q=80)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 text-center px-6"
        >
          <h1
            className="text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight"
            style={{ color: '#f0fdf4' }}
          >
            Happy Pets 🐾
          </h1>
          <p
            className="text-xl lg:text-2xl font-medium"
            style={{ color: '#86efac' }}
          >
            Browse our collection of adorable clients
          </p>
        </motion.div>
      </section>

      {/* Filter Buttons */}
      <section
        className="py-10 px-6"
        style={{ backgroundColor: '#0f1a0f' }}
        aria-label="Filter gallery by category"
      >
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          {filterCategories.map((category) => {
            const isActive = filter === category
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilter(category)}
                className="rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  backgroundColor: isActive ? '#16a34a' : '#243524',
                  color: isActive ? '#ffffff' : '#86efac',
                  // focusVisibleRingColor: '#4ade80',
                }}
                aria-pressed={isActive}
              >
                {category}
              </motion.button>
            )
          })}
        </div>
      </section>

      {/* Gallery Grid */}
      <section
        className="py-12 px-6"
        style={{ backgroundColor: '#0f1a0f' }}
        aria-label="Photo gallery"
      >
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.length > 0 ? (
              <motion.div
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {filteredPhotos.map((photo, index) => (
                  <GalleryCard
                    key={photo.id}
                    photo={photo}
                    index={index}
                    onOpen={openLightbox}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <p className="text-2xl font-semibold" style={{ color: '#86efac' }}>
                  No photos found for this category.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox !== null && activePhoto !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo lightbox: ${activePhoto.label}`}
          >
            {/* Inner content — stop click propagation so clicking the image/controls does not close */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative flex flex-col items-center gap-4"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ backgroundColor: '#16a34a', color: '#f0fdf4' }}
                aria-label="Close lightbox"
              >
                ✕
              </button>

              {/* Image container with prev/next buttons */}
              <div className="relative flex items-center gap-4">
                {/* Previous button */}
                <button
                  onClick={navigatePrev}
                  disabled={lightbox === 0}
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#243524', color: '#f0fdf4' }}
                  aria-label="Previous photo"
                >
                  ‹
                </button>

                {/* Photo */}
                <motion.img
                  key={activePhoto.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  src={activePhoto.url}
                  alt={activePhoto.label}
                  className="rounded-xl object-contain shadow-2xl"
                  style={{ maxHeight: '80vh', maxWidth: '90vw' }}
                />

                {/* Next button */}
                <button
                  onClick={navigateNext}
                  disabled={lightbox === filteredPhotos.length - 1}
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#243524', color: '#f0fdf4' }}
                  aria-label="Next photo"
                >
                  ›
                </button>
              </div>

              {/* Label and counter */}
              <div className="flex flex-col items-center gap-1">
                <span
                  className="text-xl font-bold"
                  style={{ color: '#f0fdf4' }}
                >
                  {activePhoto.label}
                </span>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: '#16a34a', color: '#f0fdf4' }}
                >
                  {activePhoto.category}
                </span>
                <span className="text-sm mt-1" style={{ color: '#86efac' }}>
                  {lightbox + 1} / {filteredPhotos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
