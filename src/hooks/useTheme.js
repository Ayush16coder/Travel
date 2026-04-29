import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'vv.theme'

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
}

export function useTheme() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const options = useMemo(
    () => [
      { id: 'light', label: 'Light' },
      { id: 'ocean', label: 'Ocean' },
      { id: 'night', label: 'Night' },
    ],
    [],
  )

  return { theme, setTheme, options }
}

