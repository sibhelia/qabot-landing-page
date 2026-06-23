import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const kpiCards = [
  { label: 'Toplam Sorgu', value: '12,847', change: '+18%', color: '#34d399', icon: '💬' },
  { label: 'Doğruluk Oranı', value: '%94.2', change: '+2.1%', color: '#10b981', icon: '✅' },
  { label: 'Ort. Yanıt', value: '1.4sn', change: '-0.3s', color: '#10b981', icon: '⚡' },
  { label: 'Aktif Belge', value: '248', change: '+12', color: '#10b981', icon: '📄' },
]

const recentQueries = [
  { q: 'Yıllık izin hakkı kaç gün?', dept: 'İK', ok: true, ms: 1200 },
  { q: 'VPN kurulumu nasıl yapılır?', dept: 'IT', ok: true, ms: 890 },
  { q: 'Sözleşme iptali prosedürü?', dept: 'Hukuk', ok: true, ms: 1540 },
  { q: 'Q3 hedef listesini paylaşır mısın?', dept: 'Satış', ok: false, ms: 2100 },
  { q: 'Masraf formu nereden alınır?', dept: 'Finans', ok: true, ms: 760 },
]

const barData = [40, 62, 55, 78, 91, 84, 100]
const barLabels = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 section-bg" />
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="orb orb-em" style={{ width: 500, height: 500, top: '-10%', left: '-5%', opacity: 0.07 }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#34d399' }} />
            Admin Paneli
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 tracking-tight">
            <span className="text-white">Her Şey </span>
            <span className="gradient-text">Görünür</span>
          </h2>
          <p className="mt-5 text-gray-400 text-lg max-w-xl mx-auto">
            Gerçek zamanlı analizler, geri bildirim yönetimi ve bilgi bankası kontrolü tek panelde.
          </p>
        </motion.div>

        <motion.div style={{ y }} className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b border-white/5"
            style={{ background: 'rgba(5,10,7,0.6)' }}
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/40" />
              </div>
              <span className="text-xs text-gray-500 font-mono ml-2">qabot.app/admin</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-500">Canlı</span>
            </div>
          </div>

          <div className="p-6">
            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {kpiCards.map((k) => (
                <div key={k.label} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{k.label}</span>
                    <span className="text-base">{k.icon}</span>
                  </div>
                  <div className="text-2xl font-black text-white mb-1">{k.value}</div>
                  <div className="text-xs font-medium" style={{ color: k.color }}>{k.change} bu ay</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Bar chart */}
              <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="text-xs text-gray-400 font-medium mb-4">Haftalık Sorgu Hacmi</div>
                <div className="flex items-end gap-2 h-28">
                  {barData.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-sm transition-all duration-700"
                        style={{
                          height: `${v}%`,
                          background: i === 6 ? 'linear-gradient(180deg, #34d399, #047857)' : 'rgba(52,211,153,0.2)',
                          boxShadow: i === 6 ? '0 0 8px rgba(52,211,153,0.4)' : 'none',
                        }}
                      />
                      <span className="text-[9px] text-gray-600">{barLabels[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent queries */}
              <div className="lg:col-span-2 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="text-xs text-gray-400 font-medium mb-4">Son Sorgular</div>
                <div className="space-y-2">
                  {recentQueries.map((q, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-white/[0.03] last:border-0">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${q.ok ? 'bg-green-400' : 'bg-orange-400'}`} />
                      <span className="flex-1 text-xs text-gray-300 truncate">{q.q}</span>
                      <span
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded flex-shrink-0"
                        style={{ background: 'rgba(52,211,153,0.08)', color: '#6ee7b7' }}
                      >
                        {q.dept}
                      </span>
                      <span className="text-[10px] text-gray-600 flex-shrink-0 font-mono">{q.ms}ms</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
