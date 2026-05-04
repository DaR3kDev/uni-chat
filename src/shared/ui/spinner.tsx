import { motion } from 'framer-motion'
import { LockKeyhole, ShieldCheck, Wifi } from 'lucide-react'

type SpinnerCustomProps = {
  text?: string
  fullScreen?: boolean
}

export function SpinnerCustom({
  text = 'Conectando de forma segura...',
  fullScreen = false,
}: SpinnerCustomProps) {
  return (
    <div
      className={
        fullScreen
          ? `
            fixed inset-0 z-50
            flex min-h-screen w-full items-center justify-center
            overflow-hidden
            bg-background
          `
          : 'flex items-center justify-center'
      }
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />

        {/* Glow effects */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute left-1/2 top-1/2
            h-[320px] w-[320px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-primary/20
            blur-3xl
            sm:h-[500px] sm:w-[500px]
          "
        />

        <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

        {/* Grid effect */}
        <div
          className="
            absolute inset-0 opacity-[0.03]
            [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
            [background-size:32px_32px]
          "
        />
      </div>

      {/* Content */}
      <div className="relative flex w-full max-w-md flex-col items-center px-6">
        {/* Logo core */}
        <div className="relative flex items-center justify-center">
          {/* outer waves */}
          {[0, 1, 2].map(index => (
            <motion.div
              key={index}
              animate={{
                scale: [0.8, 1.8],
                opacity: [0.18, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.8,
                ease: 'easeOut',
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

          {/* floating icons */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute h-44 w-44 sm:h-56 sm:w-56"
          >
            <Wifi className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 text-primary/80" />

            <ShieldCheck className="absolute bottom-6 left-0 h-4 w-4 text-primary/70" />

            <Wifi className="absolute bottom-6 right-0 h-4 w-4 rotate-180 text-primary/70" />
          </motion.div>

          {/* center */}
          <motion.div
            animate={{
              y: [0, -6, 0],
              boxShadow: [
                '0 0 0px rgba(0,0,0,0)',
                '0 0 40px rgba(99,102,241,0.25)',
                '0 0 0px rgba(0,0,0,0)',
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              relative
              flex h-24 w-24 items-center justify-center
              rounded-[2rem]
              border border-white/10
              bg-card/70
              backdrop-blur-2xl
              shadow-2xl
              sm:h-28 sm:w-28
            "
          >
            {/* gradient overlay */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/25 via-primary/5 to-transparent" />

            {/* animated inner border */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="
                absolute inset-2
                rounded-[1.5rem]
                border border-dashed border-primary/20
              "
            />

            <LockKeyhole className="relative z-10 h-10 w-10 text-primary" />
          </motion.div>
        </div>

        {/* Text */}
        <div className="mt-10 text-center">
          <motion.h2
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              text-base font-semibold tracking-tight
              sm:text-lg
            "
          >
            {text}
          </motion.h2>

          <p
            className="
              mx-auto mt-3
              max-w-xs
              text-sm leading-relaxed
              text-muted-foreground
            "
          >
            Tus conversaciones están protegidas con cifrado de extremo a extremo y autenticación
            segura.
          </p>
        </div>

        {/* encrypted activity */}
        <div
          className="
            mt-8 flex items-center gap-2
            rounded-full
            border border-white/10
            bg-card/50
            px-5 py-3
            backdrop-blur-xl
          "
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.15, 0.8],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.06,
              }}
              className="
                h-1.5 w-1.5 rounded-full bg-primary
                sm:h-2 sm:w-2
              "
            />
          ))}
        </div>

        {/* footer status */}
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-6 text-xs text-muted-foreground"
        >
          Inicializando sesión segura...
        </motion.div>
      </div>
    </div>
  )
}
