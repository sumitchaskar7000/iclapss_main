import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════
   SHARED DEMO UI PRIMITIVES
═══════════════════════════════════════════════════ */

function TopBar({ color, title, subtitle, icon, rightEl }) {
  return (
    <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{icon}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{title}</div>
          {subtitle && <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      {rightEl}
    </div>
  )
}

function Sidebar({ items, active, onSelect, color }) {
  return (
    <div style={{ width: 52, background: '#0F172A', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12, gap: 4, flexShrink: 0 }}>
      {items.map(it => (
        <button key={it.id} onClick={() => onSelect(it.id)} title={it.label}
          style={{ width: 36, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, background: active === it.id ? color : 'transparent', transition: 'background .2s' }}>
          {it.icon}
        </button>
      ))}
    </div>
  )
}

function StatCard({ label, value, change, color, icon }) {
  const up = change && change.startsWith('+')
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</span>
        {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 4 }}>{value}</div>
      {change && <div style={{ fontSize: 11, fontWeight: 600, color: up ? '#10B981' : '#EF4444' }}>{change} vs last month</div>}
    </div>
  )
}

function MiniBarChart({ data, color, labels }) {
  const max = Math.max(...data)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 56 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <div style={{ width: '100%', height: Math.round((v / max) * 52), background: i === data.length - 1 ? color : `${color}55`, borderRadius: '3px 3px 0 0', minHeight: 4 }} />
          {labels && <span style={{ fontSize: 8, color: '#CBD5E1' }}>{labels[i]}</span>}
        </div>
      ))}
    </div>
  )
}

function Pill({ children, color, bg }) {
  return (
    <span style={{ padding: '3px 9px', borderRadius: 999, fontSize: 10, fontWeight: 700, background: bg || `${color}18`, color: color, fontFamily: "'Plus Jakarta Sans',sans-serif", whiteSpace: 'nowrap' }}>
      {children}
    </span>
  )
}

