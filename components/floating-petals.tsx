"use client"

import { useEffect, useState } from "react"

interface Petal {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  opacity: number
  type: "heart" | "petal" | "star"
}

export function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const items: Petal[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 14 + 8,
      delay: Math.random() * 15,
      duration: Math.random() * 10 + 10,
      opacity: Math.random() * 0.3 + 0.1,
      type: i % 3 === 0 ? "heart" : i % 3 === 1 ? "petal" : "star",
    }))
    setPetals(items)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            bottom: "-20px",
            animation: `drift ${petal.duration}s linear ${petal.delay}s infinite`,
            opacity: petal.opacity,
          }}
        >
          {petal.type === "heart" ? (
            <svg
              width={petal.size}
              height={petal.size}
              viewBox="0 0 24 24"
              fill="hsl(350 60% 52%)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : petal.type === "petal" ? (
            <svg
              width={petal.size}
              height={petal.size * 1.4}
              viewBox="0 0 20 28"
              fill="hsl(350 45% 72%)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="10" cy="14" rx="7" ry="12" opacity="0.6" />
            </svg>
          ) : (
            <svg
              width={petal.size * 0.8}
              height={petal.size * 0.8}
              viewBox="0 0 24 24"
              fill="hsl(40 70% 65%)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" opacity="0.5" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
