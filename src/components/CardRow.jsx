import { useRef, useState, useEffect, useCallback } from 'react'
import { DestinationCard } from './DestinationCard'

export function CardRow({ title, items, onToggleLike }) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  function scroll(direction) {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector('.dest-card')?.offsetWidth || 280
    const distance = (cardWidth + 18) * 2
    el.scrollBy({ left: direction === 'left' ? -distance : distance, behavior: 'smooth' })
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {title}
            <span className="section-title-arrow" aria-hidden="true">→</span>
          </h2>
          <div className="section-nav">
            <button
              className="nav-arrow"
              type="button"
              aria-label="Scroll left"
              disabled={!canScrollLeft}
              onClick={() => scroll('left')}
            >
              ‹
            </button>
            <button
              className="nav-arrow"
              type="button"
              aria-label="Scroll right"
              disabled={!canScrollRight}
              onClick={() => scroll('right')}
            >
              ›
            </button>
          </div>
        </div>

        <div className="cards-row-wrapper">
          <div className="cards-row" ref={scrollRef}>
            {items.map((item) => (
              <DestinationCard key={item.id} item={item} onToggleLike={onToggleLike} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
