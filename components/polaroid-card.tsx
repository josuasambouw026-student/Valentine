"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"

interface PolaroidCardProps {
  src: string
  caption: string
  rotation?: number
  alt: string
  backMessage?: string
  index?: number
}

export function PolaroidCard({
  src,
  caption,
  rotation = 0,
  alt,
  backMessage = "You make my heart smile",
  index = 0,
}: PolaroidCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [liked, setLiked] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    const current = cardRef.current
    if (current) observer.observe(current)
    return () => {
      if (current) observer.unobserve(current)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="mb-6 inline-block w-full break-inside-avoid"
      style={{
        perspective: "800px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
      }}
    >
      <div
        className="relative cursor-pointer transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotate(${rotation}deg) ${isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"}`,
        }}
        onClick={() => setIsFlipped(!isFlipped)}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? "Flip card back" : `Flip card: ${caption}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setIsFlipped(!isFlipped)
          }
        }}
      >
        {/* Front */}
        <div
          className="relative bg-card p-3 shadow-[4px_6px_20px_rgba(0,0,0,0.12)] transition-shadow duration-500 hover:shadow-[6px_10px_30px_rgba(0,0,0,0.2)] md:p-4"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 400px) 90vw, (max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
            />
            {/* Tap hint overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors duration-300 hover:bg-foreground/5">
              <span className="rounded-full bg-card/80 px-2 py-0.5 font-sans text-[8px] tracking-wider text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100 uppercase sm:px-3 sm:py-1 sm:text-[10px]">
                Tap to flip
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between px-1 pt-2 pb-1 sm:pt-3 sm:pb-2 md:pt-4 md:pb-3">
            <p className="font-script text-sm text-foreground sm:text-base md:text-lg">
              {caption}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLiked(!liked)
              }}
              className="flex-shrink-0 p-1.5 transition-transform duration-300 hover:scale-125"
              aria-label={liked ? "Unlike memory" : "Like memory"}
            >
              <Heart
                className={`h-3.5 w-3.5 transition-all duration-300 sm:h-4 sm:w-4 md:h-5 md:w-5 ${
                  liked
                    ? "fill-primary text-primary scale-110"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-card p-4 shadow-[4px_6px_20px_rgba(0,0,0,0.12)] sm:p-6 md:p-8"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Heart className="mb-3 h-6 w-6 animate-pulse-soft fill-primary text-primary sm:mb-4 sm:h-8 sm:w-8" />
          <p className="text-center font-script text-base leading-relaxed text-foreground sm:text-lg md:text-xl">
            {backMessage}
          </p>
          <p className="mt-3 font-sans text-[8px] tracking-wider text-muted-foreground uppercase sm:mt-4 sm:text-[10px]">
            Tap to flip back
          </p>
        </div>
      </div>
    </div>
  )
}
