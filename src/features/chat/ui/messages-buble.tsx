import { useEffect, useState } from 'react'
import { CheckCheck, Mic, Plus } from 'lucide-react'
import type { Message } from '../types/messages.types'
import type { Reaction } from '@/widgets/sidebar/model/sidebar.types'

const QUICK_REACTIONS = ['❤️', '👍', '😂', '🔥', '😮']

interface Props {
  message: Message
}

export function MessageBubble({ message }: Props) {
  const [showReactions, setShowReactions] = useState(false)
  const [reactions, setReactions] = useState<Reaction[]>(message.reactions ?? [])

  const isMine = message.fromMe === true

  useEffect(() => {
    setReactions(message.reactions ?? [])
  }, [message.reactions])

  const toggleReaction = (emoji: string) => {
    setReactions(prev => {
      const exists = prev.find(r => r.emoji === emoji)
      if (exists) return prev.filter(r => r.emoji !== emoji)
      return [...prev, { emoji, count: 1 }]
    })
    setShowReactions(false)
  }

  return (
    <div className={`flex w-full group ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className="relative max-w-[75%]">
        {/* bubble */}
        <div
          className={`rounded-2xl px-3 py-2 ${isMine ? 'bg-primary text-white' : 'bg-card border'}`}
        >
          {message.isVoice ? (
            <div className="flex gap-2 items-center">
              <Mic className="size-4" />
              <span className="text-xs">{message.voiceDuration}</span>
            </div>
          ) : (
            <p className="text-sm">{message.contenido}</p>
          )}

          <div className="mt-1 flex justify-end gap-1 text-[10px] opacity-70">
            <span>{message.created_at}</span>
            {isMine && <CheckCheck className="size-3" />}
          </div>
        </div>

        {/* reactions */}
        {reactions.length > 0 && (
          <div className="absolute -bottom-3 flex gap-1 rounded-full bg-card border px-2 py-0.5">
            {reactions.map((r, i) => (
              <span key={r.emoji + i}>{r.emoji}</span>
            ))}
          </div>
        )}

        {/* quick add */}
        <button
          onClick={() => setShowReactions(v => !v)}
          className="absolute top-1/2 hidden -translate-y-1/2 size-6 group-hover:flex"
        >
          <Plus className="size-3" />
        </button>

        {showReactions && (
          <div className="absolute -top-10 flex gap-1 bg-card border px-2 py-1 rounded-xl">
            {QUICK_REACTIONS.map(e => (
              <button key={e} onClick={() => toggleReaction(e)}>
                {e}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
