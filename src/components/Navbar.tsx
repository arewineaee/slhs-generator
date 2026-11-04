
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenDropdown(null)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <header className="navbar" ref={navRef}>
      <Link
        to="/"
        className="brand"
        onClick={() => setOpenDropdown(null)}
        aria-label="SLHS Jakarta Selatan - Beranda"
      >
        <span className="brand-icon">S</span>
        <span>SLHS JAKSEL</span>
      </Link>

      <nav className="nav-links" aria-label="Navigasi utama">
        <Link to="/" onClick={() => setOpenDropdown(null)}>
          Beranda
        </Link>

        <div className="nav-dropdown">
          <button
            type="button"
            className="nav-dropdown-trigger"
            aria-expanded={openDropdown === 'info'}
            onClick={() =>
              setOpenDropdown(openDropdown === 'info' ? null : 'info')
            }
          >
            Informasi <span className="dropdown-arrow">▾</span>
          </button>

          {openDropdown === 'info' && (
            <div className="dropdown-menu">
              <Link to="/#tentang" onClick={() => setOpenDropdown(null)}>
                Tentang SLHS
              </Link>
              <Link
                to="/persyaratan-prosedur"
                onClick={() => setOpenDropdown(null)}
              >
                Persyaratan
              </Link>
              <Link to="/faq" onClick={() => setOpenDropdown(null)}>
                FAQ
              </Link>
            </div>
          )}
        </div>

        <div className="nav-dropdown">
          <button
            type="button"
            className="nav-dropdown-trigger"
            aria-expanded={openDropdown === 'layanan'}
            onClick={() =>
              setOpenDropdown(openDropdown === 'layanan' ? null : 'layanan')
            }
          >
            Layanan <span className="dropdown-arrow">▾</span>
          </button>

          {openDropdown === 'layanan' && (
            <div className="dropdown-menu">
              <Link to="/generator" onClick={() => setOpenDropdown(null)}>
                Generator Logo SLHS
              </Link>
            </div>
          )}
        </div>

        <Link to="/#kontak" onClick={() => setOpenDropdown(null)}>
          Kontak
        </Link>

        <Link
          to="/generator"
          className="nav-cta"
          onClick={() => setOpenDropdown(null)}
        >
          Buat Logo SLHS <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
