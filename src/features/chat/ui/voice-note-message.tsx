import { useRef, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import { Button } from '@/shared/ui/button'

interface VoiceNoteMessageProps {
  url: string
  isMine: boolean
  size?: 'x1' | 'x1_5' | 'x2' | 'x3'
}

const sizeMap = {
  x1: { container: 'max-w-[260px]', button: 'h-9 w-9', text: 'text-[10px]', bar: 'h-1' },
  x1_5: { container: 'max-w-[320px]', button: 'h-10 w-10', text: 'text-[11px]', bar: 'h-1.5' },
  x2: { container: 'max-w-[380px]', button: 'h-11 w-11', text: 'text-xs', bar: 'h-2' },
  x3: { container: 'max-w-[440px]', button: 'h-12 w-12', text: 'text-sm', bar: 'h-2.5' },
}

function formatTime(sec: number) {
  if (!sec) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

export function VoiceNoteMessage({ url, isMine, size = 'x1_5' }: VoiceNoteMessageProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const cfg = sizeMap[size]
  const percent = duration ? (progress / duration) * 100 : 0

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      await audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <div
      className={`
        flex items-center gap-3 px-3 py-2 rounded-2xl
        border shadow-sm backdrop-blur-md
        transition-all
        ${cfg.container}
        ${isMine ? 'ml-auto bg-primary/10 border-primary/20' : 'mr-auto bg-muted/40 border-border'}
      `}
    >
      {/* PLAY BUTTON */}
      <Button
        onClick={toggle}
        size="icon"
        className={`
          ${cfg.button}
          rounded-full shrink-0
          bg-primary text-white
          shadow-md hover:scale-105 active:scale-95 transition
        `}
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </Button>

      {/* WAVEFORM + PROGRESS */}
      <div className="flex-1 flex flex-col gap-1">
        {/* waveform visual */}
        <div className="flex items-end gap-[2px] h-6">
          {Array.from({ length: 26 }).map((_, i) => {
            const active = (i / 26) * 100 < percent

            return (
              <div
                key={i}
                className={`w-[2px] rounded-full transition-all ${
                  active ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                style={{
                  height: `${6 + Math.random() * 18}px`,
                }}
              />
            )
          })}
        </div>

        {/* progress bar */}
        <div className={`w-full ${cfg.bar} bg-muted rounded-full overflow-hidden`}>
          <div
            className="h-full bg-primary transition-all duration-150"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* time */}
        <div className={`${cfg.text} text-muted-foreground flex justify-between`}>
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* AUDIO */}
      <audio
        ref={audioRef}
        src={url}
        preload="metadata"
        onTimeUpdate={() => setProgress(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  )
}
