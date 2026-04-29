import { useState, useCallback } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CardRow } from './components/CardRow'
import { AuthModal } from './components/AuthModal'
import {
  trendingDestinations,
  weekendGetaways,
  honeymoonSpecials,
  filterChips,
  testimonials,
  whyChooseUs,
} from './content/homeContent'

function App() {
  const [activeCategory, setActiveCategory] = useState('packages')
  
  // State for liked items - shared across all sections
  const [trending, setTrending] = useState(trendingDestinations)
  const [getaways, setGetaways] = useState(weekendGetaways)
  const [honeymoon, setHoneymoon] = useState(honeymoonSpecials)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showPerNight, setShowPerNight] = useState(false)
  const [chatTooltip, setChatTooltip] = useState(true)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const toggleLike = useCallback((setter) => (id) => {
    setter((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    )
  }, [])

  const filteredTrending = activeFilter === 'all'
    ? trending : trending.filter((d) => d.tags?.includes(activeFilter))
  const filteredGetaways = activeFilter === 'all'
    ? getaways : getaways.filter((d) => d.tags?.includes(activeFilter))
  const filteredHoneymoon = activeFilter === 'all'
    ? honeymoon : honeymoon.filter((d) => d.tags?.includes(activeFilter))

  return (
    <>
      <div id="top" />
      <Header 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        onOpenAuth={() => setShowAuthModal(true)}
      />

      {/* Filter Chips Row */}
      <div className="filter-section">
        <div className="container">
          <div className="filter-row">
            {filterChips.map((chip) => (
              <button
                key={chip.id}
                className={`filter-chip ${activeFilter === chip.id ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveFilter(chip.id)}
              >
                {chip.label}
              </button>
            ))}
            <div className="price-toggle">
              <span className="price-toggle-label">Show:</span>
              <button
                className={`price-toggle-btn ${!showPerNight ? 'active' : ''}`}
                type="button" onClick={() => setShowPerNight(false)}
              >Total</button>
              <button
                className={`price-toggle-btn ${showPerNight ? 'active' : ''}`}
                type="button" onClick={() => setShowPerNight(true)}
              >Per night</button>
            </div>
          </div>
        </div>
      </div>

      <main id="main">
        {filteredTrending.length > 0 && (
          <div id="trending">
            <CardRow title="Trending destinations" items={filteredTrending}
              onToggleLike={toggleLike(setTrending)} showPerNight={showPerNight} />
          </div>
        )}

        <div className="price-banner">
          <div className="price-banner-inner">
            <span className="price-banner-icon">🏷️</span>
            Prices include all fees & taxes
          </div>
        </div>

        {filteredGetaways.length > 0 && (
          <div id="getaways">
            <CardRow title="Weekend getaways nearby" items={filteredGetaways}
              onToggleLike={toggleLike(setGetaways)} showPerNight={showPerNight} />
          </div>
        )}

        {filteredHoneymoon.length > 0 && (
          <div id="honeymoon">
            <CardRow title="Honeymoon specials" items={filteredHoneymoon}
              onToggleLike={toggleLike(setHoneymoon)} showPerNight={showPerNight} />
          </div>
        )}

        {/* Testimonials */}
        <section className="testimonials-section">
          <div className="container">
            <div className="testimonials-header">
              <h2>What our travelers say</h2>
              <p>Real reviews from verified travelers across the globe</p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((t) => (
                <div className="testimonial-card" key={t.id}>
                  <div className="testimonial-stars">
                    {Array.from({ length: t.rating }, (_, i) => <span key={i}>★</span>)}
                  </div>
                  <p className="testimonial-quote">"{t.quote}"</p>
                  <div className="testimonial-author">
                    <img className="testimonial-avatar" src={t.avatar} alt={t.name} loading="lazy" />
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-meta">{t.location} · {t.trip}</div>
                      {t.verified && <span className="testimonial-badge">✓ Verified</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-section">
          <div className="container">
            <div className="why-header">
              <h2>Why choose VoyageVista</h2>
              <p>Travel with confidence knowing you're in good hands</p>
            </div>
            <div className="why-grid">
              {whyChooseUs.map((item) => (
                <div className="why-card" key={item.id}>
                  <span className="why-icon">{item.icon}</span>
                  <h3 className="why-title">{item.title}</h3>
                  <p className="why-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter-section">
          <div className="container">
            <div className="newsletter-inner">
              <h2>🔒 Get secret deals sent to your inbox</h2>
              <p>Join 50,000+ travelers who get exclusive prices and insider tips.</p>
              {subscribed ? (
                <p style={{ color: 'var(--success)', fontWeight: 700 }}>✓ You're in! Check your inbox.</p>
              ) : (
                <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true) }}>
                  <input className="newsletter-input" type="email" placeholder="Enter your email"
                    value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <button className="newsletter-btn" type="submit">Subscribe</button>
                </form>
              )}
              <div className="newsletter-trust">
                <span>🔒 No spam</span><span>📩 Weekly deals</span><span>🚫 Unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Chat Bubble */}
      <div className="chat-bubble">
        {chatTooltip && (
          <div className="chat-tooltip">
            Need help? Chat with us! 💬
            <button type="button" className="chat-dismiss" onClick={() => setChatTooltip(false)}>✕</button>
          </div>
        )}
        <button className="chat-btn" type="button" aria-label="Chat on WhatsApp"
          onClick={() => window.open('https://wa.me/1234567890', '_blank')}>💬</button>
      </div>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  )
}

export default App
