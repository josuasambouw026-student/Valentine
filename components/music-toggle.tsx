"use client"

import { useEffect, useState, useCallback } from "react"
import { Volume2, VolumeX } from "lucide-react"

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const toggleMusic = useCallback(() => {
    const audio = document.getElementById("background-music") as HTMLAudioElement
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }, [isPlaying])

  if (!isLoaded) return null

  return (
    <button
      onClick={toggleMusic}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-[2px_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 hover:shadow-[2px_6px_20px_rgba(0,0,0,0.2)] md:bottom-8 md:right-8 ${
        isPlaying
          ? "bg-primary text-primary-foreground"
          : "bg-card text-foreground"
      }`}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
    >
      {isPlaying ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
      {isPlaying && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
        </span>
      )}
    </button>
  )
}
