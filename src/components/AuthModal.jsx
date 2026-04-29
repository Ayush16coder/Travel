import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export function AuthModal({ onClose }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState(null) // { type: 'error' | 'success', msg: '' }

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password || (isSignUp && !name)) {
      setStatus({ type: 'error', msg: 'Please fill in all fields.' })
      return
    }

    if (!isValidEmail(email)) {
      setStatus({ type: 'error', msg: 'Please enter a valid email address.' })
      return
    }
    
    setStatus({ type: 'success', msg: isSignUp ? 'Creating account...' : 'Logging in...' })
    
    try {
      if (isSignUp) {
        // Sign up with Supabase
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        })
        
        if (error) throw error

        if (data.user && data.user.identities && data.user.identities.length === 0) {
           setStatus({ type: 'error', msg: 'This email is already registered.' })
           return
        }

        // Insert into public.users database table
        if (data?.user) {
          const { error: dbError } = await supabase
            .from('users')
            .insert([{ 
              id: data.user.id, 
              name: name, 
              email: email 
            }])
            
          if (dbError) {
             console.error('Error inserting into users table:', dbError)
             // Not throwing because the auth account was still created successfully
          }
        }
        
        setStatus({ type: 'success', msg: 'Check your email for the confirmation link!' })
      } else {
        // Log in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (error) throw error
        
        setStatus({ type: 'success', msg: 'Logged in successfully! Redirecting...' })
        setTimeout(() => {
          onClose()
        }, 1000)
      }
    } catch (error) {
      let errorMsg = error.message || 'An error occurred. Please try again.'
      
      // Handle specific Supabase auth errors
      if (errorMsg.toLowerCase().includes('email not confirmed')) {
        errorMsg = 'Please verify your email address before logging in. Check your inbox!'
      } else if (errorMsg.toLowerCase().includes('invalid login credentials')) {
        errorMsg = 'Incorrect email or password.'
      }

      setStatus({ type: 'error', msg: errorMsg })
    }
  }

  const handleOAuthLogin = async (provider) => {
    setStatus({ type: 'success', msg: `Connecting to ${provider}...` })
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
      })
      if (error) throw error
    } catch (error) {
      setStatus({ type: 'error', msg: error.message })
    }
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-header">
          <button className="auth-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
              <path d="m20 16 10.6-10.6a2.8 2.8 0 1 0-4-4L16 12 5.4 1.4a2.8 2.8 0 1 0-4 4L12 16 1.4 26.6a2.8 2.8 0 1 0 4 4L16 20l10.6 10.6a2.8 2.8 0 1 0 4-4L20 16z" />
            </svg>
          </button>
          <div className="auth-title">{isSignUp ? 'Sign up' : 'Log in'}</div>
          <div></div>
        </div>

        <div className="auth-body">
          <h2 className="auth-heading">Welcome to VoyageVista</h2>

          <form onSubmit={handleSubmit}>
            <div className="auth-input-group email-flow">
              {isSignUp && (
                <div className="auth-input-wrapper top-rounded">
                  <input 
                    id="name" 
                    className="auth-input" 
                    type="text" 
                    placeholder=" " 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className="auth-label" htmlFor="name">Full name</label>
                </div>
              )}
              <div className={`auth-input-wrapper ${isSignUp ? '' : 'top-rounded'}`}>
                <input 
                  id="email" 
                  className="auth-input" 
                  type="email" 
                  placeholder=" " 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="auth-label" htmlFor="email">Email</label>
              </div>
              <div className="auth-input-wrapper bottom-rounded">
                <input 
                  id="password" 
                  className="auth-input" 
                  type="password" 
                  placeholder=" " 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="auth-label" htmlFor="password">Password</label>
              </div>
            </div>

            {status && (
              <div className={status.type === 'error' ? 'auth-error' : 'auth-success'}>
                {status.type === 'error' ? '⚠️' : '✅'} {status.msg}
              </div>
            )}

            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '16px 0 24px', lineHeight: 1.4 }}>
              We'll send you trip updates and receipts. By continuing, you agree to VoyageVista's <a href="#" style={{ color: 'var(--text)', fontWeight: 600, textDecoration: 'underline' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--text)', fontWeight: 600, textDecoration: 'underline' }}>Privacy Policy</a>.
            </p>

            <button className="auth-primary-btn" type="submit">
              Continue
            </button>
          </form>

          <div className="auth-switch-mode">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button 
              className="auth-switch-btn" 
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setStatus(null); }}
            >
              {isSignUp ? 'Log in' : 'Sign up'}
            </button>
          </div>

          <div className="auth-divider">or</div>

          <button className="auth-social-btn" type="button" onClick={() => handleOAuthLogin('google')}>
            <svg className="auth-social-icon" viewBox="0 0 32 32" width="20" height="20">
              <path d="M16 32C7.16 32 0 24.84 0 16S7.16 0 16 0c4.32 0 8.35 1.7 11.4 4.75l-4.57 4.54C21.08 7.56 18.66 6.5 16 6.5c-5.26 0-9.5 4.24-9.5 9.5s4.24 9.5 9.5 9.5c4.76 0 8.5-3.3 9.35-7.75H16v-6.5h16v1.94c0 8.68-6.17 15.31-16 15.31z" fill="#4285F4"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <button className="auth-social-btn" type="button" onClick={() => handleOAuthLogin('apple')}>
            <svg className="auth-social-icon" viewBox="0 0 32 32" width="20" height="20">
              <path d="M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0zm4.5 24H12v-1.5h8.5V24zm2-3.5H9.5v-1.5h13v1.5zm0-3.5H9.5v-1.5h13v1.5zm0-3.5H9.5V12h13v1.5z" fill="#333"/>
            </svg>
            <span>Continue with Apple</span>
          </button>

          <button className="auth-social-btn" type="button" onClick={() => { setIsSignUp(!isSignUp); setStatus(null); }}>
            <svg className="auth-social-icon" viewBox="0 0 32 32" width="20" height="20">
              <path d="M3 8l13 9 13-9v16H3V8zm0-3h26v1.5L16 15.5 3 6.5V5z" fill="#333"/>
            </svg>
            <span>Continue with email</span>
          </button>
        </div>
      </div>
    </div>
  )
}
