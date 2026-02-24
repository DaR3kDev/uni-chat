export function FiltersComponents() {
  const FILTERS = [
    { key: 'all', label: 'Todos' },
    { key: 'unread', label: 'No leídos' },
    { key: 'favorites', label: 'Favoritos' },
    { key: 'group', label: 'Grupos' },
  ] as const

  return (
    <div
      className="
        w-full
        px-3 pb-2
        flex gap-1.5 overflow-x-auto
        sm:flex sm:flex-wrap sm:justify-start sm:overflow-visible
        [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
      "
    >
      {FILTERS.map(f => (
        <button
          key={f.key}
          className={`
            shrink-0
            rounded-md
            px-3 py-1.5
            text-xs
            font-medium
            transition-all
            whitespace-nowrap
            ${
              f.key === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
            }
          `}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
