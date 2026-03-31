import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Icon } from './components/Icons'
import Home from './pages/Home'
import DemoScreens from './pages/DemoScreens'   // ✅ ADDED

import {
  Services,
  ServiceDetail,
  Projects,
  Blog,
  BlogPost,
  About,
  Contact,
} from './pages/Pages'

function Toast() {
  const { toast } = useApp()
  if (!toast.show) return null
  return (
    <div className="toast">
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3B82F6', flexShrink: 0 }} />
      {toast.msg}
    </div>
  )
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917666519682"
      target="_blank"
      rel="noopener noreferrer"
      className="wa-btn"
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp"
    >
      <Icon name="whatsapp" size={28} color="#fff" />
    </a>
  )
}

function PageRenderer() {
  const { page } = useApp()
  if (page === 'home')      return <Home />
  if (page === 'services')  return <Services />
  if (page === 'service')   return <ServiceDetail />
  if (page === 'projects')  return <Projects />
  if (page === 'blog')      return <Blog />
  if (page === 'blogpost')  return <BlogPost />
  if (page === 'about')     return <About />
  if (page === 'contact')   return <Contact />

  // ✅ ONLY ADDED (DemoScreens)
  if (page === 'demos')     return <DemoScreens />

  if (page === '404')       return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
    </div>
  )

  return <Home />
}

function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: 76, minHeight: '100vh', background: 'var(--white)' }}>
        <PageRenderer />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  )
}