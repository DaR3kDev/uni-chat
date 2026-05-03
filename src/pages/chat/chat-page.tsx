import { useState } from 'react'
import ChatSidebar from '@/widgets/sidebar/ui/chat-sidebar'
import { ChatView } from '@/features/chat/ui/chat-view'
import type { Conversation } from '@/entities/conversation/types/conversation.types'
import { FormDialog } from '@/widgets/dialog/ui/form-dialog'

export default function ChatPage() {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* SIDEBAR */}
      <aside
        className={`
          w-full md:w-[320px] lg:w-[360px]
          border-r bg-background
          transition-all duration-300 ease-in-out

          ${activeConversation ? 'hidden md:flex' : 'flex'}
        `}
      >
        <ChatSidebar onSelectConversation={setActiveConversation} />
      </aside>

      {/* CHAT VIEW */}
      <section
        className={`
          flex flex-1 flex-col min-w-0
          bg-background

          transition-all duration-300 ease-in-out

          ${!activeConversation ? 'hidden md:flex' : 'flex'}
        `}
      >
        {activeConversation ? (
          <ChatView conversation={activeConversation} />
        ) : (
          <div className="hidden md:flex flex-col items-center justify-center h-full text-center text-muted-foreground px-4">
            <div className="text-sm">Selecciona una conversación</div>
            <div className="text-xs opacity-60 mt-1">Tus mensajes aparecerán aquí</div>
          </div>
        )}
      </section>

      {/* MOBILE BACK BUTTON (tipo WhatsApp) */}
      {activeConversation && (
        <button
          onClick={() => setActiveConversation(null)}
          className="
            md:hidden fixed top-3 left-3 z-50
            h-9 w-9 rounded-full
            bg-background border shadow-sm
            flex items-center justify-center
            active:scale-95 transition
          "
        >
          ←
        </button>
      )}

      <FormDialog />
    </div>
  )
}
