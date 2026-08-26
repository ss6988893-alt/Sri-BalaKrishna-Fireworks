import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function InteractiveEffects() {
  const mouseX = useMotionValue(-120)
  const mouseY = useMotionValue(-120)
  const glowX = useSpring(mouseX, { stiffness: 160, damping: 24, mass: 0.45 })
  const glowY = useSpring(mouseY, { stiffness: 160, damping: 24, mass: 0.45 })
  const [isEnabled, setIsEnabled] = useState(false)
  const [isPointerActive, setIsPointerActive] = useState(false)
  const [ripples, setRipples] = useState([])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const updateEnabled = () => setIsEnabled(mediaQuery.matches)

    updateEnabled()
    mediaQuery.addEventListener('change', updateEnabled)
    return () => mediaQuery.removeEventListener('change', updateEnabled)
  }, [])

  useEffect(() => {
    if (!isEnabled) return undefined

    const handlePointerMove = (event) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
      setIsPointerActive(true)
    }
    const handlePointerLeave = () => setIsPointerActive(false)
    const handleClick = (event) => {
      const ripple = { id: `${Date.now()}-${event.clientX}-${event.clientY}`, x: event.clientX, y: event.clientY }
      setRipples((currentRipples) => [...currentRipples.slice(-4), ripple])
      window.setTimeout(() => {
        setRipples((currentRipples) => currentRipples.filter((item) => item.id !== ripple.id))
      }, 650)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('mouseleave', handlePointerLeave)
    window.addEventListener('click', handleClick, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('mouseleave', handlePointerLeave)
      window.removeEventListener('click', handleClick)
    }
  }, [isEnabled, mouseX, mouseY])

  if (!isEnabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <motion.span
        style={{ x: glowX, y: glowY }}
        animate={{ opacity: isPointerActive ? 1 : 0, scale: isPointerActive ? 1 : 0.7 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-2xl"
      />
      <motion.span
        style={{ x: glowX, y: glowY }}
        animate={{ opacity: isPointerActive ? 0.85 : 0, scale: isPointerActive ? 1 : 0.65 }}
        transition={{ duration: 0.16 }}
        className="absolute left-0 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/70 bg-white/10 shadow-[0_0_20px_rgba(212,167,44,0.45)]"
      />
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0.25, opacity: 0.8 }}
          animate={{ scale: 4.2, opacity: 0 }}
          transition={{ duration: 0.62, ease: 'easeOut' }}
          style={{ left: ripple.x, top: ripple.y }}
          className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/80 bg-gold/15"
        />
      ))}
    </div>
  )
}
