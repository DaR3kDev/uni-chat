import { useEffect } from 'react'

interface UseChatScrollProps {
  container: HTMLDivElement | null
  dependency: unknown
}

export function useChatScroll({ container, dependency }: UseChatScrollProps) {
  useEffect(() => {
    if (!container) {
      return
    }

    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight
    })
  }, [container, dependency])
}
