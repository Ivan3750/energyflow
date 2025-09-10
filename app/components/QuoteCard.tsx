"use client";

import { useEffect, useState } from "react";
import { useTranslate } from "../hooks/useTranslate";
import PageLoader from "./PageLoader";

interface Quote {
  author: string;
  quote: string;
}

const QuoteCard = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const { t, lang } = useTranslate();

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const today = new Date().toDateString();
        const storageKey = `quoteOfTheDay_${lang}`;
        const storedData = localStorage.getItem(storageKey);

        if (storedData) {
          const parsed = JSON.parse(storedData);
          if (parsed.date === today) {
            setQuote(parsed.quote);
            return;
          }
        }

        const res = await fetch(`/api/quote?lang=${lang}`);
        const data: Quote = await res.json();
        setQuote(data);

        localStorage.setItem(
          storageKey,
          JSON.stringify({ date: today, quote: data })
        );
      } catch (error) {
        console.error("Ошибка загрузки цитаты:", error);
      }
    };

    fetchQuote();
  }, [lang]);

  return (
    <div className="quote-container">
      <div className="quote-card">
        <div className="quote-left">
          <div className="topp">
            <div className="topp-left">
              <div className="quote-icon">
                <img src="/img/icon.png" alt="icon" className="quote-image1" />
              </div>
              <h3 className="quote-title">{t("quote_title")}</h3>
            </div>
            <div className="topp-right">
              <img
                src="/img/bracket.png"
                alt="bracket"
                className="bracket-image"
              />
            </div>
          </div>
          {quote ? <p className="quote-text">{quote.quote}</p> : <PageLoader />}
          <p className="quote-author">{quote?.author}</p>
        </div>
        <div className="quote-right">
          <img src="/img/fitness.png" alt="Fitness" className="quote-image1" />
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
