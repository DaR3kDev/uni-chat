import type { ReactNode } from 'react'
import { Navbar } from '@/widgets/navbar/ui/navbar'
import { Footer } from '@/widgets/footer/ui/footer'

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col ">
      {/* NAVBAR */}
      <div className="sticky top-0 z-50 border-b">
        <Navbar />
      </div>

      {/* MAIN */}
      <main className="flex-1 relative">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-background/80 backdrop-blur">
        <Footer />
      </footer>
    </div>
  )
}
