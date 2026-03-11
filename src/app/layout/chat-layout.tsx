import type { PropsWithChildren } from 'react'

export default function ChatLayout({ children }: PropsWithChildren) {
  return <main className="flex h-dvh w-full overflow-hidden bg-background">{children}</main>
}
