import { useState, useEffect } from 'react'

export function TypewriterText({
  texts,
  speed = 40,
  deleteSpeed = 18,
  pause = 2000,
}: {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pause?: number
}) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[idx]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting && display === current) {
      timer = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && display === '') {
      setDeleting(false)
      setIdx(prev => (prev + 1) % texts.length)
    } else {
      timer = setTimeout(() => {
        setDisplay(prev =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        )
      }, deleting ? deleteSpeed : speed)
    }
    return () => clearTimeout(timer)
  }, [display, deleting, idx, texts, speed, deleteSpeed, pause])

  return (
    <span>
      {display}
      <span className="inline-block w-0.5 h-5 bg-purple-400 ml-0.5 align-middle animate-blink" />
    </span>
  )
}
