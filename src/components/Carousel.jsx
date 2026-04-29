import { useEffect, useMemo, useRef, useState } from 'react'

function clampIndex(i, length) {
  if (length <= 0) return 0
  const m = i % length
  return m < 0 ? m + length : m
}

export function Carousel({ items, ariaLabel, renderItem, autoplayMs = 0 }) {
  const [index, setIndex] = useState(0)
  const length = items?.length ?? 0
  const idBase = useMemo(() => `cr-${Math.random().toString(36).slice(2, 9)}`, [])
  const timerRef = useRef(null)

  useEffect(() => {
    if (!autoplayMs || length <= 1) return
    timerRef.current = window.setInterval(() => {
      setIndex((v) => clampIndex(v + 1, length))
    }, autoplayMs)
    return () => window.clearInterval(timerRef.current)
  }, [autoplayMs, length])

  useEffect(() => {
    if (index >= length) setIndex(0)
  }, [index, length])

  const canNav = length > 1
  const goPrev = () => setIndex((v) => clampIndex(v - 1, length))
  const goNext = () => setIndex((v) => clampIndex(v + 1, length))

  return (
    <div className="carousel" aria-label={ariaLabel}>
      <div className="carousel-top">
        <div className="carousel-controls">
          <button className="icon-chip" type="button" onClick={goPrev} disabled={!canNav} aria-label="Previous">
            ‹
          </button>
          <button className="icon-chip" type="button" onClick={goNext} disabled={!canNav} aria-label="Next">
            ›
          </button>
        </div>
        <div className="carousel-dots" aria-label="Carousel dots">
          {items.map((_, i) => {
            const active = i === index
            return (
              <button
                key={`${idBase}-${i}`}
                type="button"
                className={`dot ${active ? 'is-active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={active ? 'true' : 'false'}
                onClick={() => setIndex(i)}
              />
            )
          })}
        </div>
      </div>

      <div className="carousel-viewport">
        <div className="carousel-track" style={{ transform: `translateX(${index * -100}%)` }}>
          {items.map((item, i) => (
            <div className="carousel-slide" key={`${idBase}-slide-${i}`}>
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

