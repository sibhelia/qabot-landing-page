import { useEffect, useState } from 'react'

interface DocConfig {
  id: number
  title: string
  ext: string
  accent: string
  glow: string
  border: string
  content: string
  rotateX: number
  rotateY: number
  rotateZ: number
  top: string
  right: string
  scale: number
  floatClass: string
  scanDelay: string
  scrollDelay: string
}

const docs: DocConfig[] = [
  {
    id: 1,
    title: 'ik-politikalari-2025',
    ext: 'PDF',
    accent: '#34d399',
    glow: 'rgba(52,211,153,0.3)',
    border: 'rgba(52,211,153,0.4)',
    rotateX: 8, rotateY: -24, rotateZ: 2,
    top: '2%', right: '4%', scale: 1,
    floatClass: 'animate-float-1',
    scanDelay: '0s', scrollDelay: '0s',
    content: `YİLLIK İZİN POLİTİKASI v3.2
════════════════════════════

Madde 1 — Hak Kazanma
En az 1 yıl çalışan personel yılda
14 iş günü ücretli izin hakkı
kazanır. 5+ yılda 20 güne çıkar.

Madde 2 — İzin Talebi
Talepler sisteme en az 5 gün
öncesinden girilmeli ve yönetici
onayı alınmalıdır.

PERFORMANS DEĞERLENDİRME
────────────────────────
Teknik Yetkinlik .......... %40
İş Kalitesi ............... %30
Takım Çalışması ........... %20
İnisiyatif ................ %10

Değerlendirme periyodu: Aralık

UZAKTAN ÇALIŞMA KURALLARI
────────────────────────
Haftada 3 gün ofis zorunlu.
Performans hedefleri değişmez.

YİLLIK İZİN POLİTİKASI v3.2
════════════════════════════

Madde 1 — Hak Kazanma
En az 1 yıl çalışan personel yılda
14 iş günü ücretli izin hakkı
kazanır. 5+ yılda 20 güne çıkar.`,
  },
  {
    id: 2,
    title: 'guvenlik-protokolu-v2',
    ext: 'DOCX',
    accent: '#10b981',
    glow: 'rgba(16,185,129,0.3)',
    border: 'rgba(16,185,129,0.4)',
    rotateX: -7, rotateY: 20, rotateZ: -3,
    top: '36%', right: '-3%', scale: 0.87,
    floatClass: 'animate-float-2',
    scanDelay: '-1.2s', scrollDelay: '-5s',
    content: `ACİL DURUM PROSEDÜRÜ v2.1
══════════════════════════

BÖLÜM 1 — TAHLİYE
Alarm durumunda tüm personel
merdiveni kullanarak toplanma
noktasına yönelmelidir.

⚠ ASANSÖR KULLANIMI YASAK

BÖLÜM 2 — VERİ GÜVENLİĞİ
────────────────────────
• Şifreler 90 günde değişmeli
• Min 12 karakter + sembol
• USB cihaz: yönetici onayı
• Dışarıdan erişimde VPN zorunlu

BÖLÜM 3 — FİZİKSEL ERİŞİM
────────────────────────
Giriş sadece kimlik kartı ile.
Ziyaretçi refakatsiz bırakılamaz.

ACİL DURUM PROSEDÜRÜ v2.1
══════════════════════════

BÖLÜM 1 — TAHLİYE
Alarm durumunda tüm personel
merdiveni kullanarak toplanma
noktasına yönelmelidir.`,
  },
  {
    id: 3,
    title: 'urun-katalog-2025',
    ext: 'PDF',
    accent: '#059669',
    glow: 'rgba(5,150,105,0.3)',
    border: 'rgba(5,150,105,0.4)',
    rotateX: 11, rotateY: -10, rotateZ: 1,
    top: '66%', right: '6%', scale: 0.78,
    floatClass: 'animate-float-3',
    scanDelay: '-2.5s', scrollDelay: '-9s',
    content: `ÜRÜN KATALOĞU 2025
══════════════════

ProSeries A-500 ★ ÇOK SATAN
────────────────────────────
İşlemci: Intel Core i7-12700H
RAM: 16 GB DDR5 4800 MHz
Depo: 512 GB PCIe 4.0 NVMe
Ekran: 15.6" IPS 144 Hz
GPU: NVIDIA RTX 3060 6 GB
Pil: ~10 saat | 86 Wh
Garanti: 3 yıl resmi servis
Fiyat: 45.000 ₺ + KDV

EnterprisePRO B-Series
────────────────────────────
Kurumsal | ISO 9001:2015
CPU: AMD Ryzen 9 7950X
RAM: 32 GB ECC DDR5
Destek: 7/24 telefon + SLA

ÜRÜN KATALOĞU 2025
══════════════════

ProSeries A-500 ★ ÇOK SATAN
────────────────────────────
İşlemci: Intel Core i7-12700H`,
  },
]

export default function FloatingDocs() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 400)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ perspective: '1200px', perspectiveOrigin: '50% 40%' }}
    >
      {docs.map((doc) => (
        <div
          key={doc.id}
          className={`absolute ${doc.floatClass}`}
          style={{
            top: doc.top,
            right: doc.right,
            transform: `rotateX(${doc.rotateX}deg) rotateY(${doc.rotateY}deg) rotateZ(${doc.rotateZ}deg) scale(${doc.scale})`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Glow halo */}
          <div
            className="absolute inset-0 rounded-xl blur-xl opacity-50"
            style={{ background: doc.glow, transform: 'scale(1.2) translateZ(-10px)' }}
          />

          {/* Card */}
          <div
            className="doc-card relative"
            style={{
              background: 'rgba(5,10,7,0.92)',
              border: `1px solid ${doc.border}`,
              boxShadow: `0 4px 30px ${doc.glow}, 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-2 px-3 py-2.5"
              style={{
                background: `linear-gradient(135deg, ${doc.glow} 0%, rgba(255,255,255,0.02) 100%)`,
                borderBottom: `1px solid ${doc.border}`,
              }}
            >
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/60" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <span className="w-2 h-2 rounded-full bg-green-500/60" />
              </div>
              <span className="flex-1 text-[9px] font-mono truncate" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {doc.title}.{doc.ext.toLowerCase()}
              </span>
              <span
                className="text-[7px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: `${doc.accent}20`, color: doc.accent, border: `1px solid ${doc.accent}50` }}
              >
                {doc.ext}
              </span>
            </div>

            {/* Scrolling content */}
            <div className="doc-viewport">
              <div
                className="doc-scanner"
                style={{
                  background: `linear-gradient(90deg, transparent, ${doc.accent}, transparent)`,
                  boxShadow: `0 0 8px ${doc.accent}`,
                  animationDelay: doc.scanDelay,
                }}
              />
              <div className="doc-text-scroll" style={{ animationDelay: doc.scrollDelay, color: `${doc.accent}99` }}>
                {doc.content}
              </div>
            </div>

            {/* Footer */}
            <div
              className="flex items-center gap-2 px-3 py-2"
              style={{ borderTop: `1px solid ${doc.border}`, background: 'rgba(0,0,0,0.3)' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-ring"
                style={{ background: doc.accent, boxShadow: `0 0 6px ${doc.accent}` }}
              />
              <span className="text-[8px] font-mono" style={{ color: `${doc.accent}cc` }}>
                AI analiz ediyor...
              </span>
              <div className="ml-auto flex items-end gap-0.5">
                {[1,2,3].map(i => (
                  <span key={i} className="w-0.5 rounded-sm" style={{ background: doc.accent, height: `${6+i*3}px`, opacity: 0.5+i*0.15 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
