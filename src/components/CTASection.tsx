import { motion } from 'framer-motion'
import { ArrowRight, Lock, Zap, Target, Globe, CreditCard } from 'lucide-react'
import { GradientText } from './GradientText'

const BADGES = [
  { icon: Lock, label: 'KVKK Uyumlu' },
  { icon: Zap, label: '< 2sn Yanıt' },
  { icon: Target, label: '%94+ Doğruluk' },
  { icon: Globe, label: '30+ Dil' },
  { icon: CreditCard, label: 'Kredi Kartı Yok' },
]

export default function CTASection() {
  return (
    <section
      className="relative py-32 overflow-hidden border-y border-white/[0.04]"
      style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.08), transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.06), transparent 60%), #05050f',
      }}
    >
      {/* Top shimmer border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)',
        }}
      />

      {/* Animated drift orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none animate-drift-1"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06), transparent 70%)', filter: 'blur(60px)' }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none animate-drift-2"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05), transparent 70%)', filter: 'blur(60px)' }}
      />

      {/* Rotating rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full border opacity-[0.04] animate-spin-slow"
          style={{ borderColor: '#7c3aed' }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full border opacity-[0.04]"
          style={{ borderColor: '#06b6d4', animation: 'spin 20s linear infinite reverse' }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label mb-6 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Bugün Başlayın
          </span>

          <h2
            className="text-5xl sm:text-6xl font-bold mt-6 mb-6 leading-[1.05] tracking-tight"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            <span className="text-white">Kurumsal Bilginizi </span>
            <GradientText>AI&apos;a Taşıyın</GradientText>
          </h2>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            5 dakika kurulum · Sıfır teknik bilgi · 14 gün ücretsiz deneme.
            Çalışanlarınız ilk günden verimli olmaya başlasın.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(124,58,237,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-base"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                boxShadow: '0 0 20px rgba(124,58,237,0.35)',
              }}
            >
              Ücretsiz Başla — 14 Gün Deneme
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white text-base font-medium transition-all duration-300"
            >
              Demo Talep Et
            </motion.button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-slate-500 text-sm">
                <Icon className="w-4 h-4 text-purple-400/60" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom shimmer border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)',
        }}
      />
    </section>
  )
}
