import { createContext, useContext, useState, useCallback } from 'react'

const Ctx = createContext(null)

export function AppProvider({ children }) {
  const [page, setPage]                     = useState('home')
  const [toast, setToast]                   = useState({ show: false, msg: '' })
  const [activeService, setActiveService]   = useState(null)
  const [activeBlog, setActiveBlog]         = useState(null)
  const [mobileOpen, setMobileOpen]         = useState(false)

  const navigate = useCallback((target, data) => {
    setPage(target)
    if (target === 'service' && data)  setActiveService(data)
    if (target === 'blogpost' && data) setActiveBlog(data)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMobileOpen(false)
  }, [])

  const showToast = useCallback((msg) => {
    setToast({ show: true, msg })
    setTimeout(() => setToast({ show: false, msg: '' }), 3200)
  }, [])

  return (
    <Ctx.Provider value={{
      page, navigate,
      toast, showToast,
      activeService,
      activeBlog,
      mobileOpen, setMobileOpen,
    }}>
      {children}
    </Ctx.Provider>
  )
}

export function useApp() {
  return useContext(Ctx)
}
