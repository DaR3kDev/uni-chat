// src/features/chat/ui/chat-view.tsx

import { useRef, useState } from 'react'

import { Camera, FileText, Image, Mic, Paperclip, Phone, SendHorizontal, Users } from 'lucide-react'

import type { Conversation } from '@/entities/conversation/types/conversation.types'

import { useChatController } from '../hooks/use-chat-controller'
import { useChatScroll } from '../hooks/use-chat-scroll'

import { MessageBubble } from './messages-buble'

interface ChatViewProps {
  conversation: Conversation | null
}

export function ChatView({ conversation }: ChatViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [openAttachMenu, setOpenAttachMenu] = useState(false)

  const { messages, loading, messageInput, setMessageInput, sendMessage, userId } =
    useChatController({ conversation })

  useChatScroll({
    container: scrollRef.current,
    dependency: messages.length,
  })

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Selecciona un chat
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-background">
      {/* HEADER */}
      <header className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-secondary">
            <Users className="size-5" />
          </div>

          <div className="flex flex-col">
            <h2 className="text-sm font-semibold">{conversation.username}</h2>
            <span className="text-xs text-muted-foreground">
              {conversation.isOnline ? 'En línea' : 'Desconectado'}
            </span>
          </div>
        </div>

        <button className="rounded-full p-2 hover:bg-secondary">
          <Phone className="size-5" />
        </button>
      </header>

      {/* MESSAGES */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3 p-4">
          {loading && (
            <span className="text-center text-sm text-muted-foreground">Cargando...</span>
          )}

          {messages.map(message => (
            <MessageBubble
              key={message.id}
              message={message}
              isMine={message.senderId === userId}
            />
          ))}
        </div>
      </div>

      {/* INPUT */}
      <footer className="border-t p-4">
        <div className="flex items-end gap-2">
          {/* 📎 CLIP BUTTON */}
          <button
            onClick={() => setOpenAttachMenu(prev => !prev)}
            className="rounded-full p-2 hover:bg-secondary"
          >
            <Paperclip className="size-5 text-muted-foreground" />
          </button>

          {/* 📎 ATTACH MENU */}
          {openAttachMenu && (
            <div className="absolute bottom-14 left-0 z-50 w-56 rounded-xl border bg-background shadow-lg">
              <label className="flex cursor-pointer items-center gap-2 p-3 hover:bg-secondary">
                <Image className="size-4" />
                Fotos / Galería
                <input type="file" accept="image/*" className="hidden" multiple />
              </label>

              <label className="flex cursor-pointer items-center gap-2 p-3 hover:bg-secondary">
                <Camera className="size-4" />
                Tomar foto
                <input type="file" accept="image/*" capture="environment" className="hidden" />
              </label>

              <label className="flex cursor-pointer items-center gap-2 p-3 hover:bg-secondary">
                <FileText className="size-4" />
                Documentos
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                  className="hidden"
                  multiple
                />
              </label>

              {/* CONTACTO (UI futura) */}
              <button className="flex w-full items-center gap-2 p-3 hover:bg-secondary">
                <Users className="size-4" />
                Contacto
              </button>
            </div>
          )}

          {/* TEXT AREA */}
          <textarea
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            onKeyDown={async e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                await sendMessage()
              }
            }}
            placeholder="Escribe un mensaje..."
            className="
              flex-1 resize-none rounded-xl border bg-background px-3 py-2
              outline-none
            "
            rows={1}
          />

          {/* 🎤 AUDIO (derecha, cerca de send) */}
          <button className="rounded-full p-3 hover:bg-secondary">
            <Mic className="size-5 text-muted-foreground" />
          </button>

          {/* SEND */}
          <button
            onClick={sendMessage}
            className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90"
          >
            <SendHorizontal className="size-5" />
          </button>
        </div>
      </footer>
    </div>
  )
}
