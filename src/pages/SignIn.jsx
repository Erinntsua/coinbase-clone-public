import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const SignIn = () => {
  const nav = useNavigate()
  const { signIn, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState(1) // 1=email, 2=password

  const handleContinue = async () => {
    if (step === 1) { if (email) setStep(2); return }
    if (!password) return
    const r = await signIn(email, password)
    if (r.ok) nav('/')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="no-underline">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill="#0052FF"/>
            <circle cx="18" cy="18" r="8.5" fill="white"/>
          </svg>
        </Link>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-[400px] space-y-6">
          <h1 className="text-[28px] font-bold text-white">Sign in to Coinbase</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">Email</label>
              <input type="email" placeholder="Your email address" value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key==='Enter' && handleContinue()}
                className="w-full px-4 py-3.5 bg-[#1a1a1a] border border-[#0052FF] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#0052FF] text-sm"/>
            </div>

            {step === 2 && (
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Password</label>
                <input type="password" placeholder="Your password" value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key==='Enter' && handleContinue()}
                  autoFocus
                  className="w-full px-4 py-3.5 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#0052FF] text-sm"/>
              </div>
            )}

            <button onClick={handleContinue} disabled={loading || !email}
              className="w-full py-3.5 bg-[#3d5aed] text-white font-semibold rounded-full hover:bg-[#0052FF] transition-colors disabled:opacity-50 text-sm">
              {loading ? 'Signing in...' : 'Continue'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-800"/>
            <span className="text-xs text-gray-500 uppercase tracking-wide">OR</span>
            <div className="flex-1 h-px bg-gray-800"/>
          </div>

          <div className="space-y-3">
            {[
              { label:'Sign in with Passkey', icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
              { label:'Sign in with Google', icon:<svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
              { label:'Sign in with Apple', icon:<svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> },
            ].map(b => (
              <button key={b.label}
                className="w-full flex items-center gap-3 px-5 py-3.5 bg-[#1a1a1a] border border-gray-700 rounded-full hover:bg-[#222] transition-colors text-sm font-semibold text-white">
                <span className="shrink-0">{b.icon}</span>
                {b.label}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#0052FF] font-semibold no-underline hover:underline">Sign up</Link>
          </p>
          <p className="text-center text-xs text-gray-600">
            Not your device? Use a private window. See our{' '}
            <a href="#" className="text-[#0052FF] no-underline hover:underline">Privacy Policy</a> for more info.
          </p>
        </div>
      </div>

      {/* Cookie banner */}
      <div className="bg-[#111] border-t border-gray-800 px-6 py-4 flex items-center justify-between gap-4">
        <p className="text-xs text-gray-400 leading-relaxed">
          We use strictly necessary cookies to enable essential functions, such as security and authentication. For more information, see our{' '}
          <a href="#" className="text-[#0052FF] no-underline hover:underline">Cookie Policy</a>.
        </p>
        <button className="shrink-0 px-5 py-2 bg-[#0052FF] text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors">
          Dismiss
        </button>
      </div>
    </div>
  )
}
export default SignIn
