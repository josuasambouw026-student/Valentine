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
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
            />
            {/* Tap hint overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors duration-300 hover:bg-foreground/5">
              <span className="rounded-full bg-card/80 px-3 py-1 font-sans text-[10px] tracking-wider text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100 uppercase">
                Tap to flip
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between px-1 pt-3 pb-2 md:pt-4 md:pb-3">
            <p className="font-script text-base text-foreground md:text-lg">
              {caption}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLiked(!liked)
              }}
              className="flex-shrink-0 p-1 transition-transform duration-300 hover:scale-125"
              aria-label={liked ? "Unlike memory" : "Like memory"}
            >
              <Heart
                className={`h-4 w-4 transition-all duration-300 md:h-5 md:w-5 ${
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
          className="absolute inset-0 flex flex-col items-center justify-center bg-card p-6 shadow-[4px_6px_20px_rgba(0,0,0,0.12)] md:p-8"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Heart className="mb-4 h-8 w-8 animate-pulse-soft fill-primary text-primary" />
          <p className="text-center font-script text-lg leading-relaxed text-foreground md:text-xl">
            {backMessage}
          </p>
          <p className="mt-4 font-sans text-[10px] tracking-wider text-muted-foreground uppercase">
            Tap to flip back
          </p>
        </div>
      </div>
    </div>
  )
}
