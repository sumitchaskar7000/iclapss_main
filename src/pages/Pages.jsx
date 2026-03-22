import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icons'
import { SERVICES, PROJECTS, BLOGS, TESTIMONIALS, FAQS } from '../data'

/* ─────────────────────────────────────────────
   SHARED HELPERS
───────────────────────────────────────────── */

function PageHero({ tag, title, sub, dark }) {
  return (
    <div
      style={{
        background: dark
          ? 'linear-gradient(135deg,#0A1628 0%,#0F2040 100%)'
          : 'linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 100%)',
        padding: 'clamp(80px,10vw,120px) 0 clamp(56px,7vw,96px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {dark && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(255,255,255,.03) 1px,transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      )}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="badge"
          style={{
            marginBottom: 18,
            display: 'inline-flex',
            background: dark ? 'rgba(26,86,219,.28)' : '#DBEAFE',
            color:      dark ? '#93C5FD' : '#1A56DB',
            border:     dark ? '1px solid rgba(59,130,246,.3)' : '1px solid rgba(26,86,219,.2)',
          }}
        >
          {tag}
        </div>
        <h1
          className="h1"
          style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            color: dark ? '#fff' : 'var(--text)',
            marginBottom: 16,
          }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {sub && (
          <p
            className="lead"
            style={{
              color: dark ? 'rgba(255,255,255,.6)' : 'var(--text3)',
              maxWidth: 580,
              margin: '0 auto',
            }}
          >
            {sub}
          </p>
        )}
      </div>
    </div>
  )
}

function FAQItem({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false)
  return (
    <div style={{ borderBottom: '1px solid var(--gray4)', marginBottom: 2 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '18px 0',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontSize: 15, fontWeight: 600,
            color: open ? '#1A56DB' : 'var(--text)', lineHeight: 1.4,
          }}
        >
          {q}
        </span>
        <div
          style={{
            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
            background: open ? '#1A56DB' : 'var(--gray5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all .22s', transform: open ? 'rotate(45deg)' : 'none',
          }}
        >
          <Icon name="plus" size={14} color={open ? '#fff' : '#475569'} />
        </div>
      </button>
      {open && (
        <div
          style={{
            fontSize: 14, color: 'var(--text3)', lineHeight: 1.8,
            paddingBottom: 20, paddingRight: 44,
            animation: 'fadeUp .2s ease',
          }}
        >
          {a}
        </div>
      )}
    </div>
  )
}

/* ═════════════════════════════════════════════
   SERVICES PAGE
═════════════════════════════════════════════ */
export function Services() {
  const { navigate } = useApp()
  return (
    <div>
      <PageHero
        dark
        tag="What We Do"
        title={`All Our <span style="color:#60A5FA">Services</span>`}
        sub="Full-service digital growth — every channel, every strategy, all under one roof."
      />

      <div className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
            {SERVICES.map((s, i) => (
              <div key={s.id} className="svc-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
                {/* Text side — swap visual order on alternating rows using CSS order */}
                <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                  <div className="svc-icon" style={{ marginBottom: 18 }}>
                    <Icon name={s.icon} size={28} color="#1A56DB" />
                  </div>
                  <h2 className="h2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 14, color: 'var(--text)' }}>
                    {s.title}
                  </h2>
                  <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.8, marginBottom: 26 }}>{s.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 28 }} className="feat-grid">
                    {s.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text2)', fontWeight: 500 }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--blue-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          <Icon name="check" size={10} color="#1A56DB" />
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => navigate('contact')} className="btn btn-primary">
                    Get Started <Icon name="arrow" size={14} color="#fff" />
                  </button>
                </div>

                {/* Results card */}
                <div style={{ order: i % 2 === 1 ? 1 : 2, background: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)', borderRadius: 20, padding: 'clamp(24px,4vw,36px)', border: '1px solid #BFDBFE' }}>
                  <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, fontWeight: 700, color: '#1A56DB', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 20 }}>
                    Results We Deliver
                  </h4>
                  {s.results.map((r, ri) => (
                    <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: ri < s.results.length - 1 ? '1px solid #BFDBFE' : 'none' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: '#1A56DB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 700, color: '#fff' }}>
                        {ri + 1}
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 600, fontFamily: "'Plus Jakarta Sans',sans-serif", color: 'var(--text)' }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .svc-row { grid-template-columns: 1fr !important; gap: 28px !important; }
          .svc-row > div { order: unset !important; }
          .feat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

/* ═════════════════════════════════════════════
   SERVICE DETAIL PAGE
═════════════════════════════════════════════ */
export function ServiceDetail() {
  const { activeService: s, navigate } = useApp()
  if (!s) {
    return (
      <div className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="h2" style={{ marginBottom: 16 }}>Service not available</h2>
          <p className="lead" style={{ marginBottom: 24 }}>Please go back and choose a service to view details.</p>
          <button onClick={() => navigate('services')} className="btn btn-primary">Browse Services</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHero
        dark
        tag={s.title}
        title={s.title + ` <span style="color:#60A5FA">Services</span>`}
        sub={s.short}
      />

      <div className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'start' }} className="svc-detail-layout">

            <div>
              <h2 className="h3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 18 }}>How We Do It</h2>
              <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.9, marginBottom: 30 }}>{s.desc}</p>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 18 }}>
                What&apos;s Included
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }} className="feat-grid">
                {s.features.map(f => (
                  <div key={f} className="card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--blue-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name="check" size={11} color="#1A56DB" />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text2)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('contact')} className="btn btn-primary btn-lg">
                Start With a Free Audit <Icon name="arrow" size={16} color="#fff" />
              </button>
            </div>

            <div style={{ position: 'sticky', top: 96 }}>
              <div style={{ background: 'linear-gradient(135deg,#0A1628,#0F2040)', borderRadius: 20, padding: 28, marginBottom: 18 }}>
                <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 18 }}>
                  Results We Deliver
                </h4>
                {s.results.map(r => (
                  <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                    <Icon name="check" size={15} color="#60A5FA" />
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#E2E8F0' }}>{r}</span>
                  </div>
                ))}
              </div>
              <div className="card" style={{ background: 'var(--blue-xl)', border: '1px solid #BFDBFE' }}>
                <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 14, fontWeight: 500 }}>Ready to get started?</p>
                <a href="tel:7666519682" className="btn btn-primary btn-full" style={{ marginBottom: 10 }}>
                  <Icon name="phone" size={14} color="#fff" /> 76665 19682
                </a>
                <a href="mailto:info@iclapss.com" className="btn btn-outline btn-full">
                  <Icon name="mail" size={14} color="#1A56DB" /> info@iclapss.com
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .svc-detail-layout { grid-template-columns: 1fr !important; }
          .svc-detail-layout > div:last-child { position: static !important; }
          .feat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

