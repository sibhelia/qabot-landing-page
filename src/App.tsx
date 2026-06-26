import ParticleBackground from './components/ParticleBackground'
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

function App() {
  return (
    <>
      <ParticleBackground />
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
