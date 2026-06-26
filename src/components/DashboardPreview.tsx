import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimatedCounter } from './AnimatedCounter'
import { GradientText } from './GradientText'
import { TrendingUp, CheckCircle, Zap, FileText } from 'lucide-react'

const KPI_CARDS = [
  { label: 'Toplam Sorgu', target: 12847, suffix: '', prefix: '', icon: TrendingUp, color: '#a855f7', change: '+18% bu ay' },
  { label: 'Doğruluk Oranı', target: 94, suffix: '%', prefix: '', icon: CheckCircle, color: '#22d3ee', change: '+2.1% bu ay' },
  { label: 'Ort. Yanıt', target: 14, suffix: ' sn', prefix: '', icon: Zap, color: '#60a5fa', change: '-0.3s bu ay' },
  { label: 'Aktif Belge', target: 248, suffix: '', prefix: '', icon: FileText, color: '#34d399', change: '+12 bu ay' },
]

const BAR_DATA = [40, 62, 55, 78, 91, 84, 100]
const BAR_LABELS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']

const RECENT_QUERIES = [
  { q: 'Yıllık izin hakkı kaç gün?', dept: 'İK', ok: true, ms: 1200 },
  { q: 'VPN kurulumu nasıl yapılır?', dept: 'IT', ok: true, ms: 890 },
  { q: 'Sözleşme iptali prosedürü?', dept: 'Hukuk', ok: true, ms: 1540 },
  { q: 'Q3 hedef listesini paylaşır mısın?', dept: 'Satış', ok: false, ms: 2100 },
  { q: 'Masraf formu nereden alınır?', dept: 'Finans', ok: true, ms: 760 },
]

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const mainY  = useTransform(scrollYProgress, [0, 1], [50, -50])
  const card1Y = useTransform(scrollYProgress, [0, 1], [30, -70])
  const card2Y = useTransform(scrollYProgress, [0, 1], [70, -30])

  return (
    <section ref={ref} className="relative py-32 overflow-hidden section-bg-dark">
      <div className="absolute -top-60 -left-20 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06), transparent 70%)', filter: 'blur(40px)' }} />

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
            Admin Paneli
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 tracking-tight" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            <span className="text-white">Her Şey </span>
            <GradientText>Görünür</GradientText>
          </h2>
          <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
            Gerçek zamanlı analizler, geri bildirim yönetimi ve bilgi bankası kontrolü tek panelde.
          </p>
        </motion.div>

        <div className="relative">
          {/* Floating stats — left */}
          <motion.div
            style={{ y: card1Y }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute -left-4 top-16 z-20 hidden xl:block"
          >
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0a0a1a]/95 border border-purple-500/20 backdrop-blur-md shadow-lg whitespace-nowrap">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-slate-300">Bugün 247 sorgu yanıtlandı</span>
            </div>
          </motion.div>

          {/* Floating stats — right */}
          <motion.div
            style={{ y: card2Y }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="absolute -right-4 top-24 z-20 hidden xl:block"
          >
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0a0a1a]/95 border border-cyan-500/20 backdrop-blur-md shadow-lg whitespace-nowrap">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-300">%94.2 doğruluk bu hafta</span>
            </div>
          </motion.div>

          {/* Dashboard mockup */}
          <motion.div
            style={{
              y: mainY,
              border: '1px solid rgba(124,58,237,0.25)',
              boxShadow: '0 0 80px rgba(124,58,237,0.08), 0 0 160px rgba(124,58,237,0.04)',
            }}
            className="rounded-3xl overflow-hidden"
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05]"
              style={{ background: 'rgba(5,5,15,0.8)' }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-slate-500 font-mono ml-2">qabot.app/admin</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-slate-500">Canlı</span>
              </div>
            </div>

            <div className="p-6" style={{ background: 'rgba(10,10,26,0.9)' }}>
              {/* KPI row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {KPI_CARDS.map((k) => {
                  const Icon = k.icon
                  return (
                    <div
                      key={k.label}
                      className="rounded-xl p-4"
                      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500">{k.label}</span>
                        <Icon className="w-4 h-4" style={{ color: k.color }} />
                      </div>
                      <div className="text-2xl font-black text-white mb-1">
                        <AnimatedCounter target={k.target} suffix={k.suffix} prefix={k.prefix} />
                      </div>
                      <div className="text-xs font-medium" style={{ color: k.color }}>{k.change}</div>
                    </div>
                  )
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Bar chart */}
                <div
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="text-xs text-slate-400 font-medium mb-4">Haftalık Sorgu Hacmi</div>
                  <div className="flex items-end gap-2 h-28">
                    {BAR_DATA.map((v, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-1"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: 'bottom' }}
                      >
                        <div
                          className="w-full rounded-t-sm"
                          style={{
                            height: `${v}%`,
                            background: i === 6
                              ? 'linear-gradient(180deg, #a855f7, #7c3aed)'
                              : 'rgba(124,58,237,0.2)',
                            boxShadow: i === 6 ? '0 0 8px rgba(168,85,247,0.4)' : 'none',
                          }}
                        />
                        <span className="text-[9px] text-slate-600">{BAR_LABELS[i]}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Recent queries */}
                <div
                  className="lg:col-span-2 rounded-xl p-4"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="text-xs text-slate-400 font-medium mb-4">Son Sorgular</div>
                  <div className="space-y-2">
                    {RECENT_QUERIES.map((q, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-3 py-2 border-b border-white/[0.03] last:border-0"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${q.ok ? 'bg-green-400' : 'bg-orange-400'}`} />
                        <span className="flex-1 text-xs text-slate-300 truncate">{q.q}</span>
                        <span
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded flex-shrink-0"
                          style={{ background: 'rgba(124,58,237,0.1)', color: '#a855f7' }}
                        >
                          {q.dept}
                        </span>
                        <span className="text-[10px] text-slate-600 flex-shrink-0 font-mono">{q.ms}ms</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
