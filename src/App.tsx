import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import UseCases from './components/UseCases'
import DashboardPreview from './components/DashboardPreview'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

// Three.js scene is lazy-loaded so it doesn't block the initial render
const Background3D = lazy(() => import('./components/Background3D'))

function App() {
  return (
    <>
      {/* Fixed 3D background — covers entire viewport, z-index 0 */}
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>

      {/* All HTML content sits above the 3D canvas */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <HowItWorks />
          <Features />
          <UseCases />
          <DashboardPreview />
          <Pricing />
          <FAQ />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
