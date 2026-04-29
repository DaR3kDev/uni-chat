import { useState } from 'react'
import ChatSidebar from '@/widgets/sidebar/ui/chat-sidebar'
import { ChatView } from '@/features/chat/ui/chat-view'
import { FormDialog } from '@/widgets/dialog/ui/form-dialog'
import type { Chat } from '@/widgets/sidebar/model/sidebar.types'
import type { Contact } from '@/widgets/sidebar/model/sidebar.types'

export default function ChatPage() {
  const [chatList] = useState<Chat[]>([])
  const [contactList] = useState<Contact[]>([])

  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [activeChat, setActiveChat] = useState<Chat | null>(null)

  const handleStartChat = (contact: Contact) => {
    const chat: Chat = {
      _id: contact._id,
      nombre: contact.nombre,
      avatar: contact.avatar,
      avatarColor: contact.avatarColor,
      pinned: false,
      muted: false,
      online: contact.online,
      lastMessage: '',
      time: '',
      unread: 0,
      messages: [],
      category: 'personal',
    }

    setActiveChat(chat)
    setActiveChatId(contact._id)
  }

  const sidebarProps = {
    activeChatId,
    onSelectChat: setActiveChatId,
    onAddContact: () => {},
    onDeleteChat: () => {},
    onTogglePin: () => {},
    onToggleMute: () => {},
    chats: chatList,
    contacts: contactList,
    onStartChat: handleStartChat,
    onDeleteContact: () => {},
  }

  return (
    <>
      <div className="flex w-full flex-col md:hidden">
        <ChatSidebar {...sidebarProps} />
      </div>

      <aside className="hidden md:flex w-[320px] lg:w-[380px] border-r border-border">
        <ChatSidebar {...sidebarProps} />
      </aside>

      <section className="flex flex-1 min-w-0 flex-col">
        <ChatView chat={activeChat} />
      </section>

      <section className="hidden md:flex">
        <FormDialog />
      </section>
    </>
  )
}
