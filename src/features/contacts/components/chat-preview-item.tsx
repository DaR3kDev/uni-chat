import { useState } from 'react'
import { Users, Pin, PinOff, BellOff, BellRing, MoreVertical, Trash2 } from 'lucide-react'

import { DropdownGeneric } from '@/widgets/dropdwn/ui/dropdwn-generic'
import type { Chat } from '@/shared/lib/chat-data'

interface ChatPreviewItemProps {
  chat: Chat
  active: boolean
  onSelect: (id: string) => void
  onDeleteChat: (id: string) => void
  onTogglePin: (id: string) => void
  onToggleMute: (id: string) => void
}

export function ChatPreviewItem({
  chat,
  active,
  onSelect,
  onDeleteChat,
  onTogglePin,
  onToggleMute,
}: ChatPreviewItemProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const dropdownItems = [
    {
      label: chat.pinned ? 'Desfijar' : 'Fijar',
      icon: chat.pinned ? <PinOff className="mr-2 size-4" /> : <Pin className="mr-2 size-4" />,
      onClick: () => onTogglePin(chat.id),
    },
    {
      label: chat.muted ? 'Activar sonido' : 'Silenciar',
      icon: chat.muted ? <BellRing className="mr-2 size-4" /> : <BellOff className="mr-2 size-4" />,
      onClick: () => onToggleMute(chat.id),
    },
    {
      label: 'Eliminar chat',
      icon: <Trash2 className="mr-2 size-4" />,
      onClick: () => setDeleteOpen(true),
      destructive: true,
    },
  ]

  return (
    <div
      className={`group relative flex w-full items-center gap-3 px-4 py-2.5 text-left cursor-pointer transition-colors ${
        active ? 'bg-accent/80' : 'hover:bg-secondary/60'
      }`}
      onClick={() => onSelect(chat.id)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(chat.id)}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className={`flex size-11 items-center justify-center rounded-xl text-xs font-semibold ${chat.avatarColor}`}
        >
          {chat.category === 'group' ? <Users className="size-4" /> : chat.avatar}
        </div>
        {chat.online && (
          <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-emerald-500" />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium text-card-foreground">{chat.name}</span>
          <span
            className={`shrink-0 text-[10px] ${chat.unread > 0 ? 'font-semibold text-primary' : 'text-muted-foreground'}`}
          >
            {chat.time}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          {chat.typing ? (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-medium text-primary">escribiendo</span>
              <span className="flex gap-0.5">
                <span className="size-1 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
                <span className="size-1 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
                <span className="size-1 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
              </span>
            </div>
          ) : (
            <p className="truncate text-[11px] text-muted-foreground">
              {chat.lastMessage || 'Sin mensajes aun'}
            </p>
          )}
          <div className="flex shrink-0 items-center gap-1.5">
            {chat.muted && <BellOff className="size-3 text-muted-foreground" />}
            {chat.unread > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                {chat.unread}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown */}
      <DropdownGeneric trigger={<MoreVertical className="size-3.5" />} items={dropdownItems} />
    </div>
  )
}
