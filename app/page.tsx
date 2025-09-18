import Footer from "./components/Footer"
import Image from "next/image"
import Hero from "./components/Hero";
import InfoBlock from "./components/InfoBlolck"
import QuoteCard from "./components/QuoteCard";
import Exercises from "./components/Exercises";
import Contact from "./components/Contact"

export default function Home() {
  return (

    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <div className="container">
        <Hero />
        <Contact />;
        <QuoteCard />
        <Exercises />
        <InfoBlock />
      </div>
    </main>
  )
}
