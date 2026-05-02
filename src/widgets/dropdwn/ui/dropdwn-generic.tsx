import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu'

import type { DropdownGenericProps } from '../types/dropdwn-generic.types'

export function DropdownGeneric({
  trigger,
  items,
  contentClassName,
  align = 'start',
}: DropdownGenericProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        className={contentClassName}
        onClick={e => e.stopPropagation()}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <div key={`${item.label}-${index}`}>
              <DropdownMenuItem
                onClick={item.onClick}
                className={item.destructive ? 'text-destructive focus:text-destructive' : ''}
              >
                {item.icon && <span className="mr-2 flex items-center">{item.icon}</span>}

                {item.label}
              </DropdownMenuItem>

              {!isLast && <DropdownMenuSeparator />}
            </div>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
