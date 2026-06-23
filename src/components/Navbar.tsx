import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Özellikler', href: '#features' },
  { label: 'Nasıl Çalışır', href: '#how-it-works' },
  { label: 'Kullanım Alanları', href: '#use-cases' },
  { label: 'Fiyatlandırma', href: '#pricing' },
  { label: 'SSS', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-2xl border-b shadow-xl'
          : 'bg-transparent'
      }`}
      style={scrolled ? {
        background: 'rgba(5,10,7,0.88)',
        borderColor: 'rgba(52,211,153,0.08)',
        boxShadow: '0 4px 30px rgba(4,120,87,0.1)',
      } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-em-700 to-em-500 opacity-80 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, #047857, #34d399)' }} />
            <div className="absolute inset-0 rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity" style={{ background: 'linear-gradient(135deg, #047857, #34d399)' }} />
            <div className="relative flex items-center justify-center w-full h-full rounded-xl text-white font-black text-base">
              Q
            </div>
          </div>
          <span className="font-bold text-[1.15rem] tracking-tight">
            QA<span className="gradient-text">Bot</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-gray-400 hover:text-white transition-colors duration-200 group py-1"
            >
              {link.label}
              <span
                className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 rounded-full"
                style={{ background: 'linear-gradient(90deg, #047857, #34d399)' }}
              />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2">
            Giriş Yap
          </button>
          <button className="btn-primary">
            <span>Ücretsiz Başla</span>
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü"
        >
          <div className="w-5 space-y-1.5 overflow-hidden">
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 -translate-x-3' : ''}`} />
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t backdrop-blur-2xl"
            style={{ borderColor: 'rgba(52,211,153,0.08)', background: 'rgba(5,10,7,0.95)' }}
          >
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
              <button className="mt-2 btn-primary text-center justify-center">
                <span>Ücretsiz Başla</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
