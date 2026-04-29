import { useEffect } from 'react'

export function AuthModal({ onClose }) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-header">
          <button className="auth-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
              <path d="m20 16 10.6-10.6a2.8 2.8 0 1 0-4-4L16 12 5.4 1.4a2.8 2.8 0 1 0-4 4L12 16 1.4 26.6a2.8 2.8 0 1 0 4 4L16 20l10.6 10.6a2.8 2.8 0 1 0 4-4L20 16z" />
            </svg>
          </button>
          <div className="auth-title">Log in or sign up</div>
        </div>

        <div className="auth-body">
          <h2 className="auth-heading">Welcome to VoyageVista</h2>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="auth-input-group">
              <div className="auth-input-wrapper" style={{ borderBottom: '1px solid var(--border)' }}>
                <label className="auth-label" htmlFor="countryCode">Country/Region</label>
                <select id="countryCode" className="auth-input" style={{ cursor: 'pointer', appearance: 'none' }}>
                  <option value="+91">India (+91)</option>
                  <option value="+1">United States (+1)</option>
                  <option value="+44">United Kingdom (+44)</option>
                  <option value="+61">Australia (+61)</option>
                </select>
                <svg viewBox="0 0 32 32" width="12" height="12" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}>
                  <path d="M16 22 2 8h28z" />
                </svg>
              </div>
              <div className="auth-input-wrapper">
                <label className="auth-label" htmlFor="phoneNumber">Phone number</label>
                <input id="phoneNumber" className="auth-input" type="tel" placeholder=" " />
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.4 }}>
              We’ll call or text you to confirm your number. Standard message and data rates apply. <a href="#" style={{ color: 'var(--text)', fontWeight: 600, textDecoration: 'underline' }}>Privacy Policy</a>
            </p>

            <button className="auth-primary-btn" type="submit">
              Continue
            </button>
          </form>

          <div className="auth-divider">or</div>

          <button className="auth-social-btn" type="button">
            <svg className="auth-social-icon" viewBox="0 0 32 32">
              <path d="M16 32C7.16 32 0 24.84 0 16S7.16 0 16 0c4.32 0 8.35 1.7 11.4 4.75l-4.57 4.54C21.08 7.56 18.66 6.5 16 6.5c-5.26 0-9.5 4.24-9.5 9.5s4.24 9.5 9.5 9.5c4.76 0 8.5-3.3 9.35-7.75H16v-6.5h16v1.94c0 8.68-6.17 15.31-16 15.31z" fill="#4285F4"/>
            </svg>
            <span>Continue with Google</span>
            <div style={{ width: 20 }}></div>
          </button>

          <button className="auth-social-btn" type="button">
            <svg className="auth-social-icon" viewBox="0 0 32 32">
              <path d="M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0zm4.5 24H12v-1.5h8.5V24zm2-3.5H9.5v-1.5h13v1.5zm0-3.5H9.5v-1.5h13v1.5zm0-3.5H9.5V12h13v1.5z" fill="#333"/>
            </svg>
            <span>Continue with Apple</span>
            <div style={{ width: 20 }}></div>
          </button>

          <button className="auth-social-btn" type="button">
            <svg className="auth-social-icon" viewBox="0 0 32 32">
              <path d="M3 8l13 9 13-9v16H3V8zm0-3h26v1.5L16 15.5 3 6.5V5z" fill="#333"/>
            </svg>
            <span>Continue with email</span>
            <div style={{ width: 20 }}></div>
          </button>
        </div>
      </div>
    </div>
  )
}
