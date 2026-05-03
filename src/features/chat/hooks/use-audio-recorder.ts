import { useRef, useState } from 'react'

export function useAudioRecorder(sendFile: (file: File) => void) {
  const [recording, setRecording] = useState(false)
  const [duration, setDuration] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    streamRef.current = stream

    const recorder = new MediaRecorder(stream)
    mediaRecorderRef.current = recorder
    chunksRef.current = []

    const audioCtx = new AudioContext()
    const source = audioCtx.createMediaStreamSource(stream)
    const analyser = audioCtx.createAnalyser()

    analyser.fftSize = 128
    source.connect(analyser)

    const dataArray = new Uint8Array(analyser.frequencyBinCount)

    const draw = () => {
      if (!recording) return
      requestAnimationFrame(draw)
      analyser.getByteFrequencyData(dataArray)
    }

    draw()

    intervalRef.current = setInterval(() => {
      setDuration(d => d + 1)
    }, 1000)

    recorder.ondataavailable = e => {
      chunksRef.current.push(e.data)
    }

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      const file = new File([blob], 'voice.webm', { type: 'audio/webm' })

      sendFile(file)

      stream.getTracks().forEach(t => t.stop())
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    recorder.start()
    setRecording(true)
  }

  const stop = () => {
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  const cancel = () => {
    mediaRecorderRef.current?.stop()
    streamRef.current?.getTracks().forEach(t => t.stop())
    setRecording(false)
    setDuration(0)
  }

  const toggle = () => {
    if (recording) stop()
    else start()
  }

  return { recording, duration, toggle, cancel }
}
