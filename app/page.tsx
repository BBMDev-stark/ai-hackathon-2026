import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Timeline from '@/components/Timeline'
import Topics from '@/components/Topics'
import Rules from '@/components/Rules'
import Evaluation from '@/components/Evaluation'
import Awards from '@/components/Awards'
import Judges from '@/components/Judges'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'

export default function Home() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Topics />
      <Rules />
      <Evaluation />
      <Awards />
      <Judges />
      <CTA />
      <Footer />
    </main>
  )
}
