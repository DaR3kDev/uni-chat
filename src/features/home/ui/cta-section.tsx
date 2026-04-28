import { ArrowRight, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/shared/ui/button'

export function CTASection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center lg:px-16 lg:py-24"
        >
          {/* Background glow */}
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-background/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-background/10 blur-3xl" />

          <div className="relative">
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-background/20"
            >
              <Shield className="h-8 w-8 text-primary-foreground" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-balance text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl"
            >
              Únete a millones de personas que protegen su privacidad
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-4 max-w-2xl text-pretty text-primary-foreground/80 lg:text-lg"
            >
              Descarga SecureChat hoy y comienza a comunicarte de forma segura. Es gratis, sin
              anuncios y respeta tu privacidad.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="w-full bg-background text-foreground transition-all duration-200 hover:bg-background/90 hover:scale-[1.03] active:scale-[0.97] sm:w-auto"
              >
                Comenzar Ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/10 hover:scale-[1.03] active:scale-[0.97] sm:w-auto"
              >
                Más Información
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
