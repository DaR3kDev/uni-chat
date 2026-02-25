import { RegisterForm } from '@/features/authentication/components/register-form'

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <span>U</span>
            </div>
            Uni Chat
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>

      <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-zinc-100 to-white dark:from-black dark:via-zinc-900 dark:to-black">
        <div className="absolute inset-0 opacity-40 dark:opacity-30">
          <div className="absolute top-20 left-20 size-3 rounded-full bg-violet-400 dark:bg-violet-500 blur-xl animate-pulse" />
          <div className="absolute bottom-24 right-24 size-4 rounded-full bg-purple-400 dark:bg-purple-500 blur-xl animate-pulse" />
          <div className="absolute top-1/2 left-1/3 size-2 rounded-full bg-fuchsia-400 dark:bg-fuchsia-500 blur-lg animate-pulse" />
        </div>

        <div className="absolute size-96 rounded-full bg-violet-400/20 dark:bg-violet-600/30 blur-3xl animate-pulse" />

        <div className="relative flex flex-col items-center gap-6">
          <img
            src="./img/logo.png"
            alt="Logo"
            className="h-40 w-40 object-contain
                 dark:mix-blend-screen
                 drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]
                 dark:drop-shadow-[0_0_50px_rgba(139,92,246,0.7)]
                 transition-all duration-500
                 hover:scale-110"
          />

          <h1
            className="text-4xl font-bold tracking-wide bg-gradient-to-r 
                 from-violet-500 via-purple-500 to-fuchsia-500
                 dark:from-violet-400 dark:via-purple-500 dark:to-fuchsia-500
                 bg-clip-text text-transparent
                 animate-[fadeUp_1.2s_ease-out]"
          >
            UniChat
          </h1>
        </div>
      </div>
    </div>
  )
}
