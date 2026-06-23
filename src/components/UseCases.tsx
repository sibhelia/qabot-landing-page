import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cases = [
  {
    id: 'hr',
    label: 'İnsan Kaynakları',
    emoji: '👥',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.15)',
    heading: 'İK Asistanı',
    subheading: '"HR artık aynı soruları defalarca yanıtlamıyor"',
    description:
      'İzin politikaları, maaş avansı koşulları, performans değerlendirme süreci... Çalışanlar her gün aynı soruları soruyor. QABot ile bu sorular artık otomatik yanıtlanıyor.',
    benefits: [
      'İzin hakkı ve maaş soruları anında yanıtlanır',
      'Yeni çalışan onboarding süreci kısalır',
      'İK ekibi stratejik işlere odaklanabilir',
    ],
    chatExample: {
      q: 'Yıllık izin hakkım kaç gün?',
      a: 'Şirket politikasına göre 1 yılı dolduran çalışanlar 14 iş günü yıllık izin hakkına sahiptir. 5 yıl üzeri için bu süre 20 güne çıkmaktadır. Kaynak: İzin Politikası v3.2, Madde 4.',
    },
  },
  {
    id: 'legal',
    label: 'Hukuk & Uyum',
    emoji: '⚖️',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
    heading: 'Hukuk Asistanı',
    subheading: '"Kontrat sorularına anında cevap"',
    description:
      'Avukat saatlerini rutin sözleşme sorularıyla harcamayın. Standart madde yorumları, KVKK uyumu kontrolü ve iç yönetmelik sorguları QABot ile saniyeler içinde yapılır.',
    benefits: [
      'Standart sözleşme soruları otomatik yanıtlanır',
      'KVKK ve uyum soruları anlık cevaplanır',
      'Avukat saatleri kritik işlere ayrılır',
    ],
    chatExample: {
      q: 'NDA süresi kaç yıl?',
      a: 'Standart NDA şablonumuza göre gizlilik yükümlülüğü imza tarihinden itibaren 3 yıl geçerlidir. İlgili madde: Madde 7.1. Kaynak: NDA Şablonu v2024.',
    },
  },
  {
    id: 'it',
    label: 'IT & Teknik Destek',
    emoji: '💻',
    color: '#059669',
    glow: 'rgba(5,150,105,0.15)',
    heading: 'IT Help Desk',
    subheading: '"Tekrar eden ticket\'lar artık yok"',
    description:
      'VPN kurulumu, şifre sıfırlama, yazılım kurulum talimatları... IT ekibinin zamanının %60\'ı bu sorulara gidiyor. QABot ile çalışanlar kendi kendine çözüyor.',
    benefits: [
      'L1 ticket sayısı dramatik düşer',
      'Çalışanlar 7/24 teknik destek alır',
      'IT ekibi altyapı projelerine odaklanır',
    ],
    chatExample: {
      q: 'VPN\'e nasıl bağlanırım?',
      a: 'Cisco AnyConnect uygulamasını açın, sunucu adını "vpn.sirket.com" olarak girin ve kurumsal kullanıcı adınızla giriş yapın. Sorun yaşarsanız IT@sirket.com ile iletişime geçin. Kaynak: IT Kullanım Kılavuzu, Bölüm 3.',
    },
  },
  {
    id: 'sales',
    label: 'Satış & CRM',
    emoji: '📈',
    color: '#6ee7b7',
    glow: 'rgba(110,231,183,0.12)',
    heading: 'Satış Asistanı',
    subheading: '"Her müşteri toplantısında hazır bilgi"',
    description:
      'Ürün özellikleri, fiyat listeleri, rakip karşılaştırmaları, müşteri sunumları... Satış ekibi artık iç bilgiye saniyeler içinde ulaşıyor ve daha fazla satış yapıyor.',
    benefits: [
      'Ürün soruları anında yanıtlanır',
      'Rakip karşılaştırması hızlı yapılır',
      'Satış süreci hızlanır, kapanma artar',
    ],
    chatExample: {
      q: 'Pro plan ile Enterprise plan arasındaki fark ne?',
      a: 'Pro plan 2.000 kredi/ay ile bireysel şirketler için idealdir. Enterprise planda sınırsız kredi, dedicated altyapı, özel SSO ve %99.9 SLA garantisi bulunur. Kaynak: Fiyat Listesi Q3-2025.',
    },
  },
]

export default function UseCases() {
  const [active, setActive] = useState(cases[0].id)
  const current = cases.find((c) => c.id === active)!

  return (
    <section id="use-cases" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 section-bg-dark" />
      <div className="absolute inset-0 bg-grid opacity-20" />

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
            Kullanım Alanları
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 tracking-tight">
            <span className="text-white">Her Departmana </span>
            <span className="gradient-text">Özel Çözüm</span>
          </h2>
          <p className="mt-5 text-gray-400 text-lg max-w-xl mx-auto">
            Tek platform, dört farklı departman — hepsi kendi özel bilgi bankasıyla çalışıyor.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {cases.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
              style={
                active === c.id
                  ? { background: `${c.color}18`, color: c.color, border: `1px solid ${c.color}50` }
                  : { background: 'rgba(255,255,255,0.03)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.07)' }
              }
            >
              <span>{c.emoji}</span>
              {c.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            {/* Left: text content */}
            <div>
              <h3 className="text-3xl font-black text-white mb-2">{current.heading}</h3>
              <p className="text-base italic mb-6" style={{ color: current.color }}>{current.subheading}</p>
              <p className="text-gray-400 leading-relaxed mb-8">{current.description}</p>

              <ul className="space-y-3">
                {current.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center" style={{ background: `${current.color}18` }}>
                      <svg className="w-3 h-3" style={{ color: current.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-gray-300 text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: chat mockup */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
                <div className="w-2 h-2 rounded-full" style={{ background: current.color, boxShadow: `0 0 8px ${current.color}` }} />
                <span className="text-xs font-mono text-gray-400">QABot — {current.label}</span>
              </div>

              {/* User message */}
              <div className="flex justify-end mb-4">
                <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-gray-200">{current.chatExample.q}</p>
                </div>
              </div>

              {/* Bot reply */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black" style={{ background: `${current.color}20`, color: current.color, border: `1px solid ${current.color}30` }}>
                  Q
                </div>
                <div className="rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]" style={{ background: `${current.color}08`, border: `1px solid ${current.color}20` }}>
                  <p className="text-sm text-gray-300 leading-relaxed">{current.chatExample.a}</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2">
                <div className="flex-1 bg-white/3 border border-white/8 rounded-xl px-4 py-2.5 text-xs text-gray-600 font-mono">
                  Soru sor...
                </div>
                <button className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${current.color}18`, border: `1px solid ${current.color}30` }}>
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
