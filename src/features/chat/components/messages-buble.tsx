import { useState } from 'react'
import { CheckCheck, Mic, Plus } from 'lucide-react'
import type { Message, Reaction } from '@/shared/lib/chat-data'

const QUICK_REACTIONS = [
  '\u2764\uFE0F',
  '\uD83D\uDC4D',
  '\uD83D\uDE02',
  '\uD83D\uDD25',
  '\uD83D\uDE2E',
]

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [reactions, setReactions] = useState<Reaction[]>(message.reactions ?? [])
  const [showReactions, setShowReactions] = useState(false)

  const toggleReaction = (emoji: string) => {
    setReactions(prev => {
      const exists = prev.find(r => r.emoji === emoji)
      if (exists) return prev.filter(r => r.emoji !== emoji)
      return [...prev, { emoji, count: 1 }]
    })
    setShowReactions(false)
  }

  return (
    <div
      className={`group relative flex w-full ${message.fromMe ? 'justify-end' : 'justify-start'}`}
      onDoubleClick={() => setShowReactions(!showReactions)}
    >
      <div className="relative max-w-[85%] sm:max-w-[75%] md:max-w-[70%]">
        {/* Reaction picker */}
        {showReactions && (
          <div
            className={`absolute -top-11 z-20 flex items-center gap-0.5 rounded-xl bg-card px-2 py-1.5 shadow-lg border border-border ${
              message.fromMe ? 'right-0' : 'left-0'
            }`}
          >
            {QUICK_REACTIONS.map(emoji => (
              <button
                key={emoji}
                onClick={() => toggleReaction(emoji)}
                className="flex size-7 items-center justify-center rounded-lg text-sm transition-transform hover:scale-125 hover:bg-secondary"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* Bubble */}
        <div
          className={`rounded-2xl px-3.5 py-2 ${
            message.fromMe
              ? 'rounded-br-sm bg-primary text-primary-foreground'
              : 'rounded-bl-sm border border-border bg-card text-card-foreground'
          }`}
        >
          {/* Voice message */}
          {message.isVoice ? (
            <div className="flex items-center gap-2.5 py-0.5">
              <button
                className={`flex size-7 shrink-0 items-center justify-center rounded-full ${
                  message.fromMe
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-primary/10 text-primary'
                }`}
              >
                <Mic className="size-3.5" />
              </button>
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-[2px]">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-[2px] rounded-full ${
                        message.fromMe ? 'bg-primary-foreground/40' : 'bg-muted-foreground/40'
                      }`}
                      style={{ height: `${Math.random() * 14 + 3}px` }}
                    />
                  ))}
                </div>
                <span
                  className={`text-[9px] ${
                    message.fromMe ? 'text-primary-foreground/60' : 'text-muted-foreground'
                  }`}
                >
                  {message.voiceDuration}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed break-words">{message.text}</p>
          )}

          {/* Time + read status */}
          <div
            className={`mt-1 flex items-center justify-end gap-1 ${
              message.fromMe ? 'text-primary-foreground/60' : 'text-muted-foreground'
            }`}
          >
            <span className="text-[9px]">{message.time}</span>
            {message.fromMe && <CheckCheck className="size-3" />}
          </div>
        </div>

        {/* Reactions display */}
        {reactions.length > 0 && (
          <div
            className={`absolute -bottom-3 flex items-center gap-0.5 rounded-full border border-border bg-card px-1.5 py-0.5 shadow-sm ${
              message.fromMe ? 'right-2' : 'left-2'
            }`}
          >
            {reactions.map(r => (
              <button
                key={r.emoji}
                onClick={() => toggleReaction(r.emoji)}
                className="text-xs transition-transform hover:scale-110"
              >
                {r.emoji}
              </button>
            ))}
          </div>
        )}

        {}
        <button
          onClick={() => setShowReactions(!showReactions)}
          className={`absolute top-1/2 hidden -translate-y-1/2 size-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:bg-secondary md:flex ${
            message.fromMe ? '-left-8' : '-right-8'
          }`}
        >
          <Plus className="size-3" />
        </button>
      </div>
    </div>
  )
}
