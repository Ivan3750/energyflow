// components/QuoteCard.tsx
"use client";

import { useEffect, useState } from "react";

interface Quote {
  author: string;
  quote: string;
}

const QuoteCard = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch("https://energyflow.b.goit.study/api/quote");
        const data = await res.json();
        setQuote(data);
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
      <img src="/img/icon.png" alt="icon" className="quote-image" />
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
          <img src="/img/fitness.png" alt="Fitness" className="quote-image" />
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
