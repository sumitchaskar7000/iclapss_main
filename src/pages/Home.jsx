import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icons'
import { SERVICES, STATS, TESTIMONIALS, PROCESS } from '../data'

/* ── reusable section header ── */
function SectionHeader({ tag, icon, title, sub, light }) {
  return (
    <div className="sec-hdr">
      <div
        className="badge"
        style={{
          marginBottom: 14,
          background: light ? 'rgba(255,255,255,.1)' : 'var(--blue-2)',
          color: light ? 'rgba(255,255,255,.85)' : 'var(--blue)',
          border: light ? '1px solid rgba(255,255,255,.2)' : '1px solid rgba(26,86,219,.2)',
        }}
      >
        {icon && <Icon name={icon} size={12} color={light ? '#93C5FD' : '#1A56DB'} />}
        {tag}
      </div>
      <h2
        className="h2"
        style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          color: light ? '#fff' : 'var(--text)',
          marginBottom: 14,
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {sub && (
        <p className="lead" style={{ color: light ? 'rgba(255,255,255,.6)' : 'var(--text3)' }}>
          {sub}
        </p>
      )}
    </div>
  )
}

/* ── service card on home ── */
function ServiceCard({ s }) {
  const { navigate } = useApp()
  return (
    <div
      className="card"
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
      onClick={() => navigate('service', s)}
    >
      <div className="svc-icon">
        <Icon name={s.icon} size={26} color="#1A56DB" />
      </div>
      <h3
        style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: 18, fontWeight: 700,
          color: 'var(--text)', marginBottom: 10,
        }}
      >
        {s.title}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.7, flex: 1, marginBottom: 18 }}>
        {s.short}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--blue)', fontSize: 13, fontWeight: 600, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
        Learn More <Icon name="arrow" size={14} color="#1A56DB" />
      </div>
    </div>
  )
}

