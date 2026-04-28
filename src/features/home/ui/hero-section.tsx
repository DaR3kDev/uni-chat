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
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl sm:h-[500px] sm:w-[500px]" />
        <div className="absolute right-0 top-1/2 h-[250px] w-[250px] rounded-full bg-primary/5 blur-3xl sm:h-[300px] sm:w-[300px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs text-primary sm:text-sm"
          >
            <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Cifrado de extremo a extremo
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Privacidad en cada <span className="text-primary">mensaje</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:mt-6 sm:text-lg lg:text-xl"
          >
            SecureChat protege tus conversaciones con cifrado de extremo a extremo. Ni nosotros
            podemos leer tus mensajes. Tu privacidad es nuestra prioridad.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-[1.03] active:scale-[0.97] sm:w-auto"
            >
              Descargar Ahora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 sm:mt-16 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex flex-col items-center gap-1 sm:gap-2"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 sm:h-12 sm:w-12">
                  <stat.icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                </div>

                <span className="text-lg font-semibold text-foreground sm:text-2xl">
                  {stat.value}
                </span>

                <span className="text-xs text-muted-foreground sm:text-sm text-center">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
