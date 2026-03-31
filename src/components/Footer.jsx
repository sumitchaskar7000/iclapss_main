import { useApp } from '../context/AppContext'
import { Icon } from './Icons'

const COLS = [
  {
    title: 'Services',
    links: [
      ['Digital Marketing', 'services'],
      ['Website Development', 'services'],
      ['SEO and Growth', 'services'],
      ['Content Writing', 'services'],
      ['B2B Strategy', 'services'],
      ['B2C Marketing', 'services'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About Us', 'about'],
      ['Our Projects', 'projects'],
      ['Blog', 'blog'],
      ['Contact', 'contact'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Free SEO Audit', 'contact'],
      ['Growth Consultation', 'contact'],
      ['Case Studies', 'projects'],
    ],
  },
]

export default function Footer() {
  const { navigate, showToast } = useApp()

  return (
    <footer style={{ background: '#050D1A' }}>
      <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '72px 0 0' }}>
        <div className="container">

          {/* Top grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: 40,
              marginBottom: 56,
            }}
            className="footer-grid"
          >
            {/* Brand */}
            <div>
              <button
                onClick={() => navigate('home')}
                style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 18 }}
              >
                
                {/* ✅ ONLY LOGO CHANGED */}
                <img
                  src="/images/logo.svg"   // svg / png / jpg
                  alt="iClapss Logo"
                  style={{
                    width: 36,
                    height: 36,
                    objectFit: 'contain',
                    borderRadius: 8
                  }}
                />

                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: '#fff' }}>
                  iClapss
                </span>
              </button>

              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8, marginBottom: 22, maxWidth: 280 }}>
                Your growth partner for digital marketing, website development, SEO, and content. We help B2B and B2C businesses outgrow their competitors.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href="tel:7666519682"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94A3B8', fontSize: 14, transition: 'color .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#60A5FA' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8' }}
                >
                  <Icon name="phone" size={14} color="#1A56DB" />
                  76665 19682
                </a>

                <a
                  href="mailto:info@iclapss.com"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94A3B8', fontSize: 14, transition: 'color .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#60A5FA' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8' }}
                >
                  <Icon name="mail" size={14} color="#1A56DB" />
                  info@iclapss.com
                </a>
              </div>
            </div>

            {/* Link columns */}
            {COLS.map(col => (
              <div key={col.title}>
                <h4
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '.07em',
                    textTransform: 'uppercase',
                    marginBottom: 18,
                  }}
                >
                  {col.title}
                </h4>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map(([label, pg]) => (
                    <li key={label}>
                      <button
                        onClick={() => navigate(pg)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          fontFamily: "'Plus Jakarta Sans',sans-serif",
                          fontSize: 14,
                          color: '#64748B',
                          transition: 'color .2s',
                          textAlign: 'left',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#E2E8F0' }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#64748B' }}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter bar */}
          <div
            style={{
              background: 'rgba(26,86,219,.08)',
              border: '1px solid rgba(26,86,219,.2)',
              borderRadius: 16,
              padding: 'clamp(24px,4vw,36px)',
              marginBottom: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                Get Free Growth Insights
              </h3>
              <p style={{ fontSize: 14, color: '#64748B' }}>
                Weekly strategies to grow faster than your competitors. No fluff.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 0, width: '100%', maxWidth: 380 }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,.06)',
                  border: '1.5px solid rgba(255,255,255,.12)',
                  borderRight: 'none',
                  color: '#fff',
                  fontSize: 14,
                  outline: 'none',
                  borderRadius: '8px 0 0 8px',
                }}
              />

              <button
                onClick={() => showToast('You are in! Check your inbox soon.')}
                className="btn btn-primary"
                style={{ borderRadius: '0 8px 8px 0' }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Bottom */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,.06)',
              padding: '22px 0 32px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ fontSize: 13, color: '#475569' }}>
              2025 iClapss Digital. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}