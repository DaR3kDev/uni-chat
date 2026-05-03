import { features } from '../data/features.data'
import { motion } from 'framer-motion'

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="pointer-events-none absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-1/3 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            Características
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Todo lo que necesitas para comunicarte
          </h2>

          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            UniChat combina velocidad, diseño limpio y seguridad para una experiencia de chat
            moderna y fluida.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="
                group relative
                rounded-2xl
                border border-border/60
                bg-background/60 backdrop-blur
                p-6
                shadow-sm
                transition-all
                hover:-translate-y-1 hover:shadow-xl hover:border-primary/40
              "
            >
              {/* hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 bg-primary/5" />

              {/* ICON */}
              <div
                className="
                  relative mb-4 flex h-11 w-11 items-center justify-center
                  rounded-xl
                  bg-primary/10 text-primary
                  transition-all
                  group-hover:bg-primary group-hover:text-primary-foreground
                  group-hover:scale-105
                "
              >
                <feature.icon className="h-5 w-5" />
              </div>

              {/* TITLE */}
              <h3 className="text-base sm:text-lg font-semibold tracking-tight">{feature.title}</h3>

              {/* DESCRIPTION */}
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
