// components/QuoteCard.tsx
"use client";

import { useEffect, useState } from "react";
import { FaDumbbell } from 'react-icons/fa';
import { SportsCard } from './SportsCard'; 

interface Quote {
  author: string;
  quote: string;
}

const QuoteCardFav = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

    useEffect(() => {
    const fetchQuote = async () => {
      try {
        const today = new Date().toDateString();
        const storedData = localStorage.getItem("quoteOfTheDay");

        if (storedData) {
          const parsed = JSON.parse(storedData);
          if (parsed.date === today) {
            setQuote(parsed.quote); 
            return;
          }
        }

        const res = await fetch("https://energyflow.b.goit.study/api/quote");
        const data = await res.json();
        setQuote(data);

        localStorage.setItem(
          "quoteOfTheDay",
          JSON.stringify({ date: today, quote: data })
        );
      } catch (error) {
        console.error("Ошибка загрузки цитаты:", error);
      }
    };

    fetchQuote();
  }, []);


  return (
    <div className="quote-container">
      <div className="quote-card">
        <div className="quote-left">
          <div className="topp">
            <div className="topp-left">
              <div className="quote-icon">
                <img src="/img/icon.png" alt="icon" className="1" />
              </div>
              <h3 className="quote-title">Quote of the day</h3>
            </div>
            <div className="topp-right">
              <img src="/img/bracket.png" alt="bracket" className="bracket-image" />
            </div>
          </div>
          <p className="quote-text">{quote?.quote || "Loading..."}</p>
          <p className="quote-author">{quote?.author}</p>
        </div>
        <div className="quote-right">
          <div className="image-and-card">
            <img src="/img/fitness.png" alt="Fitness" className="quote-image2" />
            <SportsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCardFav;