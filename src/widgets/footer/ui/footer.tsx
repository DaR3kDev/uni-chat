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
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        {/* TOP */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-base font-semibold text-foreground">UniChat</span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Mensajería privada y segura. Tu privacidad es lo primero.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
                {title}
              </h3>

              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-foreground/70 transition-colors duration-200 hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-border pt-6">
          <div className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
            <span>© {new Date().getFullYear()} UniChat</span>
            <span className="opacity-80">Hecho con privacidad en mente</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
