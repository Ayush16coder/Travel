import { useEffect } from 'react'

export function useHeaderShadow(attribute = 'data-scrolled', thresholdPx = 8) {
  useEffect(() => {
    const header = document.querySelector('[data-elevate-on-scroll="true"]')
    if (!header) return

    const onScroll = () => {
      header.setAttribute(attribute, window.scrollY > thresholdPx ? 'true' : 'false')
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [attribute, thresholdPx])
}

