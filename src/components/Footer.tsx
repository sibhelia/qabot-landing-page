import { motion } from 'framer-motion'
import { GradientText } from './GradientText'
import { Twitter, Linkedin, Github } from 'lucide-react'

const FOOTER_LINKS = {
  Ürün: ['Özellikler', 'Kullanım Alanları', 'Fiyatlandırma', 'Değişiklik Günlüğü'],
  Şirket: ['Hakkımızda', 'Blog', 'İş İlanları', 'Basın'],
  Destek: ['Dokümanlar', 'API Referans', 'SSS', 'İletişim'],
  Hukuki: ['Gizlilik Politikası', 'Kullanım Şartları', 'KVKK Aydınlatma', 'Çerez Politikası'],
}

const SOCIAL = [
  { label: 'Twitter', Icon: Twitter, href: '#' },
  { label: 'LinkedIn', Icon: Linkedin, href: '#' },
  { label: 'GitHub', Icon: Github, href: '#' },
]

const TECH_STACK = ['React 19', 'Python / Flask', 'LangChain', 'ChromaDB', 'Groq']

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative border-t section-bg-dark"
      style={{ borderColor: 'rgba(124,58,237,0.1)' }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.2), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-9 h-9">
                <div
                  className="absolute inset-0 rounded-xl opacity-80"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
                />
                <div
                  className="absolute inset-0 rounded-xl blur-md opacity-40"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
                />
                <div className="relative flex items-center justify-center w-full h-full rounded-xl text-white font-black">Q</div>
              </div>
              <span className="font-bold text-[1.1rem] text-white">
                QA<GradientText>Bot</GradientText>
              </span>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed mb-5 max-w-[240px]">
              Kurumsal belgelerinizi saniyeler içinde akıllı bir soru-cevap asistanına dönüştürün.
            </p>

            <div className="flex gap-3">
              {SOCIAL.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-all duration-200 hover:bg-purple-500/10"
                  style={{ border: '1px solid rgba(124,58,237,0.15)' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <p className="text-xs text-slate-600 mt-5">Türkiye'de sevgiyle üretildi 🇹🇷</p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: 'rgba(124,58,237,0.08)' }}
        >
          <p className="text-xs text-slate-600">© 2025 QABot. Tüm hakları saklıdır.</p>

          <div className="flex flex-wrap items-center gap-2">
            {TECH_STACK.map(tech => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 rounded text-slate-600"
                style={{ border: '1px solid rgba(124,58,237,0.12)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
