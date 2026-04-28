import type { ReactNode } from 'react'
import { Navbar } from '@/widgets/navbar/ui/navbar'
import { Footer } from '@/widgets/footer/ui/footer'

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  )
}
