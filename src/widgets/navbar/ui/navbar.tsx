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
    <header
      className="
        fixed inset-x-0 top-0 z-50
        border-b border-border/40
        bg-background/70 backdrop-blur-xl
        supports-[backdrop-filter]:bg-background/60
      "
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group transition">
          <img
            src="./img/logo.webp"
            alt="UniChat"
            className="h-7 w-7 transition-transform group-hover:scale-105"
          />

          <span className="text-base font-semibold tracking-tight">UniChat</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="
                text-sm text-muted-foreground
                transition
                hover:text-foreground
              "
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link to="/login">
            <Button
              size="sm"
              className="
                rounded-xl
                px-4
                font-medium
                transition
                active:scale-[0.97]
              "
            >
              Iniciar sesión
            </Button>
          </Link>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsMenuOpen(v => !v)}
            className="
              md:hidden
              flex items-center justify-center
              size-9 rounded-lg
              hover:bg-muted
              transition
              active:scale-95
            "
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-3">
          <div
            className="
              mt-2 overflow-hidden
              rounded-xl border border-border/40
              bg-background/90 backdrop-blur-xl
              shadow-lg
            "
          >
            <nav className="flex flex-col">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    px-4 py-3
                    text-sm text-muted-foreground
                    transition
                    hover:bg-muted hover:text-foreground
                  "
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
