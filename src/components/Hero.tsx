import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Play, Zap, ShieldCheck, Clock } from 'lucide-react'
import { TypewriterText } from './TypewriterText'
import { FloatingBadge } from './FloatingBadge'
import { ChatMockup } from './ChatMockup'
import { GradientText } from './GradientText'

const TYPEWRITER_TEXTS = [
  'PDF, Word ve TXT dosyalarınızı yükleyin.',
  'AI saniyeler içinde öğrenir ve cevap verir.',
  'Çalışanlar QR ile anında bilgiye ulaşır.',
  'Admin doğrulaması ile %94+ doğruluk.',
]

const METRICS = [
  { icon: Clock, text: '< 2 sn yanıt', color: 'text-purple-400' },
  { icon: ShieldCheck, text: '%94+ doğruluk', color: 'text-cyan-400' },
  { icon: Zap, text: '5 dk kurulum', color: 'text-blue-400' },
]

export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 })
  const rotateX = useTransform(springY, [-400, 400], [6, -6])
  const rotateY = useTransform(springX, [-400, 400], [-6, 6])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#05050f' }}
      onMouseMove={e => {
        mouseX.set(e.clientX - window.innerWidth / 2)
        mouseY.set(e.clientY - window.innerHeight / 2)
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] animate-grid-fade"
        style={{
          backgroundImage: 'radial-gradient(circle, #7c3aed 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06), transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs text-purple-300 font-medium tracking-wide">Agentic RAG + Vision AI</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.06] tracking-tight text-white mb-5"
              style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
            >
              Belgelerinizi<br />
              <GradientText>Akıllı Asistana</GradientText><br />
              Dönüştürün
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg min-h-[56px]"
            >
              <TypewriterText texts={TYPEWRITER_TEXTS} speed={40} deleteSpeed={16} pause={2400} />
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <motion.a
                href="/demo"
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(124,58,237,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm transition-shadow duration-300"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                  boxShadow: '0 0 20px rgba(124,58,237,0.35)',
                }}
              >
                Ücretsiz Başla <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#demo"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-white/20 text-sm font-medium transition-all duration-300"
              >
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </span>
                Demo İzle
              </motion.a>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center gap-x-7 gap-y-3"
            >
              {METRICS.map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-xs text-slate-400">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Chat mockup + floating badges */}
          <motion.div
            style={{ rotateX, rotateY, perspective: 1000 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Floating badge — top left */}
            <FloatingBadge className="absolute -top-5 -left-4 z-20" delay={0.9} floatY={-10}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0f0f20]/95 border border-white/10 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-slate-300 whitespace-nowrap">AI yanıt üretiyor...</span>
              </div>
            </FloatingBadge>

            {/* Floating badge — bottom right */}
            <FloatingBadge className="absolute -bottom-4 -right-2 z-20" delay={1.2} floatY={9}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0f0f20]/95 border border-purple-500/20 backdrop-blur-md shadow-lg">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-xs text-slate-300 whitespace-nowrap">1.4 sn'de yanıtlandı</span>
              </div>
            </FloatingBadge>

            {/* Floating doc card */}
            <FloatingBadge className="absolute top-1/3 -right-8 z-20 hidden lg:block" delay={1.5} floatY={-12}>
              <div className="w-12 h-14 rounded-lg bg-[#0f0f20]/95 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center gap-1 p-1.5">
                <div className="w-6 h-1 bg-purple-500/70 rounded-full" />
                <div className="w-6 h-1 bg-slate-600 rounded-full" />
                <div className="w-4 h-1 bg-slate-600 rounded-full" />
                <span className="text-[8px] text-slate-500 mt-1 font-mono">PDF</span>
              </div>
            </FloatingBadge>

            <ChatMockup />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#05050f] to-transparent pointer-events-none" />
    </section>
  )
}
