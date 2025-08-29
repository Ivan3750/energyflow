"use client";

import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import QuoteCardFav from "../components/QuoteCardFav";

interface FavoriteItem {
  id: string;
  title: string;
  image?: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        const parsed: FavoriteItem[] = JSON.parse(stored);

        const uniqueFavorites = parsed
          .filter(item => item && item.id)
          .filter(
            (item, index, self) =>
              index === self.findIndex(t => t.id === item.id)
          );

        setFavorites(uniqueFavorites);
      } catch (error) {
        console.error("Ошибка парсинга избранного:", error);
      }
    }
  }, []);

  const removeFavorite = (id: string) => {
    setFavorites(prev => {
      const updated = prev.filter(f => f.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="p-4">
      
      <div className="mb-6">
        <QuoteCardFav />
      </div>

      <h1 className="text-xl font-bold mb-4">Favorites</h1>

      {favorites.length === 0 ? (
        <p>It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.</p>
      ) : (
        <div className="flex gap-4 flex-wrap">
          {favorites.map(item => (
            <Card key={item.id} id={item.id} title={item.title} image={item.image}>
              <button
                className="mt-2 px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => removeFavorite(item.id)}
              >
                delete
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
