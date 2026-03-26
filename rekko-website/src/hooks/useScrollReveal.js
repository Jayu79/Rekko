import { useEffect, useRef } from 'react'

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    const children = el.querySelectorAll('.reveal')
    children.forEach((child) => observer.observe(child))

    if (el.classList.contains('reveal')) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [threshold])

  return ref
}

export function useCountUp(end, duration = 2000) {
  const ref = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted.current) {
            counted.current = true
            let start = 0
            const startTime = performance.now()

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              const current = Math.floor(eased * end)

              if (el) {
                el.textContent = current.toLocaleString('en-IN')
              }

              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }

            requestAnimationFrame(animate)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return ref
}
