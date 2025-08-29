"use client"

import { useState, useEffect } from "react"

type CardProps = {
  id: string
  title: string
}

export default function Card({ id, title }: CardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFavorite(favorites.some((fav: CardProps) => fav.id === id))
  }, [id])

  const toggleFavorite = () => {
  let favorites: CardProps[] = JSON.parse(localStorage.getItem("favorites") || "[]")

  if (favorites.some((fav) => fav.id === id)) { 
    favorites = favorites.filter((fav) => fav.id !== id)
    setIsFavorite(false)
  } else {
    favorites.push({ id, title })
    setIsFavorite(true)
  }

 
  localStorage.setItem("favorites", JSON.stringify(favorites))
}


  return (
    <div className="p-4 border rounded-lg shadow-md flex justify-between items-center w-[250px]">
      <h3>{title}</h3>
      <button onClick={toggleFavorite}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  )
}
