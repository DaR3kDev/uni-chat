import { Link } from '@tanstack/react-router'

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
      {/* LEFT */}
      <div className="flex flex-col gap-6 p-4 sm:p-6 md:p-10">
        {/* LOGO */}
        <div className="flex justify-center lg:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <img src="./img/logo.webp" alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
            <span className="text-base sm:text-lg">Uni Chat</span>
          </Link>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">{children}</div>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="relative hidden lg:flex items-center justify-center overflow-hidden 
        bg-gradient-to-br from-white via-zinc-100 to-white 
        dark:from-black dark:via-zinc-900 dark:to-black"
      >
        {/* LIGHTS */}
        <div className="absolute inset-0 opacity-40 dark:opacity-30">
          <div className="absolute top-20 left-20 size-3 rounded-full bg-violet-400 blur-xl animate-pulse" />
          <div className="absolute bottom-24 right-24 size-4 rounded-full bg-purple-400 blur-xl animate-pulse" />
          <div className="absolute top-1/2 left-1/3 size-2 rounded-full bg-fuchsia-400 blur-lg animate-pulse" />
        </div>

        {/* GLOW */}
        <div className="absolute size-72 sm:size-96 rounded-full bg-violet-400/20 dark:bg-violet-600/30 blur-3xl animate-pulse" />

        {/* BRAND */}
        <div className="relative flex flex-col items-center gap-4 sm:gap-6 text-center">
          <img
            src="./img/logo.webp"
            alt="Logo"
            className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 object-contain
              dark:mix-blend-screen
              drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]
              dark:drop-shadow-[0_0_50px_rgba(139,92,246,0.7)]
              transition-all duration-500
              hover:scale-110"
          />

          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide 
            bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500
            dark:from-violet-400 dark:via-purple-500 dark:to-fuchsia-500
            bg-clip-text text-transparent"
          >
            UniChat
          </h1>
        </div>
      </div>
    </div>
  )
}
