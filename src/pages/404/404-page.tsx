import { motion } from 'framer-motion'
import { ArrowLeft, Home, LockKeyhole, MessageCircleOff } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export default function NotFoundPage() {
  return (
    <main
      className="
        relative flex min-h-screen w-full items-center justify-center
        overflow-hidden bg-background px-6 py-12
      "
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/20" />

        {/* glows */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute left-1/2 top-1/2
            h-[320px] w-[320px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full bg-primary/20 blur-3xl
            sm:h-[500px] sm:w-[500px]
          "
        />

        <div className="absolute left-0 top-0 h-52 w-52 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-primary/5 blur-3xl" />

        {/* grid */}
        <div
          className="
            absolute inset-0 opacity-[0.03]
            [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
            [background-size:36px_36px]
          "
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        {/* floating icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex items-center justify-center"
        >
          {/* waves */}
          {[0, 1, 2].map(index => (
            <motion.div
              key={index}
              animate={{
                scale: [0.9, 1.7],
                opacity: [0.18, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.7,
              }}
              className="
                absolute
                h-28 w-28
                rounded-full
                border border-primary/20
                sm:h-40 sm:w-40
              "
            />
          ))}

          {/* card */}
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              relative
              flex h-24 w-24 items-center justify-center
              rounded-[2rem]
              border border-white/10
              bg-card/70
              shadow-2xl
              backdrop-blur-2xl
              sm:h-28 sm:w-28
            "
          >
            {/* overlay */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />

            {/* rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="
                absolute inset-2
                rounded-[1.5rem]
                border border-dashed border-primary/20
              "
            />

            <MessageCircleOff className="relative z-10 h-10 w-10 text-primary" />
          </motion.div>
        </motion.div>

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-10"
        >
          <div
            className="
              inline-flex items-center gap-2
              rounded-full border border-primary/20
              bg-primary/10
              px-4 py-1.5
              text-xs font-medium text-primary
              backdrop-blur
            "
          >
            <LockKeyhole className="h-3.5 w-3.5" />
            Conversación no encontrada
          </div>

          <h1
            className="
              mt-6
              text-6xl font-black tracking-tight
              text-transparent
              bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400
              bg-clip-text
              sm:text-7xl
              md:text-8xl
            "
          >
            404
          </h1>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Esta conversación ya no existe
          </h2>

          <p
            className="
              mx-auto mt-4
              max-w-md
              text-sm leading-relaxed text-muted-foreground
              sm:text-base
            "
          >
            El chat que buscas pudo haber sido eliminado o el enlace no es válido. Regresa al inicio
            y continúa conversando de forma segura en UniChat.
          </p>
        </motion.div>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="
            mt-10
            flex w-full flex-col gap-3
            sm:w-auto sm:flex-row
          "
        >
          <Link
            to="/"
            className="
              group relative inline-flex items-center justify-center gap-2
              overflow-hidden
              rounded-2xl
              border border-primary/20
              bg-primary px-6 py-3
              text-sm font-medium text-primary-foreground
              shadow-lg shadow-primary/20
              transition-all
              hover:-translate-y-0.5 hover:shadow-xl
              active:scale-[0.98]
            "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <Home className="relative z-10 h-4 w-4" />

            <span className="relative z-10">Ir al inicio</span>
          </Link>

          <Link
            to="/chat"
            className="
              inline-flex items-center justify-center gap-2
              rounded-2xl
              border border-border/60
              bg-card/50 px-6 py-3
              text-sm font-medium
              backdrop-blur-xl
              transition-all
              hover:-translate-y-0.5 hover:bg-card
              active:scale-[0.98]
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al chat
          </Link>
        </motion.div>

        {/* footer */}
        <motion.p
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          className="mt-8 text-xs text-muted-foreground"
        >
          Comunicación privada y cifrada de extremo a extremo
        </motion.p>
      </div>
    </main>
  )
}
