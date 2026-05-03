import type { Story } from '@/shared/lib/chat-data'
import { Plus } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel'

interface StoriesRowProps {
  stories: Story[]
}

export function StoriesRow({ stories }: StoriesRowProps) {
  return (
    <div className="relative w-full">
      <Carousel opts={{ align: 'start' }} className="w-full">
        <CarouselContent className="flex gap-3 px-3 py-3">
          {stories.map(story => (
            <CarouselItem
              key={story.id}
              className="basis-[72px] flex flex-col items-center gap-1 shrink-0"
            >
              {/* STORY AVATAR */}
              <div
                className={`
                  relative flex h-14 w-14 items-center justify-center
                  rounded-full transition-transform active:scale-95

                  ${
                    story.isOwn
                      ? 'border border-dashed border-muted-foreground/40 text-muted-foreground'
                      : 'bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-[2px]'
                  }
                `}
              >
                {/* inner circle */}
                <div
                  className={`
                    flex h-full w-full items-center justify-center rounded-full bg-background
                    ${!story.isOwn && !story.seen ? 'ring-2 ring-primary/70' : ''}
                  `}
                >
                  {story.isOwn ? (
                    <Plus className="h-4 w-4" />
                  ) : (
                    <span className="text-sm">{story.avatar}</span>
                  )}
                </div>
              </div>

              {/* NAME */}
              <span
                className={`
                  text-[10px] max-w-[70px] truncate text-center

                  ${story.seen ? 'text-muted-foreground' : 'font-medium'}
                `}
              >
                {story.name}
              </span>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* NAVIGATION (solo desktop) */}
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  )
}
