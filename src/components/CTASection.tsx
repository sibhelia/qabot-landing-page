import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 section-bg" />

      {/* Glow orbs */}
      <div
        className="orb orb-em"
        style={{ width: 600, height: 600, top: '50%', left: '20%', transform: 'translate(-50%,-50%)', opacity: 0.15 }}
      />
      <div
        className="orb orb-em-bright"
        style={{ width: 400, height: 400, top: '50%', right: '15%', transform: 'translateY(-50%)', opacity: 0.1 }}
      />

      {/* Rotating rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full border opacity-5 animate-rotate-glow"
          style={{ borderColor: '#047857', animationDuration: '20s' }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full border opacity-5"
          style={{ borderColor: '#34d399', animation: 'rotateGlow 15s linear infinite reverse' }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label mb-6 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Bugün Başlayın
          </span>

          <h2 className="text-5xl sm:text-6xl font-black mt-6 mb-6 leading-[1.05] tracking-tight">
            <span className="text-white">Şirketinizin </span>
            <span className="gradient-text">Hafızasını</span>
            <br />
            <span className="text-white">AI&apos;a </span>
            <span className="gradient-text">Yükleyin</span>
          </h2>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            5 dakika kurulum, sıfır teknik bilgi, 14 gün ücretsiz deneme.
            Çalışanlarınız ilk günden verimli olmaya başlasın.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary text-base px-8 py-4">
              <span>Ücretsiz Başla — 14 Gün Deneme</span>
              <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="btn-secondary text-base px-8 py-4">
              Demo Talep Et
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: '🔒', label: 'KVKK Uyumlu' },
              { icon: '⚡', label: '< 2sn Yanıt' },
              { icon: '🎯', label: '%94+ Doğruluk' },
              { icon: '🌍', label: '30+ Dil' },
              { icon: '🔑', label: 'Kredi Kartı Yok' },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-gray-500 text-sm">
                <span>{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
