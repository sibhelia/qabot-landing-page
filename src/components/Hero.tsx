import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import FloatingDocs from './FloatingDocs'

const WORDS = ['Asistana', 'Zekaya', 'Cevaba']

function useTypewriter(text: string, speed = 65) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const timer = setInterval(() => {
      i += 1
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { setDone(true); clearInterval(timer) }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return { displayed, done }
}

const stats = [
  { value: '< 2sn', label: 'Yanıt Süresi' },
  { value: '%94+', label: 'Doğruluk' },
  { value: '5 dk', label: 'Kurulum' },
  { value: 'PDF · DOCX · TXT', label: 'Formatlar' },
]

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const itemV = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const { displayed, done } = useTypewriter(WORDS[wordIndex])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Mouse parallax for HTML layer (adds to the 3D camera tilt)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 60, damping: 20 })
  const my = useSpring(rawY, { stiffness: 60, damping: 20 })

  // Docs layer moves more (closer "layer") than text layer
  const docsX = useTransform(mx, [-1, 1], [-25, 25])
  const docsY = useTransform(my, [-1, 1], [-12, 12])
  const textX = useTransform(mx, [-1, 1], [-5, 5])
  const textY = useTransform(my, [-1, 1], [-3, 3])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  useEffect(() => {
    if (!done) return
    timerRef.current = setTimeout(() => setWordIndex((i) => (i + 1) % WORDS.length), 2000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [done])

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Subtle green vignette overlay so text stays readable over 3D scene */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050a07]/90 via-[#050a07]/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050a07] via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[560px]">

          {/* ── Left: text ──────────────────────────────── */}
          <motion.div
            variants={containerV}
            initial="hidden"
            animate="visible"
            style={{ x: textX, y: textY }}
            className="flex flex-col gap-6 max-w-xl"
          >
            <motion.div variants={itemV}>
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-em-400 animate-pulse-ring inline-block" />
                Kurumsal AI Platformu
              </span>
            </motion.div>

            <motion.h1
              variants={itemV}
              className="text-5xl sm:text-6xl font-black leading-[1.08] tracking-tight"
            >
              <span className="block text-white">Belgelerinizi</span>
              <span className="block text-white">Akıllı</span>
              <span className="block gradient-text-bright min-h-[1.1em]">
                {displayed}
                {!done && <span className="animate-blink-cursor text-em-400">|</span>}
              </span>
              <span className="block text-white">Dönüştürün</span>
            </motion.h1>

            <motion.p variants={itemV} className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Politika belgelerinden mevzuatlara, ürün kataloglarından eğitim
              materyallerine — tüm kurumsal bilginizi{' '}
              <span className="text-em-400 font-medium">saniyeler içinde</span>{' '}
              sorgulanabilir bir AI asistanına dönüştürün.
            </motion.p>

            <motion.div variants={itemV} className="flex flex-wrap gap-3 pt-1">
              <button className="btn-primary">
                <span>Ücretsiz Başla</span>
                <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="btn-secondary">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Demo İzle
              </button>
            </motion.div>

            <motion.div variants={itemV} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col gap-1 p-3 rounded-xl"
                  style={{
                    background: 'rgba(4,120,87,0.08)',
                    border: '1px solid rgba(52,211,153,0.12)',
                  }}
                >
                  <span className="text-sm font-bold gradient-text-bright">{s.value}</span>
                  <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: floating HTML documents (CSS 3D, layered over Three.js scene) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            style={{ x: docsX, y: docsY, height: 560 }}
            className="relative hidden lg:block"
          >
            <FloatingDocs />

            {/* Chat preview card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-60"
              style={{
                background: 'rgba(5,10,7,0.88)',
                border: '1px solid rgba(52,211,153,0.2)',
                borderRadius: 16,
                padding: 16,
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 40px rgba(4,120,87,0.2)',
              }}
            >
              <div className="flex justify-end mb-3">
                <div
                  className="max-w-[80%] px-3 py-2 rounded-xl rounded-br-md text-xs text-white"
                  style={{ background: 'linear-gradient(135deg, #047857, #059669)' }}
                >
                  Yıllık izin hakkım kaç gün?
                </div>
              </div>
              <div className="flex gap-2">
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[7px] font-black mt-0.5 text-white"
                  style={{ background: 'linear-gradient(135deg, #047857, #10b981)' }}
                >
                  Q
                </div>
                <div
                  className="flex-1 px-3 py-2 rounded-xl rounded-tl-md text-[10px] leading-relaxed"
                  style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.15)', color: 'rgba(255,255,255,0.75)' }}
                >
                  <span className="inline-flex gap-0.5 mr-1">
                    {[0,1,2].map(i => (
                      <span key={i} className="w-1 h-1 rounded-full bg-em-400 animate-bounce inline-block" style={{ animationDelay: `${i*0.15}s` }} />
                    ))}
                  </span>
                  14 iş günü. 5+ yılda 20 güne çıkıyor. 📋
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-em-400 animate-pulse" />
                <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>İK Politikaları 2025.pdf — kaynak</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs" style={{ color: 'rgba(52,211,153,0.4)' }}>Aşağı kay, belgelerin arasında uç</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(52,211,153,0.4), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
