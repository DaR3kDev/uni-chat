import { Shield, Key, Eye, Server } from 'lucide-react'
import { motion } from 'framer-motion'

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'Cifrado E2E',
      description: 'Mensajes protegidos de extremo a extremo con protocolo seguro.',
    },
    {
      icon: Key,
      title: 'Sin puertas traseras',
      description: 'Ni nosotros podemos acceder a tus conversaciones.',
    },
    {
      icon: Eye,
      title: 'Mensajes efímeros',
      description: 'Contenido que desaparece automáticamente tras ser leído.',
    },
    {
      icon: Server,
      title: 'Sin almacenamiento',
      description: 'No guardamos mensajes en servidores una vez entregados.',
    },
  ]

  return (
    <section id="security" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-medium text-primary">
              Seguridad
            </span>

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Seguridad en cada mensaje
            </h2>

            <p className="mt-4 text-muted-foreground lg:text-lg">
              Diseñado desde cero con privacidad como núcleo. No es una función, es el sistema.
            </p>

            {/* FEATURES GRID */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {securityFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur transition hover:-translate-y-1 hover:border-primary/40 hover:bg-card"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <f.icon className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">{f.title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{f.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT CHAT MOCK */}
          <div className="relative">
            {/* Glow mejor controlado */}
            <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl" />

            <div className="relative rounded-3xl border border-border/60 bg-card/40 p-6 shadow-sm backdrop-blur">
              <div className="flex flex-col gap-4">
                {/* LEFT MESSAGE */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    A
                  </div>

                  <div className="max-w-[75%] rounded-2xl rounded-tl-none bg-secondary px-3 py-2">
                    <p className="text-sm">¡Hola! 👋</p>
                    <span className="text-[10px] text-muted-foreground">10:30</span>
                  </div>
                </motion.div>

                {/* RIGHT MESSAGE */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[75%] rounded-2xl rounded-tr-none bg-primary px-3 py-2">
                    <p className="text-sm text-primary-foreground">Todo cifrado 🔐</p>
                    <span className="text-[10px] text-primary-foreground/70">10:31</span>
                  </div>
                </motion.div>

                {/* LEFT MESSAGE */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    A
                  </div>

                  <div className="max-w-[75%] rounded-2xl rounded-tl-none bg-secondary px-3 py-2">
                    <p className="text-sm">No guardamos nada ✨</p>
                    <span className="text-[10px] text-muted-foreground">10:32</span>
                  </div>
                </motion.div>

                {/* FOOTER BADGE */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1.5"
                >
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs text-muted-foreground">
                    Cifrado de extremo a extremo activo
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
