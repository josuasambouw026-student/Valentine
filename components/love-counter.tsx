"use client"

import { useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"

const REASONS = [
  "Your smile that calms my heart",
  "The way you notice the little things",
  "Your loyalty that never wavers",
  "Your laugh, my favorite melody",
  "Your embrace that feels like home",
  "The way you make everything perfect",
  "Your eyes that speak without words",
  "Your heart, as gentle as silk",
  "Your presence that changed my world",
  "You, MJ -- the best reason to be happy",
]

export function LoveCounter() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRevealing, setIsRevealing] = useState(false)
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([])
  const sectionRef = useRef<HTMLElement>(null)
  const heartIdRef = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    const current = sectionRef.current
    if (current) observer.observe(current)
    return () => { if (current) observer.unobserve(current) }
  }, [])

  const handleRevealNext = () => {
    if (currentIndex >= REASONS.length || isRevealing) return
    setIsRevealing(true)

    // Spawn burst of mini hearts
    const newHearts = Array.from({ length: 5 }, () => ({
      id: heartIdRef.current++,
      x: Math.random() * 200 - 100,
      y: -(Math.random() * 150 + 50),
    }))
    setHearts((prev) => [...prev, ...newHearts])

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setIsRevealing(false)
    }, 300)

    // Clean old hearts
    setTimeout(() => {
      setHearts((prev) => prev.slice(5))
    }, 1500)
  }

  return (
    <section
      ref={sectionRef}
      className={`px-4 py-16 transition-all duration-1000 md:py-24 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-2 text-xs tracking-[0.3em] text-muted-foreground uppercase md:text-sm">
          Tap the heart
        </p>
        <h2 className="mb-8 font-script text-3xl text-foreground md:text-5xl">
          Reasons I Love You, MJ
        </h2>

        {/* Counter Display */}
        <div className="mb-8 flex items-baseline justify-center gap-2">
          <span className="font-serif text-6xl font-bold text-primary md:text-8xl">
            {currentIndex}
          </span>
          <span className="font-sans text-sm text-muted-foreground md:text-base">
            / {REASONS.length}
          </span>
        </div>

        {/* Current Reason */}
        <div className="mb-10 flex min-h-[60px] items-center justify-center">
          {currentIndex > 0 ? (
            <p
              key={currentIndex}
              className="animate-fade-in-up font-script text-xl text-foreground md:text-2xl"
            >
              {REASONS[currentIndex - 1]}
            </p>
          ) : (
            <p className="font-sans text-sm text-muted-foreground italic">
              {'Tap the heart to begin...'}
            </p>
          )}
        </div>

        {/* Heart Button */}
        <div className="relative inline-flex items-center justify-center">
          {/* Burst hearts */}
          {hearts.map((h) => (
            <Heart
              key={h.id}
              className="pointer-events-none absolute h-4 w-4 fill-primary text-primary"
              style={{
                animation: "fade-in-up 1s ease-out forwards",
                transform: `translate(${h.x}px, ${h.y}px)`,
                opacity: 0,
                transition: "transform 1s ease-out, opacity 1s ease-out",
              }}
            />
          ))}

          <button
            onClick={handleRevealNext}
            disabled={currentIndex >= REASONS.length}
            className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-card shadow-[2px_4px_16px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-110 hover:shadow-[4px_8px_24px_rgba(0,0,0,0.15)] disabled:opacity-50 disabled:hover:scale-100 md:h-24 md:w-24"
            aria-label={`Reveal reason ${currentIndex + 1}`}
          >
            <Heart
              className={`h-8 w-8 fill-primary text-primary transition-transform duration-300 md:h-10 md:w-10 ${
                currentIndex < REASONS.length
                  ? "animate-heartbeat"
                  : ""
              } ${isRevealing ? "scale-150" : "group-hover:scale-110"}`}
            />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mx-auto mt-8 h-1 max-w-xs overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(currentIndex / REASONS.length) * 100}%` }}
          />
        </div>

        {currentIndex >= REASONS.length && (
          <p className="mt-6 animate-fade-in-up font-script text-xl text-primary">
            And there are a million more reasons still...
          </p>
        )}
      </div>
    </section>
  )
}
