import { useState } from 'react'

type FilterKey = 'all' | 'unread' | 'favorites' | 'group'

export function FiltersComponents() {
  const [active, setActive] = useState<FilterKey>('all')

  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'Todos' },
    { key: 'unread', label: 'No leídos' },
    { key: 'favorites', label: 'Favoritos' },
    { key: 'group', label: 'Grupos' },
  ]

  return (
    <div
      className="
        flex gap-2 px-3 pb-2
        overflow-x-auto
        sm:flex-wrap sm:overflow-visible
        [-ms-overflow-style:none]
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      {FILTERS.map(f => {
        const isActive = active === f.key

        return (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`
              relative shrink-0
              rounded-full
              px-3.5 py-1.5
              text-xs font-medium
              transition-all duration-200

              ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/70'
              }

              active:scale-95
            `}
          >
            {f.label}

            {/* active indicator dot */}
            {isActive && (
              <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
            )}
          </button>
        )
      })}
    </div>
  )
}
