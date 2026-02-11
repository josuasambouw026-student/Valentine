"use client"

import { useEffect, useState, useCallback } from "react"
import { Volume2, VolumeX } from "lucide-react"

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const audio = document.getElementById("background-music") as HTMLAudioElement
    if (!audio) {
      setIsLoaded(false)
      return
    }

    setIsLoaded(true)

    // Sync UI state with actual audio state
    const updatePlayingState = () => {
      setIsPlaying(!audio.paused)
    }

    audio.addEventListener("play", updatePlayingState)
    audio.addEventListener("pause", updatePlayingState)
    audio.addEventListener("ended", updatePlayingState)

    return () => {
      audio.removeEventListener("play", updatePlayingState)
      audio.removeEventListener("pause", updatePlayingState)
      audio.removeEventListener("ended", updatePlayingState)
    }
  }, [isMounted])

  const toggleMusic = useCallback(() => {
    const audio = document.getElementById("background-music") as HTMLAudioElement
    if (!audio) return

    if (audio.paused) {
      // Set volume if not already set
      if (audio.volume !== 0.3) {
        audio.volume = 0.3
      }
      audio.play().catch((error) => {
        console.warn("Could not play audio:", error)
      })
    } else {
      audio.pause()
    }
  }, [])

  if (!isMounted) return null

  return (
    <button
      onClick={toggleMusic}
      className={`fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full shadow-[2px_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 hover:shadow-[2px_6px_20px_rgba(0,0,0,0.2)] sm:bottom-6 sm:right-6 sm:h-12 sm:w-12 md:bottom-8 md:right-8 ${
        isPlaying
          ? "bg-primary text-primary-foreground"
          : "bg-card text-foreground"
      }`}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
    >
      {isPlaying ? (
        <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
      ) : (
        <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
      )}
      {isPlaying && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
        </span>
      )}
      {!isLoaded && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-500 animate-pulse" />
        </span>
      )}
    </button>
  )
}
