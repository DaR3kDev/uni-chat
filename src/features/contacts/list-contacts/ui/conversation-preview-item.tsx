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
  console.log(conversation.isOnline)

  return (
    <div
      onClick={onSelect}
      className={`group flex w-full items-center gap-2 sm:gap-3 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer transition-colors ${
        active ? 'bg-accent' : 'hover:bg-secondary'
      }`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className="
            flex items-center justify-center
            size-10 sm:size-11
            rounded-xl
            bg-primary text-primary-foreground
          "
        >
          <Users className="size-4" />
        </div>

        {conversation.isOnline && (
          <span
            className="
              absolute bottom-0 right-0
              size-2.5 sm:size-3
              rounded-full
              border-2 border-card
              bg-emerald-500
            "
          />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <span
            className="
              truncate
              text-sm font-medium
              text-card-foreground
            "
          >
            {conversation.username}
          </span>
        </div>

        <p
          className="
            truncate
            text-[11px] sm:text-xs
            text-muted-foreground
          "
        >
          Sin mensajes aún
        </p>
      </div>

      {/* Dropdown */}
      <div
        onClick={e => e.stopPropagation()}
        className="
          shrink-0
          opacity-100 sm:opacity-0
          transition-opacity
          sm:group-hover:opacity-100
        "
      >
        <DropdownGeneric
          align="end"
          contentClassName="w-52"
          trigger={
            <button
              className="
                flex items-center justify-center
                size-8
                rounded-lg
                transition-colors
                hover:bg-secondary
              "
            >
              <MoreVertical className="size-4" />
            </button>
          }
          items={items}
        />
      </div>
    </div>
  )
}
