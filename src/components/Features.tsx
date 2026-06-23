import { motion } from 'framer-motion'

interface Feature {
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  accent: string
  glow: string
  badge?: string
}

const features: Feature[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: 'Agentic RAG',
    subtitle: 'Belgelerinizin Derinine İner',
    description: 'Hibrit arama motoru; anlam tabanlı vektör araması ile BM25 anahtar kelime aramasını birleştirir. Doğru cevabı, doğru belgeden bulur.',
    accent: '#34d399',
    glow: 'rgba(52,211,153,0.15)',
    badge: 'Çekirdek Teknoloji',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Vision AI',
    subtitle: 'Görsellerinizi de Anlıyor',
    description: 'Llama 4 Scout ile desteklenen Vision AI, yüklediğiniz görselleri, grafikleri ve diyagramları analiz edip doğal dilde açıklar.',
    accent: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
    badge: 'Llama 4 Scout',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Admin Kontrolü',
    subtitle: 'Her Cevabın Kontrolü Sizde',
    description: 'Geri bildirimleri onayla veya reddet. Onaylanan düzeltmeler otomatik olarak bilgi bankasına eklenir. Kalite sizin ellerinizde.',
    accent: '#059669',
    glow: 'rgba(5,150,105,0.15)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: 'Öğrenen Sistem',
    subtitle: 'Kullandıkça Akıllanır',
    description: "Her admin onayı RAG'e enjekte edilir. Feedback loop ile sistem sürekli gelişir; ilk günden daha akıllı bir asistan elde edersiniz.",
    accent: '#34d399',
    glow: 'rgba(52,211,153,0.12)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: 'Multi-Tenant',
    subtitle: 'Her Şirket Kendi Dünyasında',
    description: 'Tamamen izole veri ortamı. Her kiracı kendi markasını, renklerini ve belgelerini ayrı bir dünyada yönetir. Zero cross-tenant leak.',
    accent: '#6ee7b7',
    glow: 'rgba(110,231,183,0.1)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
    title: 'Hiyerarşik KB',
    subtitle: 'Bilgiye Düzen, Aramaya Hız',
    description: 'Sınırsız derinlikte kategori ağacı. İK → İzin Politikaları → Yıllık İzin gibi yapılandırın. Hem AI hem kullanıcı kolayca bulur.',
    accent: '#10b981',
    glow: 'rgba(16,185,129,0.12)',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 section-bg" />
      <div className="absolute inset-0 bg-dots opacity-25" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#34d399' }} />
            Platform Özellikleri
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 tracking-tight">
            <span className="text-white">Her Şey </span>
            <span className="gradient-text">Dahil</span>
          </h2>
          <p className="mt-5 text-gray-400 text-lg max-w-xl mx-auto">
            Kurumsal düzeyde AI altyapısı, tam admin kontrolü ve öğrenen bilgi bankası — tek platformda.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feat) => (
            <motion.div key={feat.title} variants={cardVariants} className="feature-card group cursor-default">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: feat.glow, border: `1px solid ${feat.accent}33`, color: feat.accent }}
              >
                {feat.icon}
              </div>

              {feat.badge && (
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full mb-3 inline-block"
                  style={{ background: `${feat.accent}18`, color: feat.accent, border: `1px solid ${feat.accent}30` }}
                >
                  {feat.badge}
                </span>
              )}

              <h3 className="text-lg font-bold text-white mb-1">{feat.title}</h3>
              <p className="text-sm font-medium mb-3" style={{ color: feat.accent }}>{feat.subtitle}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{feat.description}</p>

              <div
                className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${feat.accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <button className="btn-secondary text-sm">
            Tüm Özellikleri Gör
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
