import Hero from "./components/Hero"
import Footer from "./components/Footer/Footer"
import Card from "./components/Card"
import QuoteCard from "./components/QuoteCard"


export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center gap-8 p-8">
      <main className="flex flex-col gap-6 items-center">
        <Hero />
        
        
        <div className="flex gap-4 flex-wrap">
          <Card id="1" title="Air bike" />
          <Card id="2" title="3/4 sit-up" />
          <Card id="3" title="Barbell rollout" />
        </div>
        <QuoteCard />

        <Footer />
      </main>
    </div>
  )
}
