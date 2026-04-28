import { features } from '../data/features.data'
import { motion } from 'framer-motion'

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-primary sm:text-sm">
            Características
          </span>

          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Todo lo que necesitas para comunicarte
          </h2>

          <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base lg:text-lg">
            Unichat ofrece todas las funciones que esperas de una app de mensajería, con la
            seguridad que mereces.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl border border-border/60 bg-card/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card"
            >
              {/* Icon */}
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-5 w-5" />
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-foreground sm:text-lg">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
