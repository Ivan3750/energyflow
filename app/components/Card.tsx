"use client"

import { useState, useEffect, ReactNode } from "react"

type CardProps = {
  id: string
  title: string
  image?: string
  children?: ReactNode
}

export default function Card({ id, title, image, children }: CardProps) {
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
      favorites.push({ id, title, image })
      setIsFavorite(true)
    }

    localStorage.setItem("favorites", JSON.stringify(favorites))
  }

  return (
    <div className="p-4 border rounded-lg shadow-md flex flex-col items-center w-[250px]">
      {image && <img src={image} alt={title} className="w-full h-40 object-cover rounded" />}
      <h3 className="mt-2">{title}</h3>

      <button onClick={toggleFavorite}>
        {isFavorite ? "❤️" : "🤍"}
      </button>

      
      {children}
    </div>
  )
}
