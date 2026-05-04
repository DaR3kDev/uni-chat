import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { MessageCircleMore, ShieldCheck, Sparkles } from 'lucide-react'

interface AuthLayoutProps {
  children: ReactNode
}

const features = [
  {
    icon: MessageCircleMore,
    title: 'Mensajes en tiempo real',
    description: 'Comunicación rápida y fluida.',
  },
  {
    icon: ShieldCheck,
    title: 'Seguro y privado',
    description: 'Protección moderna para tus conversaciones.',
  },
  {
    icon: Sparkles,
    title: 'Experiencia moderna',
    description: 'Diseño limpio y adaptable a cualquier pantalla.',
  },
]

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-svh overflow-hidden bg-background">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-140px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>

      <div className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <section className="flex flex-col px-4 py-5 sm:px-6 md:px-10 lg:px-14">
          {/* HEADER */}
          <header className="flex items-center justify-center lg:justify-start">
            <Link to="/" className="group flex items-center gap-3 transition-all">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/60 bg-background/70 shadow-sm backdrop-blur">
                <img
                  src="./img/logo.webp"
                  alt="UniChat Logo"
                  className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-lg font-semibold tracking-tight">UniChat</span>

                <span className="text-xs text-muted-foreground">Real-time messaging</span>
              </div>
            </Link>
          </header>

          {/* MOBILE BRAND */}
          <div className="flex flex-col items-center justify-center py-10 text-center lg:hidden">
            <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-border/50 bg-background/60 shadow-xl backdrop-blur">
              <img src="./img/logo.webp" alt="UniChat" className="h-14 w-14 object-contain" />
            </div>

            <h1 className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              UniChat
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Conecta, conversa y comparte en tiempo real con una experiencia moderna y responsiva.
            </p>
          </div>

          {/* FORM */}
          <main className="flex flex-1 items-center justify-center py-6 lg:py-10">
            <div className="w-full max-w-md">{children}</div>
          </main>
        </section>

        {/* RIGHT SIDE */}
        <aside className="relative hidden overflow-hidden lg:flex">
          {/* GLOW */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-background to-fuchsia-500/10" />

          <div className="absolute left-20 top-20 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

          {/* CONTENT */}
          <div className="relative z-10 flex w-full flex-col items-center justify-center px-14 text-center">
            {/* LOGO */}
            <div
              className="
                mb-8 flex h-36 w-36 items-center justify-center
                rounded-[2.5rem]
                border border-white/10
                bg-background/40
                shadow-2xl
                backdrop-blur-xl
              "
            >
              <img
                src="./img/logo.webp"
                alt="UniChat Logo"
                className="
                  h-20 w-20 object-contain
                  transition-transform duration-500
                  hover:scale-110
                "
              />
            </div>

            {/* TITLE */}
            <h1 className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent xl:text-6xl">
              UniChat
            </h1>

            {/* SUBTITLE */}
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground xl:text-lg">
              Plataforma de mensajería moderna diseñada para ofrecer velocidad, simplicidad y una
              experiencia agradable en cualquier dispositivo.
            </p>

            {/* FEATURES */}
            <div className="mt-12 grid w-full max-w-xl grid-cols-1 gap-4">
              {features.map(feature => {
                const Icon = feature.icon

                return (
                  <div
                    key={feature.title}
                    className="
                      flex items-start gap-4 rounded-2xl
                      border border-border/50
                      bg-background/50
                      p-5
                      text-left
                      backdrop-blur-xl
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-violet-500/30
                      hover:bg-background/70
                    "
                  >
                    <div
                      className="
                        flex h-11 w-11 shrink-0 items-center justify-center
                        rounded-xl bg-violet-500/10
                      "
                    >
                      <Icon className="h-5 w-5 text-violet-500" />
                    </div>

                    <div>
                      <h3 className="font-medium">{feature.title}</h3>

                      <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
