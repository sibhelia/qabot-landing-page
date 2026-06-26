import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GradientText } from './GradientText'
import { Plus } from 'lucide-react'

const FAQS = [
  {
    q: "QABot'u kurmak ne kadar sürer?",
    a: 'Gerçekten 5 dakika. Platforma kaydolun, belgelerinizi yükleyin ve QR kodunuzu oluşturun. Kodlama veya teknik bilgi gerektirmez.',
  },
  {
    q: 'Hangi dosya formatları destekleniyor?',
    a: 'PDF, DOCX (Word), TXT, Markdown ve resim dosyaları (Vision AI ile). Tablo, grafik, şema içeren belgeler de analiz edilir.',
  },
  {
    q: 'Verilerim güvende mi?',
    a: "Her şirket kendi izole veri ortamında çalışır (multi-tenant mimari). Verileriniz Türkiye'deki bulut altyapısında şifreli olarak saklanır. KVKK uyumlu.",
  },
  {
    q: 'AI yanlış cevap verirse ne olur?',
    a: "Kullanıcılar \"Düzelt\" butonuyla doğru cevabı önerebilir. Admin onayladığında düzeltme otomatik olarak RAG'e enjekte edilir ve sistem gelişir.",
  },
  {
    q: 'Aynı anda kaç kullanıcı kullanabilir?',
    a: 'Tüm planlarda eşzamanlı kullanıcı sayısı sınırsızdır. Sınır yalnızca aylık AI kredi kullanımına aittir. Enterprise planda kredi de sınırsızdır.',
  },
  {
    q: 'Türkçe dışında dil desteği var mı?',
    a: 'Evet. İngilizce, Almanca, Fransızca dahil 30+ dil desteklenmektedir. Embedding modeli Türkçe için özel olarak optimize edilmiştir.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-32 overflow-hidden section-bg-dark">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(rgba(124,58,237,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />
            SSS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 tracking-tight" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
            <span className="text-white">Sıkça Sorulan </span>
            <GradientText>Sorular</GradientText>
          </h2>
        </motion.div>

        <div className="space-y-0.5">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="border-b border-white/[0.06]"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 px-2 text-left"
              >
                <span
                  className={`text-sm font-medium leading-relaxed transition-colors duration-200 ${
                    open === i ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: open === i ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${open === i ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    color: open === i ? '#a855f7' : '#6b7280',
                  }}
                >
                  <Plus className="w-3.5 h-3.5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 px-2 text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-center p-8 rounded-2xl border border-white/[0.06] bg-white/[0.025]"
        >
          <p className="text-slate-300 text-base mb-4">Başka sorunuz var mı? Teknik ekibimiz yardımcı olsun.</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(124,58,237,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
          >
            Demo Talep Et
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
