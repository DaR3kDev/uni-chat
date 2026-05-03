import { Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'

const footerLinks = {
  producto: [
    { name: 'Características', href: '#features' },
    { name: 'Seguridad', href: '#security' },
    { name: 'Privacidad', href: '#privacy' },
    { name: 'Descargar', href: '#download' },
  ],
  empresa: [
    { name: 'Sobre Nosotros', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Carreras', href: '#' },
    { name: 'Prensa', href: '#' },
  ],
  legal: [
    { name: 'Términos', href: '#' },
    { name: 'Privacidad', href: '#' },
    { name: 'Cookies', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background">
      {/* glow suave */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        {/* TOP */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* BRAND */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 transition hover:opacity-80">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold tracking-tight">UniChat</span>
            </Link>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Mensajería privada y segura. Diseñada para comunicación rápida, ligera y protegida.
            </p>
          </div>

          {/* LINKS */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                {title}
              </h3>

              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="
                        text-sm text-muted-foreground
                        transition
                        hover:text-foreground
                        hover:translate-x-0.5
                        inline-block
                      "
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* DIVIDER */}
        <div className="my-10 h-px w-full bg-border/60" />

        {/* BOTTOM */}
        <div className="flex flex-col gap-3 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <span>© {new Date().getFullYear()} UniChat</span>

          <span className="flex items-center justify-center gap-1 opacity-80">
            Hecho con <span className="text-primary">❤</span> por privacidad
          </span>
        </div>
      </div>
    </footer>
  )
}
