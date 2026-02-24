import type { Chat, Message } from '@/shared/lib/chat-data'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { DropdownGeneric } from '@/widgets/dropdwn/ui/dropdwn-generic'
import {
  ArrowLeft,
  BellRing,
  ImageIcon,
  Info,
  Mic,
  MoreHorizontal,
  PinOff,
  SendHorizontal,
  Smile,
  Trash2,
  Users,
} from 'lucide-react'
import { MessageBubble } from './messages-buble'
import { useRef, useState } from 'react'

interface ChatViewProps {
  chats: Chat[]
}

export function ChatView({ chats }: ChatViewProps) {
  const [messages] = useState<Message[]>(chats[0]?.messages || [])
  const bottomRef = useRef<HTMLDivElement>(null)

  const menuItems = [
    {
      label: 'Desfijar',
      icon: <PinOff className="size-4" />,
      onClick: () => console.log('Toggle pin'),
    },
    {
      label: 'Activar sonido',
      icon: <BellRing className="size-4" />,
      onClick: () => console.log('Toggle mute'),
    },
    {
      label: 'Eliminar chat',
      icon: <Trash2 className="size-4" />,
      onClick: () => console.log('Delete chat'),
      destructive: true,
    },
  ]

  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex flex-1 flex-col bg-background">
        {/* ================= HEADER ================= */}
        <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
          {/* Back mobile */}
          <button
            className="flex size-8 items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary md:hidden"
            aria-label="Volver"
          >
            <ArrowLeft className="size-5" />
          </button>

          {/* Avatar */}
          <div className="relative">
            <div className="flex size-9 items-center justify-center rounded-xl bg-secondary">
              <Users className="size-4" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-card bg-emerald-500" />
          </div>

          {/* Chat info */}
          <div className="flex-1 min-w-0">
            <h2 className="truncate text-sm font-semibold">Grupo de estudio</h2>

            <div className="flex items-center gap-1 text-[11px]">
              <span className="font-medium text-primary">escribiendo</span>
              <span className="flex gap-0.5">
                <span className="size-1 animate-bounce rounded-full bg-primary" />
                <span className="size-1 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
                <span className="size-1 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              className="flex size-8 items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary"
              aria-label="Info"
            >
              <Info className="size-4" />
            </button>

            <DropdownGeneric
              align="end"
              contentClassName="w-44"
              trigger={
                <div className="flex size-8 items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary">
                  <MoreHorizontal className="size-4" />
                </div>
              }
              items={menuItems}
            />
          </div>
        </header>

        {/* ================= MESSAGES ================= */}
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-3 px-4 py-4">
            {/* Date */}
            <div className="flex justify-center">
              <span className="rounded-lg bg-secondary px-3 py-1 text-[10px] font-medium">Hoy</span>
            </div>

            {messages.map(message => (
              <MessageBubble key={message.id} message={message} />
            ))}

            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* ================= INPUT ================= */}
        <div className="border-t border-border bg-card px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Image */}
            <button
              className="hidden size-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary sm:flex"
              aria-label="Agregar imagen"
            >
              <ImageIcon className="size-4" />
            </button>

            {/* Input */}
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-secondary/50 px-3 py-2 focus-within:border-primary">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />

              <button
                className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
                aria-label="Emoji"
              >
                <Smile className="size-4" />
              </button>
            </div>

            {/* Send */}
            <button
              className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:opacity-90 active:scale-95"
              aria-label="Enviar"
            >
              <SendHorizontal className="size-4" />
            </button>

            {/* Audio */}
            <button
              className="flex size-10 items-center justify-center rounded-xl bg-secondary hover:bg-accent active:scale-95"
              aria-label="Audio"
            >
              <Mic className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
