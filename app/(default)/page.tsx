export const metadata = {
    title: 'Home',
    description: 'Catalyst Landing Page',
  }
  
  import Hero from '@/components/hero'
  import Features from '@/components/features'
  import FeaturesBlocks from '@/components/features-blocks'
  import Testimonials from '@/components/testimonials'
    
  export default function Home() {
    return (
      <>
        <Hero />
        <Features />
        <FeaturesBlocks />
        <Testimonials />
      </>
    )
  }