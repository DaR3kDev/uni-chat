import { motion } from 'framer-motion'

export function ChatLoader() {
  return (
    <div className="flex flex-col gap-3 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          className={`
            h-14 rounded-2xl bg-muted
            ${i % 2 === 0 ? 'w-[75%]' : 'ml-auto w-[55%]'}
          `}
        />
      ))}
    </div>
  )
}
