import { ScrollArea } from '@/shared/ui/scroll-area'
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
import { useEffect, useRef, useState } from 'react'
import { useConversation } from '../hooks/use-conversation'
import { useSendMessage } from '../hooks/use-send-message'
import { DropdownGeneric } from '@/widgets/dropdwn/ui/dropdwn-generic'
import type { Chat } from '@/widgets/sidebar/model/sidebar.types'
import { useAuthStore } from '@/entities/auth/model/store/auth.store'

interface ChatViewProps {
  chat: Chat | null
}

export function ChatView({ chat }: ChatViewProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [text, setText] = useState('')

  const userId = useAuthStore(state => state.user?.id)
  const chatId = chat?._id

  const { data: messages = [] } = useConversation(userId, chatId)
  const { mutate } = useSendMessage()
  console.log(messages)
  const handleSend = () => {
    if (!text.trim() || !userId || !chatId) return

    mutate({
      remitente_id: userId,
      destinatario_id: chatId,
      contenido: text.trim(),
    })

    setText('')
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const menuItems = [
    {
      label: 'Desfijar',
      icon: <PinOff className="size-4" />,
      onClick: () => {},
    },
    {
      label: 'Activar sonido',
      icon: <BellRing className="size-4" />,
      onClick: () => {},
    },
    {
      label: 'Eliminar chat',
      icon: <Trash2 className="size-4" />,
      onClick: () => {},
      destructive: true,
    },
  ]

  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex flex-1 flex-col bg-background">
        {/* HEADER */}
        <header className="flex items-center gap-3 border-b px-4 py-3">
          <button className="flex size-8 items-center justify-center">
            <ArrowLeft className="size-5" />
          </button>

          <div className="flex size-9 items-center justify-center rounded-xl bg-secondary">
            <Users className="size-4" />
          </div>

          <h2 className="flex-1 truncate text-sm font-semibold">{chat?.nombre || 'Chat'}</h2>

          <button className="size-8">
            <Info className="size-4" />
          </button>

          <DropdownGeneric
            align="end"
            contentClassName="w-44"
            trigger={
              <div className="size-8 flex items-center justify-center">
                <MoreHorizontal className="size-4" />
              </div>
            }
            items={menuItems}
          />
        </header>

        {/* MESSAGES */}
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-3 px-4 py-4">
            <div className="flex justify-center">
              <span className="rounded-lg bg-secondary px-3 py-1 text-[10px]">Hoy</span>
            </div>

            {messages.map(msg => (
              <MessageBubble key={msg._id} message={msg} />
            ))}

            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* INPUT */}
        <div className="border-t px-4 py-3">
          <div className="flex items-center gap-2">
            <button className="size-9">
              <ImageIcon className="size-4" />
            </button>

            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Escribe un mensaje..."
              className="flex-1 rounded-xl border px-3 py-2 text-sm"
            />

            <button onClick={handleSend} className="size-10 bg-primary text-white">
              <SendHorizontal className="size-4" />
            </button>

            <button className="size-10">
              <Mic className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
