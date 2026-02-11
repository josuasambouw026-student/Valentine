"use client"

import { useEffect, useState } from "react"
import { Heart, Star } from "lucide-react"

export function ScrapbookHeader() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="relative flex flex-col items-center overflow-hidden px-4 pb-6 pt-14 md:pb-10 md:pt-24">
      {/* Decorative scattered hearts */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {mounted && (
          <>
            <Heart className="absolute top-8 left-[10%] h-3 w-3 fill-primary/20 text-primary/20 animate-float-slow md:h-4 md:w-4" style={{ animationDelay: "0s" }} />
            <Heart className="absolute top-16 right-[15%] h-4 w-4 fill-primary/15 text-primary/15 animate-float-slow md:h-5 md:w-5" style={{ animationDelay: "1s" }} />
            <Star className="absolute top-10 right-[30%] h-3 w-3 text-primary/20 animate-sparkle md:h-4 md:w-4" style={{ animationDelay: "0.5s" }} />
            <Heart className="absolute bottom-4 left-[20%] h-3 w-3 fill-primary/10 text-primary/10 animate-float-slow md:h-4 md:w-4" style={{ animationDelay: "2s" }} />
            <Star className="absolute bottom-8 right-[10%] h-2 w-2 text-primary/15 animate-sparkle md:h-3 md:w-3" style={{ animationDelay: "1.5s" }} />
          </>
        )}
      </div>

      {/* Valentine badge */}
      <div className="mb-6 flex items-center gap-2 rounded-full bg-card px-4 py-1.5 shadow-[2px_3px_10px_rgba(0,0,0,0.06)]">
        <Star className="h-3 w-3 text-primary" />
        <span className="font-sans text-[10px] tracking-[0.25em] text-muted-foreground uppercase md:text-xs">
          Happy Valentine&apos;s Day, MJ
        </span>
        <Star className="h-3 w-3 text-primary" />
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-8 bg-primary/40 md:w-16" />
        <Heart className="h-5 w-5 animate-heartbeat fill-primary text-primary md:h-6 md:w-6" />
        <div className="h-px w-8 bg-primary/40 md:w-16" />
      </div>

      <h1
        className={`text-balance text-center font-script text-5xl text-foreground md:text-7xl lg:text-8xl transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        Our Love Story
      </h1>

      <p
        className={`mt-4 text-balance text-center font-sans text-sm tracking-widest text-muted-foreground uppercase md:text-base transition-all duration-1000 delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        A collection of our most beautiful memories together
      </p>

      <div
        className={`mt-6 flex items-center gap-2 transition-all duration-1000 delay-500 ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <div className="h-1 w-1 rounded-full bg-primary/50" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary/70" />
        <div className="h-2 w-2 animate-pulse-soft rounded-full bg-primary" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary/70" />
        <div className="h-1 w-1 rounded-full bg-primary/50" />
      </div>
    </header>
  )
}
