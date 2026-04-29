import { useState } from 'react'

export function DestinationCard({ item, onToggleLike }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  const badgeClass = item.badge
    ? item.badge.toLowerCase() === 'premium'
      ? 'premium'
      : item.badge.toLowerCase() === 'trending'
        ? 'trending'
        : item.badge.toLowerCase() === 'adventure'
          ? 'adventure'
          : ''
    : ''

  return (
    <article className="dest-card" aria-label={item.title}>
      <div className="card-image-wrapper">
        <img
          className="card-image"
          src={item.image}
          alt={item.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
        />

        {/* Badge */}
        {item.badge && (
          <span className={`card-badge ${badgeClass}`}>{item.badge}</span>
        )}

        {/* Favorite button */}
        <button
          className={`card-fav ${item.liked ? 'liked' : ''}`}
          type="button"
          aria-label={item.liked ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => {
            e.stopPropagation()
            onToggleLike(item.id)
          }}
        >
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05A6.98 6.98 0 0 0 9 4C5.13 4 2 7.13 2 11c0 7 7 12.27 14 17z"
              fill={item.liked ? '#ff385c' : 'rgba(0,0,0,0.5)'}
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </button>

        {/* Image dots */}
        <div className="card-dots">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`card-dot ${i === 0 ? 'active' : ''}`} />
          ))}
        </div>
      </div>

      <div className="card-info">
        <div className="card-title-row">
          <span className="card-title">{item.title}</span>
          <span className="card-rating">
            <span className="card-star">★</span> {item.rating}
          </span>
        </div>
        <div className="card-price-row">
          <span className="card-price">{item.price}</span>
          <span className="card-duration">{item.duration}</span>
        </div>
      </div>
    </article>
  )
}
