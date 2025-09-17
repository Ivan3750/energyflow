import Footer from "./components/Footer"
import Image from "next/image"
import Hero from "./components/Hero";
import InfoBlock from "./components/InfoBlolck"
import QuoteCard from "./components/QuoteCard";
import Exercises from "./components/Exercises";


export default function Home() {
  return (

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Hero />
        <div className="px-[48px] py-[55px] w-full"> 
        <QuoteCard />
        </div>
        <Exercises />
        <InfoBlock />
      </main>
  )
}
