import { MotionConfig } from 'motion/react'
import { ChatProvider } from './hooks/useChat'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import BuddhaEyesDivider from './components/BuddhaEyesDivider'
import Features from './components/Features'
import Courses from './components/Courses'
import AITutor from './components/AITutor'
import HowItWorks from './components/HowItWorks'
import Stats from './components/Stats'
import Tutors from './components/Tutors'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Footer, { CTA } from './components/Footer'
import ChatWidget from './components/ChatWidget'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ChatProvider>
        <div className="noise" />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <BuddhaEyesDivider />
          <Features />
          <Courses />
          <AITutor />
          <HowItWorks />
          <Stats />
          <Tutors />
          <Testimonials />
          <Pricing />
          <FAQ />
          <CTA />
        </main>
        <Footer />
        <ChatWidget />
      </ChatProvider>
    </MotionConfig>
  )
}
