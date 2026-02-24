import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu'
import type { ReactNode } from 'react'

interface DropdownItem {
  label: string
  icon?: ReactNode
  onClick: () => void
  destructive?: boolean
}

interface DropdownGenericProps {
  trigger: ReactNode
  items: DropdownItem[]
  triggerClassName?: string
  contentClassName?: string
  align?: 'start' | 'end'
}

export function DropdownGeneric({
  trigger,
  items,
  triggerClassName,
  contentClassName,
  align = 'start',
}: DropdownGenericProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={triggerClassName} onClick={e => e.stopPropagation()}>
          {trigger}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        className={contentClassName}
        onClick={e => e.stopPropagation()}
      >
        {items.map((item, index) => (
          <div key={index}>
            <DropdownMenuItem
              onClick={item.onClick}
              className={item.destructive ? 'text-destructive focus:text-destructive' : ''}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </DropdownMenuItem>
            {index < items.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
