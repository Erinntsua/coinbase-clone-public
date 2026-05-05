import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const ChevronDown = ({ open }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${open?'rotate-180':''}`}>
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const Icon = ({ d, size=16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-500"><path d={d}/></svg>
)

// Exact dropdown data from screenshots
const MENUS = {
  Individuals: [
    { label:'Buy and sell',     sub:'Buy, sell, and use crypto',                  icon:'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' },
    { label:'Advanced',         sub:'Professional-grade trading tools',            icon:'M3 3h18v18H3zM9 9h6v6H9z' },
    { label:'Base App',         sub:'Post, earn, trade, and chat, all in one place',icon:'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
    { label:'Earn',             sub:'Stake your crypto and earn rewards',           icon:'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
    { label:'Coinbase One',     sub:'Get zero trading fees and more',               icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { label:'Coinbase Wealth',  sub:'Institutional-grade services for UHNW',       icon:'M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z' },
    { label:'Private Client',   sub:'For trusts, family offices, UHNWIs',          icon:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' },
    { label:'Credit Card',      sub:'Earn up to 4% bitcoin back',                  icon:'M1 10h22M1 6h22v12H1zM5 14h2' },
    { label:'Onchain',          sub:'Dive into the world of onchain apps',         icon:'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' },
    { label:'Debit Card',       sub:'Spend crypto, get crypto back',               icon:'M1 6h22v12H1zM1 10h22' },
    { label:'Learn',            sub:'Crypto tips and guides',                      icon:'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  ],
  Businesses: [
    { label:'Business',         sub:'Crypto trading and payments for startups and SMBs', icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
    { label:'Asset Listings',   sub:'List your asset on Coinbase',                       icon:'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
    { label:'Payments',         sub:'The stablecoin payments stack for commerce platforms',icon:'M1 6h22v12H1zM1 10h22' },
    { label:'Token Manager',    sub:'The platform for token distributions, vesting, and lockups', icon:'M21 12V7H5a2 2 0 0 1 0-4h14v4' },
  ],
  Institutions: [
    { label:'Prime',            sub:'', isHeader:true },
    { label:'Trading and Financing', sub:'Professional prime brokerage services',  icon:'M3 3h18v18H3z' },
    { label:'Custody',          sub:'Securely store all your digital assets',       icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { label:'Staking',          sub:'Explore staking across our products',          icon:'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
    { label:'Onchain Wallet',   sub:'Institutional-grade wallet to get onchain',   icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
    { label:'Markets',          sub:'', isHeader:true },
    { label:'Exchange',         sub:'Spot markets for high-frequency trading',     icon:'M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4' },
    { label:'International Exchange', sub:'Access perpetual futures markets',      icon:'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' },
    { label:'Derivatives Exchange',   sub:'Trade an accessible futures market',    icon:'M3 3h18v18H3z' },
    { label:'Verified Pools',   sub:'Transparent, verified liquidity pools',       icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  ],
  Developers: [
    { label:'Coinbase Developer Platform', sub:'', isHeader:true },
    { label:'Payments',         sub:'Fast and global stablecoin payments',         icon:'M1 6h22v12H1z' },
    { label:'Trading',          sub:'Launch crypto trading and custody for your users', icon:'M3 3h18v18H3z' },
    { label:'Wallets',          sub:'Deploy customizable and scalable wallets',    icon:'M3 9l9-7 9 7v11H5z' },
    { label:'Stablecoins',      sub:'Access USDC and Coinbase Custom Stablecoins', icon:'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' },
    { label:'Solutions for any company', sub:'', isHeader:true },
    { label:'Banks & Brokerages',sub:'Secure, regulated offerings for retail, private banking',icon:'M3 9l9-7 9 7v11H5z' },
    { label:'Payment Firms',    sub:'Near-instant, low-cost, global payment rails', icon:'M1 6h22v12H1z' },
    { label:'Startups',         sub:'Launch your business with the world\'s leader in crypto', icon:'M12 2l10 5v10L12 22 2 17V7z' },
  ],
  Company: [
    { label:'About',    sub:'Powering the crypto economy',    icon:'M12 22c10 0 10-20 0-20S2 12 2 12s10 10 10 10z' },
    { label:'Careers',  sub:'Work with us',                   icon:'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' },
    { label:'Affiliates',sub:'Help introduce the world to crypto', icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' },
    { label:'Support',  sub:'Find answers to your questions', icon:'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
    { label:'Blog',     sub:'Read the latest from Coinbase',  icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' },
    { label:'Security', sub:'The most trusted & secure',      icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  ],
}

const DropdownMenu = ({ items, wide }) => {
  const headers = items.filter(i => i.isHeader)
  const hasTwoCol = headers.length >= 2

  if (hasTwoCol) {
    const mid = items.findIndex((i,idx) => i.isHeader && idx > 0)
    const col1 = items.slice(0, mid)
    const col2 = items.slice(mid)
    return (
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 py-5 px-4 w-[640px]">
        <div className="grid grid-cols-2 gap-6">
          {[col1, col2].map((col, ci) => (
            <div key={ci}>
              {col.map(item => item.isHeader ? (
                <div key={item.label} className="flex items-center gap-1 mb-2 mt-1">
                  <span className="text-sm font-bold text-gray-900">{item.label}</span>
                  {item.label === 'Prime' || item.label === 'Coinbase Developer Platform' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  ) : null}
                </div>
              ) : (
                <a key={item.label} href="#" className="flex items-start gap-3 px-2 py-2.5 rounded-xl hover:bg-gray-50 transition-colors no-underline group">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon d={item.icon} size={15}/>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 leading-snug">{item.label}</p>
                    {item.sub && <p className="text-xs text-gray-500 leading-snug mt-0.5">{item.sub}</p>}
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 py-5 px-4 w-[340px]">
      {items.map(item => (
        <a key={item.label} href="#" className="flex items-start gap-3 px-2 py-2.5 rounded-xl hover:bg-gray-50 transition-colors no-underline group">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
            <Icon d={item.icon} size={15}/>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-snug">{item.label}</p>
            {item.sub && <p className="text-xs text-gray-500 leading-snug mt-0.5">{item.sub}</p>}
          </div>
        </a>
      ))}
    </div>
  )
}

const NavItem = ({ label, to }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  const nav = useNavigate()
  const items = MENUS[label]

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  if (!items) return (
    <button onClick={() => nav(to || '/')}
      className="px-3 py-2 text-[15px] font-medium text-gray-800 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap">
      {label}
    </button>
  )

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className={`flex items-center gap-1.5 px-3 py-2 text-[15px] font-medium rounded-full transition-colors whitespace-nowrap ${open?'bg-gray-100 text-gray-900':'text-gray-800 hover:bg-gray-100'}`}>
        {label} <ChevronDown open={open}/>
      </button>
      {open && <DropdownMenu items={items} />}
    </div>
  )
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, signOut } = useAuth()
  const nav = useNavigate()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-[60px] gap-1">
          <Link to="/" className="mr-3 shrink-0 no-underline">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#0052FF"/>
              <circle cx="18" cy="18" r="8.5" fill="white"/>
            </svg>
          </Link>

          <nav className="hidden xl:flex items-center gap-0">
            <NavItem label="Cryptocurrencies" to="/explore"/>
            <NavItem label="Individuals"/>
            <NavItem label="Businesses"/>
            <NavItem label="Institutions"/>
            <NavItem label="Developers"/>
            <NavItem label="Company"/>
          </nav>

          <div className="hidden xl:flex items-center gap-1 ml-auto">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </button>
            {user ? (
              <>
                <button onClick={() => nav('/profile')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-[#0052FF] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">
                      {user.name ? user.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) : '?'}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{user.name?.split(' ')[0]}</span>
                </button>
                <button onClick={() => { signOut(); nav('/') }}
                  className="px-5 py-2 text-sm font-semibold border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => nav('/signin')} className="px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 rounded-full transition-colors">Sign in</button>
                <button onClick={() => nav('/signup')} className="px-5 py-2 text-sm font-bold text-white bg-[#0052FF] rounded-full hover:bg-blue-700 transition-colors">Sign up</button>
              </>
            )}
          </div>

          <div className="xl:hidden flex items-center gap-1 ml-auto">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-full hover:bg-gray-100">
              {mobileOpen
                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              }
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200 max-h-[85vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-0.5">
            {[{l:'Prices',to:'/explore'},{l:'Buy & sell',to:'/'},{l:'Coinbase One',to:'/'},{l:'Earn',to:'/'},{l:'Learn',to:'/learn'},{l:'About',to:'/'},{l:'Careers',to:'/'}].map(i=>(
              <Link key={i.l} to={i.to} onClick={()=>setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-900 no-underline hover:bg-gray-50">{i.l}</Link>
            ))}
            <div className="pt-3 border-t border-gray-100 flex gap-2">
              <button onClick={()=>{setMobileOpen(false);nav('/signin')}} className="flex-1 py-2.5 text-sm font-semibold border border-gray-300 rounded-full hover:bg-gray-50">Sign in</button>
              <button onClick={()=>{setMobileOpen(false);nav('/signup')}} className="flex-1 py-2.5 text-sm font-bold text-white bg-[#0052FF] rounded-full hover:bg-blue-700">Sign up</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
export default Navbar
