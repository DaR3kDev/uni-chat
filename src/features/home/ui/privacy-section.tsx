import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

const privacyPoints = [
  'No vendemos tus datos a terceros',
  'No mostramos anuncios basados en tus mensajes',
  'No almacenamos tus conversaciones',
  'Código fuente abierto y auditable',
  'No requerimos número de teléfono',
  'Verificación de identidad opcional',
]

export function PrivacySection() {
  return (
    <section id="privacy" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-medium text-primary">
            Privacidad
          </span>

          <h2 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Tu privacidad es el producto, no el usuario
          </h2>

          <p className="mt-4 text-muted-foreground lg:text-lg">
            No monetizamos tus datos. No analizamos tus mensajes. No vendemos tu información.
          </p>
        </motion.div>

        {/* GRID POINTS */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
          {privacyPoints.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur transition hover:-translate-y-1 hover:border-primary/40 hover:bg-card"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
              </div>

              <span className="text-sm font-medium text-foreground leading-snug">{point}</span>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-border/60 bg-gradient-to-br from-card to-background p-8 text-center shadow-sm lg:p-12"
        >
          <div className="mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold lg:text-3xl">Transparencia total</h3>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Publicamos reportes de transparencia cada trimestre con todas las solicitudes
              recibidas y cómo las manejamos. La confianza se gana mostrando, no prometiendo.
            </p>

            <button className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:opacity-80 hover:underline">
              Ver informe de transparencia
              <span className="transition group-hover:translate-x-1">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
