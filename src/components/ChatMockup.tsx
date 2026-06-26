import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Bot, User } from 'lucide-react'

const CONVERSATIONS = [
  {
    q: 'Yıllık iznim kaç gün kaldı?',
    a: 'Kayıtlarımıza göre bu yıl 14 günlük yıllık izin hakkınızdan 9 gün kullandınız. Kalan 5 iş günü bulunmaktadır. İzin talebinizi HR sistemi üzerinden iletebilirsiniz.',
    source: 'IK_Politikasi_2024.pdf • Sayfa 12',
  },
  {
    q: 'Uzaktan çalışma politikamız nedir?',
    a: "Şirket politikası haftada 2 gün remote çalışmaya izin vermektedir. Yönetici onayı ile bu süre artırılabilir. Detaylar için Çalışma Modelleri Rehberi'ne bakınız.",
    source: 'Calisma_Rehberi_v3.pdf • Sayfa 5',
  },
  {
    q: 'XR-200 hangi voltajda çalışıyor?',
    a: "XR-200 modeli 110V-240V evrensel voltaj desteğine sahiptir. Adaptör gerektirmez, 50'den fazla ülkede kullanılabilir.",
    source: 'XR200_Teknik_Katalog.pdf • Sayfa 4',
  },
]

export function ChatMockup() {
  const [convIdx, setConvIdx] = useState(0)
  const [phase, setPhase] = useState<'q' | 'typing' | 'done'>('q')
  const [text, setText] = useState('')
  const conv = CONVERSATIONS[convIdx]

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 'q') {
      t = setTimeout(() => setPhase('typing'), 1400)
    } else if (phase === 'typing') {
      let i = 0
      const interval = setInterval(() => {
        setText(conv.a.slice(0, i++))
        if (i > conv.a.length) { clearInterval(interval); setPhase('done') }
      }, 20)
      return () => clearInterval(interval)
    } else {
      t = setTimeout(() => {
        setConvIdx(p => (p + 1) % CONVERSATIONS.length)
        setText(''); setPhase('q')
      }, 3200)
    }
    return () => clearTimeout(t)
  }, [phase, convIdx, conv.a])

  return (
    <div className="w-full max-w-[440px] mx-auto rounded-2xl border border-white/[0.08] bg-[#08081a]/90 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_rgba(124,58,237,0.08)]">
      {/* Title bar */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          {['#ff5f57', '#febc2e', '#28c840'].map(c => (
            <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <span className="flex-1 text-center text-[11px] text-slate-500 font-mono">qabot.io / acme-corp</span>
      </div>

      {/* Chat */}
      <div className="p-5 min-h-[300px] space-y-4">
        <motion.div
          key={`q${convIdx}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-end"
        >
          <div className="flex items-end gap-2 max-w-[78%]">
            <div className="px-4 py-2.5 rounded-2xl rounded-br-sm bg-purple-600/80 text-white text-sm leading-relaxed">
              {conv.q}
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-slate-300" />
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {(phase === 'typing' || phase === 'done') && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-end gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex-shrink-0 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="max-w-[78%]">
                <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-white/[0.04] border border-white/[0.07] text-slate-300 text-sm leading-relaxed">
                  {phase === 'typing' && text === '' ? (
                    <div className="flex gap-1.5 py-0.5">
                      {[0, 0.16, 0.32].map(d => (
                        <motion.span
                          key={d}
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                          transition={{ duration: 0.9, delay: d, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"
                        />
                      ))}
                    </div>
                  ) : (
                    <>
                      {text}
                      {phase === 'typing' && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-0.5 h-4 bg-purple-400 ml-0.5 align-middle"
                        />
                      )}
                    </>
                  )}
                </div>
                {phase === 'done' && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 mt-1.5 px-1"
                  >
                    <div className="w-1 h-1 rounded-full bg-purple-400" />
                    <span className="text-[10px] text-slate-500 font-mono">{conv.source}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="px-5 pb-5">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <span className="flex-1 text-xs text-slate-600">Bir soru sorun...</span>
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-6 h-6 rounded-md bg-purple-600/70 flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-sm bg-white/80" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
