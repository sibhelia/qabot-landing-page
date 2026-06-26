import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Upload, Brain, MessageCircle, ArrowRight } from 'lucide-react'
import { GradientText } from './GradientText'

const STEPS = [
  {
    number: '01',
    icon: Upload,
    title: 'Dokümanlarını Yükle',
    desc: 'PDF, DOCX, TXT, Markdown — tüm kurumsal belgelerinizi yükleyin. Hiyerarşik kategorilere ayırın.',
    color: 'from-purple-500 to-blue-500',
    glow: 'rgba(124,58,237,0.2)',
    glowBorder: 'rgba(124,58,237,0.3)',
    iconColor: '#a855f7',
    detail: 'Sürükle & Bırak • PDF, DOCX, TXT, MD',
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Otomatik Öğrenir',
    desc: 'Hibrit RAG: Vektör arama + BM25 keyword search. Admin doğrulaması ile bilgi bankası büyür.',
    color: 'from-blue-500 to-cyan-500',
    glow: 'rgba(59,130,246,0.2)',
    glowBorder: 'rgba(59,130,246,0.3)',
    iconColor: '#60a5fa',
    detail: 'Agentic RAG + BM25 + Semantic Search',
  },
  {
    number: '03',
    icon: MessageCircle,
    title: 'Soru Sor, Anında Al',
    desc: 'QR kod veya link üzerinden soru sorun. AI kaynağı ile birlikte streaming yanıt verir.',
    color: 'from-cyan-500 to-emerald-500',
    glow: 'rgba(6,182,212,0.2)',
    glowBorder: 'rgba(6,182,212,0.3)',
    iconColor: '#22d3ee',
    detail: 'QR Kod • Streaming • < 2 saniye',
  },
]

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const cardV = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden section-bg">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />
            3 Adımda Başlayın
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 tracking-tight" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            <span className="text-white">Nasıl </span>
            <GradientText>Çalışır?</GradientText>
          </h2>
          <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
            Teknik bilgi gerektirmiyor. Dokümanınızı yükleyin, 5 dakika içinde hazır.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          ref={ref}
          variants={containerV}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
        >
          {/* Connector lines */}
          <div className="hidden md:flex absolute top-[52px] left-[calc(33%+24px)] right-[calc(33%+24px)] items-center z-0">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #7c3aed, #3b82f6, #06b6d4)' }} />
            <ArrowRight className="w-4 h-4 text-cyan-400 -ml-1 flex-shrink-0" />
          </div>

          {STEPS.map((step, i) => (
            <motion.div key={step.number} variants={cardV} className="relative z-10 group">
              <div
                className="h-full rounded-2xl p-8 border transition-all duration-500 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = step.glowBorder
                  el.style.boxShadow = `0 12px 40px ${step.glow}`
                  el.style.transform = 'translateY(-6px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(255,255,255,0.06)'
                  el.style.boxShadow = 'none'
                  el.style.transform = 'translateY(0)'
                }}
              >
                {/* Top left corner accent */}
                <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-purple-400/40 to-transparent" />
                <div className="absolute top-0 left-0 w-px h-16 bg-gradient-to-b from-purple-400/40 to-transparent" />

                <div className="text-[10px] font-black tracking-widest mb-5" style={{ color: step.iconColor }}>
                  ADIM {step.number}
                </div>

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: step.glow,
                    border: `1px solid ${step.glowBorder}`,
                    color: step.iconColor,
                  }}
                >
                  <step.icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{step.desc}</p>

                <div
                  className="flex items-center gap-2 text-[10px] font-mono px-3 py-2 rounded-lg"
                  style={{ background: `${step.glow}`, border: `1px solid ${step.glowBorder}` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: step.iconColor }} />
                  <span style={{ color: step.iconColor }}>{step.detail}</span>
                </div>

                {/* Step dot */}
                <div
                  className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full hidden md:block"
                  style={{
                    background: step.iconColor,
                    boxShadow: `0 0 12px ${step.iconColor}`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
