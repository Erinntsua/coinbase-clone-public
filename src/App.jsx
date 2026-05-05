import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './hooks/useAuth'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Explore from './pages/Explore'
import AssetDetail from './pages/AssetDetail'
import Learn from './pages/Learn'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const ScrollTop = () => {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

const Layout = ({ children }) => {
  const { pathname } = useLocation()
  // Standalone dark pages with their own header
  const standalone = pathname === '/signin' || pathname === '/signup'
  return (
    <div className="flex flex-col min-h-screen">
      {!standalone && <Navbar />}
      <main className="flex-1 flex flex-col">{children}</main>
      {!standalone && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/"          element={<Home />} />
                <Route path="/explore"   element={<Explore />} />
                <Route path="/asset/:id" element={<AssetDetail />} />
                <Route path="/learn"     element={<Learn />} />
                <Route path="/profile"   element={<Profile />} />
                <Route path="/signin"    element={<SignIn />} />
                <Route path="/signup"    element={<SignUp />} />
                <Route path="*"          element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
