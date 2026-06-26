import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GradientText } from './GradientText'
import { Check } from 'lucide-react'

const PLANS = [
  {
    name: 'Starter',
    monthly: 299,
    yearly: 249,
    credits: '500 kredi/ay',
    description: 'Küçük ekipler ve POC projeler için mükemmel başlangıç.',
    color: '#6b7280',
    colorBg: 'rgba(107,114,128,0.1)',
    colorBorder: 'rgba(107,114,128,0.2)',
    features: ['500 AI kredi/ay', '5 GB belge depolama', 'PDF, DOCX, TXT desteği', 'Temel admin paneli', '1 admin kullanıcı', 'Email desteği'],
    cta: 'Başla',
    popular: false,
  },
  {
    name: 'Pro',
    monthly: 799,
    yearly: 649,
    credits: '2.000 kredi/ay',
    description: 'Büyüyen şirketler için güçlü özellikler ve yüksek kapasite.',
    color: '#a855f7',
    colorBg: 'rgba(168,85,247,0.1)',
    colorBorder: 'rgba(168,85,247,0.4)',
    features: ['2.000 AI kredi/ay', '50 GB belge depolama', 'Tüm dosya formatları', 'Vision AI (görsel analiz)', 'Gelişmiş analitik', 'QR kod paylaşımı', 'Marka özelleştirme', '5 admin kullanıcı', 'Öncelikli destek'],
    cta: 'Ücretsiz Dene',
    popular: true,
  },
  {
    name: 'Enterprise',
    monthly: null,
    yearly: null,
    credits: 'Sınırsız kredi',
    description: 'Büyük kurumlar için özel çözüm, SLA ve tam kontrol.',
    color: '#22d3ee',
    colorBg: 'rgba(34,211,238,0.1)',
    colorBorder: 'rgba(34,211,238,0.2)',
    features: ['Sınırsız AI kredisi', 'Sınırsız depolama', 'Özel LLM entegrasyonu', 'SSO / LDAP', 'SLA garantisi', 'On-premise seçeneği', 'Sınırsız admin', 'Dedicated support'],
    cta: 'Bizimle Konuşun',
    popular: false,
  },
]

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const cardV = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="relative py-32 overflow-hidden section-bg">
      <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06), transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />
            Şeffaf Fiyatlandırma
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 tracking-tight" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            <span className="text-white">İhtiyacınıza </span>
            <GradientText>Uygun Plan</GradientText>
          </h2>
          <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
            Gizli ücret yok. İstediğiniz zaman plan değişikliği yapabilirsiniz.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${!annual ? 'text-white' : 'text-slate-500'}`}>Aylık</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full transition-colors duration-300"
              style={{ background: annual ? '#7c3aed' : 'rgba(255,255,255,0.1)' }}
            >
              <motion.span
                animate={{ left: annual ? '28px' : '4px' }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
                style={{ position: 'absolute' }}
              />
            </button>
            <span className={`text-sm flex items-center gap-2 ${annual ? 'text-white' : 'text-slate-500'}`}>
              Yıllık
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/25">
                %20 İndirim
              </span>
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {PLANS.map(plan => (
            <motion.div
              key={plan.name}
              variants={cardV}
              whileHover={{ y: plan.popular ? -10 : -6 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${plan.popular ? 'scale-[1.03]' : ''}`}
              style={{
                background: plan.popular ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.025)',
                border: `1px solid ${plan.popular ? plan.colorBorder : 'rgba(255,255,255,0.06)'}`,
                boxShadow: plan.popular ? '0 0 40px rgba(124,58,237,0.12)' : 'none',
              }}
            >
              {/* Popular gradient border */}
              {plan.popular && (
                <>
                  <div
                    className="absolute -inset-[1px] rounded-[17px] -z-10"
                    style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(59,130,246,0.3))' }}
                  />
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className="px-4 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
                    >
                      En Popüler
                    </span>
                  </div>
                </>
              )}

              {/* Plan name */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: plan.color, boxShadow: `0 0 8px ${plan.color}` }}
                />
                <span className="text-sm font-semibold" style={{ color: plan.color }}>{plan.name}</span>
              </div>

              {/* Price */}
              <div className="mb-4">
                {plan.monthly ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={annual ? 'annual' : 'monthly'}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-baseline gap-1"
                    >
                      <span className="text-4xl font-black text-white">
                        ₺{annual ? plan.yearly : plan.monthly}
                      </span>
                      <span className="text-slate-500 text-sm">/ay</span>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="text-3xl font-black text-white">Özel Fiyat</div>
                )}
                {annual && plan.monthly && (
                  <div className="text-xs text-slate-500 mt-1">
                    Yıllık faturalama ile {' '}
                    <span className="text-green-400 font-medium">
                      ₺{(plan.monthly - plan.yearly!) * 12} tasarruf
                    </span>
                  </div>
                )}
              </div>

              <div
                className="text-xs font-mono px-3 py-1 rounded-full inline-block mb-4"
                style={{ background: plan.colorBg, color: plan.color, border: `1px solid ${plan.colorBorder}` }}
              >
                {plan.credits}
              </div>

              <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

              <ul className="space-y-2.5 mb-8">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} />
                    <span className="text-slate-300">{feat}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  plan.popular ? 'text-white' : 'border text-white/80 hover:text-white'
                }`}
                style={
                  plan.popular
                    ? {
                        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                        boxShadow: '0 0 20px rgba(124,58,237,0.4)',
                      }
                    : { borderColor: 'rgba(255,255,255,0.12)' }
                }
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-slate-600 text-sm mt-10"
        >
          Tüm planlarda 14 gün ücretsiz deneme. Kredi kartı gerektirmez.
        </motion.p>
      </div>
    </section>
  )
}
