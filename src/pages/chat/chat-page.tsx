import { useState } from 'react'
import ChatSidebar from '@/widgets/sidebar/ui/chat-sidebar'
import { ChatView } from '@/features/chat/ui/chat-view'
import type { Conversation } from '@/entities/conversation/types/conversation.types'
import { FormDialog } from '@/widgets/dialog/ui/form-dialog'
import { authStorage } from '@/entities/auth/model/storage/auth-storage'

export default function ChatPage() {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`
          w-full md:w-[320px] lg:w-[380px]
          border-r border-border
          ${activeConversation ? 'hidden md:flex' : 'flex'}
        `}
      >
        <ChatSidebar onSelectConversation={setActiveConversation} />
      </aside>

      {/* CHAT */}
      <section
        className={`
          flex flex-1 flex-col min-w-0
          ${!activeConversation ? 'hidden md:flex' : 'flex'}
        `}
      >
        {activeConversation ? (
          <ChatView conversation={activeConversation} />
        ) : (
          <div className="hidden md:flex h-full items-center justify-center text-muted-foreground">
            Selecciona una conversación
          </div>
        )}
      </section>

      <FormDialog />
    </div>
  )
}
