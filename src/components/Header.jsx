import { useState, useRef, useEffect } from 'react'
import { brand, navCategories } from '../content/homeContent'
import { useHeaderShadow } from '../hooks/useHeaderShadow'

export function Header({ activeCategory, setActiveCategory, onOpenAuth }) {
  useHeaderShadow()
  const [showWhereDropdown, setShowWhereDropdown] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [whereValue, setWhereValue] = useState('')
  const [flexibleDates, setFlexibleDates] = useState(false)
  
  const whereRef = useRef(null)
  const userMenuRef = useRef(null)
  const langMenuRef = useRef(null)

  const popularSearches = [
    { icon: '📍', text: 'Near me' },
    { icon: '🏖️', text: 'Goa, India' },
    { icon: '🗼', text: 'Paris, France' },
    { icon: '🏝️', text: 'Maldives' },
    { icon: '🌸', text: 'Tokyo, Japan' },
  ]

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setShowLangMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="site-header" data-elevate-on-scroll="true">
      {/* Row 1: Brand + Categories + Controls */}
      <div className="header-row-1">
        <div className="container header-inner">
          {/* Brand */}
          <a className="brand" href="#top" aria-label={`${brand.name} home`}>
            <svg className="brand-icon" viewBox="0 0 32 32" width="34" height="34">
              <defs>
                <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff385c" />
                  <stop offset="100%" stopColor="#e31c5f" />
                </linearGradient>
              </defs>
              <circle cx="16" cy="16" r="16" fill="url(#brandGrad)" />
              <path d="M16 7l2.5 6h6l-5 4 2 6-5.5-4-5.5 4 2-6-5-4h6z" fill="white" opacity="0.95"/>
            </svg>
            <span className="brand-name">{brand.name}</span>
          </a>

          {/* Center: Category Tabs */}
          <nav className="category-nav" aria-label="Categories">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="category-icon-wrap">
                  <span className="category-icon" aria-hidden="true">{cat.icon}</span>
                </span>
                <span className="category-label">{cat.label}</span>
                {cat.badge && <span className="category-badge">{cat.badge}</span>}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="header-right">
            <button className="become-host-btn" type="button">Become a partner</button>
            
            {/* Language/Currency Dropdown */}
            <div className="dropdown-container" ref={langMenuRef}>
              <button 
                className="globe-btn" 
                type="button" 
                aria-label="Language and Currency"
                onClick={() => setShowLangMenu(!showLangMenu)}
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path d="M8 .5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zM8 14A6 6 0 0 1 2.33 9.5h2.51A10.87 10.87 0 0 0 8 13.88a10.87 10.87 0 0 0 3.16-4.38h2.51A6 6 0 0 1 8 14zm0-9.88a10.87 10.87 0 0 0-3.16 4.38H2.33A6 6 0 0 1 8 2a6 6 0 0 1 5.67 6.5h-2.51A10.87 10.87 0 0 0 8 4.12z"/>
                </svg>
              </button>
              
              {showLangMenu && (
                <div className="dropdown-menu lang-menu">
                  <div className="dropdown-section">
                    <div className="dropdown-item active">English (IN)</div>
                    <div className="dropdown-item">English (US)</div>
                    <div className="dropdown-item">Español</div>
                    <div className="dropdown-item">Français</div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-section">
                    <div className="dropdown-item active">₹ INR</div>
                    <div className="dropdown-item">$ USD</div>
                    <div className="dropdown-item">€ EUR</div>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu Dropdown */}
            <div className="dropdown-container" ref={userMenuRef}>
              <button 
                className="user-menu-btn" 
                type="button" 
                aria-label="User menu"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="hamburger-icon" aria-hidden="true">
                  <span></span><span></span><span></span>
                </div>
                <div className="user-avatar" aria-hidden="true">
                  <svg viewBox="0 0 32 32" width="16" height="16" fill="white">
                    <path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 1 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.56 12.56 0 0 1 16 28.7z"/>
                  </svg>
                </div>
              </button>

              {showUserMenu && (
                <div className="dropdown-menu user-menu">
                  <div className="dropdown-item fw-bold" onClick={() => { setShowUserMenu(false); onOpenAuth(); }}>Sign up</div>
                  <div className="dropdown-item" onClick={() => { setShowUserMenu(false); onOpenAuth(); }}>Log in</div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item">Host your home</div>
                  <div className="dropdown-item">Host an experience</div>
                  <div className="dropdown-item">Help Center</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Search Bar */}
      <div className="header-row-2">
        <div className="container">
          <div className="search-bar-wrapper">
            <form className="search-bar" role="search" onSubmit={(e) => e.preventDefault()}>
              <div className="search-segment" style={{ position: 'relative' }}>
                <span className="search-segment-label">Where</span>
                <input
                  ref={whereRef}
                  className="search-segment-input"
                  type="text"
                  placeholder="Search destinations"
                  value={whereValue}
                  onChange={(e) => setWhereValue(e.target.value)}
                  onFocus={() => setShowWhereDropdown(true)}
                  onBlur={() => setTimeout(() => setShowWhereDropdown(false), 200)}
                />
                {showWhereDropdown && (
                  <div className="search-dropdown">
                    <div className="search-dropdown-title">Popular searches</div>
                    {popularSearches.map((s) => (
                      <div
                        key={s.text}
                        className="search-dropdown-item"
                        onMouseDown={() => { setWhereValue(s.text); setShowWhereDropdown(false) }}
                      >
                        <span className="search-dropdown-icon">{s.icon}</span>
                        {s.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="search-segment">
                <span className="search-segment-label">When</span>
                <span className="search-segment-value">
                  {flexibleDates ? "I'm flexible" : 'Add dates'}
                </span>
                <div className="flexible-toggle" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className={`flexible-switch ${flexibleDates ? 'on' : ''}`}
                    onClick={() => setFlexibleDates(!flexibleDates)}
                  />
                  <span>Flexible</span>
                </div>
              </div>

              <button className="search-segment" type="button">
                <span className="search-segment-label">Who</span>
                <span className="search-segment-value">Add guests</span>
              </button>

              <button className="search-submit" type="submit" aria-label="Search">
                <svg viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="white" strokeWidth="4">
                  <circle cx="13" cy="13" r="10" />
                  <line x1="20" y1="20" x2="29" y2="29" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}
