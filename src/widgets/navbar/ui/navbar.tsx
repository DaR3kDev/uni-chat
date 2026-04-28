import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Menu, X } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { ThemeToggle } from '@/widgets/toggle/ui/theme-toggle'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { to: '#features', label: 'Características' },
    { to: '#security', label: 'Seguridad' },
    { to: '#privacy', label: 'Privacidad' },
    { to: '#download', label: 'Descargar' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="./img/logo.webp" alt="UniChat" className="h-7 w-7" />
          <span className="text-lg font-semibold text-foreground">UniChat</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link to="/login">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Iniciar Sesión
            </Button>
          </Link>

          <button
            className="md:hidden rounded-md p-1 transition hover:bg-accent"
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="mx-4 mt-2 rounded-xl border border-border/50 bg-background/95 shadow-lg backdrop-blur">
            <nav className="flex flex-col divide-y divide-border/50">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
