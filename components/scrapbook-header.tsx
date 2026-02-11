"use client"

import { useEffect, useState } from "react"
import { Heart, Star } from "lucide-react"

export function ScrapbookHeader() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="relative flex flex-col items-center overflow-hidden px-3 pb-4 pt-10 sm:px-4 sm:pb-6 sm:pt-14 md:pb-10 md:pt-24">
      {/* Decorative scattered hearts */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {mounted && (
          <>
            <Heart className="absolute top-6 left-[10%] h-2 w-2 fill-primary/20 text-primary/20 animate-float-slow sm:top-8 sm:h-3 sm:w-3 md:h-4 md:w-4" style={{ animationDelay: "0s" }} />
            <Heart className="absolute top-12 right-[15%] h-2.5 w-2.5 fill-primary/15 text-primary/15 animate-float-slow sm:top-16 sm:h-4 sm:w-4 md:h-5 md:w-5" style={{ animationDelay: "1s" }} />
            <Star className="absolute top-8 right-[30%] h-2 w-2 text-primary/20 animate-sparkle sm:top-10 sm:h-3 sm:w-3 md:h-4 md:w-4" style={{ animationDelay: "0.5s" }} />
            <Heart className="absolute bottom-3 left-[20%] h-2 w-2 fill-primary/10 text-primary/10 animate-float-slow sm:bottom-4 sm:h-3 sm:w-3 md:h-4 md:w-4" style={{ animationDelay: "2s" }} />
            <Star className="absolute bottom-6 right-[10%] h-1.5 w-1.5 text-primary/15 animate-sparkle sm:bottom-8 sm:h-2 sm:w-2 md:h-3 md:w-3" style={{ animationDelay: "1.5s" }} />
          </>
        )}
      </div>

      {/* Valentine badge */}
      <div className="mb-4 flex items-center gap-2 rounded-full bg-card px-3 py-1 shadow-[2px_3px_10px_rgba(0,0,0,0.06)] sm:mb-6 sm:px-4 sm:py-1.5">
        <Star className="h-2.5 w-2.5 text-primary sm:h-3 sm:w-3" />
        <span className="font-sans text-[8px] tracking-[0.25em] text-muted-foreground uppercase sm:text-[10px] md:text-xs">
          Happy Valentine&apos;s Day, MJ
        </span>
        <Star className="h-2.5 w-2.5 text-primary sm:h-3 sm:w-3" />
      </div>

      <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
        <div className="h-px w-6 bg-primary/40 sm:w-8 md:w-16" />
        <Heart className="h-4 w-4 animate-heartbeat fill-primary text-primary sm:h-5 sm:w-5 md:h-6 md:w-6" />
        <div className="h-px w-6 bg-primary/40 sm:w-8 md:w-16" />
      </div>

      <h1
        className={`text-balance text-center font-script text-3xl sm:text-4xl md:text-6xl lg:text-8xl transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        Our Love Story
      </h1>

      <p
        className={`mt-2 text-balance text-center font-sans text-xs tracking-widest text-muted-foreground uppercase sm:mt-4 sm:text-sm md:text-base transition-all duration-1000 delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        A collection of our most beautiful memories together
      </p>

      <div
        className={`mt-4 flex items-center gap-2 sm:mt-6 transition-all duration-1000 delay-500 ${
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
