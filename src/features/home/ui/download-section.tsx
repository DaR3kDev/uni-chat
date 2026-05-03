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
    <section id="download" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            Descargas
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Disponible en cualquier dispositivo
          </h2>

          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Sincroniza tus mensajes en tiempo real. Empieza en tu móvil y continúa en tu computadora
            sin perder nada.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="
                group relative
                rounded-2xl
                border border-border/60
                bg-background/60 backdrop-blur
                p-7 text-center
                shadow-sm
                transition-all
                hover:-translate-y-1 hover:shadow-xl hover:border-primary/40
              "
            >
              {/* inner glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 bg-primary/5" />

              {/* ICON */}
              <div
                className="
                  relative mx-auto mb-4 flex h-14 w-14 items-center justify-center
                  rounded-2xl
                  bg-primary/10 text-primary
                  transition-all
                  group-hover:bg-primary group-hover:text-primary-foreground
                  group-hover:scale-105
                "
              >
                <platform.icon className="h-6 w-6" />
              </div>

              {/* TITLE */}
              <h3 className="text-base font-semibold">{platform.name}</h3>

              {/* DESC */}
              <p className="mt-1 text-sm text-muted-foreground">{platform.description}</p>

              {/* BUTTON */}
              <Button
                variant="outline"
                className="
                  mt-6 w-full
                  border-border/60
                  bg-background/40 backdrop-blur
                  transition-all
                  hover:bg-primary hover:text-primary-foreground
                  hover:border-primary
                  hover:scale-[1.03]
                  active:scale-[0.97]
                "
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
