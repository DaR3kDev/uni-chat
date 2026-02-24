import { FormDialog } from '@/widgets/dialog/ui/form-dialog'
import ChatSidebar from '@/widgets/sidebar/ui/chat-sidebar'
import { useCallback, useState } from 'react'
import { initialContacts, type Chat, type Contact } from '@/shared/lib/chat-data'

export default function Layout() {
  const [chatList, setChatList] = useState<Chat[]>([])
  const [contactList, setContactList] = useState<Contact[]>(initialContacts)
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const activeChat = chatList.find(c => c.id === activeChatId) ?? null

  const handleStartChat = useCallback(
    (contact: Contact) => {
      const existing = chatList.find(c => c.name === contact.name && c.category !== 'group')
      if (existing) {
        setActiveChatId(existing.id)
        return
      }
      const newChat: Chat = {
        id: `chat-${Date.now()}`,
        name: contact.name,
        avatar: contact.avatar,
        avatarColor: contact.avatarColor,
        lastMessage: '',
        time: new Date().toLocaleTimeString('es', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        unread: 0,
        online: contact.online,
        category: 'personal',
        messages: [],
      }
      setChatList(prev => [newChat, ...prev])
      setActiveChatId(newChat.id)
    },
    [chatList],
  )

  const handleDeleteChat = useCallback(
    (chatId: string) => {
      setChatList(prev => prev.filter(c => c.id !== chatId))
      if (activeChatId === chatId) setActiveChatId(null)
    },
    [activeChatId],
  )

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-background">
      <div
        className={`hidden md:flex h-full w-full flex-col md:w-[340px] lg:w-[380px] md:shrink-0 md:border-r md:border-border`}
      >
        <ChatSidebar
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
          onAddContact={() => {}}
          onDeleteChat={handleDeleteChat}
          onTogglePin={() => {}}
          onToggleMute={() => {}}
          chats={chatList}
          contacts={contactList}
          onStartChat={handleStartChat}
          onDeleteContact={handleDeleteChat}
        />
      </div>
      <FormDialog />
    </main>
  )
}
