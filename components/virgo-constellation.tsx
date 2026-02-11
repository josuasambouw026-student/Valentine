"use client"

import { useEffect, useRef, useState } from "react"

const LOVE_STARS = [
  { x: 20, y: 25, label: "First Glance" },
  { x: 30, y: 40, label: "First Date" },
  { x: 45, y: 30, label: "First Laugh" },
  { x: 50, y: 50, label: "First Kiss" },
  { x: 60, y: 35, label: "First Trip" },
  { x: 40, y: 60, label: "First Dance" },
  { x: 55, y: 70, label: "First Letter" },
  { x: 70, y: 55, label: "First Promise" },
  { x: 75, y: 40, label: "Forever" },
]

const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [2, 4], [3, 5], [5, 6], [4, 7], [7, 8], [4, 8],
]

const MJ_TRAITS = [
  "The way you notice every little detail",
  "Loyal and endlessly loving",
  "Brilliant and wise beyond words",
  "Always there when I need you most",
  "A heart as gentle as morning light",
  "Sincere in everything you do",
  "You make everything more beautiful",
  "Perfect in every way that matters",
  "The brightest star in my whole life",
]

export function VirgoConstellation() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStar, setActiveStar] = useState<number | null>(null)
  const [revealedStars, setRevealedStars] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

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

  const handleStarClick = (index: number) => {
    setActiveStar(index)
    setRevealedStars((prev) => new Set(prev).add(index))
  }

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden px-4 py-16 transition-all duration-1000 md:py-24 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 text-xs tracking-[0.3em] text-muted-foreground uppercase md:text-sm">
          Written in the stars
        </p>
        <h2 className="mb-3 font-script text-4xl text-foreground md:text-5xl">
          Our Valentine Constellation
        </h2>
        <p className="mb-10 font-sans text-sm text-muted-foreground md:text-base">
          Tap each star to reveal what makes you special, MJ
        </p>

        {/* Constellation Map */}
        <div className="relative mx-auto aspect-[4/3] max-w-lg">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Connection lines */}
            {CONNECTIONS.map(([from, to], i) => (
              <line
                key={`line-${i}`}
                x1={LOVE_STARS[from].x}
                y1={LOVE_STARS[from].y}
                x2={LOVE_STARS[to].x}
                y2={LOVE_STARS[to].y}
                stroke="hsl(350 60% 52%)"
                strokeWidth="0.3"
                strokeOpacity={isVisible ? 0.4 : 0}
                strokeDasharray="2 1"
                className="transition-all duration-1000"
                style={{ transitionDelay: `${i * 200}ms` }}
              />
            ))}

            {/* Stars */}
            {LOVE_STARS.map((star, i) => (
              <g key={`star-${i}`} className="cursor-pointer" onClick={() => handleStarClick(i)}>
                {/* Glow */}
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={revealedStars.has(i) ? 4 : 2.5}
                  fill="hsl(350 60% 52%)"
                  opacity={revealedStars.has(i) ? 0.15 : 0.08}
                  className="transition-all duration-500"
                />
                {/* Star dot */}
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={activeStar === i ? 2 : 1.2}
                  fill={revealedStars.has(i) ? "hsl(350 60% 52%)" : "hsl(40 70% 65%)"}
                  className="transition-all duration-300"
                  style={{
                    animation: isVisible
                      ? `twinkle 3s ease-in-out ${i * 0.4}s infinite`
                      : "none",
                  }}
                />
                {/* Label */}
                <text
                  x={star.x}
                  y={star.y - 4}
                  textAnchor="middle"
                  fill="hsl(20 10% 45%)"
                  fontSize="2"
                  fontFamily="serif"
                  opacity={isVisible ? 0.6 : 0}
                  className="transition-opacity duration-500 pointer-events-none"
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {star.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Revealed Trait */}
        <div className="mt-6 flex min-h-[80px] items-center justify-center">
          {activeStar !== null ? (
            <div
              key={activeStar}
              className="animate-fade-in-up rounded-sm bg-card px-6 py-4 shadow-[2px_4px_12px_rgba(0,0,0,0.08)]"
            >
              <p className="font-script text-xl text-primary md:text-2xl">
                {MJ_TRAITS[activeStar]}
              </p>
              <p className="mt-1 font-sans text-xs text-muted-foreground">
                {LOVE_STARS[activeStar].label}
              </p>
            </div>
          ) : (
            <p className="font-sans text-sm text-muted-foreground italic">
              {'Click a star to see the message...'}
            </p>
          )}
        </div>

        {/* Progress */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {LOVE_STARS.map((_, i) => (
            <div
              key={`dot-${i}`}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                revealedStars.has(i)
                  ? "bg-primary scale-125"
                  : "bg-border"
              }`}
            />
          ))}
        </div>
        {revealedStars.size === LOVE_STARS.length && (
          <p className="mt-4 animate-fade-in-up font-script text-lg text-primary">
            Every star shines for you, MJ!
          </p>
        )}
      </div>
    </section>
  )
}
