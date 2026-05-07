import { useMemo, useState, type ReactNode } from 'react'
import { Paperclip, Plus } from 'lucide-react'

import type { Message, MessageType } from '@/entities/chat/domain/message'
import { VoiceNoteMessage } from './voice-note-message'

import { Button } from '@/shared/ui/button'

const QUICK_REACTIONS = [
  '❤️',
  '👍',
  '😂',
  '🔥',
  '😍',
  '👏',
  '😎',
  '😮',
  '😭',
  '🎉',
  '🙏',
  '🤝',
] as const

interface MessageBubbleProps {
  message: Message
  isMine: boolean
}

export function MessageBubble({ message, isMine }: MessageBubbleProps) {
  const [showReactions, setShowReactions] = useState(false)
  const formattedTime = useMemo(
    () =>
      new Date(message.createdAt).toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    [message.createdAt],
  )

  const renderers: Record<MessageType, (msg: Message) => ReactNode> = {
    TEXT: msg => (
      <p className="text-[13px] sm:text-sm whitespace-pre-wrap break-words leading-snug">
        {msg.content}
      </p>
    ),

    IMAGE: msg => (
      <img
        src={msg.fileUrl}
        loading="lazy"
        className="rounded-xl w-full max-w-[220px] sm:max-w-[280px] object-cover"
      />
    ),

    VIDEO: msg => (
      <video
        controls
        src={msg.fileUrl || ''}
        className="rounded-xl w-full max-w-[220px] sm:max-w-[300px]"
      />
    ),

    AUDIO: msg => <VoiceNoteMessage url={msg.fileUrl || ''} isMine={isMine} size="x1_5" />,

    FILE: msg => (
      <a
        href={msg.fileUrl || ''}
        target="_blank"
        rel="noreferrer"
        className="text-[13px] sm:text-sm underline break-all opacity-90 hover:opacity-100"
      >
        <Paperclip className="h-4 w-4 mr-1 inline" />
        {msg.fileName || 'Archivo'}
      </a>
    ),
  }

  return (
    <div
      className={`
        flex w-full mb-1
        ${isMine ? 'justify-end' : 'justify-start'}
      `}
    >
      {/* BUBBLE WRAPPER RESPONSIVE */}
      <div
        className={`
          relative group

          w-fit
          max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]
        `}
      >
        {/* REACTION BUTTON */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowReactions(v => !v)}
          className={`
            absolute top-1/2 -translate-y-1/2
            ${isMine ? '-left-7 sm:-left-8' : '-right-7 sm:-right-8'}
            opacity-0 group-hover:opacity-100
            transition
            h-6 w-6 sm:h-7 sm:w-7
            rounded-full
          `}
        >
          <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </Button>

        {/* REACTIONS */}
        {showReactions && (
          <div
            className={`
              absolute -top-9 sm:-top-10 z-20
              flex gap-1
              px-2 py-[2px] sm:py-1
              bg-background/90 backdrop-blur-md
              border rounded-full shadow-sm
              ${isMine ? 'right-0' : 'left-0'}
            `}
          >
            {QUICK_REACTIONS.map(r => (
              <button key={r} className="text-xs sm:text-sm hover:scale-110 transition">
                {r}
              </button>
            ))}
          </div>
        )}

        {/* BUBBLE RESPONSIVE */}
        <div
          className={`
            flex flex-col gap-1
            px-2.5 py-1.5 sm:px-3 sm:py-2
            rounded-xl sm:rounded-2xl
            border shadow-sm
            transition

            ${
              isMine
                ? 'ml-auto bg-primary/10 border-primary/20 rounded-br-md'
                : 'mr-auto bg-muted/40 border-border rounded-bl-md'
            }
          `}
        >
          {/* CONTENT */}
          <div className="break-words leading-snug">{renderers[message.type](message)}</div>

          {/* FOOTER */}
          <div className="flex items-center justify-end gap-1 text-[9.5px] sm:text-[10px] opacity-70">
            <span>{formattedTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