function Avatar({ initials, color, size = 32 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 700, color, flexShrink: 0, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      {initials}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   1. AI CHAT / SALES AGENT DEMO
═══════════════════════════════════════════════════ */
export function AIChatDemo({ color = '#8B5CF6', title = 'AI Sales Agent' }) {
  const initialMessages = [
    { role: 'bot', msg: 'Hi! 👋 I\'m your AI assistant. How can I help you today?', time: '10:30 AM' },
    { role: 'user', msg: 'I\'m looking for digital marketing services.', time: '10:31 AM' },
    { role: 'bot', msg: 'Great choice! We specialise in SEO, Paid Ads, and Social Media Marketing. Are you looking to grow traffic, generate leads, or boost sales?', time: '10:31 AM' },
    { role: 'user', msg: 'Mostly lead generation for my B2B business.', time: '10:32 AM' },
    { role: 'bot', msg: '✅ Perfect! B2B lead gen is our speciality. We\'ve helped 50+ businesses increase qualified leads by 3x. Can I book a free 30-min strategy call for you?', time: '10:32 AM' },
  ]

  const suggestions = ['Book a free consultation', 'See pricing plans', 'View case studies', 'Talk to a human']
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [tab, setTab] = useState('chat')
  const endRef = useRef(null)

  const leads = [
    { name: 'Ssumit', company: 'TechCorp Pvt Ltd', status: 'Hot', time: '2 min ago', score: 92 },
    { name: 'Priya', company: 'Global Exports', status: 'Warm', time: '18 min ago', score: 74 },
    { name: 'Arjun', company: 'StartupHub', status: 'New', time: '1 hr ago', score: 58 },
    { name: 'Sunita', company: 'RetailPro', status: 'Hot', time: '3 hr ago', score: 88 },
    { name: 'Vikram', company: 'MFG Corp', status: 'Cold', time: '1 day ago', score: 31 },
  ]

  const statusColor = { Hot: '#EF4444', Warm: '#F59E0B', New: '#3B82F6', Cold: '#94A3B8' }

  function send() {
    if (!input.trim()) return
    const userMsg = { role: 'user', msg: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(m => [...m, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, { role: 'bot', msg: '📅 I\'ve noted your interest! Our team will reach out within 2 hours. Meanwhile, shall I share our latest case study on B2B lead generation?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    }, 1400)
  }

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', background: '#F8FAFC', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
      <TopBar color={color} icon="🤖" title={title} subtitle="Powered by AI · Response time < 2s"
        rightEl={<div style={{ display: 'flex', gap: 6 }}>
          {['chat', 'leads', 'analytics'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: tab === t ? color : '#F1F5F9', color: tab === t ? '#fff' : '#64748B', textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>}
      />

      {tab === 'chat' && (
        <>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, maxHeight: 340 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
                {m.role === 'bot' && <div style={{ width: 28, height: 28, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🤖</div>}
                <div style={{ maxWidth: '72%' }}>
                  <div style={{ padding: '10px 14px', borderRadius: 14, background: m.role === 'user' ? color : '#fff', color: m.role === 'user' ? '#fff' : '#334155', fontSize: 13, lineHeight: 1.6, border: m.role === 'bot' ? '1px solid #E2E8F0' : 'none', borderBottomRightRadius: m.role === 'user' ? 4 : 14, borderBottomLeftRadius: m.role === 'bot' ? 4 : 14 }}>
                    {m.msg}
                  </div>
                  <div style={{ fontSize: 10, color: '#CBD5E1', marginTop: 3, textAlign: m.role === 'user' ? 'right' : 'left' }}>{m.time}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🤖</div>
                <div style={{ padding: '10px 14px', background: '#fff', borderRadius: 14, border: '1px solid #E2E8F0', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0, 0.2, 0.4].map((d, i) => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: color, animation: `bounce 0.8s ${d}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div style={{ padding: '8px 16px', display: 'flex', gap: 6, flexWrap: 'wrap', borderTop: '1px solid #F1F5F9' }}>
            {suggestions.map(s => (
              <button key={s} onClick={() => setInput(s)} style={{ padding: '5px 11px', borderRadius: 999, border: `1px solid ${color}40`, background: `${color}08`, color, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>{s}</button>
            ))}
          </div>

          <div style={{ padding: '12px 16px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Type your message..." style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13, outline: 'none', background: '#F8FAFC' }} />
            <button onClick={send} style={{ width: 40, height: 40, borderRadius: 10, background: color, border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>➤</button>
          </div>
        </>
      )}

      {tab === 'leads' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Live Lead Capture</span>
            <Pill color={color}>🔴 Live</Pill>
          </div>
          {leads.map((l, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#fff', borderRadius: 10, border: '1px solid #E2E8F0', marginBottom: 8 }}>
              <Avatar initials={l.name.split(' ').map(n => n[0]).join('')} color={color} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{l.name}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{l.company} · {l.time}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: statusColor[l.status], marginBottom: 3 }}>{l.status}</div>
                <div style={{ fontSize: 10, color: '#94A3B8' }}>Score: {l.score}</div>
              </div>
              <div style={{ width: 4, height: 36, borderRadius: 2, background: statusColor[l.status] }} />
            </div>
          ))}
        </div>
      )}

      {tab === 'analytics' && (
        <div style={{ flex: 1, padding: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <StatCard label="Conversations Today" value="142" change="+28%" color={color} icon="💬" />
            <StatCard label="Leads Captured" value="38" change="+41%" color={color} icon="🎯" />
            <StatCard label="Appointments Set" value="12" change="+18%" color={color} icon="📅" />
            <StatCard label="Conversion Rate" value="26.7%" change="+7%" color={color} icon="📈" />
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>Hourly Conversations</div>
            <MiniBarChart data={[12, 18, 22, 30, 28, 35, 40, 38, 32, 26, 20, 14]} color={color} labels={['8A','9A','10A','11A','12P','1P','2P','3P','4P','5P','6P','7P']} />
          </div>
        </div>
      )}

      <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0.8);opacity:0.5} 40%{transform:scale(1.2);opacity:1} }`}</style>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   2. GYM MANAGEMENT DEMO
═══════════════════════════════════════════════════ */
export function GymDemo({ color = '#EF4444' }) {
  const [tab, setTab] = useState('dashboard')

  const members = [
    { name: 'Arjun Kapoor', plan: 'Premium', joined: 'Jan 2024', status: 'Active', attendance: 22, due: null },
    { name: 'Sneha Rao', plan: 'Basic', joined: 'Mar 2024', status: 'Active', attendance: 14, due: null },
    { name: 'Dev Malhotra', plan: 'Premium', joined: 'Nov 2023', status: 'Due', attendance: 8, due: '₹2,999' },
    { name: 'Pooja Singh', plan: 'Annual', joined: 'Jun 2023', status: 'Active', attendance: 29, due: null },
    { name: 'Rohit Verma', plan: 'Basic', joined: 'Apr 2024', status: 'Expired', attendance: 0, due: '₹1,499' },
  ]

  const schedule = [
    { time: '6:00 AM', class: 'Morning Yoga', trainer: 'Meena', capacity: '12/15', color: '#10B981' },
    { time: '7:30 AM', class: 'HIIT Training', trainer: 'Rajan', capacity: '18/20', color: '#EF4444' },
    { time: '9:00 AM', class: 'Zumba Dance', trainer: 'Priya', capacity: '20/20', color: '#F59E0B' },
    { time: '5:30 PM', class: 'Weight Training', trainer: 'Suresh', capacity: '8/12', color: '#8B5CF6' },
    { time: '7:00 PM', class: 'Crossfit', trainer: 'Rahul', capacity: '15/16', color: '#3B82F6' },
  ]

  const statusColor = { Active: '#10B981', Due: '#F59E0B', Expired: '#EF4444' }

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', background: '#F8FAFC', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
      <TopBar color={color} icon="💪" title="FitPro Gym Manager" subtitle="March 28, 2026"
        rightEl={<div style={{ display: 'flex', gap: 6 }}>
          {['dashboard', 'members', 'schedule', 'billing'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: tab === t ? color : '#F1F5F9', color: tab === t ? '#fff' : '#64748B', textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>}
      />

      {tab === 'dashboard' && (
        <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <StatCard label="Total Members" value="342" change="+12" color={color} icon="👥" />
            <StatCard label="Revenue (March)" value="₹2.4L" change="+8%" color={color} icon="💰" />
            <StatCard label="Today's Check-ins" value="87" change="+5" color={color} icon="✅" />
            <StatCard label="Pending Renewals" value="24" change="-3" color={color} icon="⚠️" />
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0', marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>Weekly Attendance</div>
            <MiniBarChart data={[65, 80, 72, 90, 85, 95, 88]} color={color} labels={['Mon','Tue','Wed','Thu','Fri','Sat','Sun']} />
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 14, border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', marginBottom: 10 }}>Membership Mix</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['Basic', 38, '#94A3B8'], ['Premium', 45, color], ['Annual', 17, '#F59E0B']].map(([n, p, c]) => (
                <div key={n} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ height: 8, borderRadius: 4, background: c, marginBottom: 6 }} />
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#0F172A' }}>{p}%</div>
                  <div style={{ fontSize: 10, color: '#94A3B8' }}>{n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'members' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <input placeholder="🔍 Search members..." style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12, outline: 'none', marginRight: 8 }} />
            <button style={{ padding: '8px 14px', borderRadius: 8, background: color, border: 'none', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>+ Add</button>
          </div>
          {members.map((m, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', border: '1px solid #E2E8F0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar initials={m.name.split(' ').map(n => n[0]).join('')} color={color} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{m.name}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{m.plan} · {m.attendance} visits this month</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Pill color={statusColor[m.status]}>{m.status}</Pill>
                {m.due && <div style={{ fontSize: 11, fontWeight: 700, color: '#EF4444', marginTop: 4 }}>{m.due} due</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'schedule' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Today's Classes</div>
          {schedule.map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', border: '1px solid #E2E8F0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, borderLeft: `4px solid ${s.color}` }}>
              <div style={{ width: 52, textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A' }}>{s.time}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{s.class}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>Trainer: {s.trainer}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Pill color={s.color}>{s.capacity}</Pill>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'billing' && (
        <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <StatCard label="Collected (March)" value="₹2.1L" change="+12%" color={color} icon="💳" />
            <StatCard label="Pending" value="₹36,000" change="-5%" color="#F59E0B" icon="⏳" />
          </div>
          {[
            { name: 'Pooja Singh', amount: '₹8,999', plan: 'Annual Renewal', date: 'Mar 28', status: 'Paid' },
            { name: 'Arjun Kapoor', amount: '₹2,999', plan: 'Premium Monthly', date: 'Mar 27', status: 'Paid' },
            { name: 'Dev Malhotra', amount: '₹2,999', plan: 'Premium Monthly', date: 'Mar 26', status: 'Pending' },
            { name: 'Rohit Verma', amount: '₹1,499', plan: 'Basic Monthly', date: 'Mar 20', status: 'Overdue' },
          ].map((t, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', border: '1px solid #E2E8F0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{t.name}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{t.plan} · {t.date}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginRight: 8 }}>{t.amount}</div>
              <Pill color={t.status === 'Paid' ? '#10B981' : t.status === 'Pending' ? '#F59E0B' : '#EF4444'}>{t.status}</Pill>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   3. E-COMMERCE DEMO
═══════════════════════════════════════════════════ */
export function ECommerceDemo({ color = '#EC489A' }) {
  const [tab, setTab] = useState('store')
  const [cart, setCart] = useState([])

  const products = [
    { id: 1, name: 'Pro Wireless Headphones', price: 4299, mrp: 5999, rating: 4.8, reviews: 234, tag: '🔥 Best Seller', emoji: '🎧', stock: 23 },
    { id: 2, name: 'Smart Watch Series 5', price: 8999, mrp: 11999, rating: 4.6, reviews: 187, tag: '🤖 AI Pick', emoji: '⌚', stock: 8 },
    { id: 3, name: 'Noise-Cancelling Buds', price: 2499, mrp: 3299, rating: 4.7, reviews: 412, tag: '⚡ New', emoji: '🎵', stock: 45 },
    { id: 4, name: 'Laptop Cooling Pad', price: 1199, mrp: 1599, rating: 4.5, reviews: 98, tag: '💎 Popular', emoji: '💻', stock: 12 },
    { id: 5, name: 'Mechanical Keyboard', price: 3499, mrp: 4999, rating: 4.9, reviews: 321, tag: '⭐ Top Rated', emoji: '⌨️', stock: 7 },
    { id: 6, name: 'USB-C Hub 7-in-1', price: 1799, mrp: 2499, rating: 4.4, reviews: 156, tag: '💼 Work From Home', emoji: '🔌', stock: 30 },
  ]

  const addToCart = (p) => {
    setCart(c => {
      const ex = c.find(i => i.id === p.id)
      if (ex) return c.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      return [...c, { ...p, qty: 1 }]
    })
  }

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = Math.round(cartTotal * 0.08)

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', background: '#F8FAFC', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
      <TopBar color={color} icon="🛒" title="ShopSmart AI" subtitle="Personalised for you"
        rightEl={
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {['store', 'orders', 'analytics'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: tab === t ? color : '#F1F5F9', color: tab === t ? '#fff' : '#64748B', textTransform: 'capitalize' }}>{t}</button>
            ))}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setTab('cart')} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: tab === 'cart' ? color : '#F1F5F9', color: tab === 'cart' ? '#fff' : '#64748B' }}>🛒 Cart</button>
              {cart.length > 0 && <span style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: '#EF4444', color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cart.reduce((s, i) => s + i.qty, 0)}</span>}
            </div>
          </div>
        }
      />

      {tab === 'store' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <input placeholder="🔍 Search with AI..." style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12, outline: 'none' }} />
            <button style={{ padding: '8px 12px', borderRadius: 8, background: color, border: 'none', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Filter</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {products.map(p => (
              <div key={p.id} style={{ background: '#fff', borderRadius: 10, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                <div style={{ background: `${color}10`, padding: '14px 12px', textAlign: 'center', fontSize: 32 }}>{p.emoji}</div>
                <div style={{ padding: '10px 10px 12px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color, marginBottom: 4 }}>{p.tag}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', lineHeight: 1.3, marginBottom: 5 }}>{p.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                    <span style={{ fontSize: 10, color: '#F59E0B' }}>{'★'.repeat(Math.round(p.rating))}</span>
                    <span style={{ fontSize: 10, color: '#94A3B8' }}>({p.reviews})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>₹{p.price.toLocaleString()}</span>
                    <span style={{ fontSize: 10, color: '#94A3B8', textDecoration: 'line-through' }}>₹{p.mrp.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => addToCart(p)} style={{ flex: 1, padding: '6px', borderRadius: 6, background: color, border: 'none', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Add to Cart</button>
                    <button style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${color}40`, background: '#fff', cursor: 'pointer', fontSize: 12 }}>♡</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'cart' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94A3B8' }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🛒</div>
              <div style={{ fontSize: 14 }}>Your cart is empty</div>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', border: '1px solid #E2E8F0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{item.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{item.name}</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color }}>₹{item.price.toLocaleString()}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button onClick={() => setCart(c => c.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))} style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                    <span style={{ fontSize: 13, fontWeight: 700, width: 20, textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => addToCart(item)} style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  </div>
                </div>
              ))}
              <div style={{ background: '#fff', borderRadius: 12, padding: 16, border: '1px solid #E2E8F0', marginTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#64748B' }}>Subtotal</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#10B981' }}>AI Discount (8%)</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#10B981' }}>−₹{discount.toLocaleString()}</span>
                </div>
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 10, display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>Total</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color }}>₹{(cartTotal - discount).toLocaleString()}</span>
                </div>
                <button style={{ width: '100%', padding: '10px', borderRadius: 8, background: color, border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Proceed to Checkout →</button>
              </div>
            </>
          )}
        </div>
      )}

      {tab === 'orders' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {[
            { id: '#ORD-2841', item: '🎧 Pro Headphones × 1', amount: '₹4,299', status: 'Delivered', date: 'Mar 25' },
            { id: '#ORD-2840', item: '⌚ Smart Watch × 1', amount: '₹8,999', status: 'Shipped', date: 'Mar 27' },
            { id: '#ORD-2839', item: '🎵 Noise-Cancelling Buds × 2', amount: '₹4,998', status: 'Processing', date: 'Mar 28' },
          ].map((o, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '14px', border: '1px solid #E2E8F0', marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{o.id}</span>
                <Pill color={o.status === 'Delivered' ? '#10B981' : o.status === 'Shipped' ? '#3B82F6' : '#F59E0B'}>{o.status}</Pill>
              </div>
              <div style={{ fontSize: 13, color: '#334155', marginBottom: 4 }}>{o.item}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>{o.date}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>{o.amount}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'analytics' && (
        <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <StatCard label="Sales (March)" value="₹8.6L" change="+35%" color={color} icon="💰" />
            <StatCard label="Orders" value="284" change="+28%" color={color} icon="📦" />
            <StatCard label="Avg Order Value" value="₹3,028" change="+6%" color={color} icon="📊" />
            <StatCard label="Cart Abandon" value="32%" change="-4%" color="#10B981" icon="🛒" />
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>Sales This Week</div>
            <MiniBarChart data={[42000, 58000, 51000, 72000, 65000, 89000, 82000]} color={color} labels={['Mon','Tue','Wed','Thu','Fri','Sat','Sun']} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   4. SALON / BOOKING DEMO
═══════════════════════════════════════════════════ */
export function SalonDemo({ color = '#EC489A', title = 'Salon & Spa' }) {
  const [tab, setTab] = useState('today')
  const [selectedSlot, setSelectedSlot] = useState(null)

  const appointments = [
    { time: '09:00 AM', name: 'Priya Sharma', service: 'Hair Color + Cut', staff: 'Reena', duration: '90 min', status: 'confirmed', amount: '₹2,200' },
    { time: '10:30 AM', name: 'Anjali Gupta', service: 'Facial + Cleanup', staff: 'Meena', duration: '60 min', status: 'in-progress', amount: '₹1,800' },
    { time: '12:00 PM', name: '— Open Slot —', service: '', staff: '', duration: '60 min', status: 'available', amount: '' },
    { time: '01:00 PM', name: 'Sunita Rao', service: 'Bridal Makeup', staff: 'Reena', duration: '120 min', status: 'confirmed', amount: '₹8,500' },
    { time: '03:30 PM', name: 'Kavita Nair', service: 'Manicure + Pedicure', staff: 'Deepa', duration: '75 min', status: 'pending', amount: '₹1,200' },
    { time: '05:00 PM', name: 'Ritu Patel', service: 'Head Massage', staff: 'Meena', duration: '45 min', status: 'confirmed', amount: '₹800' },
  ]

  const staff = [
    { name: 'Reena', role: 'Senior Stylist', today: 4, rating: 4.9, color: '#EC489A' },
    { name: 'Meena', role: 'Skin Specialist', today: 3, rating: 4.8, color: '#8B5CF6' },
    { name: 'Deepa', role: 'Nail Artist', today: 2, rating: 4.7, color: '#F59E0B' },
    { name: 'Lata', role: 'Hair Stylist', today: 5, rating: 4.6, color: '#10B981' },
  ]

  const statusMeta = { confirmed: { color: '#10B981', bg: '#D1FAE5', label: 'Confirmed' }, 'in-progress': { color: '#3B82F6', bg: '#DBEAFE', label: 'In Progress' }, available: { color: '#94A3B8', bg: '#F1F5F9', label: 'Available' }, pending: { color: '#F59E0B', bg: '#FEF3C7', label: 'Pending' } }

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', background: '#F8FAFC', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
      <TopBar color={color} icon="💇" title={title} subtitle="Today — March 28, 2026"
        rightEl={<div style={{ display: 'flex', gap: 6 }}>
          {['today', 'book', 'staff', 'reports'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: tab === t ? color : '#F1F5F9', color: tab === t ? '#fff' : '#64748B', textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>}
      />

      {tab === 'today' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
            <StatCard label="Appointments" value="6" icon="📅" color={color} />
            <StatCard label="Revenue Today" value="₹14.5K" icon="💰" color={color} />
            <StatCard label="Clients Waiting" value="1" icon="👩" color={color} />
          </div>
          {appointments.map((a, i) => {
            const meta = statusMeta[a.status]
            return (
              <div key={i} onClick={() => setSelectedSlot(selectedSlot === i ? null : i)}
                style={{ background: a.status === 'available' ? '#F8FAFC' : '#fff', borderRadius: 10, padding: '12px 14px', border: `1px solid ${a.status === 'in-progress' ? meta.color : '#E2E8F0'}`, marginBottom: 7, cursor: 'pointer', borderLeft: `4px solid ${meta.color}`, transition: 'all .15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 52, textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#0F172A' }}>{a.time}</div>
                    <div style={{ fontSize: 10, color: '#94A3B8' }}>{a.duration}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {a.status === 'available' ? (
                      <div style={{ fontSize: 13, color: '#94A3B8', fontStyle: 'italic' }}>— Available Slot —</div>
                    ) : (
                      <>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{a.name}</div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>{a.service} · {a.staff}</div>
                      </>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700, background: meta.bg, color: meta.color }}>{meta.label}</span>
                    {a.amount && <div style={{ fontSize: 12, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>{a.amount}</div>}
                  </div>
                </div>
                {selectedSlot === i && a.status !== 'available' && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #F1F5F9', display: 'flex', gap: 6 }}>
                    <button style={{ flex: 1, padding: '6px', borderRadius: 6, background: color, border: 'none', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>✓ Complete</button>
                    <button style={{ flex: 1, padding: '6px', borderRadius: 6, background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>✗ Cancel</button>
                    <button style={{ flex: 1, padding: '6px', borderRadius: 6, background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>⟳ Reschedule</button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {tab === 'book' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>New Appointment</div>
          {[
            { label: 'Client Name', placeholder: 'Enter client name', type: 'text' },
            { label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 10 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '.04em' }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '.04em' }}>Select Service</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {['Hair Cut', 'Hair Color', 'Facial', 'Manicure', 'Bridal Pkg', 'Head Spa'].map(s => (
                <button key={s} style={{ padding: '8px', borderRadius: 8, border: `1px solid ${color}30`, background: `${color}08`, color, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '.04em' }}>Preferred Staff</label>
            <select style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 13, outline: 'none', background: '#fff' }}>
              <option>Any Available</option>
              {staff.map(s => <option key={s.name}>{s.name} — {s.role}</option>)}
            </select>
          </div>
          <button style={{ width: '100%', padding: '11px', borderRadius: 10, background: color, border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            📅 Confirm Booking
          </button>
        </div>
      )}

      {tab === 'staff' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          {staff.map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 14, border: '1px solid #E2E8F0', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <Avatar initials={s.name[0]} color={s.color} size={44} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>{s.role}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: s.color }}>★ {s.rating}</div>
                  <div style={{ fontSize: 10, color: '#94A3B8' }}>{s.today} today</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {Array.from({ length: 8 }).map((_, j) => (
                  <div key={j} style={{ flex: 1, height: 6, borderRadius: 3, background: j < s.today ? s.color : '#E2E8F0' }} />
                ))}
              </div>
              <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 4 }}>{s.today}/8 slots filled today</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'reports' && (
        <div style={{ flex: 1, padding: 14, overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            <StatCard label="Monthly Revenue" value="₹1.8L" change="+22%" color={color} icon="💰" />
            <StatCard label="Total Clients" value="284" change="+18" color={color} icon="👥" />
            <StatCard label="Repeat Clients" value="68%" change="+4%" color="#10B981" icon="🔄" />
            <StatCard label="Avg Ticket" value="₹1,640" change="+8%" color={color} icon="🎫" />
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>Revenue This Week</div>
            <MiniBarChart data={[12000, 18000, 14000, 22000, 19000, 28000, 15000]} color={color} labels={['Mon','Tue','Wed','Thu','Fri','Sat','Sun']} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   5. ENTERPRISE ERP DEMO
═══════════════════════════════════════════════════ */
export function ERPDemo({ color = '#3B82F6' }) {
  const [tab, setTab] = useState('overview')

  const employees = [
    { name: 'Amit Joshi', dept: 'Engineering', role: 'Sr. Developer', salary: '₹85,000', status: 'Active', joined: 'Jan 2021' },
    { name: 'Riya Shah', dept: 'Marketing', role: 'Campaign Manager', salary: '₹62,000', status: 'Active', joined: 'Mar 2022' },
    { name: 'Karan Mehta', dept: 'Sales', role: 'Sales Lead', salary: '₹70,000', status: 'On Leave', joined: 'Sep 2020' },
    { name: 'Neha Tiwari', dept: 'HR', role: 'HR Manager', salary: '₹78,000', status: 'Active', joined: 'Jun 2019' },
    { name: 'Suresh Kumar', dept: 'Finance', role: 'CFO', salary: '₹1,40,000', status: 'Active', joined: 'Dec 2018' },
  ]

  const tasks = [
    { title: 'Q1 Financial Report', dept: 'Finance', priority: 'High', due: 'Mar 31', done: 85 },
    { title: 'Product Launch Campaign', dept: 'Marketing', priority: 'High', due: 'Apr 5', done: 60 },
    { title: 'Server Migration', dept: 'Engineering', priority: 'Medium', due: 'Apr 10', done: 40 },
    { title: 'Hiring — 3 Devs', dept: 'HR', priority: 'Medium', due: 'Apr 15', done: 30 },
    { title: 'Vendor Contract Renewal', dept: 'Operations', priority: 'Low', due: 'Apr 20', done: 10 },
  ]

  const priColor = { High: '#EF4444', Medium: '#F59E0B', Low: '#10B981' }

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', background: '#F8FAFC', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
      <TopBar color={color} icon="🏢" title="Enterprise ERP Suite" subtitle="Live · All Modules Active"
        rightEl={<div style={{ display: 'flex', gap: 6 }}>
          {['overview', 'hr', 'tasks', 'finance'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: tab === t ? color : '#F1F5F9', color: tab === t ? '#fff' : '#64748B', textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>}
      />

      {tab === 'overview' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <StatCard label="Total Employees" value="248" change="+12" color={color} icon="👥" />
            <StatCard label="Revenue (Q1)" value="₹45L" change="+18%" color={color} icon="💰" />
            <StatCard label="Active Projects" value="12" change="+3" color={color} icon="📋" />
            <StatCard label="Open Tickets" value="34" change="-8" color="#10B981" icon="🎫" />
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 14, border: '1px solid #E2E8F0', marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Department Performance</div>
            {[['Engineering', 92, color], ['Sales', 78, '#10B981'], ['Marketing', 85, '#F59E0B'], ['HR', 88, '#8B5CF6']].map(([d, v, c]) => (
              <div key={d} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: '#64748B' }}>{d}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: c }}>{v}%</span>
                </div>
                <div style={{ height: 6, background: '#F1F5F9', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${v}%`, background: c, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>Monthly Revenue</div>
            <MiniBarChart data={[380000, 420000, 390000, 450000, 480000, 510000, 490000, 530000, 560000, 520000, 580000, 610000]} color={color} labels={['J','F','M','A','M','J','J','A','S','O','N','D']} />
          </div>
        </div>
      )}

      {tab === 'hr' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input placeholder="🔍 Search employees..." style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12, outline: 'none' }} />
            <button style={{ padding: '8px 12px', borderRadius: 8, background: color, border: 'none', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>+ Hire</button>
          </div>
          {employees.map((e, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', border: '1px solid #E2E8F0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar initials={e.name.split(' ').map(n => n[0]).join('')} color={color} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{e.name}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{e.role} · {e.dept}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{e.salary}</div>
                <Pill color={e.status === 'Active' ? '#10B981' : '#F59E0B'}>{e.status}</Pill>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'tasks' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Active Projects & Tasks</div>
          {tasks.map((t, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '13px 14px', border: '1px solid #E2E8F0', marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 3 }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>{t.dept} · Due {t.due}</div>
                </div>
                <Pill color={priColor[t.priority]}>{t.priority}</Pill>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, height: 6, background: '#F1F5F9', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${t.done}%`, background: t.done > 70 ? '#10B981' : t.done > 40 ? color : '#F59E0B', borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', width: 28 }}>{t.done}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'finance' && (
        <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <StatCard label="Revenue (Q1)" value="₹45L" change="+18%" color={color} icon="📈" />
            <StatCard label="Expenses (Q1)" value="₹28L" change="+6%" color="#EF4444" icon="📉" />
            <StatCard label="Net Profit" value="₹17L" change="+34%" color="#10B981" icon="💎" />
            <StatCard label="Accounts Due" value="₹4.2L" change="-12%" color="#F59E0B" icon="⏳" />
          </div>
          {[
            { label: 'Salaries & Benefits', value: '₹18L', pct: 64, color: '#EF4444' },
            { label: 'Operations', value: '₹5L', pct: 18, color: '#F59E0B' },
            { label: 'Marketing', value: '₹3L', pct: 11, color: '#8B5CF6' },
            { label: 'R&D', value: '₹2L', pct: 7, color: '#10B981' },
          ].map(e => (
            <div key={e.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: e.color, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 12, color: '#334155' }}>{e.label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', marginRight: 8 }}>{e.value}</span>
              <div style={{ width: 80, height: 6, background: '#F1F5F9', borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${e.pct}%`, background: e.color, borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 10, color: '#94A3B8', width: 24 }}>{e.pct}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   6. RETAIL / POS DEMO
═══════════════════════════════════════════════════ */
export function RetailPOSDemo({ color = '#F59E0B' }) {
  const [cart, setCart] = useState([])
  const [tab, setTab] = useState('pos')

  const items = [
    { id: 1, name: 'Basmati Rice 5kg', price: 380, barcode: 'RIC001', cat: 'Grocery', emoji: '🍚', stock: 45 },
    { id: 2, name: 'Sunflower Oil 1L', price: 145, barcode: 'OIL002', cat: 'Grocery', emoji: '🫙', stock: 30 },
    { id: 3, name: 'Amul Butter 500g', price: 265, barcode: 'BUT003', cat: 'Dairy', emoji: '🧈', stock: 12 },
    { id: 4, name: 'Tata Salt 1kg', price: 28, barcode: 'SAL004', cat: 'Grocery', emoji: '🧂', stock: 80 },
    { id: 5, name: 'Rin Detergent 1kg', price: 110, barcode: 'DET005', cat: 'Home', emoji: '🧺', stock: 25 },
    { id: 6, name: 'Maggi 12-Pack', price: 228, barcode: 'MAG006', cat: 'Food', emoji: '🍜', stock: 18 },
  ]

  const addItem = (item) => setCart(c => {
    const ex = c.find(i => i.id === item.id)
    if (ex) return c.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
    return [...c, { ...item, qty: 1 }]
  })

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + tax

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', background: '#F8FAFC', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
      <TopBar color={color} icon="🏪" title="RetailPro POS" subtitle="Cashier: Rajesh · Shift 2"
        rightEl={<div style={{ display: 'flex', gap: 6 }}>
          {['pos', 'inventory', 'reports'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: tab === t ? color : '#F1F5F9', color: tab === t ? '#fff' : '#64748B', textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>}
      />

      {tab === 'pos' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7 }}>
              {items.map(item => (
                <div key={item.id} onClick={() => addItem(item)} style={{ background: '#fff', borderRadius: 8, padding: '10px 8px', border: '1px solid #E2E8F0', cursor: 'pointer', textAlign: 'center', transition: 'border-color .15s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = color}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{item.emoji}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#0F172A', lineHeight: 1.3, marginBottom: 3 }}>{item.name}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color }}>₹{item.price}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Cart panel */}
          <div style={{ background: '#fff', borderTop: '1px solid #E2E8F0', padding: '10px 14px', flexShrink: 0 }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '8px', color: '#94A3B8', fontSize: 12 }}>Tap items to add to cart</div>
            ) : (
              <>
                <div style={{ maxHeight: 110, overflowY: 'auto', marginBottom: 8 }}>
                  {cart.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 14 }}>{item.emoji}</span>
                      <span style={{ flex: 1, fontSize: 11, color: '#334155', fontWeight: 500 }}>{item.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <button onClick={() => setCart(c => c.map(i => i.id === item.id ? { ...i, qty: Math.max(0, i.qty - 1) } : i).filter(i => i.qty > 0))} style={{ width: 20, height: 20, borderRadius: 4, border: '1px solid #E2E8F0', background: '#F8FAFC', cursor: 'pointer', fontSize: 12 }}>−</button>
                        <span style={{ fontSize: 12, fontWeight: 700, width: 18, textAlign: 'center' }}>{item.qty}</span>
                        <button onClick={() => addItem(item)} style={{ width: 20, height: 20, borderRadius: 4, border: '1px solid #E2E8F0', background: '#F8FAFC', cursor: 'pointer', fontSize: 12 }}>+</button>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', width: 44, textAlign: 'right' }}>₹{(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', marginBottom: 3 }}><span>Subtotal</span><span>₹{subtotal}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', marginBottom: 6 }}><span>GST (5%)</span><span>₹{tax}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}><span>Total</span><span>₹{total}</span></div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button style={{ flex: 1, padding: '8px', borderRadius: 8, background: color, border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>💵 Cash</button>
                    <button style={{ flex: 1, padding: '8px', borderRadius: 8, background: '#3B82F6', border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>📱 UPI</button>
                    <button onClick={() => setCart([])} style={{ padding: '8px 10px', borderRadius: 8, background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>✕</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {tab === 'inventory' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '11px 14px', border: '1px solid #E2E8F0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{item.name}</div>
                <div style={{ fontSize: 10, color: '#94A3B8', fontFamily: 'monospace' }}>{item.barcode} · {item.cat}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>₹{item.price}</div>
                <Pill color={item.stock < 15 ? '#EF4444' : item.stock < 30 ? '#F59E0B' : '#10B981'}>
                  {item.stock} left
                </Pill>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'reports' && (
        <div style={{ flex: 1, padding: 14, overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            <StatCard label="Today's Sales" value="₹18,420" change="+12%" color={color} icon="💰" />
            <StatCard label="Transactions" value="84" change="+8" color={color} icon="🧾" />
            <StatCard label="Avg Bill" value="₹219" change="+4%" color={color} icon="📊" />
            <StatCard label="Low Stock Items" value="3" change="+2" color="#EF4444" icon="⚠️" />
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>Hourly Sales Today</div>
            <MiniBarChart data={[8000, 12000, 10000, 15000, 18000, 14000, 11000, 9000]} color={color} labels={['9A','10A','11A','12P','1P','2P','3P','4P']} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   7. REAL ESTATE CRM DEMO
═══════════════════════════════════════════════════ */
export function RealEstateDemo({ color = '#14B8A6' }) {
  const [tab, setTab] = useState('listings')

  const listings = [
    { title: '3BHK Flat — Baner', type: 'Apartment', price: '₹95L', area: '1,450 sqft', status: 'Available', emoji: '🏢', badge: 'Hot Property' },
    { title: '4BHK Villa — Wakad', type: 'Villa', price: '₹2.1 Cr', area: '3,200 sqft', status: 'Under Offer', emoji: '🏠', badge: 'Premium' },
    { title: '2BHK Flat — Hinjewadi', type: 'Apartment', price: '₹68L', area: '980 sqft', status: 'Available', emoji: '🏘️', badge: 'New Launch' },
    { title: 'Commercial Space — Kothrud', type: 'Commercial', price: '₹1.4 Cr', area: '2,100 sqft', status: 'Sold', emoji: '🏬', badge: null },
  ]

  const leads = [
    { name: 'Dinesh Patil', interest: '3BHK — Budget ₹1 Cr', stage: 'Site Visit', score: 88 },
    { name: 'Shalini Wagh', interest: '2BHK — Ready Possession', stage: 'Negotiating', score: 72 },
    { name: 'Manoj Kulkarni', interest: 'Villa — Premium Segment', stage: 'Hot Lead', score: 95 },
    { name: 'Rekha Joshi', interest: 'Commercial — Investment', stage: 'Follow-up', score: 55 },
  ]

  const stageColor = { 'Site Visit': '#3B82F6', 'Negotiating': '#F59E0B', 'Hot Lead': '#EF4444', 'Follow-up': '#94A3B8' }

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', background: '#F8FAFC', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
      <TopBar color={color} icon="🏠" title="RealPro CRM" subtitle="Pune Market · March 2026"
        rightEl={<div style={{ display: 'flex', gap: 6 }}>
          {['listings', 'leads', 'pipeline', 'stats'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: tab === t ? color : '#F1F5F9', color: tab === t ? '#fff' : '#64748B', textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>}
      />

      {tab === 'listings' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          {listings.map((l, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 14, border: '1px solid #E2E8F0', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: 10, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{l.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{l.title}</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>{l.type} · {l.area}</div>
                    </div>
                    <Pill color={l.status === 'Available' ? '#10B981' : l.status === 'Sold' ? '#94A3B8' : '#F59E0B'}>{l.status}</Pill>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{l.price}</span>
                    {l.badge && <Pill color={color}>{l.badge}</Pill>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'leads' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          {leads.map((l, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '13px 14px', border: '1px solid #E2E8F0', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Avatar initials={l.name.split(' ').map(n => n[0]).join('')} color={color} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{l.name}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>{l.interest}</div>
                </div>
                <Pill color={stageColor[l.stage]}>{l.stage}</Pill>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 10, color: '#94A3B8' }}>Lead Score</span>
                <div style={{ flex: 1, height: 5, background: '#F1F5F9', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${l.score}%`, background: l.score > 80 ? '#10B981' : l.score > 60 ? '#F59E0B' : '#94A3B8', borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', width: 24 }}>{l.score}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'pipeline' && (
        <div style={{ flex: 1, padding: 14, overflowY: 'auto' }}>
          {[
            { stage: '🔵 New Enquiry', count: 18, value: '₹24 Cr', color: '#3B82F6' },
            { stage: '📞 Contacted', count: 12, value: '₹16 Cr', color: '#8B5CF6' },
            { stage: '🏠 Site Visit', count: 7, value: '₹9.5 Cr', color: '#F59E0B' },
            { stage: '🤝 Negotiating', count: 4, value: '₹5.8 Cr', color: '#EF4444' },
            { stage: '✅ Closed', count: 2, value: '₹2.8 Cr', color: '#10B981' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', border: '1px solid #E2E8F0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 4, height: 40, borderRadius: 2, background: s.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{s.stage}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{s.count} leads</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'stats' && (
        <div style={{ flex: 1, padding: 14, overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            <StatCard label="Properties Sold" value="8" change="+3" color={color} icon="🏠" />
            <StatCard label="Revenue (March)" value="₹4.8 Cr" change="+24%" color={color} icon="💰" />
            <StatCard label="Active Leads" value="43" change="+11" color={color} icon="🎯" />
            <StatCard label="Site Visits" value="19" change="+6" color={color} icon="📍" />
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>Deals Closed This Year</div>
            <MiniBarChart data={[4, 6, 5, 8, 7, 9, 8, 11, 10, 8, 12, 9]} color={color} labels={['J','F','M','A','M','J','J','A','S','O','N','D']} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   8. SUPPLY CHAIN / LOGISTICS DEMO
═══════════════════════════════════════════════════ */
export function SupplyChainDemo({ color = '#14B8A6' }) {
  const [tab, setTab] = useState('overview')

  const shipments = [
    { id: 'SHP-4821', from: 'Mumbai', to: 'Delhi', status: 'In Transit', eta: 'Mar 29', items: 240, weight: '1.2T' },
    { id: 'SHP-4820', from: 'Chennai', to: 'Bangalore', status: 'Delivered', eta: 'Mar 27', items: 85, weight: '340kg' },
    { id: 'SHP-4819', from: 'Pune', to: 'Hyderabad', status: 'Processing', eta: 'Mar 30', items: 520, weight: '2.8T' },
    { id: 'SHP-4818', from: 'Kolkata', to: 'Mumbai', status: 'Delayed', eta: 'Mar 31', items: 160, weight: '780kg' },
  ]

  const statusColor = { 'In Transit': '#3B82F6', Delivered: '#10B981', Processing: '#F59E0B', Delayed: '#EF4444' }

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', background: '#F8FAFC', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
      <TopBar color={color} icon="🚚" title="SupplyPro Logistics" subtitle="AI-Powered Tracking"
        rightEl={<div style={{ display: 'flex', gap: 6 }}>
          {['overview', 'shipments', 'vendors'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: tab === t ? color : '#F1F5F9', color: tab === t ? '#fff' : '#64748B', textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>}
      />

      {tab === 'overview' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <StatCard label="Active Shipments" value="34" change="+5" color={color} icon="🚚" />
            <StatCard label="On-Time Rate" value="91%" change="+3%" color="#10B981" icon="⏱️" />
            <StatCard label="Cost Saved (AI)" value="₹1.8L" change="+14%" color={color} icon="💰" />
            <StatCard label="Delayed Orders" value="4" change="-2" color="#EF4444" icon="⚠️" />
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 14, border: '1px solid #E2E8F0', marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', marginBottom: 10 }}>Route Performance</div>
            {[['Mumbai → Delhi', 94, color], ['Chennai → Bangalore', 98, '#10B981'], ['Pune → Hyderabad', 87, '#F59E0B'], ['Kolkata → Mumbai', 72, '#EF4444']].map(([r, v, c]) => (
              <div key={r} style={{ marginBottom: 9 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: '#64748B' }}>{r}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c }}>{v}% on-time</span>
                </div>
                <div style={{ height: 5, background: '#F1F5F9', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${v}%`, background: c, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'shipments' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          {shipments.map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '13px 14px', border: '1px solid #E2E8F0', marginBottom: 8, borderLeft: `4px solid ${statusColor[s.status]}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: 'monospace' }}>{s.id}</span>
                <Pill color={statusColor[s.status]}>{s.status}</Pill>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>{s.from} → {s.to}</div>
              <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#64748B' }}>
                <span>📦 {s.items} items</span>
                <span>⚖️ {s.weight}</span>
                <span>📅 ETA: {s.eta}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'vendors' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          {[
            { name: 'BlueDart Express', type: 'Air + Ground', rating: 4.8, contracts: 12, spend: '₹4.2L' },
            { name: 'DTDC Logistics', type: 'Ground', rating: 4.5, contracts: 8, spend: '₹2.8L' },
            { name: 'Delhivery', type: 'Last Mile', rating: 4.6, contracts: 15, spend: '₹3.6L' },
            { name: 'FedEx India', type: 'International', rating: 4.7, contracts: 4, spend: '₹1.9L' },
          ].map((v, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '13px 14px', border: '1px solid #E2E8F0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🚛</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{v.name}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>{v.type} · {v.contracts} contracts</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#F59E0B' }}>★ {v.rating}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color }}>MTD: {v.spend}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   9. RESTAURANT / FOOD ORDERING DEMO
═══════════════════════════════════════════════════ */
export function RestaurantDemo({ color = '#EF4444' }) {
  const [tab, setTab] = useState('menu')
  const [cart, setCart] = useState([])

  const menu = [
    { id: 1, name: 'Paneer Butter Masala', cat: 'Main Course', price: 320, rating: 4.8, prep: '20 min', emoji: '🍛', bestseller: true },
    { id: 2, name: 'Veg Biryani', cat: 'Rice', price: 280, rating: 4.7, prep: '25 min', emoji: '🍚', bestseller: true },
    { id: 3, name: 'Masala Dosa', cat: 'South Indian', price: 180, rating: 4.9, prep: '15 min', emoji: '🫓', bestseller: false },
    { id: 4, name: 'Chole Bhature', cat: 'Punjabi', price: 220, rating: 4.6, prep: '18 min', emoji: '🫔', bestseller: false },
    { id: 5, name: 'Gulab Jamun', cat: 'Dessert', price: 120, rating: 4.8, prep: '5 min', emoji: '🍮', bestseller: false },
    { id: 6, name: 'Mango Lassi', cat: 'Beverages', price: 90, rating: 4.9, prep: '5 min', emoji: '🥭', bestseller: true },
  ]

  const tables = [
    { id: 'T1', seats: 2, status: 'occupied', order: '₹560', time: '35 min' },
    { id: 'T2', seats: 4, status: 'available', order: null, time: null },
    { id: 'T3', seats: 6, status: 'occupied', order: '₹1,240', time: '18 min' },
    { id: 'T4', seats: 2, status: 'reserved', order: 'Res: 7PM', time: null },
    { id: 'T5', seats: 4, status: 'available', order: null, time: null },
    { id: 'T6', seats: 8, status: 'occupied', order: '₹2,180', time: '52 min' },
  ]

  const addToCart = (item) => setCart(c => {
    const ex = c.find(i => i.id === item.id)
    if (ex) return c.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
    return [...c, { ...item, qty: 1 }]
  })
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const tableColor = { occupied: '#EF4444', available: '#10B981', reserved: '#F59E0B' }

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', background: '#F8FAFC', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
      <TopBar color={color} icon="🍽️" title="Restaurant Manager" subtitle="Spice Garden · Table Mgmt"
        rightEl={<div style={{ display: 'flex', gap: 6 }}>
          {['menu', 'tables', 'orders'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: tab === t ? color : '#F1F5F9', color: tab === t ? '#fff' : '#64748B', textTransform: 'capitalize' }}>{t}</button>
          ))}
          {cart.length > 0 && (
            <button onClick={() => setTab('cart')} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: tab === 'cart' ? color : '#FEF2F2', color: tab === 'cart' ? '#fff' : '#EF4444', position: 'relative' }}>
              🛒 {cart.reduce((s, i) => s + i.qty, 0)}
            </button>
          )}
        </div>}
      />

      {tab === 'menu' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {menu.map(item => (
              <div key={item.id} style={{ background: '#fff', borderRadius: 10, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                <div style={{ background: `${color}10`, padding: '16px 12px', textAlign: 'center', fontSize: 32, position: 'relative' }}>
                  {item.emoji}
                  {item.bestseller && <span style={{ position: 'absolute', top: 6, right: 6, fontSize: 9, fontWeight: 700, background: color, color: '#fff', padding: '2px 5px', borderRadius: 999 }}>BESTSELLER</span>}
                </div>
                <div style={{ padding: '10px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', marginBottom: 3, lineHeight: 1.3 }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 5 }}>⏱ {item.prep} · ★ {item.rating}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>₹{item.price}</span>
                    <button onClick={() => addToCart(item)} style={{ padding: '5px 10px', borderRadius: 6, background: color, border: 'none', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Add +</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'tables' && (
        <div style={{ flex: 1, padding: 14 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 14, fontSize: 11, color: '#64748B' }}>
            {['occupied', 'available', 'reserved'].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: tableColor[s] }} />
                <span style={{ textTransform: 'capitalize' }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {tables.map(t => (
              <div key={t.id} style={{ background: '#fff', borderRadius: 10, padding: '12px', border: `2px solid ${tableColor[t.status]}30`, textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>🪑</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{t.id}</div>
                <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 6 }}>{t.seats} seats</div>
                <Pill color={tableColor[t.status]}>{t.status}</Pill>
                {t.order && <div style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', marginTop: 5 }}>{t.order}</div>}
                {t.time && t.status === 'occupied' && <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{t.time} ago</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            <StatCard label="Today's Orders" value="84" change="+12%" color={color} icon="🍽️" />
            <StatCard label="Revenue Today" value="₹28,400" change="+18%" color={color} icon="💰" />
          </div>
          {[
            { id: 'ORD-841', table: 'T3', items: 'Biryani ×2, Lassi ×2', amount: '₹740', status: 'Preparing', time: '5 min ago' },
            { id: 'ORD-840', table: 'T1', items: 'Paneer Masala, Bhature', amount: '₹540', status: 'Served', time: '22 min ago' },
            { id: 'ORD-839', table: 'T6', items: 'Dosa ×3, Biryani, Gulab', amount: '₹910', status: 'Preparing', time: '8 min ago' },
            { id: 'ORD-838', table: 'T2', items: 'Lassi ×4, Gulab Jamun ×2', amount: '₹600', status: 'Served', time: '35 min ago' },
          ].map((o, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', border: '1px solid #E2E8F0', marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color }}>{o.id} · {o.table}</div>
                <Pill color={o.status === 'Served' ? '#10B981' : '#F59E0B'}>{o.status}</Pill>
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>{o.items}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8' }}>
                <span>{o.time}</span>
                <span style={{ fontWeight: 800, color: '#0F172A', fontSize: 13 }}>{o.amount}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'cart' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>New Order</div>
          {cart.map(item => (
            <div key={item.id} style={{ background: '#fff', borderRadius: 10, padding: '11px 12px', border: '1px solid #E2E8F0', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{item.name}</div>
                <div style={{ fontSize: 12, color, fontWeight: 700 }}>₹{item.price}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button onClick={() => setCart(c => c.map(i => i.id === item.id ? { ...i, qty: Math.max(0, i.qty - 1) } : i).filter(i => i.qty > 0))} style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer' }}>−</button>
                <span style={{ fontWeight: 700 }}>{item.qty}</span>
                <button onClick={() => addToCart(item)} style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer' }}>+</button>
              </div>
              <span style={{ fontWeight: 700, width: 54, textAlign: 'right', fontSize: 12 }}>₹{item.price * item.qty}</span>
            </div>
          ))}
          {cart.length > 0 && (
            <div style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', border: '1px solid #E2E8F0', marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 800, marginBottom: 10 }}>
                <span>Total</span>
                <span style={{ color }}>₹{cartTotal}</span>
              </div>
              <button style={{ width: '100%', padding: '10px', borderRadius: 8, background: color, border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                🍽️ Place Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   10. HR MANAGEMENT DEMO
═══════════════════════════════════════════════════ */
export function HRDemo({ color = '#8B5CF6' }) {
  const [tab, setTab] = useState('dashboard')

  const jobOpenings = [
    { title: 'Senior React Developer', dept: 'Engineering', applicants: 42, stage: 'Interviewing', urgent: true },
    { title: 'Digital Marketing Manager', dept: 'Marketing', applicants: 28, stage: 'Screening', urgent: false },
    { title: 'Sales Executive', dept: 'Sales', applicants: 65, stage: 'Assessment', urgent: true },
    { title: 'Data Analyst', dept: 'Analytics', applicants: 19, stage: 'Offer', urgent: false },
  ]

  const leaves = [
    { name: 'Amit Joshi', type: 'Annual Leave', from: 'Apr 1', to: 'Apr 5', days: 5, status: 'Approved' },
    { name: 'Sneha Rao', type: 'Sick Leave', from: 'Mar 29', to: 'Mar 29', days: 1, status: 'Pending' },
    { name: 'Karan M.', type: 'Casual Leave', from: 'Apr 3', to: 'Apr 4', days: 2, status: 'Pending' },
    { name: 'Riya Shah', type: 'WFH Request', from: 'Apr 7', to: 'Apr 11', days: 5, status: 'Approved' },
  ]

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', background: '#F8FAFC', borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
      <TopBar color={color} icon="👥" title="HR & Talent Suite" subtitle="248 Employees · FY 2025-26"
        rightEl={<div style={{ display: 'flex', gap: 6 }}>
          {['dashboard', 'recruitment', 'leaves', 'payroll'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: tab === t ? color : '#F1F5F9', color: tab === t ? '#fff' : '#64748B', textTransform: 'capitalize' }}>{t}</button>
          ))}
        </div>}
      />

      {tab === 'dashboard' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <StatCard label="Total Employees" value="248" change="+12" color={color} icon="👥" />
            <StatCard label="Open Positions" value="8" change="+3" color="#F59E0B" icon="💼" />
            <StatCard label="Pending Leaves" value="6" change="+2" color="#3B82F6" icon="🗓️" />
            <StatCard label="Avg Satisfaction" value="4.6/5" change="+0.2" color="#10B981" icon="😊" />
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 14, border: '1px solid #E2E8F0', marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Headcount by Department</div>
            {[['Engineering', 68, color], ['Sales', 52, '#10B981'], ['Marketing', 34, '#F59E0B'], ['HR & Admin', 28, '#3B82F6'], ['Finance', 22, '#EF4444'], ['Operations', 44, '#94A3B8']].map(([d, v, c]) => (
              <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                <span style={{ fontSize: 11, color: '#64748B', width: 90, flexShrink: 0 }}>{d}</span>
                <div style={{ flex: 1, height: 6, background: '#F1F5F9', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${(v / 68) * 100}%`, background: c, borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', width: 20 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'recruitment' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          {jobOpenings.map((j, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '13px 14px', border: '1px solid #E2E8F0', marginBottom: 8, borderLeft: `4px solid ${j.urgent ? '#EF4444' : color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{j.title}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>{j.dept} · {j.applicants} applicants</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
                  {j.urgent && <Pill color="#EF4444">🔥 Urgent</Pill>}
                  <Pill color={color}>{j.stage}</Pill>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <button style={{ flex: 1, padding: '5px', borderRadius: 6, background: `${color}10`, border: `1px solid ${color}30`, color, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>View Applicants</button>
                <button style={{ flex: 1, padding: '5px', borderRadius: 6, background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#64748B', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Schedule Interview</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'leaves' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          {leaves.map((l, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '13px 14px', border: '1px solid #E2E8F0', marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{l.name}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>{l.type} · {l.from} – {l.to} ({l.days}d)</div>
                </div>
                <Pill color={l.status === 'Approved' ? '#10B981' : '#F59E0B'}>{l.status}</Pill>
              </div>
              {l.status === 'Pending' && (
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <button style={{ flex: 1, padding: '5px', borderRadius: 6, background: '#D1FAE5', border: '1px solid #6EE7B7', color: '#065F46', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>✓ Approve</button>
                  <button style={{ flex: 1, padding: '5px', borderRadius: 6, background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>✗ Decline</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'payroll' && (
        <div style={{ flex: 1, padding: 14, overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <StatCard label="Gross Payroll (March)" value="₹62L" change="+4%" color={color} icon="💰" />
            <StatCard label="TDS Deducted" value="₹8.4L" change="+2%" color="#64748B" icon="🏛️" />
            <StatCard label="Net Disbursed" value="₹53.6L" change="+4%" color="#10B981" icon="✅" />
            <StatCard label="Pending Arrears" value="₹1.2L" change="-3" color="#F59E0B" icon="⏳" />
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em' }}>Payroll Trend</div>
            <MiniBarChart data={[540000, 558000, 560000, 572000, 568000, 580000, 592000, 600000, 608000, 612000, 618000, 620000]} color={color} labels={['A','M','J','J','A','S','O','N','D','J','F','M']} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   DEMO ROUTER — maps project category/title → demo
═══════════════════════════════════════════════════ */
export function DemoRouter({ project }) {
  const { cat, title, color } = project

  if (cat === 'AI Solutions') return <AIChatDemo color={color} title={title} />
  if (cat === 'Business Software') return <GymDemo color={color} />
  if (cat === 'E-Commerce') return <ECommerceDemo color={color} />

  if (cat === 'Small Business') {
    if (title.includes('Salon') || title.includes('Spa') || title.includes('Fitness') || title.includes('Studio')) return <SalonDemo color={color} title={title} />
    if (title.includes('Restaurant') || title.includes('Food')) return <RestaurantDemo color={color} />
    if (title.includes('Real Estate')) return <RealEstateDemo color={color} />
    if (title.includes('Retail') || title.includes('POS')) return <RetailPOSDemo color={color} />
    return <SalonDemo color={color} title={title} />
  }

  if (cat === 'Large Business') {
    if (title.includes('Supply')) return <SupplyChainDemo color={color} />
    if (title.includes('HR') || title.includes('Talent')) return <HRDemo color={color} />
    return <ERPDemo color={color} />
  }

  if (cat === 'Tech Solutions') return <AIChatDemo color={color} title={title} />

  return <GymDemo color={color} />
}

export default function DemoScreens() {
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20 }}>
        Demo Screens
      </h1>

      <div style={{ display: 'grid', gap: 20 }}>
        <AIChatDemo />
        <GymDemo />
        <ECommerceDemo />
        <SalonDemo />
        <ERPDemo />
        <RetailPOSDemo />
      </div>
    </div>
  )
}