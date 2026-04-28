import { Smartphone, Monitor, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/shared/ui/button'

const platforms = [
  {
    icon: Smartphone,
    name: 'iOS',
    description: 'iPhone y iPad',
    button: 'App Store',
  },
  {
    icon: Smartphone,
    name: 'Android',
    description: 'Teléfonos y tablets',
    button: 'Google Play',
  },
  {
    icon: Monitor,
    name: 'Desktop',
    description: 'Windows, Mac y Linux',
    button: 'Descargar',
  },
  {
    icon: Globe,
    name: 'Web',
    description: 'Usa desde el navegador',
    button: 'Abrir Web',
  },
]

export function DownloadSection() {
  return (
    <section id="download" className="bg-card py-20 lg:py-32">
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
            Descargar
          </span>

          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Disponible en todas las plataformas
          </h2>

          <p className="mt-4 text-pretty text-muted-foreground lg:text-lg">
            Sincroniza tus conversaciones en todos tus dispositivos de forma segura. Comienza en tu
            teléfono y continúa en tu computadora.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col items-center rounded-2xl border border-border bg-background p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
            >
              {/* Icon */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
                <platform.icon className="h-8 w-8" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground">{platform.name}</h3>

              {/* Description */}
              <p className="mt-1 text-sm text-muted-foreground">{platform.description}</p>

              {/* Button */}
              <Button
                variant="outline"
                className="mt-6 w-full border-border text-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-[1.02] active:scale-[0.97]"
              >
                {platform.button}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
