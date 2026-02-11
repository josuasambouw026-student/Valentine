"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Heart } from "lucide-react"

const LETTER_LINES = [
  "My dearest MJ,",
  "",
  "Every second with you feels like a page from the most beautiful story ever written. From our very first steps on a sun-kissed beach, to those quiet mornings sharing coffee together, you have turned the ordinary into something extraordinary.",
  "",
  "I hold on to every laugh we shared while dancing under fairy lights, and the way the world seemed to pause when we watched the sunset side by side. These memories are the most precious treasure I own.",
  "",
  "You are my favorite chapter, my most beautiful verse, and the love story I never want to end. To us -- to every yesterday, every today, and all the tomorrows yet to come.",
  "",
  "Forever yours",
]

export function LoveLetter() {
  const [isVisible, setIsVisible] = useState(false)
  const [typedLines, setTypedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const typeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    const current = sectionRef.current
    if (current) observer.observe(current)
    return () => {
      if (current) observer.unobserve(current)
    }
  }, [])

  const typeNextChar = useCallback(() => {
    if (currentLine >= LETTER_LINES.length) {
      setIsTyping(false)
      setIsComplete(true)
      return
    }

    const line = LETTER_LINES[currentLine]

    if (line === "") {
      setTypedLines((prev) => [...prev, ""])
      setCurrentLine((prev) => prev + 1)
      setCurrentChar(0)
      return
    }

    if (currentChar < line.length) {
      setTypedLines((prev) => {
        const updated = [...prev]
        updated[currentLine] = line.substring(0, currentChar + 1)
        return updated
      })
      setCurrentChar((prev) => prev + 1)
    } else {
      setCurrentLine((prev) => prev + 1)
      setCurrentChar(0)
    }
  }, [currentLine, currentChar])

  useEffect(() => {
    if (!isVisible || !isTyping) return

    const delay = LETTER_LINES[currentLine] === "" ? 200 : 25
    typeTimeoutRef.current = setTimeout(typeNextChar, delay)

    return () => {
      if (typeTimeoutRef.current) clearTimeout(typeTimeoutRef.current)
    }
  }, [isVisible, isTyping, typeNextChar, currentLine])

  const handleStartTyping = () => {
    if (!isTyping && !isComplete) {
      setIsTyping(true)
      setTypedLines([])
      setCurrentLine(0)
      setCurrentChar(0)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="flex justify-center px-3 py-8 sm:px-4 sm:py-16 md:px-8 md:py-24"
    >
      <div
        className={`relative max-w-2xl w-full transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="relative rounded-sm bg-card p-5 shadow-[4px_6px_20px_rgba(0,0,0,0.1)] sm:p-8 md:p-12">
          {/* Decorative tape strips */}
          <div className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-2 bg-secondary/60" />
          <div className="absolute -top-2 left-[30%] h-5 w-12 -translate-x-1/2 rotate-3 bg-secondary/40" />

          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <Heart className="h-5 w-5 fill-primary text-primary" />
            <div className="h-px flex-1 bg-border" />
          </div>

          <h2 className="mb-6 text-center font-script text-2xl text-primary sm:mb-8 sm:text-3xl md:text-4xl">
            A Love Letter for You
          </h2>

          {!isTyping && !isComplete ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <p className="font-sans text-sm text-muted-foreground italic">
                {'There is something I want to tell you...'}
              </p>
              <button
                onClick={handleStartTyping}
                className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-sans text-sm text-primary-foreground tracking-wider shadow-[2px_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 hover:shadow-[4px_8px_20px_rgba(0,0,0,0.2)] uppercase"
              >
                <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-125" />
                Open Letter
              </button>
            </div>
          ) : (
            <div className="space-y-3 font-script text-base leading-relaxed text-foreground sm:space-y-4 sm:text-lg md:text-xl">
              {typedLines.map((line, i) => (
                <p
                  key={`line-${i}`}
                  className={i === typedLines.length - 1 && isTyping ? "" : ""}
                >
                  {line}
                  {i === typedLines.length - 1 && isTyping && (
                    <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-pulse" />
                  )}
                </p>
              ))}
            </div>
          )}

          {isComplete && (
            <div className="mt-8 flex animate-fade-in-up flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <Heart className="h-4 w-4 animate-heartbeat fill-primary text-primary" />
                <div className="h-px flex-1 bg-border" />
              </div>
              <p className="font-script text-base text-muted-foreground">
                Written with all my heart
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