/* ═════════════════════════════════════════════
   PROJECTS PAGE
═════════════════════════════════════════════ */
export function Projects() {
  const { navigate } = useApp()
  const [filter, setFilter] = useState('All')
  const cats    = ['All', ...new Set(PROJECTS.map(p => p.cat))]
  const visible = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === filter)

  return (
    <div>
      <PageHero
        dark
        tag="Our Work"
        title={`Projects That <span style="color:#60A5FA">Delivered</span>`}
        sub="Real results for real businesses. See how we have helped companies outgrow their competitors."
      />

      <div className="section">
        <div className="container">
          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  padding: '8px 20px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 600,
                  background: filter === c ? '#1A56DB' : 'var(--gray5)',
                  color:      filter === c ? '#fff'     : '#475569',
                  transition: 'all .2s',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="proj-grid">
            {visible.map(p => (
              <div
                key={p.id}
                className="card"
                style={{ overflow: 'hidden', padding: 0, cursor: 'pointer' }}
                onClick={() => navigate('contact')}
              >
                <div
                  style={{
                    background: `${p.color}18`, padding: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderBottom: '1px solid var(--gray4)',
                  }}
                >
                  <span style={{ fontSize: 52 }}>{p.emoji}</span>
                </div>
                <div style={{ padding: 24 }}>
                  <span className="badge badge-blue" style={{ marginBottom: 12 }}>{p.cat}</span>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 10, lineHeight: 1.4 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.7, marginBottom: 18 }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
                    {p.results.map(r => (
                      <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text2)', fontWeight: 600 }}>
                        <Icon name="check" size={13} color="#1A56DB" /> {r}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.tags.map(t => (
                      <span key={t} className="badge badge-blue" style={{ fontSize: 11, padding: '3px 9px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .proj-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .proj-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

/* ═════════════════════════════════════════════
   BLOG PAGE
═════════════════════════════════════════════ */
export function Blog() {
  const { navigate } = useApp()

  return (
    <div>
      <PageHero
        tag="Insights"
        title={`Growth Strategies <span style="color:#1A56DB">and Insights</span>`}
        sub="Actionable strategies, real case studies, and proven tactics to grow your business."
      />

      <div className="section">
        <div className="container">
          {/* Featured post */}
          <div
            className="card blog-featured"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, marginBottom: 48, padding: 0, overflow: 'hidden', cursor: 'pointer' }}
            onClick={() => navigate('blogpost', BLOGS[0])}
          >
            <div style={{ background: 'linear-gradient(135deg,#0A1628,#162E5A)', padding: 'clamp(36px,6vw,56px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 64, marginBottom: 14 }}>{BLOGS[0].emoji}</div>
                <span className="badge badge-dark">Featured Post</span>
              </div>
            </div>
            <div style={{ padding: 'clamp(28px,5vw,44px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="badge badge-blue" style={{ marginBottom: 16, display: 'inline-flex', width: 'fit-content' }}>
                {BLOGS[0].cat}
              </span>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(17px,2.5vw,24px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.35, marginBottom: 14 }}>
                {BLOGS[0].title}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.8, marginBottom: 22 }}>{BLOGS[0].excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--text3)', flexWrap: 'wrap' }}>
                <span>{BLOGS[0].date}</span>
                <span style={{ opacity: .5 }}>·</span>
                <span>{BLOGS[0].readTime}</span>
              </div>
            </div>
          </div>

          {/* Rest of posts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="blog-grid">
            {BLOGS.slice(1).map(post => (
              <div
                key={post.id}
                className="card"
                style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => navigate('blogpost', post)}
              >
                <div style={{ background: 'linear-gradient(135deg,var(--blue-xl),var(--blue-2))', padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--gray4)' }}>
                  <div style={{ fontSize: 40 }}>{post.emoji}</div>
                </div>
                <div style={{ padding: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span className="badge badge-blue" style={{ fontSize: 11 }}>{post.cat}</span>
                    <span style={{ fontSize: 11, color: 'var(--text3)' }}>{post.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--text)', lineHeight: 1.4, marginBottom: 10 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.7, marginBottom: 14 }}>{post.excerpt}</p>
                  <div style={{ fontSize: 11, color: 'var(--gray2)' }}>{post.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .blog-featured { grid-template-columns: 1fr !important; }
          .blog-grid     { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

/* ═════════════════════════════════════════════
   BLOG POST PAGE
═════════════════════════════════════════════ */
export function BlogPost() {
  const { activeBlog: post, navigate } = useApp()
  if (!post) {
    return (
      <div className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="h2" style={{ marginBottom: 16 }}>Blog post not found</h2>
          <p className="lead" style={{ marginBottom: 24 }}>Please return to the blog and select a post.</p>
          <button onClick={() => navigate('blog')} className="btn btn-primary">Back to Blog</button>
        </div>
      </div>
    )
  }

  const SECTIONS = [
    { heading: 'The Problem', body: 'Most businesses struggle with this exact challenge. Without the right strategy, efforts become expensive guessing games that burn budget without delivering results. Understanding the root cause is always the first step.' },
    { heading: 'Our Analysis', body: 'After deep analysis of our most successful client campaigns, we identified a clear pattern: businesses that win consistently have a documented strategy, the right tools, and a data-driven optimisation process that never stops.' },
    { heading: 'The Strategy', body: 'The winning strategy combines deep audience understanding with channel-specific tactics. We map the customer journey end-to-end, identify friction points, and build campaigns that address each stage of the funnel systematically.' },
    { heading: 'Implementation', body: 'Execution is where most agencies fall short. We run parallel tests, optimise within the first 72 hours of launch, and scale only what the data confirms is working. No gut feelings — only numbers.' },
    { heading: 'Results and Takeaways', body: 'Clients following this framework consistently see 3 to 5x improvements in their key metrics within 90 days. The key insight: consistency and data-driven iteration beat big creative swings every time.' },
  ]

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg,var(--blue-xl),var(--blue-2))', padding: 'clamp(80px,10vw,120px) 0 clamp(56px,7vw,96px)' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <button
            onClick={() => navigate('blog')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--blue)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24, fontFamily: "'Plus Jakarta Sans',sans-serif" }}
          >
            <Icon name="arrow" size={14} color="#1A56DB" style={{ transform: 'rotate(180deg)' }} />
            Back to Blog
          </button>
          <span className="badge badge-blue" style={{ marginBottom: 18, display: 'inline-flex' }}>{post.cat}</span>
          <h1 className="h1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 18 }}>{post.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--text3)', flexWrap: 'wrap' }}>
            <span>{post.date}</span>
            <span style={{ opacity: .4 }}>·</span>
            <span>{post.readTime}</span>
            <span style={{ opacity: .4 }}>·</span>
            <span>iClapss Team</span>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <p style={{ fontSize: 17, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 40 }}>{post.excerpt}</p>
          {SECTIONS.map(sec => (
            <div key={sec.heading} style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>
                {sec.heading}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.9 }}>{sec.body}</p>
            </div>
          ))}

          <div style={{ background: 'linear-gradient(135deg,var(--blue-xl),var(--blue-2))', borderRadius: 16, padding: 36, border: '1px solid #BFDBFE', textAlign: 'center', marginTop: 48 }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
              Want This Strategy for Your Business?
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text3)', marginBottom: 24 }}>
              Get a free, personalised audit and growth roadmap from our team.
            </p>
            <button onClick={() => navigate('contact')} className="btn btn-primary btn-lg">
              Get Free Audit <Icon name="arrow" size={14} color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═════════════════════════════════════════════
   ABOUT PAGE
═════════════════════════════════════════════ */
export function About() {
  const { navigate } = useApp()

  const team = [
    { init: 'IC', name: 'Founder and CEO',  role: 'Digital Strategist',      years: '8+ years' },
    { init: 'SE', name: 'Head of SEO',      role: 'Technical SEO Expert',    years: '6+ years' },
    { init: 'WD', name: 'Lead Developer',   role: 'Full-Stack Developer',    years: '7+ years' },
    { init: 'PM', name: 'Performance Lead', role: 'Paid Ads Specialist',     years: '5+ years' },
  ]

  const values = [
    { icon: 'target',   title: 'Revenue-First',         desc: 'Every decision is evaluated by one metric: does it grow your business?' },
    { icon: 'shield',   title: 'Radical Transparency',  desc: 'No black boxes. Live dashboards, honest reporting — always.' },
    { icon: 'trend',    title: 'Continuous Optimisation', desc: 'Daily monitoring, weekly optimisations, monthly strategy reviews.' },
    { icon: 'lightning',title: 'Speed to Results',      desc: 'From strategy to execution in days, not months.' },
    { icon: 'users',    title: 'Client Obsession',       desc: 'We treat your business with the same care as our own.' },
    { icon: 'chart',    title: 'Data Over Gut',          desc: 'We test, measure, and scale — never guess.' },
  ]

  return (
    <div>
      <PageHero
        dark
        tag="Who We Are"
        title={`Built for Your <span style="color:#60A5FA">Growth</span>`}
        sub="iClapss is a full-service digital growth agency obsessed with one thing: making your business outperform your competitors."
      />

      {/* Story */}
      <div className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,6vw,72px)', alignItems: 'center', marginBottom: 80 }} className="about-story">
            <div>
              <span className="badge badge-blue" style={{ marginBottom: 18 }}>Our Story</span>
              <h2 className="h2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 18 }}>
                Born from a Frustration with{' '}
                <span style={{ color: '#1A56DB' }}>Mediocre Agencies</span>
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.9, marginBottom: 16 }}>
                iClapss was founded with a single frustration: too many agencies overpromise and underdeliver. Clients were paying for reports full of vanity metrics while their actual businesses were stagnant.
              </p>
              <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.9, marginBottom: 24 }}>
                We built iClapss to be different. Every engagement is built around your revenue goals. Every decision is data-driven. Every rupee you invest is tracked to a business outcome. That is the iClapss promise.
              </p>
              <div style={{ padding: 24, background: 'var(--blue-xl)', borderRadius: 12, borderLeft: '4px solid #1A56DB', marginBottom: 28 }}>
                <p style={{ fontSize: 16, fontStyle: 'italic', color: 'var(--text2)', fontWeight: 500, lineHeight: 1.7 }}>
                  Our goal is simple: make every client business grow faster than their industry. If you are not growing, we are not doing our job.
                </p>
                <p style={{ fontSize: 13, color: 'var(--text3)', marginTop: 10 }}>— iClapss Founding Team</p>
              </div>
              <button onClick={() => navigate('contact')} className="btn btn-primary">
                Work With Us <Icon name="arrow" size={14} color="#fff" />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="about-stats">
              {[['200+', 'Clients Grown'], ['5+', 'Years Experience'], ['10Cr+', 'Revenue Generated'], ['100%', 'Client Retention']].map(([n, l]) => (
                <div key={l} className="card" style={{ textAlign: 'center', padding: 28 }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(24px,3vw,34px)', fontWeight: 800, color: '#1A56DB', marginBottom: 8, letterSpacing: '-.02em' }}>
                    {n}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text3)', fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="section" style={{ background: 'var(--gray6)' }}>
        <div className="container">
          <div className="sec-hdr">
            <span className="badge badge-blue" style={{ marginBottom: 14 }}>Our Values</span>
            <h2 className="h2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 14 }}>
              What We <span style={{ color: '#1A56DB' }}>Stand For</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="values-grid">
            {values.map(v => (
              <div key={v.title} className="card">
                <div className="svc-icon"><Icon name={v.icon} size={24} color="#1A56DB" /></div>
                <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{v.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="section">
        <div className="container">
          <div className="sec-hdr">
            <span className="badge badge-blue" style={{ marginBottom: 14 }}>Our Team</span>
            <h2 className="h2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 14 }}>
              The People Behind Your <span style={{ color: '#1A56DB' }}>Growth</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="team-grid">
            {team.map(m => (
              <div key={m.name} className="card" style={{ textAlign: 'center', padding: 28 }}>
                <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg,#1A56DB,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: '#fff' }}>
                  {m.init}
                </div>
                <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{m.name}</h4>
                <p style={{ fontSize: 12, color: '#1A56DB', fontWeight: 600, marginBottom: 6 }}>{m.role}</p>
                <p style={{ fontSize: 12, color: 'var(--text3)' }}>{m.years}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="section" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <div className="sec-hdr">
            <span className="badge badge-dark" style={{ marginBottom: 14 }}>Client Love</span>
            <h2 className="h2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: '#fff', marginBottom: 14 }}>
              What Our Clients <span style={{ color: '#60A5FA' }}>Say</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }} className="testi-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="card card-dark" style={{ padding: 28 }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                  {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" size={14} color="#F59E0B" />)}
                </div>
                <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 18 }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#1A56DB,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                    {t.init}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: '#E2E8F0' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-story  { grid-template-columns: 1fr !important; gap: 36px !important; }
          .about-stats  { grid-template-columns: 1fr 1fr !important; }
          .values-grid  { grid-template-columns: 1fr 1fr !important; }
          .team-grid    { grid-template-columns: 1fr 1fr !important; }
          .testi-grid   { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .values-grid { grid-template-columns: 1fr !important; }
          .team-grid   { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}

/* ═════════════════════════════════════════════
   CONTACT PAGE
═════════════════════════════════════════════ */
export function Contact() {
  const { showToast } = useApp()
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)

  function set(key) {
    return function(e) {
      setForm(function(prev) { return Object.assign({}, prev, { [key]: e.target.value }) })
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    showToast('Message sent! We will contact you within 2 hours.')
  }

  const contactItems = [
    { icon: 'phone', label: 'Call or WhatsApp', value: '76665 19682', href: 'tel:7666519682' },
    { icon: 'mail',  label: 'Email Us',          value: 'info@iclapss.com', href: 'mailto:info@iclapss.com' },
    { icon: 'map',   label: 'Response Time',     value: 'Within 2 business hours', href: null },
  ]

  const services = ['Digital Marketing', 'Website Development', 'SEO and Growth', 'Content Writing', 'B2B Growth Strategy', 'B2C Marketing', 'Full-Service Growth']
  const budgets  = ['Under 15,000', '15,000 to 30,000', '30,000 to 60,000', '60,000 to 1,00,000', '1,00,000+']

  return (
    <div>
      <PageHero
        dark
        tag="Contact Us"
        title={`Let&apos;s <span style="color:#60A5FA">Grow Together</span>`}
        sub="Tell us about your business and goals. We will get back within 2 hours with a free strategy audit."
      />

      <div className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 48, alignItems: 'start' }} className="contact-layout">

            {/* Left panel */}
            <div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>
                Get in Touch
              </h2>

              {contactItems.map(c => (
                <div key={c.label} style={{ display: 'flex', gap: 16, marginBottom: 18, padding: 20, background: 'var(--gray6)', borderRadius: 12, border: '1px solid var(--gray4)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--blue-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={c.icon} size={20} color="#1A56DB" />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 4 }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} style={{ fontSize: 16, fontWeight: 700, color: 'var(--blue)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{c.value}</a>
                      : <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{c.value}</div>
                    }
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 24 }}>
                <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
                  Quick Answers
                </h4>
                {FAQS.slice(0, 3).map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
              </div>
            </div>

            {/* Form */}
            <div className="card" style={{ padding: 'clamp(22px,4vw,40px)' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '44px 20px' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <Icon name="check" size={32} color="#10B981" />
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text3)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
                    Thank you for reaching out. Our team will contact you within 2 hours with a personalised growth strategy.
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>
                    Or call now:{' '}
                    <a href="tel:7666519682" style={{ color: 'var(--blue)' }}>76665 19682</a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
                    Free Strategy Audit
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text3)', marginBottom: 26 }}>
                    Fill in your details and get a free personalised growth audit within 24 hours.
                  </p>

                  {/* Row 1 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }} className="form-row">
                    {[
                      { key: 'name',    label: 'Full Name',         type: 'text',  req: true,  ph: 'Your Full Name' },
                      { key: 'email',   label: 'Email Address',     type: 'email', req: true,  ph: 'you@company.com' },
                      { key: 'phone',   label: 'Phone / WhatsApp',  type: 'tel',   req: true,  ph: '+91 76665 19682' },
                      { key: 'company', label: 'Company Name',      type: 'text',  req: false, ph: 'Your Company' },
                    ].map(({ key, label, type, req, ph }) => (
                      <div key={key}>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
                          {label}{req ? ' *' : ''}
                        </label>
                        <input className="input" type={type} placeholder={ph} required={req} value={form[key]} onChange={set(key)} />
                      </div>
                    ))}
                  </div>

                  {/* Row 2 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }} className="form-row">
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
                        Service Needed *
                      </label>
                      <select className="input" required value={form.service} onChange={set('service')}>
                        <option value="">Select a service</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
                        Monthly Budget
                      </label>
                      <select className="input" value={form.budget} onChange={set('budget')}>
                        <option value="">Select budget range</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
                      Tell Us About Your Goals
                    </label>
                    <textarea
                      className="input"
                      rows={4}
                      placeholder="What are your main growth challenges? What results are you looking for?"
                      value={form.message}
                      onChange={set('message')}
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-full btn-lg">
                    <Icon name="rocket" size={16} color="#fff" />
                    Send and Get Free Audit
                  </button>
                  <p style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'center', marginTop: 14 }}>
                    Or reach us:{' '}
                    <a href="tel:7666519682" style={{ color: 'var(--blue)', fontWeight: 600 }}>76665 19682</a>
                    {' · '}
                    <a href="mailto:info@iclapss.com" style={{ color: 'var(--blue)', fontWeight: 600 }}>info@iclapss.com</a>
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="section" style={{ background: 'var(--gray6)' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <div className="sec-hdr">
            <span className="badge badge-blue" style={{ marginBottom: 14 }}>FAQs</span>
            <h2 className="h2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 14 }}>
              Frequently Asked <span style={{ color: '#1A56DB' }}>Questions</span>
            </h2>
          </div>
          {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
