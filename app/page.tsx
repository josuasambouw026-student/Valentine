import { ScrapbookHeader } from "@/components/scrapbook-header"
import { MasonryGrid } from "@/components/masonry-grid"
import { VirgoConstellation } from "@/components/virgo-constellation"
import { LoveCounter } from "@/components/love-counter"
import { LoveLetter } from "@/components/love-letter"
import { MusicToggle } from "@/components/music-toggle"
import { ScrapbookFooter } from "@/components/scrapbook-footer"
import { FloatingPetals } from "@/components/floating-petals"
import { CloudsBackground } from "@/components/clouds-background"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-transparent">
      <CloudsBackground />
      <FloatingPetals />
      <div className="relative z-10">
        <ScrapbookHeader />
        <MasonryGrid />
        <VirgoConstellation />
        <LoveCounter />
        <LoveLetter />
        <ScrapbookFooter />
      </div>
      <MusicToggle />
    </main>
  )
}
