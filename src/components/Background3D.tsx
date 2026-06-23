import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Grid } from '@react-three/drei'
import * as THREE from 'three'

// ── Camera rig: mouse tilt + scroll fly-through ───────────────────────────
function CameraRig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const sm = useRef({ x: 0, y: 0 })   // smoothed mouse
  const ss = useRef(0)                  // smoothed scroll

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    // Smooth mouse
    sm.current.x += (mouse.current.x - sm.current.x) * 0.04
    sm.current.y += (mouse.current.y - sm.current.y) * 0.04

    // Smooth scroll (clamp to [0, 1])
    const raw = scrollRef.current
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1)
    const targetPct = Math.min(raw / maxScroll, 1)
    ss.current += (targetPct - ss.current) * 0.045

    // Fly-through: camera moves forward (−Z) as you scroll
    camera.position.z = THREE.MathUtils.lerp(9, -22, ss.current)
    camera.position.y = THREE.MathUtils.lerp(1.5, -1.5, ss.current)
    camera.position.x = sm.current.x * 1.2

    // Mouse-driven tilt
    camera.rotation.y = sm.current.x * -0.07
    camera.rotation.x = sm.current.y * 0.035 - ss.current * 0.1
  })

  return null
}

// ── Glowing neon document frame ───────────────────────────────────────────
interface FrameProps {
  pos: [number, number, number]
  rotY?: number
  color?: string
  w?: number
  h?: number
  idx?: number
}

function DocFrame({ pos, rotY = 0, color = '#10b981', w = 1.65, h = 2.3, idx = 0 }: FrameProps) {
  const g = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!g.current) return
    const t = state.clock.elapsedTime + idx * 1.6
    g.current.position.y = pos[1] + Math.sin(t * 0.38) * 0.22
    g.current.rotation.y = rotY + Math.sin(t * 0.11) * 0.05
  })

  const th = 0.04   // edge thickness
  const d = 0.012   // depth

  return (
    <group ref={g} position={pos}>
      {/* Translucent face */}
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
          emissive={color}
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* Neon edge tubes */}
      {/* Top */}
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[w + th, th, d]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} metalness={0.5} roughness={0.1} />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -h / 2, 0]}>
        <boxGeometry args={[w + th, th, d]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} metalness={0.5} roughness={0.1} />
      </mesh>
      {/* Left */}
      <mesh position={[-w / 2, 0, 0]}>
        <boxGeometry args={[th, h, d]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} metalness={0.5} roughness={0.1} />
      </mesh>
      {/* Right */}
      <mesh position={[w / 2, 0, 0]}>
        <boxGeometry args={[th, h, d]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} metalness={0.5} roughness={0.1} />
      </mesh>

      {/* Corner glows (small bright cubes at corners) */}
      {(
        [[-1, -1], [-1, 1], [1, -1], [1, 1]] as [number, number][]
      ).map(([sx, sy], ci) => (
        <mesh key={ci} position={[(sx * w) / 2, (sy * h) / 2, 0]}>
          <boxGeometry args={[th * 1.8, th * 1.8, d * 2]} />
          <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={3} />
        </mesh>
      ))}
    </group>
  )
}

// ── Particle cloud ────────────────────────────────────────────────────────
function Particles() {
  const ref = useRef<THREE.Points>(null)
  const COUNT = 800

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)

    // Emerald / green palette
    const palette = [
      new THREE.Color('#34d399'),
      new THREE.Color('#10b981'),
      new THREE.Color('#059669'),
      new THREE.Color('#047857'),
      new THREE.Color('#6ee7b7'),
    ]

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 55
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28
      pos[i * 3 + 2] = Math.random() * -50 + 12   // spread along Z so they appear as you fly

      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    return [pos, col]
  }, [])

  useFrame((s) => {
    if (!ref.current) return
    ref.current.rotation.y = s.clock.elapsedTime * 0.004
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
      </bufferGeometry>
      <pointsMaterial size={0.055} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

// ── Horizontal scan rings (give motion feel) ──────────────────────────────
function ScanRings() {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (ring1.current) {
      ring1.current.position.z = -5 - ((t * 3) % 30)
      ring1.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.08)
    }
    if (ring2.current) {
      ring2.current.position.z = -5 - (((t + 15) * 3) % 30)
      ring2.current.scale.setScalar(1 + Math.sin(t * 0.5 + Math.PI) * 0.08)
    }
  })

  const ringMat = (
    <meshStandardMaterial
      color="#34d399"
      emissive="#34d399"
      emissiveIntensity={1.2}
      transparent
      opacity={0.18}
      side={THREE.DoubleSide}
      wireframe
    />
  )

  return (
    <>
      <mesh ref={ring1} position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[10, 0.04, 6, 80]} />
        {ringMat}
      </mesh>
      <mesh ref={ring2} position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[14, 0.04, 6, 80]} />
        {ringMat}
      </mesh>
    </>
  )
}

