import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
    title: 'Yükle',
    subtitle: 'Dokümanlarınızı Platforma Ekleyin',
    description: 'PDF, Word, TXT veya Markdown dosyalarınızı sürükle-bırak ile yükleyin. Politikalar, rehberler, mevzuatlar — ne varsa platforma aktarın.',
    tags: ['PDF', 'DOCX', 'TXT', 'MD'],
    color: '#34d399',
    glow: 'rgba(52,211,153,0.15)',
  },
  {
    number: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'Öğret',
    subtitle: 'AI Otomatik Analiz Eder',
    description: 'Hibrit arama motoru (Vektör + BM25) belgelerinizi indeksler. Admin onayladığı her düzeltme bilgi bankasına enjekte edilir; sistem her geçen gün akıllanır.',
    tags: ['RAG', 'Vektör Arama', 'BM25', 'Auto-index'],
    color: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
  },
  {
    number: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    title: 'Sor',
    subtitle: 'Anında Akıllı Yanıtlar Alın',
    description: 'Çalışanlar veya müşteriler QR kod ya da link üzerinden soru sorar. AI, belgelerinizdeki doğru cevabı saniyeler içinde streaming olarak sunar.',
    tags: ['QR Kod', 'Streaming', 'Türkçe', 'Vision AI'],
    color: '#059669',
    glow: 'rgba(5,150,105,0.15)',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 section-bg" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-em-400 animate-pulse-ring inline-block" style={{ background: '#34d399' }} />
            3 Adımda Başlayın
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 tracking-tight">
            <span className="text-white">Nasıl </span>
            <span className="gradient-text">Çalışır?</span>
          </h2>
          <p className="mt-5 text-gray-400 text-lg max-w-xl mx-auto">
            Teknik bilgi gerektirmiyor. Dokümanınızı yükleyin, sisteminiz 5 dakika içinde hazır.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
        >
          {/* Connector */}
          <div className="hidden md:block absolute top-[52px] left-[calc(33%+16px)] right-[calc(33%+16px)] h-px z-0">
            <div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #34d399, #10b981, #059669)' }} />
          </div>

          {steps.map((step, i) => (
            <motion.div key={step.number} variants={cardVariants} className="relative z-10 group">
              <div
                className="h-full rounded-2xl p-8 border transition-all duration-300 group-hover:-translate-y-2"
                style={{ background: 'rgba(4,120,87,0.04)', borderColor: 'rgba(52,211,153,0.08)' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = `${step.color}55`
                  el.style.boxShadow = `0 12px 40px ${step.glow}`
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(52,211,153,0.08)'
                  el.style.boxShadow = 'none'
                }}
              >
                <div className="text-[10px] font-black tracking-widest mb-5" style={{ color: step.color }}>
                  ADIM {step.number}
                </div>

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: step.glow, border: `1px solid ${step.color}33`, color: step.color }}
                >
                  {step.icon}
                </div>

                <h3 className="text-2xl font-black text-white mb-1">{step.title}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: step.color }}>{step.subtitle}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{step.description}</p>

                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-1 rounded-md"
                      style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full hidden md:block"
                  style={{ background: step.color, boxShadow: `0 0 12px ${step.color}`, animationDelay: `${i * 0.3}s` }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
