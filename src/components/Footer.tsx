
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer" id="kontak">
      <div className="footer-main">
        <div className="footer-identity">
          <Link to="/" className="brand footer-brand">
            <span className="brand-icon">S</span>
            <span>SLHS JAKSEL</span>
          </Link>
          <p>
            Portal Informasi Sertifikat Laik Higiene Sanitasi
            <br />
            Suku Dinas Kesehatan Jakarta Selatan
          </p>
        </div>

        <div className="footer-contact">
          <h3>Kontak</h3>

          <div className="footer-contact-item">
            <span>➤</span>
            <p>Jl. Radio 1 No. 8, Kebayoran Baru, Jakarta Selatan, DKI Jakarta</p>
          </div>

          <div className="footer-contact-item">
            <span>☎</span>
            <p>Nomor telepon (placeholder)</p>
          </div>

          <div className="footer-contact-item">
            <span>✉</span>
            <p>Alamat email (placeholder)</p>
          </div>

          <div className="footer-contact-item">
            <span>🅾</span>
            <p>@sudinkes_jaksel</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Suku Dinas Kesehatan Jakarta Selatan</span>
        <span>Informasi resmi akan dilengkapi setelah diverifikasi.</span>
      </div>
    </footer>
  )
}

export default Footer
