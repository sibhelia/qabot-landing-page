import { useState } from 'react'
import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Starter',
    price: { monthly: 299, annual: 249 },
    credits: '500 kredi/ay',
    description: 'Küçük ekipler ve POC projeler için mükemmel başlangıç noktası.',
    color: '#6b7280',
    features: [
      '500 AI kredi/ay',
      '5 GB belge depolama',
      'PDF, DOCX, TXT desteği',
      'Temel admin paneli',
      'E-posta desteği',
      'QR kod paylaşımı',
    ],
    cta: 'Başla',
    popular: false,
  },
  {
    name: 'Pro',
    price: { monthly: 799, annual: 649 },
    credits: '2.000 kredi/ay',
    description: 'Büyüyen şirketler için güçlü özellikler ve yüksek kapasite.',
    color: '#34d399',
    features: [
      '2.000 AI kredi/ay',
      '50 GB belge depolama',
      'Tüm dosya formatları',
      'Vision AI (görsel analiz)',
      'Hiyerarşik bilgi bankası',
      'Duygu analizi & raporlar',
      'Marka özelleştirme',
      'Öncelikli destek',
    ],
    cta: "Pro'ya Geç",
    popular: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: null, annual: null },
    credits: 'Sınırsız',
    description: 'Büyük kurumlar için özel çözüm, SLA ve tam kontrol.',
    color: '#10b981',
    features: [
      'Sınırsız AI kredisi',
      'Sınırsız depolama',
      'Özel alt domain / SSO',
      'Multi-tenant yönetimi',
      'Özel LLM entegrasyonu',
      'Dedicated altyapı',
      '%99.9 SLA garantisi',
      '7/24 teknik destek',
    ],
    cta: 'İletişime Geç',
    popular: false,
  },
]

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 section-bg" />
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="orb orb-em" style={{ width: 500, height: 500, bottom: '0%', right: '-10%', opacity: 0.08 }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#34d399' }} />
            Şeffaf Fiyatlandırma
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 tracking-tight">
            <span className="text-white">İhtiyacınıza </span>
            <span className="gradient-text">Uygun Plan</span>
          </h2>
          <p className="mt-5 text-gray-400 text-lg max-w-xl mx-auto">
            Gizli ücret yok. İstediğiniz zaman plan değişikliği yapabilirsiniz.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${!annual ? 'text-white' : 'text-gray-500'}`}>Aylık</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full transition-colors duration-300"
              style={{ background: annual ? '#047857' : 'rgba(255,255,255,0.1)' }}
            >
              <span
                className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow"
                style={{ left: annual ? '28px' : '4px' }}
              />
            </button>
            <span className={`text-sm flex items-center gap-2 ${annual ? 'text-white' : 'text-gray-500'}`}>
              Yıllık
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/25">
                %20 İndirim
              </span>
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={cardVariants} className={`pricing-card relative ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="px-4 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #047857, #10b981)' }}
                  >
                    En Popüler
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: plan.color, boxShadow: `0 0 8px ${plan.color}` }} />
                  <span className="text-sm font-semibold" style={{ color: plan.color }}>{plan.name}</span>
                </div>

                <div className="mb-2">
                  {plan.price.monthly ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">
                        ₺{annual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-gray-500 text-sm">/ay</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-black text-white">Özel Fiyat</div>
                  )}
                  {annual && plan.price.monthly && (
                    <div className="text-xs text-gray-500 mt-1">
                      <s className="text-gray-600">₺{plan.price.monthly}</s> yıllık faturalama ile
                    </div>
                  )}
                </div>

                <div
                  className="text-xs font-mono px-3 py-1 rounded-full inline-block mb-3"
                  style={{ background: `${plan.color}15`, color: plan.color, border: `1px solid ${plan.color}30` }}
                >
                  {plan.credits}
                </div>

                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-2.5 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-gray-300">{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  plan.popular
                    ? 'text-white hover:shadow-lg'
                    : 'border text-white/80 hover:bg-white/[0.04]'
                }`}
                style={
                  plan.popular
                    ? { background: 'linear-gradient(135deg, #047857, #10b981)', boxShadow: '0 4px 20px rgba(4,120,87,0.3)' }
                    : { borderColor: 'rgba(255,255,255,0.1)' }
                }
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-600 text-sm mt-10"
        >
          Tüm planlarda 14 gün ücretsiz deneme. Kredi kartı gerektirmez.
        </motion.p>
      </div>
    </section>
  )
}
