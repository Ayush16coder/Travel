import { brand } from '../content/homeContent'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col">
            <h3 className="footer-col-title">Popular Destinations</h3>
            <a href="#trending">Santorini</a>
            <a href="#trending">Bali</a>
            <a href="#trending">Dubai</a>
            <a href="#trending">Paris</a>
            <a href="#trending">Maldives</a>
          </div>
          <div className="footer-col">
            <h3 className="footer-col-title">Weekend Getaways</h3>
            <a href="#getaways">Goa</a>
            <a href="#getaways">Udaipur</a>
            <a href="#getaways">Munnar</a>
            <a href="#getaways">Manali</a>
            <a href="#getaways">Rishikesh</a>
          </div>
          <div className="footer-col">
            <h3 className="footer-col-title">{brand.name}</h3>
            <a href="#about">About us</a>
            <a href="#careers">Careers</a>
            <a href="#press">Press</a>
            <a href="#blog">Travel blog</a>
            <a href="#partner">Become a partner</a>
          </div>
          <div className="footer-col">
            <h3 className="footer-col-title">Support</h3>
            <a href="#help">Help center</a>
            <a href="#safety">Safety info</a>
            <a href="#cancellation">Cancellation policy</a>
            <a href="#insurance">Travel insurance</a>
            <a href="#accessibility">Accessibility</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            <span>© {year} {brand.name}, Inc.</span>
            <span className="footer-copy-dot">·</span>
            <a href="#privacy">Privacy</a>
            <span className="footer-copy-dot">·</span>
            <a href="#terms">Terms</a>
            <span className="footer-copy-dot">·</span>
            <a href="#sitemap">Sitemap</a>
          </div>
          <div className="footer-socials">
            <a className="footer-social-link" href="#instagram" aria-label="Instagram">📸 Instagram</a>
            <a className="footer-social-link" href="#twitter" aria-label="Twitter">🐦 Twitter</a>
            <a className="footer-social-link" href="#youtube" aria-label="YouTube">🎬 YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
