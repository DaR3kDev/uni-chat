import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-svh grid-cols-1 lg:grid-cols-2 bg-background">
      {/* LEFT - FORM */}
      <section className="flex flex-col p-4 sm:p-6 md:p-10">
        {/* HEADER */}
        <header className="flex justify-center lg:justify-start">
          <Link to="/" className="flex items-center gap-2 group transition">
            <img
              src="./img/logo.webp"
              alt="UniChat Logo"
              className="h-9 w-9 sm:h-10 sm:w-10 transition-transform group-hover:scale-105"
            />

            <span className="text-base sm:text-lg font-medium tracking-tight">UniChat</span>
          </Link>
        </header>

        {/* CONTENT */}
        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">{children}</div>
        </main>
      </section>

      {/* RIGHT - BRAND */}
      <aside className="relative hidden lg:flex items-center justify-center overflow-hidden bg-muted/30">
        {/* BACKGROUND GLOW SYSTEM */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-24 left-24 size-40 bg-violet-400/20 blur-3xl rounded-full animate-pulse" />
          <div className="absolute bottom-24 right-24 size-56 bg-fuchsia-400/20 blur-3xl rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 size-72 bg-purple-500/10 blur-3xl rounded-full" />
        </div>

        {/* SUBTLE GRID */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

        {/* CONTENT */}
        <div className="relative flex flex-col items-center text-center gap-6">
          {/* LOGO */}
          <img
            src="./img/logo.webp"
            alt="UniChat Logo"
            className="
              h-28 w-28 md:h-36 md:w-36
              object-contain
              transition-transform duration-500 hover:scale-110
              drop-shadow-[0_0_40px_rgba(139,92,246,0.4)]
            "
          />

          {/* TITLE */}
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
            UniChat
          </h1>

          {/* SUBTITLE */}
          <p className="text-sm text-muted-foreground max-w-sm">
            Chatea en tiempo real con una experiencia fluida, rápida y moderna.
          </p>
        </div>
      </aside>
    </div>
  )
}
