import { useMemo, useState } from 'react'

import { Check, CheckCheck, Clock3, Plus, TriangleAlert } from 'lucide-react'

import type { Message } from '@/entities/chat/domain/message'

const QUICK_REACTIONS = ['❤️', '👍', '😂', '🔥', '😍', '👏', '😎', '😮', '😭', '🎉', '🙏', '🤝']

interface MessageBubbleProps {
  message: Message
  isMine: boolean
}

export function MessageBubble({ message, isMine }: MessageBubbleProps) {
  const [isReactionPickerOpen, setIsReactionPickerOpen] = useState(false)

  const formattedTime = useMemo(() => {
    return new Date(message.createdAt).toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }, [message.createdAt])

  const bubbleClasses = isMine
    ? 'bg-primary text-primary-foreground rounded-br-md'
    : 'bg-background border text-foreground rounded-bl-md'

  const footerClasses = isMine ? 'text-primary-foreground/70' : 'text-muted-foreground'

  const reactionPositionClasses = isMine ? 'right-0' : 'left-0'

  const reactionButtonPositionClasses = isMine ? '-left-10' : '-right-10'

  function handleToggleReactions() {
    setIsReactionPickerOpen(previous => !previous)
  }

  function renderMessageStatus() {
    if (!isMine) {
      return null
    }

    switch (message.status) {
      case 'sending':
        return <Clock3 className="size-3 text-yellow-400" />

      case 'sent':
        return <Check className="size-3 text-muted-foreground" />

      case 'delivered':
        return <CheckCheck className="size-3 text-muted-foreground" />

      case 'read':
        return <CheckCheck className="size-3 text-sky-400" />

      case 'error':
        return <TriangleAlert className="size-3 text-red-400" />

      default:
        return null
    }
  }

  return (
    <div className={`group flex w-full ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className="relative max-w-[82%]">
        {/* SELECTOR DE REACCIONES */}
        {isReactionPickerOpen && (
          <div
            className={`
              absolute -top-14 z-20 flex flex-wrap items-center gap-1
              rounded-2xl border bg-background/95 p-2 shadow-xl backdrop-blur
              ${reactionPositionClasses}
            `}
          >
            {QUICK_REACTIONS.map(reaction => (
              <button
                key={reaction}
                type="button"
                className="
                  flex size-8 items-center justify-center
                  rounded-full text-base transition-colors
                  hover:bg-muted
                "
              >
                {reaction}
              </button>
            ))}
          </div>
        )}

        {/* BOTÓN REACCIONES */}
        <button
          type="button"
          onClick={handleToggleReactions}
          className={`
            absolute top-1/2 z-10 hidden -translate-y-1/2
            items-center justify-center rounded-full border
            bg-background p-1.5 shadow-sm transition-opacity
            group-hover:flex
            ${reactionButtonPositionClasses}
          `}
        >
          <Plus className="size-3 text-muted-foreground" />
        </button>

        {/* BURBUJA */}
        <div
          className={`
            rounded-2xl px-4 py-2.5 shadow-sm
            ${bubbleClasses}
          `}
        >
          {/* MENSAJE */}
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
            {message.content}
          </p>

          {/* FOOTER */}
          <div
            className={`
              mt-2 flex items-center justify-end gap-1.5 text-[11px]
              ${footerClasses}
            `}
          >
            <span>{formattedTime}</span>

            {renderMessageStatus()}
          </div>
        </div>
      </div>
    </div>
  )
}
