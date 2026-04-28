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
    <section id="privacy" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            Privacidad
          </span>

          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Tu privacidad, nuestro compromiso
          </h2>

          <p className="mt-4 text-pretty text-muted-foreground lg:text-lg">
            A diferencia de otras aplicaciones, nosotros no monetizamos tus datos. Tu información
            personal te pertenece solo a ti.
          </p>
        </motion.div>

        {/* Points */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {privacyPoints.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-4 w-4 text-primary" />
                </div>

                <span className="text-sm font-medium text-foreground">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 rounded-3xl border border-border bg-card p-8 text-center lg:p-12"
        >
          <div className="mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold text-foreground lg:text-3xl">Transparencia total</h3>

            <p className="mt-4 text-muted-foreground">
              Publicamos informes de transparencia cada trimestre, detallando cualquier solicitud
              gubernamental que recibamos y cómo respondemos a ellas. La confianza se construye con
              acciones, no con palabras.
            </p>

            <button className="mt-6 text-sm font-medium text-primary transition hover:underline hover:opacity-80">
              Ver informe de transparencia →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
