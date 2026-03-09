import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const CookieBanner = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-gray-800 px-6 py-4 flex items-center justify-between gap-4 z-50">
    <p className="text-xs text-gray-400 leading-relaxed">
      We use strictly necessary cookies to enable essential functions, such as security and authentication. For more information, see our{' '}
      <a href="#" className="text-[#0052FF] no-underline hover:underline">Cookie Policy</a>.
    </p>
    <button className="shrink-0 px-5 py-2 bg-[#0052FF] text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors">
      Dismiss
    </button>
  </div>
)

/* Step 1: Create account (screenshot 3) */
const StepCreate = ({ onContinue }) => {
  const nav = useNavigate()
  const [email, setEmail] = useState('')

  return (
    <div className="w-full max-w-[400px] space-y-6">
      <div>
        <h1 className="text-[28px] font-bold text-white mb-1">Create your account</h1>
        <p className="text-sm text-gray-400">Access all that Coinbase has to offer with a single account.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1.5">Email</label>
          <input type="email" placeholder="Your email address" value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key==='Enter' && email && onContinue(email)}
            className="w-full px-4 py-3.5 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 text-sm"/>
        </div>
        <button onClick={() => email && onContinue(email)} disabled={!email}
          className="w-full py-3.5 bg-[#3d5aed] text-white font-semibold rounded-full hover:bg-[#0052FF] transition-colors disabled:opacity-40 text-sm">
          Continue
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-800"/>
        <span className="text-xs text-gray-500 uppercase tracking-wide">OR</span>
        <div className="flex-1 h-px bg-gray-800"/>
      </div>

      <div className="space-y-3">
        {[
          { label:'Sign up with Google', icon:<svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
          { label:'Sign up with Apple',  icon:<svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> },
        ].map(b => (
          <button key={b.label}
            className="w-full flex items-center gap-3 px-5 py-3.5 bg-[#1a1a1a] border border-gray-700 rounded-full hover:bg-[#222] transition-colors text-sm font-semibold text-white">
            <span className="shrink-0">{b.icon}</span>
            {b.label}
          </button>
        ))}
      </div>

      <p className="text-center text-sm font-semibold text-white">
        Already have an account?{' '}
        <Link to="/signin" className="text-[#0052FF] no-underline hover:underline">Sign in</Link>
      </p>

      <p className="text-center text-xs text-gray-600 leading-relaxed">
        By creating an account you certify that you are over the age of 18 and agree to our{' '}
        <a href="#" className="text-[#0052FF] no-underline hover:underline">Privacy Policy</a>{' '}and{' '}
        <a href="#" className="text-[#0052FF] no-underline hover:underline">Cookie Policy</a>.
      </p>
    </div>
  )
}

/* Step 2: Account type picker (screenshot 2) */
const StepPicker = ({ onPick }) => {
  const types = [
    {
      id:'personal',
      label:'Personal',
      desc:'Trade crypto as an individual.',
      icon:(
        <div className="relative w-12 h-12">
          <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        </div>
      )
    },
    {
      id:'business',
      label:'Business',
      desc:'Manage teams and portfolios, accept crypto payments, access APIs, and more',
      icon:(
        <div className="relative w-12 h-12">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
            <span className="text-[8px] font-bold text-black">$</span>
          </div>
        </div>
      )
    },
    {
      id:'developer',
      label:'Developer',
      desc:'Build onchain using developer tooling.',
      icon:(
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-yellow-400 to-blue-700 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          </div>
        </div>
      )
    },
  ]

  return (
    <div className="w-full max-w-[400px] space-y-4">
      <h1 className="text-[26px] font-bold text-white leading-snug">
        What kind of account are you creating?
      </h1>
      <div className="space-y-3 pt-2">
        {types.map(t => (
          <button key={t.id} onClick={() => onPick(t.id)}
            className="w-full flex items-center gap-4 p-5 border border-gray-700 rounded-2xl hover:border-gray-500 hover:bg-[#1a1a1a] transition-colors text-left">
            {t.icon}
            <div>
              <p className="text-sm font-bold text-white">{t.label}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{t.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

/* Step 3: Password */
const StepPassword = ({ email, accountType, onSubmit, loading }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3
  const strengthColor = ['bg-gray-700','bg-red-500','bg-yellow-500','bg-green-500'][strength]
  const strengthLabel = ['','Weak','Fair','Strong'][strength]

  return (
    <div className="w-full max-w-[400px] space-y-5">
      <div>
        <h1 className="text-[28px] font-bold text-white mb-1">Finish setting up</h1>
        <p className="text-sm text-gray-400">{email} · {accountType}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1.5">Full name</label>
        <input type="text" placeholder="Your full name" value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-3.5 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 text-sm"/>
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1.5">Password</label>
        <input type="password" placeholder="Create a password" value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3.5 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 text-sm"/>
        {password.length > 0 && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex gap-1 flex-1">
              {[1,2,3].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i<=strength ? strengthColor : 'bg-gray-700'}`}/>)}
            </div>
            <span className="text-xs text-gray-400">{strengthLabel}</span>
          </div>
        )}
      </div>
      <button onClick={() => onSubmit(name, password)} disabled={loading || !name || !password}
        className="w-full py-3.5 bg-[#3d5aed] text-white font-semibold rounded-full hover:bg-[#0052FF] transition-colors disabled:opacity-40 text-sm">
        {loading ? 'Creating account...' : 'Create account'}
      </button>
      <p className="text-center text-xs text-gray-600 leading-relaxed">
        By creating an account you certify that you are over the age of 18 and agree to our{' '}
        <a href="#" className="text-[#0052FF] no-underline hover:underline">Privacy Policy</a> and{' '}
        <a href="#" className="text-[#0052FF] no-underline hover:underline">Cookie Policy</a>.
      </p>
    </div>
  )
}

const SignUp = () => {
  const nav = useNavigate()
  const { signUp, loading } = useAuth()
  const [step, setStep] = useState(1)
  const [email, setEmailState] = useState('')
  const [accountType, setAccountType] = useState('')

  const handleContinue = (em) => { setEmailState(em); setStep(2) }
  const handlePick = (type) => { setAccountType(type); setStep(3) }
  const handleSubmit = async (name, password) => {
    const r = await signUp(email, password, name)
    if (r.ok) nav('/')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col pb-20">
      <div className="p-6">
        <Link to="/" className="no-underline">
          <svg width="32" height="32" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#0052FF"/><circle cx="18" cy="18" r="8.5" fill="white"/></svg>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        {step === 1 && <StepCreate onContinue={handleContinue}/>}
        {step === 2 && <StepPicker onPick={handlePick}/>}
        {step === 3 && <StepPassword email={email} accountType={accountType} onSubmit={handleSubmit} loading={loading}/>}
      </div>
      <CookieBanner/>
    </div>
  )
}
export default SignUp
