import { ArrowRight, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/shared/ui/button'

export function CTASection() {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            relative overflow-hidden
            rounded-3xl
            border border-border/40
            bg-background/70 backdrop-blur-xl
            shadow-2xl
            px-8 py-16 lg:px-16 lg:py-20
            text-center
          "
        >
          {/* inner glow border */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-primary/10" />

          {/* ICON */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
          >
            <Shield className="h-6 w-6" />
          </motion.div>

          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Comunicación privada, simple y sin distracciones
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed"
          >
            UniChat está diseñado para ser rápido, seguro y ligero. Sin anuncios, sin rastreo, solo
            conversaciones reales.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="
                w-full sm:w-auto
                bg-primary text-primary-foreground
                hover:bg-primary/90
                transition-all
                hover:scale-[1.03]
                active:scale-[0.97]
                shadow-lg shadow-primary/20
              "
            >
              Comenzar ahora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="
                w-full sm:w-auto
                border-border/60
                bg-background/40 backdrop-blur
                hover:bg-muted/40
                transition-all
                hover:scale-[1.03]
                active:scale-[0.97]
              "
            >
              Ver más detalles
            </Button>
          </motion.div>

          {/* subtle footer note */}
          <p className="mt-8 text-xs text-muted-foreground/70">
            Gratis • Código abierto • Enfoque en privacidad
          </p>
        </motion.div>
      </div>
    </section>
  )
}
