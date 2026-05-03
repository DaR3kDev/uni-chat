import { MoreVertical, Trash2, Users } from 'lucide-react'

import { DropdownGeneric } from '@/widgets/dropdwn/ui/dropdwn-generic'
import type { Conversation } from '@/entities/conversation/types/conversation.types'

interface ConversationPreviewItemProps {
  conversation: Conversation
  active?: boolean
  onSelect: () => void
  onDeleteConversation: (conversationId: string) => void
}

export function ConversationPreviewItem({
  conversation,
  active = false,
  onSelect,
  onDeleteConversation,
}: ConversationPreviewItemProps) {
  const items = [
    {
      id: 'delete-conversation',
      label: 'Eliminar conversación',
      icon: <Trash2 className="mr-2 size-4" />,
      onClick: () => onDeleteConversation(conversation.conversationId),
      destructive: true,
    },
  ]

  return (
    <div
      onClick={onSelect}
      className={`
        group flex items-center gap-3
        px-3 py-2.5
        rounded-xl
        cursor-pointer
        transition-all

        ${active ? 'bg-muted shadow-sm' : 'hover:bg-muted/60'}
        active:scale-[0.99]
      `}
    >
      {/* AVATAR */}
      <div className="relative shrink-0">
        <div
          className="
            flex items-center justify-center
            h-10 w-10
            rounded-xl
            bg-primary/10 text-primary
          "
        >
          <Users className="h-4 w-4" />
        </div>

        {conversation.isOnline && (
          <span
            className="
              absolute bottom-0 right-0
              h-2.5 w-2.5
              rounded-full
              border-2 border-background
              bg-emerald-500
              animate-pulse
            "
          />
        )}
      </div>

      {/* INFO */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium">{conversation.username}</span>
        </div>

        <p className="truncate text-xs text-muted-foreground">Sin mensajes aún</p>
      </div>

      {/* ACTIONS */}
      <div
        onClick={e => e.stopPropagation()}
        className="
          opacity-0 group-hover:opacity-100
          transition
        "
      >
        <DropdownGeneric
          align="end"
          contentClassName="w-52"
          trigger={
            <button
              className="
                flex items-center justify-center
                h-8 w-8
                rounded-lg
                hover:bg-muted
                transition
                active:scale-95
              "
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          }
          items={items}
        />
      </div>
    </div>
  )
}
