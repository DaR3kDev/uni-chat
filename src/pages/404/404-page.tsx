import { MessageCircleOff, ArrowLeft, Home } from 'lucide-react'
import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <main
      className="relative min-h-screen w-full flex items-center justify-center
      overflow-hidden bg-gradient-to-br
      from-white via-zinc-100 to-white
      dark:from-black dark:via-zinc-900 dark:to-black px-4"
    >
      {/* blobs animados */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-fuchsia-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div
        className="absolute inset-0 opacity-10 dark:opacity-20
        bg-[linear-gradient(to_right,transparent_0%,rgba(139,92,246,0.2)_1px,transparent_1px),
        linear-gradient(to_bottom,transparent_0%,rgba(139,92,246,0.2)_1px,transparent_1px)]
        bg-[size:40px_40px]"
      />

      {/* contenido */}
      <div className="relative flex flex-col items-center text-center gap-8">
        <div
          className="relative flex items-center justify-center
          size-32 rounded-3xl
          bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500
          shadow-[0_0_60px_rgba(168,85,247,0.6)]
          animate-pulse"
        >
          <MessageCircleOff className="size-12 text-white" />

          {/* borde animado */}
          <div className="absolute inset-0 rounded-3xl border border-white/20 animate-[spin_8s_linear_infinite]" />
        </div>

        {/* texto */}
        <div>
          <h1
            className="text-7xl sm:text-8xl md:text-[9rem]
            font-extrabold tracking-tight leading-none
            bg-gradient-to-r
            from-violet-500 via-purple-500 to-fuchsia-500
            bg-clip-text text-transparent"
          >
            404
          </h1>

          <p className="mt-4 max-w-md text-muted-foreground">
            Esta conversación no existe o fue eliminada. Regresa al inicio y sigue chateando en
            UniChat.
          </p>
        </div>

        {/* botones */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link to="/" className="relative group inline-flex items-center gap-2">
            <span
              className="absolute inset-0 rounded-xl
              bg-gradient-to-r from-violet-500 to-fuchsia-500
              blur opacity-70 group-hover:opacity-100 transition"
            />

            <span
              className="relative px-8 py-3 rounded-xl
              bg-white dark:bg-neutral-950
              border border-violet-500/40
              font-medium flex items-center gap-2"
            >
              <Home className="size-4" />
              Inicio
            </span>
          </Link>

          <Link
            to="/chat"
            className="px-8 py-3 rounded-xl
            border border-muted-foreground/30
            text-sm font-medium
            hover:bg-secondary transition flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Volver al chat
          </Link>
        </div>
      </div>
    </main>
  )
}
