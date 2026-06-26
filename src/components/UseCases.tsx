import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Scale, Headphones, GraduationCap, Bot, User } from 'lucide-react'
import { GradientText } from './GradientText'

const USE_CASES = [
  {
    id: 'ik',
    label: 'İnsan Kaynakları',
    icon: Users,
    color: '#a855f7',
    colorBg: 'rgba(168,85,247,0.1)',
    colorBorder: 'rgba(168,85,247,0.3)',
    headline: 'HR artık aynı soruya cevap vermek zorunda değil',
    stat: '73% daha az tekrar soru',
    statColor: '#a855f7',
    q: 'Yıllık iznim kaç gün kaldı?',
    a: 'Bu yıl 14 günlük hakkınızdan 9 gün kullandınız. Kalan: 5 iş günü. İzin talebinizi HR portalından iletebilirsiniz.',
    source: 'IK_Politikasi_2024.pdf • Sayfa 12',
  },
  {
    id: 'hukuk',
    label: 'Hukuki Uyum',
    icon: Scale,
    color: '#60a5fa',
    colorBg: 'rgba(96,165,250,0.1)',
    colorBorder: 'rgba(96,165,250,0.3)',
    headline: 'Binlerce sayfalık mevzuatı saniyede tarıyın',
    stat: '%94+ doğruluk oranı',
    statColor: '#60a5fa',
    q: "KVKK'ya göre kişisel veri saklama süremiz nedir?",
    a: 'KVKK Madde 7 uyarınca kişisel veriler amaç sona erince 30 gün içinde silinmeli veya anonim hale getirilmelidir.',
    source: 'KVKK_Uyum_Rehberi.pdf • Sayfa 23',
  },
  {
    id: 'musteri',
    label: 'Müşteri Hizmetleri',
    icon: Headphones,
    color: '#22d3ee',
    colorBg: 'rgba(34,211,238,0.1)',
    colorBorder: 'rgba(34,211,238,0.3)',
    headline: 'Temsilciler doğru cevaba 2 saniyede ulaşır',
    stat: 'Ort. 2.1 sn yanıt süresi',
    statColor: '#22d3ee',
    q: 'XR-200 ürünü hangi voltajda çalışıyor?',
    a: "XR-200 modeli 110V-240V evrensel voltaj desteğine sahiptir. Adaptör gerektirmez, 50 ülkede kullanılabilir.",
    source: 'XR200_Teknik_Katalog.pdf • Sayfa 4',
  },
  {
    id: 'onboarding',
    label: 'Yeni Çalışan',
    icon: GraduationCap,
    color: '#34d399',
    colorBg: 'rgba(52,211,153,0.1)',
    colorBorder: 'rgba(52,211,153,0.3)',
    headline: '5 dakikada şirketi tanı, hemen üretime geç',
    stat: '3x daha hızlı onboarding',
    statColor: '#34d399',
    q: 'Şirket aracı nasıl kullanılır, kaza anında ne yapmalıyım?',
    a: 'Şirket araçları yalnızca iş amaçlı kullanım içindir. Kaza durumunda 0850 XXX XX XX numarasını arayın.',
    source: 'Yeni_Calisan_El_Kitabi.pdf • Sayfa 31',
  },
]

export default function UseCases() {
  const [active, setActive] = useState(USE_CASES[0].id)
  const current = USE_CASES.find(c => c.id === active)!

  return (
    <section id="use-cases" className="relative py-32 overflow-hidden section-bg">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
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
            Kullanım Alanları
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 tracking-tight" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            <span className="text-white">Her Departmana </span>
            <GradientText>Özel Çözüm</GradientText>
          </h2>
          <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
            Tek platform, dört farklı departman — hepsi kendi özel bilgi bankasıyla.
          </p>
        </motion.div>

        {/* Tab list */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {USE_CASES.map(c => {
            const Icon = c.icon
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
                style={
                  active === c.id
                    ? { background: c.colorBg, color: c.color, border: `1px solid ${c.colorBorder}` }
                    : { background: 'rgba(255,255,255,0.03)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.07)' }
                }
              >
                <Icon className="w-4 h-4" />
                {c.label}
              </button>
            )
          })}
        </div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            {/* Left: text */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                style={{ background: current.colorBg, color: current.color, border: `1px solid ${current.colorBorder}` }}
              >
                {current.stat}
              </div>
              <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
                {current.headline}
              </h3>

              <ul className="space-y-3 mt-6">
                {['Belge bazlı doğru kaynak gösterimi', 'Streaming yanıt — 2 saniyede sonuç', '7/24 erişim, sıfır bekleme süresi'].map(b => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center"
                      style={{ background: current.colorBg }}
                    >
                      <svg className="w-3 h-3" style={{ color: current.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-slate-300 text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: chat mockup */}
            <div
              className="rounded-2xl p-6 border backdrop-blur-sm"
              style={{
                background: 'rgba(255,255,255,0.025)',
                borderColor: current.colorBorder,
              }}
            >
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/[0.05]">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: current.color, boxShadow: `0 0 8px ${current.color}` }}
                />
                <span className="text-xs font-mono text-slate-400">QABot — {current.label}</span>
              </div>

              {/* User message */}
              <div className="flex justify-end mb-4">
                <div className="flex items-end gap-2 max-w-[80%]">
                  <div
                    className="px-4 py-2.5 rounded-2xl rounded-br-sm text-white text-sm leading-relaxed"
                    style={{ background: `${current.color}22`, border: `1px solid ${current.colorBorder}` }}
                  >
                    {current.q}
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">
                    <User className="w-3 h-3 text-slate-300" />
                  </div>
                </div>
              </div>

              {/* Bot reply */}
              <div className="flex items-end gap-2">
                <div
                  className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: current.colorBg, border: `1px solid ${current.colorBorder}` }}
                >
                  <Bot className="w-3.5 h-3.5" style={{ color: current.color }} />
                </div>
                <div className="max-w-[85%]">
                  <div
                    className="px-4 py-2.5 rounded-2xl rounded-bl-sm text-slate-300 text-sm leading-relaxed"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    {current.a}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 px-1">
                    <div className="w-1 h-1 rounded-full" style={{ background: current.color }} />
                    <span className="text-[10px] text-slate-500 font-mono">{current.source}</span>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center gap-2">
                <div className="flex-1 bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-2.5 text-xs text-slate-600 font-mono">
                  Soru sor...
                </div>
                <button
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-110"
                  style={{ background: current.colorBg, border: `1px solid ${current.colorBorder}` }}
                >
                  <svg className="w-4 h-4" style={{ color: current.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
