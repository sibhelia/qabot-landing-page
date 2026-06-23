import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: "QABot'u kurmak ne kadar sürer?",
    a: 'Gerçekten 5 dakika. Platforma kaydolun, belgelerinizi yükleyin ve QR kodunuzu oluşturun. Kodlama veya teknik bilgi gerektirmez. Şirkete özel alan adı ve marka özelleştirme ek birkaç dakika alabilir.',
  },
  {
    q: 'Hangi dosya formatları destekleniyor?',
    a: 'PDF, DOCX (Word), TXT, Markdown ve resim dosyaları (Vision AI ile). Tablo, grafik, şema içeren belgeler de Vision AI aracılığıyla analiz edilir. Dosya boyutu sınırı Starter\'da 50 MB, Pro ve Enterprise\'da 500 MB\'dır.',
  },
  {
    q: 'Verilerim güvende mi?',
    a: "Evet. Her şirket kendi izole veri ortamında çalışır (multi-tenant mimari). Verileriniz Türkiye'deki bulut altyapısında şifreli olarak saklanır. KVKK uyumlu, ISO 27001 sürecindeyiz. Verileriniz üçüncü taraflarla paylaşılmaz.",
  },
  {
    q: 'AI yanlış cevap verirse ne olur?',
    a: "Kullanıcılar \"Düzelt\" butonuyla doğru cevabı önerebilir. Admin panelinde bu öneriler gözden geçirilip onaylanabilir veya reddedilebilir. Onaylanan düzeltmeler otomatik olarak RAG'e enjekte edilir ve sistem gelişir.",
  },
  {
    q: 'Aynı anda kaç kullanıcı kullanabilir?',
    a: 'Tüm planlarda eşzamanlı kullanıcı sayısı sınırsızdır. Sınır yalnızca aylık AI kredi kullanımına aittir. Enterprise planda kredi de sınırsızdır.',
  },
  {
    q: 'Hangi LLM modeli kullanılıyor?',
    a: 'Groq API üzerinde çalışan ultra-hızlı LLM modelleri (Llama 3.x ailesi) kullanılır. Vision AI için Llama 4 Scout kullanılır. Embedding için HuggingFace sentence-transformers. Enterprise planında kendi API anahtarınızı veya özel model kullanabilirsiniz.',
  },
  {
    q: 'Mevcut sistemlerle entegre olabiliyor mu?',
    a: 'Evet. QR kod ve link ile mevcut intranet, HR sistemi veya web sitenize kolayca entegre edilebilir. API erişimi Enterprise planında mevcuttur. Webhook desteği ile Slack, Teams gibi araçlarla da bağlantı kurulabilir.',
  },
  {
    q: 'Türkçe dışında dil desteği var mı?',
    a: "Evet. Temel model çok dilli olduğundan İngilizce, Almanca, Fransızca dahil 30+ dil desteklenmektedir. Embedding modeli Türkçe için özel olarak optimize edilmiştir.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 section-bg-dark" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#34d399' }} />
            SSS
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 tracking-tight">
            <span className="text-white">Sıkça Sorulan </span>
            <span className="gradient-text">Sorular</span>
          </h2>
        </motion.div>

        <div className="space-y-0.5">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="faq-item"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 px-2 text-left"
              >
                <span className={`text-sm font-medium leading-relaxed transition-colors duration-200 ${open === i ? 'text-white' : 'text-gray-300'}`}>
                  {faq.q}
                </span>
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: open === i ? 'rgba(4,120,87,0.2)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${open === i ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg className="w-3 h-3" style={{ color: open === i ? '#34d399' : '#6b7280' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 px-2 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
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
          className="mt-14 text-center p-8 rounded-2xl glass"
        >
          <p className="text-gray-300 text-base mb-4">Başka sorunuz var mı? Teknik ekibimiz yardımcı olsun.</p>
          <button className="btn-secondary text-sm">
            Demo Talep Et
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
