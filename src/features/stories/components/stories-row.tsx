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
    <Carousel opts={{ align: 'start' }} className="w-full">
      <CarouselContent className="flex gap-3 px-4 py-3">
        {stories.map(story => (
          <CarouselItem
            key={story.id}
            className="flex-shrink-0 flex flex-col items-center gap-2 basis-1/4 sm:basis-1/5 lg:basis-1/6"
          >
            {/* Avatar */}
            <div
              className={`
                relative flex h-12 w-12 items-center justify-center rounded-full text-xs font-semibold transition-transform hover:scale-105
                ${
                  story.isOwn
                    ? 'border-2 border-dashed border-muted-foreground/30 text-muted-foreground'
                    : story.avatarColor
                }
                ${!story.isOwn && !story.seen ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
              `}
            >
              {story.isOwn ? (
                <Plus className="h-4 w-4" />
              ) : (
                <span className="text-xs">{story.avatar}</span>
              )}
            </div>

            {/* Nombre */}
            <span
              className={`
                max-w-full truncate text-center text-[10px]
                ${story.seen ? 'text-muted-foreground' : 'font-medium text-foreground'}
              `}
            >
              {story.name}
            </span>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Botones de navegación */}
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