export default function Home() {
  const { navigate, showToast } = useApp()
  const CLIENTS = ['TechNova', 'RetailMax', 'HealthFirst', 'Finedge', 'EduPath', 'GreenBuild', 'NovaSaaS', 'BrandAxis']

  return (
    <div>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <div
        style={{
          background: 'linear-gradient(135deg,#0A1628 0%,#0F2040 45%,#162E5A 100%)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: 68,
        }}
      >
        {/* grid bg */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(255,255,255,.03) 1px,transparent 0)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
        {/* glow blobs */}
        <div style={{ position: 'absolute', top: '15%', right: '-8%', width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle,rgba(26,86,219,.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '8%',  left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(14,165,233,.12) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: 'clamp(60px,8vw,100px) 24px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>

            <div
              className="badge badge-dark"
              style={{ marginBottom: 24, display: 'inline-flex' }}
            >
              <Icon name="lightning" size={12} color="#60A5FA" />
              Growth-First Digital Agency
            </div>

            <h1
              className="display"
              style={{ color: '#fff', marginBottom: 24 }}
            >
              Outgrow Your{' '}
              <span className="grad-text">Competitors.</span>
              <br />
              Scale Your Business.
            </h1>

            <p
              className="lead"
              style={{ color: 'rgba(255,255,255,.65)', maxWidth: 600, margin: '0 auto 40px', fontSize: 'clamp(15px,2vw,18px)' }}
            >
              iClapss is your full-service digital growth partner — Digital Marketing, Website Development, SEO, Content Writing, and B2B/B2C growth strategies that deliver measurable results.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
              <button onClick={() => navigate('contact')} className="btn btn-primary btn-lg">
                <Icon name="rocket" size={16} color="#fff" />
                Get Free Strategy Audit
              </button>
              <button onClick={() => navigate('projects')} className="btn btn-ghost btn-lg">
                View Our Work
                <Icon name="arrow" size={16} color="#fff" />
              </button>
            </div>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4,1fr)',
                gap: 1,
                background: 'rgba(255,255,255,.06)',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,.08)',
              }}
              className="hero-stats"
            >
              {STATS.map(s => (
                <div key={s.label} style={{ padding: 'clamp(18px,3vw,28px) 16px', textAlign: 'center', background: 'rgba(255,255,255,.03)' }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, color: '#60A5FA', lineHeight: 1, marginBottom: 6, letterSpacing: '-.02em' }}>
                    {s.num}
                  </div>
                  <div style={{ fontSize: 'clamp(11px,1.5vw,13px)', color: 'rgba(255,255,255,.5)', fontWeight: 500 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client logo marquee */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '18px 0', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
          <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,.3)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 14 }}>
            Trusted by growing businesses
          </p>
          <div style={{ display: 'flex', animation: 'marquee 22s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span
                key={i}
                style={{ padding: '0 32px', fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,.18)', fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: '.04em' }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          SERVICES OVERVIEW
      ════════════════════════════════ */}
      <div className="section" style={{ background: 'var(--gray6)' }}>
        <div className="container">
          <SectionHeader
            tag="What We Do"
            icon="lightning"
            title={`Everything You Need to <span style="color:#1A56DB">Grow</span>`}
            sub="From strategy to execution — we cover every channel that matters for your business growth."
          />
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}
            className="services-grid"
          >
            {SERVICES.map(s => <ServiceCard key={s.id} s={s} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <button onClick={() => navigate('services')} className="btn btn-outline">
              View All Services <Icon name="arrow" size={14} color="#1A56DB" />
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          WHY ICLAPSS (dark section)
      ════════════════════════════════ */}
      <div className="section" style={{ background: 'var(--dark)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,6vw,80px)', alignItems: 'center' }} className="why-grid">

            <div>
              <div className="badge badge-dark" style={{ marginBottom: 20 }}>
                <Icon name="target" size={12} color="#60A5FA" />
                Why iClapss
              </div>
              <h2
                className="h2"
                style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: '#fff', marginBottom: 20 }}
              >
                We Don&apos;t Just Market.{' '}
                <span style={{ color: '#60A5FA' }}>We Grow.</span>
              </h2>
              <p style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.8, marginBottom: 32 }}>
                Most agencies chase vanity metrics. We chase your revenue. Every strategy, every campaign, every piece of content is built around one goal: making your business outperform its competitors.
              </p>
              {[
                ['Revenue-First Approach', 'We report on revenue and leads — not impressions.'],
                ['B2B and B2C Specialists', 'Dedicated strategies for both business models.'],
                ['Competitor Intelligence', 'We analyse your rivals and build strategies to beat them.'],
                ['Transparent Reporting', 'Live dashboards. No black boxes. Ever.'],
              ].map(([title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#1A56DB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <Icon name="check" size={12} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: 13, color: '#64748B' }}>{desc}</div>
                  </div>
                </div>
              ))}
              <button onClick={() => navigate('about')} className="btn btn-primary" style={{ marginTop: 16 }}>
                About iClapss <Icon name="arrow" size={14} color="#fff" />
              </button>
            </div>

            {/* Metric cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { icon: 'trend',   val: '500%', label: 'Avg Organic Growth',       color: '#3B82F6' },
                { icon: 'target',  val: '4.8x', label: 'Avg Return on Ad Spend',   color: '#06B6D4' },
                { icon: 'users',   val: '200+', label: 'Businesses Grown',          color: '#8B5CF6' },
                { icon: 'shield',  val: '100%', label: 'Client Satisfaction',       color: '#10B981' },
              ].map(item => (
                <div key={item.val} className="card card-dark" style={{ padding: 24 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: `${item.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <Icon name={item.icon} size={22} color={item.color} />
                  </div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(26px,3vw,34px)', fontWeight: 800, color: item.color, letterSpacing: '-.02em', marginBottom: 4 }}>
                    {item.val}
                  </div>
                  <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>{item.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          PROCESS
      ════════════════════════════════ */}
      <div className="section">
        <div className="container">
          <SectionHeader
            tag="How We Work"
            icon="rocket"
            title={`Our <span style="color:#1A56DB">Growth Process</span>`}
            sub="A proven 4-step approach that delivers consistent, measurable results for every client."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="process-grid">
            {PROCESS.map((p, i) => (
              <div key={p.step} className="card" style={{ position: 'relative' }}>
                {i < PROCESS.length - 1 && (
                  <div
                    className="process-connector"
                    style={{ position: 'absolute', top: 34, right: -10, width: 20, height: 2, background: 'linear-gradient(to right,#1A56DB,transparent)', zIndex: 1 }}
                  />
                )}
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--blue-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 800, color: 'var(--blue)', marginBottom: 18 }}>
                  {p.step}
                </div>
                <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════ */}
      <div className="section" style={{ background: 'var(--gray6)' }}>
        <div className="container">
          <SectionHeader
            tag="Client Results"
            icon="star"
            title={`What Our Clients <span style="color:#1A56DB">Say</span>`}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }} className="testi-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="card">
                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Icon key={i} name="star" size={15} color="#F59E0B" />
                  ))}
                </div>
                <div style={{ marginBottom: 6 }}>
                  <Icon name="quote" size={20} color="#DBEAFE" />
                </div>
                <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 20 }}>
                  {t.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#1A56DB,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                    {t.init}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          CTA BANNER
      ════════════════════════════════ */}
      <div style={{ background: 'linear-gradient(135deg,#1A56DB 0%,#0EA5E9 100%)', padding: 'clamp(60px,8vw,96px) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2
            className="h2"
            style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: '#fff', marginBottom: 16 }}
          >
            Ready to Outgrow Your Competitors?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.8)', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Start with a free strategy audit. No commitment — just a clear picture of your growth opportunity.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('contact')} className="btn btn-white btn-lg">
              Get Free Audit <Icon name="arrow" size={16} color="#1A56DB" />
            </button>
            <a href="tel:7666519682" className="btn btn-ghost btn-lg">
              <Icon name="phone" size={16} color="#fff" />
              76665 19682
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div style={{ background: 'var(--dark)', padding: 'clamp(48px,7vw,80px) 0' }}>
        <div className="container" style={{ maxWidth: 560, textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 700, color: '#fff', marginBottom: 10 }}>
            Join the iClapss Newsletter
          </h2>
          <p style={{ fontSize: 14, color: '#64748B', marginBottom: 28 }}>
            Weekly growth tactics delivered to your inbox. No spam ever.
          </p>
          <div style={{ display: 'flex', gap: 0, maxWidth: 440, margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{ flex: 1, padding: '13px 16px', background: 'rgba(255,255,255,.06)', border: '1.5px solid rgba(255,255,255,.12)', borderRight: 'none', color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, outline: 'none', borderRadius: '8px 0 0 8px' }}
            />
            <button
              onClick={() => showToast('Subscribed! Check your inbox.')}
              className="btn btn-primary"
              style={{ borderRadius: '0 8px 8px 0', flexShrink: 0 }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-stats    { grid-template-columns: repeat(2,1fr) !important; }
          .services-grid { grid-template-columns: 1fr 1fr !important; }
          .why-grid      { grid-template-columns: 1fr !important; }
          .process-grid  { grid-template-columns: 1fr 1fr !important; }
          .testi-grid    { grid-template-columns: 1fr !important; }
          .process-connector { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-stats    { grid-template-columns: repeat(2,1fr) !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .process-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
