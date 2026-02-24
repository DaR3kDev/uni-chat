import { useState } from 'react'
import { chats, initialContacts, type Chat, type Contact } from '@/shared/lib/chat-data'
import ChatSidebar from '@/widgets/sidebar/ui/chat-sidebar'
import { ChatView } from '@/features/chat/components/chat-view'
import { FormDialog } from '@/widgets/dialog/ui/form-dialog'

export default function ChatPage() {
  const [chatList] = useState<Chat[]>(chats)
  const [contactList] = useState<Contact[]>(initialContacts)
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const sidebarProps = {
    activeChatId,
    onSelectChat: setActiveChatId,
    onAddContact: () => {},
    onDeleteChat: () => {},
    onTogglePin: () => {},
    onToggleMute: () => {},
    chats: chatList,
    contacts: contactList,
    onStartChat: () => {},
    onDeleteContact: () => {},
  }

  return (
    <>
      {/* ================= MOBILE ================= */}
      <div className="flex w-full flex-col md:hidden">
        <div className="flex-1 overflow-hidden">
          <ChatSidebar {...sidebarProps} />
        </div>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex w-[320px] lg:w-[380px] border-r border-border">
        <ChatSidebar {...sidebarProps} />
      </aside>

      <section className="flex flex-1 min-w-0 flex-col">
        <ChatView chats={chatList} />
      </section>

      <section className="hidden md:flex">
        <FormDialog />
      </section>
    </>
  )
}
