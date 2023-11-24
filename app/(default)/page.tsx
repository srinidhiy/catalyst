export const metadata = {
    title: 'Home',
    description: 'Catalyst Landing Page',
  }
  
  import Hero from '@/components/landing/hero'
  import Features from '@/components/landing/features'
  import FeaturesBlocks from '@/components/landing/features-blocks'
  import Testimonials from '@/components/landing/testimonials'
  import Header from '@/components/ui/header'
    
  export default function Home() {
    return (
      <>
        <Header />
        <Hero />
        <Features />
        <FeaturesBlocks />
        <Testimonials />
      </>
    )
  }