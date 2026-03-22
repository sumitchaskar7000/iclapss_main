import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { Icon } from './Icons'

const LINKS = [
  { label: 'Home',     page: 'home' },
  { label: 'Services', page: 'services' },
  { label: 'Projects', page: 'projects' },
  { label: 'Blog',     page: 'blog' },
  { label: 'About',    page: 'about' },
  { label: 'Contact',  page: 'contact' },
]

export default function Navbar() {
  const { page, navigate, mobileOpen, setMobileOpen } = useApp()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const linkColor = '#000000'
  const textColor = '#000000'
  const brandColor = '#1A56DB'
  const brandBg = '#1A56DB'
  const brandBorder = 'none'

  const handleNavigate = (target) => {
    navigate(target)
    setMobileOpen(false)
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          color: textColor,
          background: scrolled ? 'rgba(255,255,255,.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,.07)' : 'none',
          transition: 'all .3s ease',
        }}
        aria-label="Main navigation"
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
            aria-label="Go to home"
          >
              <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: brandBg,
                border: brandBorder,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all .3s',
              }}
            >
              <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 800, color: '#000000' }}>iC</span>
            </div>
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 19, fontWeight: 800, color: brandColor, letterSpacing: '-.02em', transition: 'color .3s' }}>
              iClapss
            </span>
          </button>

          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {LINKS.map(({ label, page: pg }) => (
              <button
                type="button"
                key={pg}
                onClick={() => handleNavigate(pg)}
                style={{
                  padding: '8px 14px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: page === pg ? '#1A56DB' : linkColor,
                  borderRadius: 8,
                  transition: 'color .3s, background .3s',
                  position: 'relative',
                }}
                aria-current={page === pg ? 'page' : undefined}
              >
                {label}
                {page === pg && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 18,
                      height: 2,
                      background: '#1A56DB',
                      borderRadius: 999,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a href="tel:7666519682" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', color: linkColor, fontSize: 13, fontWeight: 500, fontFamily: "'Plus Jakarta Sans',sans-serif", borderRadius: 8, transition: 'color .3s' }}>
              <Icon name="phone" size={14} color={scrolled ? '#1A56DB' : '#fff'} />
              76665 19682
            </a>
            <button type="button" onClick={() => handleNavigate('contact')} className="btn btn-primary btn-sm">
              Free Audit
            </button>
          </div>

          <button
            type="button"
            className="nav-burger"
            onClick={() => setMobileOpen(true)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 8,
              background: scrolled ? 'var(--gray5)' : 'rgba(255,255,255,.12)',
              border: 'none',
              cursor: 'pointer',
              transition: 'background .2s, color .3s',
              color: textColor,
            }}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Icon name="menu" size={22} color="#000000" />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0A1628',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            padding: 24,
            overflowY: 'auto',
            animation: 'slideInRight .25s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#1A56DB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 800, color: '#000000' }}>iC</span>
              </div>
              <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 19, fontWeight: 800, color: '#000000' }}>iClapss</span>
            </div>
            <button type="button" onClick={() => setMobileOpen(false)} style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Close menu">
              <Icon name="close" size={20} color="#fff" />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            {LINKS.map(({ label, page: pg }, i) => (
              <button
                type="button"
                key={pg}
                onClick={() => handleNavigate(pg)}
                style={{
                  padding: '15px 18px',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  background: page === pg ? 'rgba(26,86,219,.2)' : 'transparent',
                  borderRadius: 10,
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: 18,
                  fontWeight: 600,
                  color: page === pg ? '#1A56DB' : '#000000',
                  transition: 'all .15s',
                  animation: `fadeUp .3s ease ${i * 0.05}s both`,
                }}
                aria-current={page === pg ? 'page' : undefined}
              >
                {label}
              </button>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 24, marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <a href="tel:7666519682" style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#000000', fontSize: 15 }}>
              <Icon name="phone" size={18} color="#1A56DB" />
              76665 19682
            </a>
            <a href="mailto:info@iclapss.com" style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#000000', fontSize: 15 }}>
              <Icon name="mail" size={18} color="#1A56DB" />
              info@iclapss.com
            </a>
            <button type="button" onClick={() => handleNavigate('contact')} className="btn btn-primary btn-full" style={{ marginTop: 8 }}>
              Get Free Strategy Audit
            </button>
          </div>
        </div>
      )}
    </>
  )
}