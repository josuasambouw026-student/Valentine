"use client"

import { Heart, Star } from "lucide-react"

export function ScrapbookFooter() {
  return (
    <footer className="flex flex-col items-center gap-3 px-3 pb-24 pt-8 sm:px-4 sm:pb-28 md:pb-20">
      <div className="flex items-center gap-2">
        <Star className="h-2.5 w-2.5 text-primary/40 sm:h-3 sm:w-3" />
        <div className="h-px w-8 bg-border sm:w-10" />
        <Heart className="h-3 w-3 animate-pulse-soft fill-primary text-primary sm:h-4 sm:w-4" />
        <div className="h-px w-8 bg-border sm:w-10" />
        <Star className="h-2.5 w-2.5 text-primary/40 sm:h-3 sm:w-3" />
      </div>
      <p className="font-script text-base text-muted-foreground sm:text-lg">
        Made with love
      </p>
      <p className="font-sans text-[9px] tracking-[0.2em] text-muted-foreground/60 uppercase sm:text-[10px]">
        For MJ, my Valentine, my everything
      </p>
    </footer>
  )
}
