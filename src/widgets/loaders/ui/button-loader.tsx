import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type ButtonLoaderProps = {
  children?: ReactNode
}

export function ButtonLoader({ children }: ButtonLoaderProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="
          h-4 w-4 shrink-0 rounded-full
          border-2 border-white/20
          border-t-white
        "
      />

      {children && <span className="text-sm font-medium">{children}</span>}
    </div>
  )
}
