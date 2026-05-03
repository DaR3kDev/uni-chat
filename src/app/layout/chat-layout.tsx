import type { PropsWithChildren } from 'react'

export default function ChatLayout({ children }: PropsWithChildren) {
  return (
    <main className="relative flex h-dvh w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,_rgba(0,0,0,1)_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background/80 to-transparent" />

      <div className="relative flex h-full w-full">{children}</div>
    </main>
  )
}