// ── 3-D scene ─────────────────────────────────────────────────────────────
function Scene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <CameraRig scrollRef={scrollRef} />

      {/* Atmospheric depth fog */}
      <fog attach="fog" args={['#050a07', 12, 50]} />

      {/* Lights */}
      <ambientLight intensity={0.04} />
      <pointLight position={[-4, 5, 2]}   color="#047857" intensity={12} distance={25} decay={2} />
      <pointLight position={[5, 3, -5]}   color="#34d399" intensity={8}  distance={25} decay={2} />
      <pointLight position={[0, 8, -12]}  color="#059669" intensity={6}  distance={30} decay={2} />
      <pointLight position={[-6, 2, -20]} color="#10b981" intensity={5}  distance={30} decay={2} />

      {/* Infinite neon grid floor */}
      <Grid
        position={[0, -4, -5]}
        args={[100, 100]}
        cellSize={1.5}
        cellThickness={0.5}
        cellColor="#022c22"
        sectionSize={6}
        sectionThickness={1.1}
        sectionColor="#047857"
        fadeDistance={45}
        fadeStrength={2.5}
        infiniteGrid
      />

      {/* Scan rings flying past you */}
      <ScanRings />

      {/* Document panels — arranged along Z so you fly through them on scroll */}
      {/* Near row */}
      <DocFrame pos={[-3.8,  1.0, -3]}  rotY={0.35}  color="#34d399" idx={0} />
      <DocFrame pos={[4.2,   0.5, -5]}  rotY={-0.3}  color="#10b981" idx={1} />

      {/* Middle row */}
      <DocFrame pos={[-5.5,  1.5, -9]}  rotY={0.55}  color="#34d399" idx={2} w={1.4} h={2.0} />
      <DocFrame pos={[5.8,   2.0, -12]} rotY={-0.45} color="#059669" idx={3} />
      <DocFrame pos={[-1.5,  0.0, -15]} rotY={0.15}  color="#10b981" idx={4} w={1.9} h={2.6} />

      {/* Far row */}
      <DocFrame pos={[2.5,   1.5, -19]} rotY={-0.25} color="#34d399" idx={5} />
      <DocFrame pos={[-6.5,  0.5, -23]} rotY={0.7}   color="#059669" idx={6} w={1.3} h={1.9} />
      <DocFrame pos={[6.5,   1.0, -27]} rotY={-0.5}  color="#10b981" idx={7} />
      <DocFrame pos={[0,     2.5, -32]} rotY={0.1}   color="#34d399" idx={8} w={2.2} h={3.0} />

      {/* Very far row — visible at deep scroll */}
      <DocFrame pos={[-4, 1, -38]} rotY={0.4}  color="#059669" idx={9} />
      <DocFrame pos={[4,  0, -44]} rotY={-0.3} color="#34d399" idx={10} />

      {/* Particles */}
      <Particles />
    </>
  )
}

// ── Exported wrapper ──────────────────────────────────────────────────────
export default function Background3D() {
  const scrollRef = useRef(0)

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 1.5, 9], fov: 62 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#050a07' }}
      >
        <Scene scrollRef={scrollRef} />
      </Canvas>
    </div>
  )
}
