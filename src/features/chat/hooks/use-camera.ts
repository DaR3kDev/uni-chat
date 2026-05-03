import { useState, useRef, useEffect } from 'react'
import { toast } from 'sonner'

export function useCamera(sendFile: (file: File) => void) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [open, setOpen] = useState(false)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      })

      streamRef.current = stream
      setOpen(true)
    } catch (error) {
      console.error(error)
      toast.error('No se pudo acceder a la cámara')
    }
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    if (!videoRef.current || !streamRef.current) return

    const video = videoRef.current
    video.srcObject = streamRef.current
    video.muted = true

    video.onloadedmetadata = async () => {
      try {
        await video.play()
      } catch (e) {
        console.error('play error', e)
      }
    }
  }, [open])

  const takePhoto = () => {
    const video = videoRef.current
    if (!video) return
    if (video.videoWidth === 0) return

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(video, 0, 0)

    canvas.toBlob(
      blob => {
        if (!blob) return

        const file = new File([blob], 'foto.jpg', {
          type: 'image/jpeg',
        })

        sendFile(file)
        stopCamera()
      },
      'image/jpeg',
      0.92,
    )
  }

  return {
    videoRef,
    open,
    startCamera,
    stopCamera,
    takePhoto,
  }
}
