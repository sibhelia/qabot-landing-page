import { motion } from 'framer-motion'
import { Search, Eye, ShieldCheck, BarChart3, QrCode, Building2 } from 'lucide-react'
import { GradientText } from './GradientText'

interface Feature {
  size: 'lg' | 'sm'
  title: string
  subtitle: string
  desc: string
  icon: React.ComponentType<{ className?: string }>
  color: 'purple' | 'cyan' | 'blue'
  badge?: string
}

const FEATURES: Feature[] = [
  {
    size: 'lg',
    title: 'Agentic RAG Motoru',
    subtitle: 'Belgelerinizin Derinine İner',
    desc: 'Hibrit arama: vektör tabanlı anlam araması + BM25 keyword search. Hem içerik hem bağlam anlayan gerçek AI.',
    icon: Search,
    color: 'purple',
    badge: 'Çekirdek Teknoloji',
  },
  {
    size: 'sm',
    title: 'Vision AI',
    subtitle: 'Görsellerinizi de Anlıyor',
    desc: 'Llama 4 Scout ile görsel yükleme ve analiz. Tablolar, grafikler, diyagramlar dahil.',
    icon: Eye,
    color: 'cyan',
    badge: 'Llama 4 Scout',
  },
  {
    size: 'sm',
    title: 'Admin Doğrulama',
    subtitle: 'Her Cevabın Kontrolü Sizde',
    desc: "Kullanıcı düzeltmelerini onayla. Onaylanan bilgi otomatik RAG'e eklenir.",
    icon: ShieldCheck,
    color: 'blue',
  },
  {
    size: 'sm',
    title: 'QR Kod Erişimi',
    subtitle: 'Anında Paylaş',
    desc: 'Tek tıkla QR oluştur. Çalışanlar telefonu tutup sorularını sorar.',
    icon: QrCode,
    color: 'cyan',
  },
  {
    size: 'sm',
    title: 'Multi-Tenant SaaS',
    subtitle: 'Her Şirket Kendi Dünyasında',
    desc: 'İzole veri ortamı. Logo, renk, karşılama ekranı — tam marka özelleştirme.',
    icon: Building2,
    color: 'blue',
  },
  {
    size: 'lg',
    title: 'Dashboard & Analitik',
    subtitle: 'Gerçek Zamanlı KPI Takibi',
    desc: 'Günlük trend grafikleri, duygu analizi, doğruluk oranı ve yanıt süresi — tek ekranda.',
    icon: BarChart3,
    color: 'purple',
  },
]

const colorMap = {
  purple: {
    icon: 'rgba(124,58,237,0.15)',
    border: 'rgba(124,58,237,0.3)',
    text: '#a855f7',
    badge: 'rgba(124,58,237,0.15)',
    badgeBorder: 'rgba(124,58,237,0.3)',
    glow: 'rgba(124,58,237,0.2)',
  },
  cyan: {
    icon: 'rgba(6,182,212,0.15)',
    border: 'rgba(6,182,212,0.3)',
    text: '#22d3ee',
    badge: 'rgba(6,182,212,0.15)',
    badgeBorder: 'rgba(6,182,212,0.3)',
    glow: 'rgba(6,182,212,0.2)',
  },
  blue: {
    icon: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.3)',
    text: '#60a5fa',
    badge: 'rgba(59,130,246,0.15)',
    badgeBorder: 'rgba(59,130,246,0.3)',
    glow: 'rgba(59,130,246,0.2)',
  },
}

const cardV = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
}

function FeatureCard({ feat, index }: { feat: Feature; index: number }) {
  const c = colorMap[feat.color]
  const Icon = feat.icon

  return (
    <motion.div
      custom={index}
      variants={cardV}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -5, scale: 1.015 }}
      className={`relative rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-sm
        transition-all duration-500 p-7 cursor-default overflow-hidden group
        hover:border-opacity-25 ${feat.size === 'lg' ? 'md:col-span-2' : ''}`}
      style={{ '--glow': c.glow } as React.CSSProperties}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${c.glow}`
        ;(e.currentTarget as HTMLDivElement).style.borderColor = c.border
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)'
      }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-purple-400/40 to-transparent" />
      <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-purple-400/40 to-transparent" />

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
        style={{ background: c.icon, border: `1px solid ${c.border}`, color: c.text }}
      >
        <Icon className="w-6 h-6" />
      </div>

      {feat.badge && (
        <span
          className="text-[9px] font-bold px-2 py-0.5 rounded-full mb-3 inline-block"
          style={{ background: c.badge, color: c.text, border: `1px solid ${c.badgeBorder}` }}
        >
          {feat.badge}
        </span>
      )}

      <h3 className="text-lg font-bold text-white mb-1">{feat.title}</h3>
      <p className="text-sm font-medium mb-3" style={{ color: c.text }}>{feat.subtitle}</p>
      <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>

      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${c.text}, transparent)` }}
      />
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden section-bg-dark">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(rgba(124,58,237,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />
            Platform Özellikleri
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 tracking-tight" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            <span className="text-white">Her Şey </span>
            <GradientText>Dahil</GradientText>
          </h2>
          <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
            Kurumsal düzeyde AI altyapısı, tam admin kontrolü ve öğrenen bilgi bankası — tek platformda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {FEATURES.map((feat, i) => (
            <FeatureCard key={feat.title} feat={feat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
