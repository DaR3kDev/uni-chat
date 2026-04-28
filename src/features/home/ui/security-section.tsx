import { Shield, Key, Eye, Server } from 'lucide-react'
import { motion } from 'framer-motion'

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'Cifrado E2E',
      description:
        'Todos los mensajes están cifrados de extremo a extremo usando el protocolo Signal.',
    },
    {
      icon: Key,
      title: 'Sin Puertas Traseras',
      description: 'No hay puertas traseras. Ni nosotros podemos acceder a tus conversaciones.',
    },
    {
      icon: Eye,
      title: 'Mensajes Efímeros',
      description: 'Configura mensajes que desaparecen automáticamente después de ser leídos.',
    },
    {
      icon: Server,
      title: 'Sin Almacenamiento',
      description: 'Los mensajes no se almacenan en nuestros servidores una vez entregados.',
    },
  ]

  return (
    <section id="security" className="bg-card/40 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-medium uppercase tracking-widest text-primary sm:text-sm">
              Seguridad
            </span>

            <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
              Seguridad en cada paso
            </h2>

            <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base lg:text-lg">
              Creemos que la privacidad es un derecho fundamental. Por eso hemos construido
              SecureChat con la seguridad como prioridad desde el primer día.
            </p>

            {/* Features */}
            <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
              {securityFeatures.map(({ icon: Icon, title, description }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground sm:text-base">{title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT (Chat mock) */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-2 rounded-2xl bg-primary/5 blur-xl" />

            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background p-5 sm:p-6">
              <div className="flex flex-col gap-3">
                {/* Message left */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs text-primary">
                    A
                  </div>
                  <div className="max-w-[75%] rounded-xl rounded-tl-none bg-secondary px-3 py-2">
                    <p className="text-xs sm:text-sm">¡Hola! ¿Cómo estás? 👋</p>
                    <span className="text-[10px] text-muted-foreground">10:30</span>
                  </div>
                </motion.div>

                {/* Message right */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[75%] rounded-xl rounded-tr-none bg-primary px-3 py-2">
                    <p className="text-xs text-primary-foreground sm:text-sm">
                      ¡Muy bien! Probando esta app 🔐
                    </p>
                    <span className="text-[10px] text-primary-foreground/70">10:31</span>
                  </div>
                </motion.div>

                {/* Message left */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start gap-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs text-primary">
                    A
                  </div>
                  <div className="max-w-[75%] rounded-xl rounded-tl-none bg-secondary px-3 py-2">
                    <p className="text-xs sm:text-sm">Me encanta que todo esté cifrado ✨</p>
                    <span className="text-[10px] text-muted-foreground">10:32</span>
                  </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-secondary/50 px-3 py-1.5"
                >
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] text-muted-foreground sm:text-xs">
                    Mensajes cifrados de extremo a extremo
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
