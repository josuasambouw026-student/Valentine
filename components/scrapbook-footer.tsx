"use client"

import { Heart, Star } from "lucide-react"

export function ScrapbookFooter() {
  return (
    <footer className="flex flex-col items-center gap-3 px-4 pb-28 pt-8 md:pb-20">
      <div className="flex items-center gap-2">
        <Star className="h-3 w-3 text-primary/40" />
        <div className="h-px w-10 bg-border" />
        <Heart className="h-4 w-4 animate-pulse-soft fill-primary text-primary" />
        <div className="h-px w-10 bg-border" />
        <Star className="h-3 w-3 text-primary/40" />
      </div>
      <p className="font-script text-lg text-muted-foreground">
        Made with love
      </p>
      <p className="font-sans text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase">
        For MJ, my Valentine, my everything
      </p>
    </footer>
  )
}
