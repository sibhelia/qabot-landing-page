import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// ── Animated colorful blob background ─────────────────────────────────────────
const BG_VERT = `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`
const BG_FRAG = `
  uniform float uTime;
  varying vec2 vUv;
  void main(){
    vec2 uv=vUv;
    vec3 col=vec3(0.01,0.04,0.02);
    float b1=1.0-smoothstep(0.0,0.54,length(uv-vec2(0.22+sin(uTime*.13)*.14,0.32+cos(uTime*.11)*.13)));
    col=mix(col,vec3(0.04,0.55,0.3),b1*.9);
    float b2=1.0-smoothstep(0.0,0.5,length(uv-vec2(0.74+cos(uTime*.12)*.1,0.25+sin(uTime*.09)*.13)));
    col=mix(col,vec3(0.36,0.1,0.76),b2*.88);
    float b3=1.0-smoothstep(0.0,0.48,length(uv-vec2(0.52+sin(uTime*.1)*.17,0.75+cos(uTime*.08)*.12)));
    col=mix(col,vec3(0.86,0.2,0.5),b3*.82);
    float b4=1.0-smoothstep(0.0,0.44,length(uv-vec2(0.85+cos(uTime*.15)*.08,0.62+sin(uTime*.12)*.13)));
    col=mix(col,vec3(0.9,0.44,0.06),b4*.78);
    float b5=1.0-smoothstep(0.0,0.45,length(uv-vec2(0.16+sin(uTime*.16)*.1,0.7+cos(uTime*.13)*.1)));
    col=mix(col,vec3(0.04,0.64,0.86),b5*.82);
    float b6=1.0-smoothstep(0.0,0.4,length(uv-vec2(0.44+cos(uTime*.09)*.15,0.16+sin(uTime*.12)*.1)));
    col=mix(col,vec3(0.06,0.84,0.58),b6*.72);
    float vig=length(uv-vec2(.5))*1.6;
    col*=1.0-vig*.6;
    gl_FragColor=vec4(clamp(col,0.0,1.0),1.0);
  }
`

function BlobBg() {
  const mat  = useRef<THREE.ShaderMaterial>(null)
  const unif = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame(({ clock }) => { if (mat.current) mat.current.uniforms.uTime.value = clock.elapsedTime })
  return (
    <mesh position={[0, 0, -4]}>
      <planeGeometry args={[36, 26]} />
      <shaderMaterial ref={mat} vertexShader={BG_VERT} fragmentShader={BG_FRAG} uniforms={unif} />
    </mesh>
  )
}

// ── Camera ─────────────────────────────────────────────────────────────────────
function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 })
  const sm    = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])
  useFrame(({ camera }) => {
    sm.current.x += (mouse.current.x - sm.current.x) * 0.03
    sm.current.y += (mouse.current.y - sm.current.y) * 0.03
    camera.position.set(sm.current.x * 0.8, sm.current.y * -0.5, 7.5)
    camera.lookAt(0, 0, 0)
  })
  return null
}

// ── Card data ──────────────────────────────────────────────────────────────────
interface CardDef { lines: string[]; sub: string; color: string }
const CARDS: CardDef[] = [
  { lines: ['AKILLI',  'BELGE',   'ANALİZİ'], sub: 'Binlerce belgede saniyeler içinde doğru cevap',      color: '#34d399' },
  { lines: ['İK',      'YÖNETİMİ'],           sub: 'İzin, maaş ve kariyer soruları otomatik yanıtlanır', color: '#22d3ee' },
  { lines: ['HUKUK',   '& UYUM'],             sub: 'Sözleşme analizi, KVKK, iç yönetmelik sorguları',    color: '#a78bfa' },
  { lines: ['IT',      'DESTEK'],             sub: 'L1 ticket sayısını dramatik düşür — %80 tasarruf',    color: '#f472b6' },
  { lines: ['SATIŞ',   'GÜCÜ'],              sub: 'Ürün bilgisi, rakip analizi ve fiyat listesi anında',  color: '#2dd4bf' },
]

// ── Canvas texture — very transparent glass so blob shows through ───────────────
function buildTex(card: CardDef): THREE.CanvasTexture {
  const W = 660, H = 920
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')!

  // Nearly transparent — blob art shows through
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = 'rgba(3,10,6,0.18)'
  ctx.fillRect(0, 0, W, H)

  // Glass top rim highlight
  const tg = ctx.createLinearGradient(0, 0, 0, 100)
  tg.addColorStop(0, 'rgba(255,255,255,0.13)')
  tg.addColorStop(1, 'rgba(255,255,255,0.0)')
  ctx.fillStyle = tg; ctx.fillRect(0, 0, W, 100)

  // Left rim
  const lg = ctx.createLinearGradient(0, 0, 24, 0)
  lg.addColorStop(0, 'rgba(255,255,255,0.09)')
  lg.addColorStop(1, 'rgba(255,255,255,0.0)')
  ctx.fillStyle = lg; ctx.fillRect(0, 0, 24, H)

  // Large bold title
  const fz = card.lines.length >= 3 ? 108 : 128
  ctx.textBaseline = 'top'
  card.lines.forEach((line, i) => {
    const y = 100 + i * (fz + 6)
    // Drop shadow for readability
    ctx.font = `900 ${fz}px Arial Black, Arial`
    ctx.fillStyle = 'rgba(0,0,0,0.55)'
    ctx.fillText(line, 46, y + 4)
    ctx.fillStyle = 'rgba(255,255,255,0.97)'
    ctx.fillText(line, 44, y)
  })

  const titleBottom = 100 + card.lines.length * (fz + 6) + 18

  // Color accent underline
  ctx.fillStyle = card.color
  ctx.fillRect(44, titleBottom, 100, 5)

  // Subtitle
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  ctx.font = '26px Arial'
  let wds = card.sub.split(' '), ln = '', ly = titleBottom + 50
  wds.forEach(w => {
    const t = ln + w + ' '
    if (ctx.measureText(t).width > W - 90 && ln) { ctx.fillText(ln, 44, ly); ln = w + ' '; ly += 36 }
    else ln = t
  })
  ctx.fillText(ln.trim(), 44, ly)

  // Scroll hint
  ctx.fillStyle = card.color + 'bb'
  ctx.font = 'bold 14px Arial'
  ctx.fillText('↓  devam', 44, H - 44)

  // Border
  ctx.strokeStyle = card.color + '88'
  ctx.lineWidth = 2.5
  ctx.strokeRect(2, 2, W - 4, H - 4)

  // Corner L-brackets
  const cs = 42
  ctx.strokeStyle = card.color; ctx.lineWidth = 3.5
  ;([[0,0],[W,0],[0,H],[W,H]] as [number,number][]).forEach(([cx,cy]) => {
    const sx = cx===0?1:-1, sy = cy===0?1:-1
    ctx.beginPath()
    ctx.moveTo(cx+sx*cs, cy+sy*2.5); ctx.lineTo(cx+sx*2.5, cy+sy*2.5); ctx.lineTo(cx+sx*2.5, cy+sy*cs)
    ctx.stroke()
  })

  return new THREE.CanvasTexture(c)
}

