import { useRef, useState, type ChangeEvent, useEffect, useCallback } from 'react'
import { Camera, FileText, Image, Mic, Paperclip, Phone, SendHorizontal, Users } from 'lucide-react'

import type { Conversation } from '@/entities/conversation/types/conversation.types'
import { useChatController } from '../hooks/use-chat-controller'
import { useChatScroll } from '../hooks/use-chat-scroll'
import { useCamera } from '../hooks/use-camera'
import { useAudioRecorder } from '../hooks/use-audio-recorder'
import { MessageBubble } from './messages-buble'

interface ChatViewProps {
  conversation: Conversation | null
}

const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export function ChatView({ conversation }: ChatViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const attachBtnRef = useRef<HTMLButtonElement>(null)

  const [openAttachMenu, setOpenAttachMenu] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 })

  const { messages, loading, messageInput, setMessageInput, sendMessage, sendFile, userId } =
    useChatController({ conversation })

  const { videoRef, open: cameraOpen, startCamera, stopCamera, takePhoto } = useCamera(sendFile)

  const { recording, duration, toggle: toggleRecording } = useAudioRecorder(sendFile)

  useChatScroll({
    container: scrollRef.current,
    dependency: messages.length,
  })

  useEffect(() => {
    inputRef.current?.focus()
  }, [conversation])

  const handleToggleAttachMenu = useCallback(() => {
    if (!openAttachMenu && attachBtnRef.current) {
      const rect = attachBtnRef.current.getBoundingClientRect()
      setMenuPos({ top: rect.top, left: rect.left })
    }
    setOpenAttachMenu(v => !v)
  }, [openAttachMenu])

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files) return

      Array.from(files).forEach(sendFile)
      e.target.value = ''
      setOpenAttachMenu(false)
    },
    [sendFile],
  )

  const handleSend = useCallback(async () => {
    if (!messageInput.trim()) return
    await sendMessage()
    inputRef.current?.focus()
  }, [messageInput, sendMessage])

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Selecciona un chat
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-background overflow-hidden">
      {/* HEADER (más compacto + limpio) */}
      <header className="flex items-center justify-between px-3 py-2 border-b bg-background/70 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-4.5 w-4.5 text-primary" />
          </div>

          <div className="leading-tight">
            <h2 className="text-sm font-medium">{conversation.username}</h2>
            <span
              className={`text-[11px] ${
                conversation.isOnline ? 'text-green-500' : 'text-muted-foreground'
              }`}
            >
              {conversation.isOnline ? 'En línea' : 'Desconectado'}
            </span>
          </div>
        </div>

        <button className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center transition">
          <Phone className="h-4.5 w-4.5" />
        </button>
      </header>

      {/* MESSAGES */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-2 sm:px-5 py-3 space-y-1.5">
        {loading && (
          <div className="text-center text-xs text-muted-foreground animate-pulse">
            Cargando mensajes...
          </div>
        )}

        {messages.map(message => (
          <MessageBubble key={message.id} message={message} isMine={message.senderId === userId} />
        ))}
      </div>

      {/* CAMERA MODAL */}
      {cameraOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3">
          <div className="w-full max-w-md bg-black rounded-xl p-3">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="rounded-lg w-full h-[60vh] object-cover bg-black"
            />

            <div className="flex gap-2 mt-3">
              <button
                onClick={takePhoto}
                className="flex-1 bg-primary text-white py-2 rounded-lg text-sm"
              >
                Capturar
              </button>

              <button
                onClick={stopCamera}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BACKDROP */}
      {openAttachMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setOpenAttachMenu(false)} />
      )}

      {/* ATTACH MENU  */}
      {openAttachMenu && (
        <div
          className="fixed z-50 w-52 rounded-xl border bg-background shadow-lg overflow-hidden"
          style={{
            top: menuPos.top - 8,
            left: menuPos.left,
            transform: 'translateY(-100%)',
          }}
        >
          <label className="flex items-center gap-2 p-2.5 hover:bg-muted cursor-pointer text-sm">
            <Image className="h-4 w-4" /> Fotos
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <button
            onClick={() => {
              startCamera()
              setOpenAttachMenu(false)
            }}
            className="flex w-full items-center gap-2 p-2.5 hover:bg-muted text-sm"
          >
            <Camera className="h-4 w-4" /> Cámara
          </button>

          <label className="flex items-center gap-2 p-2.5 hover:bg-muted cursor-pointer text-sm">
            <FileText className="h-4 w-4" /> Archivos
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      )}

      {/* INPUT BAR */}
      <footer className="border-t bg-background/80 backdrop-blur-md px-2 py-2 sm:px-3">
        <div className="flex items-end gap-2">
          {/* ATTACH */}
          <button
            ref={attachBtnRef}
            onClick={handleToggleAttachMenu}
            className="h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center transition"
          >
            <Paperclip className="h-4.5 w-4.5 text-muted-foreground" />
          </button>

          {/* INPUT */}
          <textarea
            ref={inputRef}
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            rows={1}
            placeholder="Mensaje..."
            className="flex-1 resize-none rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 max-h-28"
          />

          {/* MIC */}
          <button
            onClick={toggleRecording}
            className={`h-9 w-9 rounded-full flex items-center justify-center transition ${
              recording ? 'bg-red-500 text-white' : 'hover:bg-muted'
            }`}
          >
            <Mic className="h-4.5 w-4.5" />
          </button>

          {/* SEND */}
          <button
            onClick={handleSend}
            className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 transition"
          >
            <SendHorizontal className="h-4.5 w-4.5" />
          </button>
        </div>

        {recording && (
          <div className="mt-1 text-[11px] text-red-500 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            Grabando {formatTime(duration)}
          </div>
        )}
      </footer>
    </div>
  )
}
