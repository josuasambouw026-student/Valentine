"use client"

import { PolaroidCard } from "./polaroid-card"
import { getBasePath } from "@/lib/basepath"

const memories = [
  {
    src: getBasePath("/images/memory-1.jpg"),
    caption: "Our first steps together",
    rotation: -2,
    alt: "Two people walking hand in hand along a beach at sunset",
    backMessage: "The moment your hand held mine, I knew you were my home.",
  },
  {
    src: getBasePath("/images/memory-2.jpg"),
    caption: "A night full of stars",
    rotation: 1.5,
    alt: "A romantic candlelit dinner table for two with roses",
    backMessage: "Every candle that glowed was nothing compared to your eyes that night.",
  },
  {
    src: getBasePath("/images/memory-3.jpg"),
    caption: "Morning coffee, always together",
    rotation: -1,
    alt: "Two coffee cups with heart-shaped latte art on a wooden table",
    backMessage: "My best mornings always start with your face and a cup of coffee.",
  },
  {
    src: getBasePath("/images/memory-4.jpg"),
    caption: "Dancing under the lights",
    rotation: 2.5,
    alt: "A couple dancing under fairy string lights at night",
    backMessage: "The world stopped spinning when we danced together.",
  },
  {
    src: getBasePath("/images/memory-5.jpg"),
    caption: "Our secret picnic",
    rotation: -1.5,
    alt: "A romantic picnic in a wildflower field with a wicker basket",
    backMessage: "No beach is as beautiful as the calm of your kiss.",
  },
  {
    src: getBasePath("/images/memory-6.jpg"),
    caption: "Letters I keep forever",
    rotation: 1,
    alt: "Handwritten love letters and postcards on a wooden desk",
    backMessage: "Every word you wrote, I keep in the most special place in my heart.",
  },
  {
    src: getBasePath("/images/memory-7.jpg"),
    caption: "Cozy nights with you",
    rotation: -2.5,
    alt: "Cozy socks by a fireplace with hot chocolate",
    backMessage: "Your embrace is warmer than a thousand blankets on the coldest night.",
  },
  {
    src: getBasePath("/images/memory-8.jpg"),
    caption: "Sunsets with you, MJ",
    rotation: 1.8,
    alt: "A couple watching a vibrant sunset from a hilltop",
    backMessage: "The most beautiful sunset is the one I get to watch with you by my side.",
  },
]

export function MasonryGrid() {
  return (
    <section className="px-3 py-6 sm:px-4 sm:py-8 md:px-8 lg:px-16">
      <div className="mx-auto mb-8 max-w-md text-center">
        <p className="font-sans text-xs tracking-[0.3em] text-muted-foreground uppercase md:text-sm">
          Tap a card to flip it over
        </p>
      </div>
      <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 md:columns-3 md:gap-6 lg:columns-4 lg:gap-8">
        {memories.map((memory, i) => (
          <PolaroidCard
            key={memory.src}
            src={memory.src}
            caption={memory.caption}
            rotation={memory.rotation}
            alt={memory.alt}
            backMessage={memory.backMessage}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