// ── One card — scroll-driven fan animation ─────────────────────────────────────
function GlassCard({ card, idx, scrollRef }: { card: CardDef; idx: number; scrollRef: React.RefObject<number> }) {
  const group   = useRef<THREE.Group>(null)
  const matRef  = useRef<THREE.MeshStandardMaterial>(null)
  const texture = useMemo(() => buildTex(card), [card])
  const W = 5.6, H = 7.8, N = CARDS.length

  useFrame(() => {
    if (!group.current || !matRef.current) return

    const maxS = Math.max(document.body.scrollHeight - window.innerHeight, 1)
    const sp   = Math.min((scrollRef.current ?? 0) / maxS, 1)

    // relPos: 0 = this card is active, 1 = next up, -1 = just passed
    const relPos = idx - sp * N

    // Show only active card + one preview card peeking from right
    // Active window: -0.3 (just exiting) to 1.5 (next preview)
    const show = relPos > -0.35 && relPos < 1.55
    group.current.visible = show
    if (!show) return

    const p = Math.max(-0.35, Math.min(1.5, relPos))

    // Position: active sits center-left, next peeks from right edge
    // p=0 → x=-0.6 (center-left), p=1 → x=5.2 (right edge, barely visible)
    const tX    = p < 0 ? p * 4 - 0.6 : p * 5.8 - 0.6
    const tZ    = p * -2.2
    const tRotY = p * -0.44 - 0.14   // both cards tilt same direction (left-facing) like reference
    const tSc   = p < 0 ? Math.max(0.5, 1 + p * 0.4) : Math.max(0.48, 1 - p * 0.3)
    const tAlph = p < -0.1 ? Math.max(0, 1 + p / 0.25) : 1

    const g = group.current
    g.position.x += (tX    - g.position.x) * 0.08
    g.position.z += (tZ    - g.position.z) * 0.08
    g.rotation.y += (tRotY - g.rotation.y) * 0.08
    g.scale.setScalar(g.scale.x + (tSc - g.scale.x) * 0.08)
    matRef.current.opacity = tAlph
  })

  const th = 0.022
  return (
    <group ref={group}>
      {/* Glass face */}
      <mesh>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial ref={matRef} map={texture} transparent opacity={1} depthWrite={false} />
      </mesh>

      {/* Neon border strips */}
      {[
        { p:[0, H/2,0]  as [number,number,number], g:[W+th, th, 0.01] as [number,number,number] },
        { p:[0,-H/2,0]  as [number,number,number], g:[W+th, th, 0.01] as [number,number,number] },
        { p:[-W/2,0,0]  as [number,number,number], g:[th,   H,  0.01] as [number,number,number] },
        { p:[ W/2,0,0]  as [number,number,number], g:[th,   H,  0.01] as [number,number,number] },
      ].map(({ p, g }, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={g} />
          <meshStandardMaterial color={card.color} emissive={card.color} emissiveIntensity={5} />
        </mesh>
      ))}

      {/* Corner glow spheres */}
      {([[-1,-1],[1,-1],[-1,1],[1,1]] as [number,number][]).map(([sx,sy], ci) => (
        <mesh key={ci} position={[(sx*W)/2, (sy*H)/2, 0.01]}>
          <sphereGeometry args={[0.065, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive={card.color} emissiveIntensity={9} />
        </mesh>
      ))}

      <pointLight color={card.color} intensity={2.5} distance={5} decay={2} />
    </group>
  )
}

// ── Scene ──────────────────────────────────────────────────────────────────────
function Scene({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  return (
    <>
      <color attach="background" args={['#020603']} />
      <CameraRig />
      <ambientLight intensity={0.04} />
      <BlobBg />
      {CARDS.map((d, i) => <GlassCard key={i} card={d} idx={i} scrollRef={scrollRef} />)}
      <EffectComposer>
        <Bloom intensity={1.4} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function Background3D() {
  const scrollRef = useRef<number>(0)
  useEffect(() => {
    const h = () => { scrollRef.current = window.scrollY }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 7.5], fov: 65 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }}>
        <Scene scrollRef={scrollRef} />
      </Canvas>
    </div>
  )
}
