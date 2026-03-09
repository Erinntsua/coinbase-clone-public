import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cryptoAssets, formatPrice, formatBigNum } from '../data/cryptoData'
import Sparkline from '../components/crypto/Sparkline'

/* ── Phone mockup for hero (screenshot 1) ── */
const HeroPhone = () => (
  <div className="relative w-full max-w-[540px]">
    {/* Blue gradient background card */}
    <div className="rounded-[32px] overflow-hidden" style={{
      background: 'linear-gradient(160deg, #1a56ff 0%, #0a2fa8 50%, #061a7a 100%)',
      minHeight: 520,
      padding: '32px 20px 0 20px'
    }}>
      {/* Phone frame */}
      <div className="bg-white rounded-[28px] overflow-hidden shadow-2xl mx-auto" style={{maxWidth:320}}>
        {/* Phone top bar */}
        <div className="bg-white px-4 pt-4 pb-2 flex items-center justify-between border-b border-gray-100">
          <button className="p-1.5 rounded-lg hover:bg-gray-100">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div className="flex items-center gap-2 flex-1 mx-3 bg-gray-100 rounded-full px-3 py-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span className="text-xs text-gray-400">Search</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-full bg-[#0052FF] flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#0052FF"/><circle cx="16" cy="16" r="7.5" fill="white"/></svg>
            </div>
            <button className="p-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><rect x="2" y="3" width="7" height="7"/><rect x="15" y="3" width="7" height="7"/><rect x="2" y="14" width="7" height="7"/><rect x="15" y="14" width="7" height="7"/></svg>
            </button>
            <button className="p-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
          </div>
        </div>

        {/* Portfolio value */}
        <div className="bg-white px-4 pt-4 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">$33,683.80</p>
              <p className="text-sm font-semibold text-green-600 flex items-center gap-1 mt-0.5">
                <span>↗</span> $131.36 (1.38%) 1D <span className="text-gray-400">›</span>
              </p>
            </div>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white px-2 pb-1" style={{height:120}}>
          <svg viewBox="0 0 300 100" className="w-full h-full">
            <defs>
              <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0052FF" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#0052FF" stopOpacity="0.02"/>
              </linearGradient>
            </defs>
            <path d="M0,80 C20,75 30,70 50,65 C70,60 80,62 100,55 C120,48 130,50 150,42 C170,34 180,36 200,28 C220,20 240,22 260,15 C270,11 280,8 300,4"
              fill="none" stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
            <path d="M0,80 C20,75 30,70 50,65 C70,60 80,62 100,55 C120,48 130,50 150,42 C170,34 180,36 200,28 C220,20 240,22 260,15 C270,11 280,8 300,4 L300,100 L0,100 Z"
              fill="url(#heroGrad)"/>
            {/* Dot at end */}
            <circle cx="300" cy="4" r="4" fill="#0052FF"/>
            <circle cx="300" cy="4" r="8" fill="#0052FF" fillOpacity="0.2"/>
          </svg>
        </div>

        {/* Period tabs */}
        <div className="px-4 pb-3 flex items-center justify-between">
          {['1H','1D','1W','1M','1Y','ALL'].map(p => (
            <button key={p} className={`text-xs font-semibold px-2 py-1 rounded-full transition-colors ${p==='1D' ? 'text-[#0052FF] border border-[#0052FF] bg-blue-50' : 'text-gray-400 hover:text-gray-600'}`}>{p}</button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mx-4"/>

        {/* Asset rows */}
        {[
          { icon:'⊙', label:'Crypto',      val:'$14,186.12', chg:null,      pos:null  },
          { icon:'◑', label:'Stocks',      val:'$8,133.98',  chg:null,      pos:null  },
          { icon:'⟷', label:'Derivatives', val:'$148.84',    chg:'↗',       pos:true  },
          { icon:'◎', label:'Predictions', val:'$42.69',     chg:'↗',       pos:true  },
          { icon:'◻', label:'Cash',        val:'$10,124.22', chg:null,      pos:null  },
        ].map(r => (
          <div key={r.label} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-600">{r.icon}</div>
              <span className="text-sm font-semibold text-gray-900">{r.label}</span>
            </div>
            <span className={`text-sm font-semibold ${r.pos ? 'text-green-600' : 'text-gray-900'}`}>
              {r.chg && <span>{r.chg} </span>}{r.val}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

/* ── Dark crypto price card (screenshot from previous) ── */
const DarkPriceCard = () => {
  const [tab, setTab] = useState('Tradable')
  const nav = useNavigate()
  return (
    <div className="bg-[#1a1a1a] rounded-[28px] overflow-hidden w-full max-w-[560px]">
      <div className="flex items-center gap-1 p-4 pb-2">
        {['Tradable','Top gainers','New on Coinbase'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
              tab===t ? 'bg-[#333] text-white' : 'text-gray-400 hover:text-white'}`}>{t}</button>
        ))}
      </div>
      <div className="px-2 pb-4">
        {cryptoAssets.slice(0,6).map((a,i) => {
          const pos = a.change24h >= 0
          return (
            <div key={a.id} onClick={() => nav(`/asset/${a.id}`)}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-colors ${i===5 ? 'bg-[#2a2a2a]' : 'hover:bg-[#2a2a2a]'}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  style={{ background: a.color, color:'white' }}>{a.symbol[0]}</div>
                <span className="text-base font-semibold text-white">{a.name}</span>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold text-white">{formatPrice(a.price)}</p>
                <p className={`text-sm font-medium ${pos ? 'text-green-400' : 'text-red-400'}`}>
                  {pos ? '↑' : '↓'} {Math.abs(a.change24h).toFixed(2)}%
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Crypto icon cluster ── */
const CryptoCluster = () => (
  <div className="relative w-[360px] h-[360px] shrink-0">
    <div className="absolute" style={{left:70,top:120}}>
      <div className="w-28 h-28 rounded-full bg-[#0052FF] flex items-center justify-center shadow-xl">
        <svg width="56" height="56" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#0052FF"/><circle cx="18" cy="18" r="8.5" fill="white"/></svg>
      </div>
    </div>
    <div className="absolute" style={{left:165,top:8}}>
      <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center shadow-xl">
        <span className="text-white font-bold text-2xl">∧</span>
      </div>
    </div>
    <div className="absolute" style={{left:255,top:55}}>
      <div className="w-24 h-24 rounded-full bg-[#FFD700] flex items-center justify-center shadow-xl">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </div>
    </div>
    <div className="absolute" style={{left:170,top:125}}>
      <div className="w-24 h-24 rounded-full bg-[#F7931A] flex items-center justify-center shadow-xl">
        <span className="text-white font-bold text-3xl">₿</span>
      </div>
    </div>
    <div className="absolute" style={{left:60,top:235}}>
      <div className="w-24 h-24 rounded-full bg-[#C2A633] flex items-center justify-center shadow-xl">
        <span className="text-white font-bold text-2xl">Ɖ</span>
      </div>
    </div>
    <div className="absolute" style={{left:170,top:255}}>
      <div className="w-24 h-24 rounded-full bg-[#627EEA] flex items-center justify-center shadow-xl">
        <span className="text-white font-bold text-2xl">⟠</span>
      </div>
    </div>
    <div className="absolute" style={{left:265,top:185}}>
      <div className="w-24 h-24 rounded-full bg-[#0033AD] flex items-center justify-center shadow-xl">
        <span className="text-white font-bold text-lg">✦</span>
      </div>
    </div>
  </div>
)

const AppFrame = ({ children, bg='bg-[#f0f0f0]' }) => (
  <div className={`${bg} rounded-[32px] overflow-hidden p-6 flex items-center justify-center`} style={{minHeight:340}}>
    <div className="bg-white rounded-[28px] overflow-hidden shadow-lg w-[260px]">{children}</div>
  </div>
)

const CoinbaseOneMock = () => (
  <AppFrame bg="bg-[#f5f5f5]">
    <div className="p-5 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">3:57</span>
        <div className="flex items-center gap-1 text-xs">▐▐▐ WiFi 🔋</div>
      </div>
      <div className="flex flex-col items-center py-2">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-[#0052FF] flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-[8px]">✦</span>
          </div>
        </div>
        <p className="text-sm font-bold text-gray-900 mt-2">Trade successful!</p>
        <p className="text-xs text-gray-500">You got 0.012423 BTC</p>
      </div>
      <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
        <span className="text-xs text-gray-700">$14.68</span>
        <span className="text-xs font-semibold text-gray-800">No trading fees with Coinbase One</span>
      </div>
      <div className="bg-gray-50 rounded-xl p-3">
        <p className="text-xs font-bold text-gray-900">Exclusive member benefits</p>
        <p className="text-xs text-gray-500 mt-0.5">Coinbase One members get boosted staking rewards.</p>
        <span className="text-xs text-[#0052FF] font-semibold">Learn more</span>
      </div>
    </div>
  </AppFrame>
)

const BaseAppMock = () => (
  <AppFrame bg="bg-[#f0f0f0]">
    <div>
      <div className="bg-white px-3 pt-3 pb-2 flex items-center justify-between border-b border-gray-100">
        <div className="w-7 h-7 rounded-full bg-gray-200"/>
        <div className="flex gap-4">
          <span className="text-xs font-bold text-gray-900 border-b-2 border-black pb-0.5">Trade</span>
          <span className="text-xs text-gray-400">Talk</span>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </div>
      <div className="bg-white px-3 py-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-purple-400"/>
          <span className="text-xs font-semibold text-gray-900">jasmine</span>
          <span className="text-xs text-gray-400 ml-auto">1s</span>
        </div>
        <p className="text-xs text-gray-600 mb-2">Detail on my new painting</p>
      </div>
      <div className="relative" style={{height:120}}>
        <div className="absolute inset-0" style={{background:'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 25%, #0984e3 50%, #6c5ce7 75%, #fd79a8 100%)'}}/>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 rounded-full px-3 py-1 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#0052FF"/><circle cx="16" cy="16" r="7.5" fill="white"/></svg>
            <span className="text-xs font-bold">$1.00</span>
          </div>
        </div>
      </div>
      <div className="bg-white px-3 py-2 flex items-center gap-3">
        <span className="text-xs text-gray-400">♥ 1.5K</span>
        <span className="text-xs text-gray-400">↑ $21K</span>
      </div>
    </div>
  </AppFrame>
)

const learnPosts = [
  { bg:'bg-black',     title:'USDC: The digital dollar for the global crypto economy', desc:'Coinbase believes crypto will be part of the solution for creating an open financial system that is both more efficient and more...', emoji:'💲' },
  { bg:'bg-[#0052FF]', title:'Can crypto really replace your bank account?',           desc:"If you're a big enough fan of crypto, you've probably heard the phrase \"be your own bank\" or the term \"bankless\" — the idea being that...", emoji:'🏦' },
  { bg:'bg-[#8FB5A0]', title:'When is the best time to invest in crypto?',             desc:'Cryptocurrencies like Bitcoin can experience daily (or even hourly) price volatility. As with any kind of investment, volatility may cause...', emoji:'₿' },
]

const Home = () => {
  const nav = useNavigate()
  const [email, setEmail] = useState('')

  return (
    <div className="bg-white flex-1">

      {/* ══ HERO (screenshot 1) — phone mockup left, headline + email right ══ */}
      <section className="bg-white pt-10 pb-0 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            {/* Left: phone mockup */}
            <div className="flex justify-start">
              <HeroPhone />
            </div>
            {/* Right: copy */}
            <div className="pb-16 space-y-6">
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-950 leading-[1.06] tracking-[-0.02em]">
                The future of finance is here.
              </h1>
              <p className="text-lg text-gray-600">
                Trade crypto and more on a platform you can trust.
              </p>
              <div className="flex gap-3 max-w-md">
                <input type="email" placeholder="satoshi@nakamoto.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3.5 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] transition-colors"/>
                <button onClick={() => nav('/signup')}
                  className="px-7 py-3.5 bg-[#0052FF] text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Sign up
                </button>
              </div>
              <p className="text-xs text-gray-400">Stocks and prediction markets not available in your jurisdiction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ EXPLORE CRYPTO DARK CARD ══ */}
      <section className="bg-[#f0f0f0] py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-extrabold text-gray-950 leading-[1.06] tracking-[-0.02em]">
                Explore crypto like Bitcoin, Ethereum, and Dogecoin.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
              </p>
              <button onClick={() => nav('/explore')}
                className="inline-flex items-center px-7 py-3.5 bg-gray-950 text-white font-bold text-sm rounded-full hover:bg-gray-800 transition-colors">
                See more assets
              </button>
            </div>
            <div className="flex justify-center lg:justify-end">
              <DarkPriceCard />
            </div>
          </div>
        </div>
      </section>

      {/* ══ POWERFUL TOOLS ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gray-950 rounded-[28px] overflow-hidden p-6 relative" style={{minHeight:320}}>
              <div className="flex gap-2 mb-3">
                <div className="bg-[#1a1a2e] rounded-lg px-3 py-1"><span className="text-xs text-blue-400 font-mono">BTC/USD</span></div>
                <div className="bg-[#0052FF] rounded-lg px-2 py-1 ml-auto"><span className="text-xs text-white font-semibold">Buy</span></div>
              </div>
              <svg viewBox="0 0 400 180" className="w-full" style={{height:180}}>
                {[40,60,35,80,55,90,45,70,60,85,50,95,65,75,55,88,72,60,92,78].map((h,i) => {
                  const x = i*20+5; const isGreen = i%3!==1
                  return (
                    <g key={i}>
                      <line x1={x+5} y1={180-h-10} x2={x+5} y2={180-h+10} stroke={isGreen?'#00b894':'#d63031'} strokeWidth="1"/>
                      <rect x={x} y={180-h-5} width={9} height={h*0.6} fill={isGreen?'#00b894':'#d63031'} rx="1"/>
                    </g>
                  )
                })}
              </svg>
            </div>
            <div className="space-y-5">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-950 leading-tight tracking-tight">
                Powerful tools, designed for the advanced trader.
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading experience. Tap into sophisticated charting capabilities, real-time order books, and deep liquidity across hundreds of markets.
              </p>
              <button onClick={() => nav('/signup')}
                className="inline-flex items-center px-7 py-3.5 bg-gray-950 text-white font-bold text-sm rounded-full hover:bg-gray-800 transition-colors">
                Start trading
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ COINBASE ONE ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5">
                <svg width="14" height="14" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#0052FF"/><circle cx="16" cy="16" r="7.5" fill="white"/></svg>
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">Coinbase One</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-950 leading-tight tracking-tight">
                Zero trading fees, more rewards.
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more.
              </p>
              <button onClick={() => nav('/signup')}
                className="inline-flex items-center px-7 py-3.5 bg-gray-950 text-white font-bold text-sm rounded-full hover:bg-gray-800 transition-colors">
                Claim free trial
              </button>
            </div>
            <CoinbaseOneMock />
          </div>
        </div>
      </section>

      {/* ══ BASE APP ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <BaseAppMock />
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5">
                <svg width="14" height="14" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#0052FF"/><circle cx="16" cy="16" r="7.5" fill="white"/></svg>
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">Base App</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-950 leading-tight tracking-tight">
                Countless ways to earn crypto with the Base App.
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                An everything app to trade, create, discover, and chat, all in one place.
              </p>
              <button onClick={() => nav('/signup')}
                className="inline-flex items-center px-7 py-3.5 bg-gray-950 text-white font-bold text-sm rounded-full hover:bg-gray-800 transition-colors">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ LEARN ══ */}
      <section className="bg-[#f0f0f0] py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-950 leading-tight tracking-tight">
              New to crypto?<br/>Learn some<br/>crypto basics
            </h2>
            <div className="space-y-4 lg:pt-4">
              <p className="text-base text-gray-600 leading-relaxed">
                Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between
              </p>
              <button onClick={() => nav('/learn')}
                className="inline-flex items-center px-7 py-3.5 bg-gray-950 text-white font-bold text-sm rounded-full hover:bg-gray-800 transition-colors">
                Read More
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {learnPosts.map(p => (
              <div key={p.title} className="cursor-pointer group" onClick={() => nav('/learn')}>
                <div className={`${p.bg} rounded-2xl flex items-center justify-center mb-4`} style={{height:200}}>
                  <span className="text-7xl">{p.emoji}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#0052FF] transition-colors">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TAKE CONTROL ══ */}
      <section className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-extrabold text-gray-950 leading-[1.06] tracking-tight">
                Take control<br/>of your money
              </h2>
              <p className="text-base text-gray-600">Start your portfolio today and discover crypto</p>
              <div className="flex gap-3 max-w-md">
                <input type="email" placeholder="satoshi@nakamoto.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3.5 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] transition-colors"/>
                <button onClick={() => nav('/signup')}
                  className="px-7 py-3.5 bg-[#0052FF] text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Sign up
                </button>
              </div>
              <p className="text-xs text-gray-400">DEX trading is offered by Coinbase Bermuda Technologies Ltd.</p>
              <p className="text-xs text-gray-400">Products and features may not be available in all regions. Information is for informational purposes only and is not an offer.</p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <CryptoCluster />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
export default Home
