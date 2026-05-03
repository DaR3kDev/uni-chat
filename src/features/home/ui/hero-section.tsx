import { Button } from '@/shared/ui/button'
import { ArrowRight, Lock, Smartphone, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  const stats = [
    { icon: Users, value: '50M+', label: 'Usuarios activos' },
    { icon: Lock, value: '100%', label: 'Cifrado E2E' },
    { icon: Smartphone, value: '180+', label: 'Países' },
  ]

  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-28 lg:pt-36">
      {/* Background mejor controlado */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-10 top-1/2 h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs text-primary backdrop-blur"
          >
            <Lock className="h-3.5 w-3.5" />
            Cifrado de extremo a extremo
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Privacidad en cada <span className="text-primary">mensaje</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            SecureChat protege tus conversaciones con cifrado de extremo a extremo. Ni siquiera
            nosotros podemos leer tus mensajes.
          </motion.p>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="group rounded-2xl px-6 transition-all hover:scale-[1.03] active:scale-95"
            >
              Descargar ahora
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Stats mejor UI cards */}
          <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-card"
              >
                <stat.icon className="mx-auto h-5 w-5 text-primary" />
                <div className="mt-2 text-lg font-semibold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
