import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Sparkline from '../components/crypto/Sparkline'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Fallback static data if API is unreachable
const FALLBACK = [
  { _id:'1', name:'Bitcoin',   symbol:'BTC',  price:67450,  change24h:2.75,  image:'' },
  { _id:'2', name:'Ethereum',  symbol:'ETH',  price:3520,   change24h:3.85,  image:'' },
  { _id:'3', name:'Tether',    symbol:'USDT', price:1.00,   change24h:-0.01, image:'' },
  { _id:'4', name:'BNB',       symbol:'BNB',  price:608,    change24h:3.23,  image:'' },
  { _id:'5', name:'XRP',       symbol:'XRP',  price:1.31,   change24h:1.15,  image:'' },
  { _id:'6', name:'USDC',      symbol:'USDC', price:1.00,   change24h:0.00,  image:'' },
  { _id:'7', name:'Solana',    symbol:'SOL',  price:185.20, change24h:3.59,  image:'' },
  { _id:'8', name:'Cardano',   symbol:'ADA',  price:0.62,   change24h:1.82,  image:'' },
]

const SYMBOL_COLORS = {
  BTC:'#F7931A', ETH:'#627EEA', USDT:'#26A17B', BNB:'#F0B90B',
  XRP:'#346AA9', USDC:'#2775CA', SOL:'#9945FF', ADA:'#0D1E2D',
  AVAX:'#E84142', LINK:'#2A5ADA',
}

const formatPrice = (p) => {
  if (!p && p !== 0) return '$0.00'
  if (p >= 1000) return '$' + p.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 })
  if (p >= 1)    return '$' + p.toFixed(2)
  return '$' + p.toFixed(4)
}

const statCards = [
  { label:'Total market cap', val:'$24.71T', change:'+2.46%', pos:true  },
  { label:'Trade volume',     val:'$1.93T',  change:'+53.76%',pos:true  },
  { label:'Buy-sell ratio',   val:'0.76',    change:'+0.32%', pos:true  },
  { label:'BTC dominance',    val:'60.39%',  change:'+0.33%', pos:true  },
]

const MiniChart = ({ positive }) => {
  const pts = positive
    ? "10,55 30,48 50,52 70,40 90,44 110,35 130,38 150,28 170,32 190,20 210,25 230,15"
    : "10,25 30,32 50,28 70,38 90,34 110,45 130,40 150,50 170,46 190,55 210,50 230,58"
  return (
    <svg viewBox="0 0 240 70" className="w-full h-12">
      <polyline points={pts} fill="none" stroke={positive?'#00b894':'#d63031'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const Explore = () => {
  const nav = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch]       = useState('')
  const [sortKey, setSortKey]     = useState('price')
  const [sortDir, setSortDir]     = useState('desc')
  const [data, setData]           = useState([])
  const [loadingData, setLoading] = useState(true)
  const [error, setError]         = useState(null)

  const ENDPOINTS = {
    all:     `${API}/crypto`,
    gainers: `${API}/crypto/gainers`,
    new:     `${API}/crypto/new`,
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(ENDPOINTS[activeTab])
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        setData(json.data || [])
      } catch (err) {
        // If backend isn't running yet, use fallback static data
        console.warn('API unreachable, using fallback data:', err.message)
        setData(FALLBACK)
        setError('Could not reach the API. Showing sample data.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [activeTab])

  const filtered = useMemo(() => {
    let d = [...data]
    if (search.trim()) {
      const q = search.toLowerCase()
      d = d.filter(a => a.name.toLowerCase().includes(q) || a.symbol.toLowerCase().includes(q))
    }
    const keys = { price:'price', chg:'change24h', name:'name' }
    const k = keys[sortKey] || 'price'
    d.sort((a, b) => {
      if (typeof a[k] === 'string') return sortDir==='asc' ? a[k].localeCompare(b[k]) : b[k].localeCompare(a[k])
      return sortDir==='asc' ? (a[k]||0)-(b[k]||0) : (b[k]||0)-(a[k]||0)
    })
    return d
  }, [data, search, sortKey, sortDir])

  const sort = k => { if (sortKey===k) setSortDir(d=>d==='asc'?'desc':'asc'); else { setSortKey(k); setSortDir('desc') } }

  const Th = ({ label, k, className='' }) => (
    <th className={`py-3 text-sm font-semibold text-gray-700 cursor-pointer hover:text-gray-900 select-none ${className}`} onClick={() => sort(k)}>
      <span className="flex items-center gap-1">
        {label}
        {sortKey===k ? (sortDir==='asc'?'↑':'↓') : <span className="text-gray-400 text-xs">⇅</span>}
      </span>
    </th>
  )

  const getColor = (symbol) => SYMBOL_COLORS[symbol] || '#0052FF'

  return (
    <div className="bg-white flex-1 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 pt-10">

          {/* ── Main content ── */}
          <div>
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-950 tracking-tight">Explore crypto</h1>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  Coinbase 50 Index is up
                  <span className="text-green-600 font-semibold">↗ 3.00% (24hrs)</span>
                  <span className="text-gray-400 cursor-help" title="Info">ⓘ</span>
                </p>
              </div>
              <div className="relative w-64">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" placeholder="Search for an asset" value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-100 border-0 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052FF]"/>
              </div>
            </div>

            {/* Market stats */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-gray-900">Market stats</h2>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">
                The overall crypto market is growing this week. As of today, the total crypto market capitalization is 24.59 trillion, representing a 4.16% increase from last week.
              </p>
              <button className="text-sm text-[#0052FF] font-semibold mb-4">Read more</button>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {statCards.map(s => (
                  <div key={s.label} className="border border-gray-200 rounded-2xl p-4">
                    <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                    <p className="text-lg font-bold text-gray-900">{s.val}</p>
                    <p className={`text-sm font-semibold ${s.pos?'text-green-600':'text-red-500'}`}>↗ {s.change}</p>
                    <MiniChart positive={s.pos}/>
                  </div>
                ))}
              </div>
            </div>

            {/* Crypto prices table */}
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h2 className="text-xl font-bold text-gray-900">
                  Crypto market prices{' '}
                  <span className="text-sm font-normal text-gray-400">{filtered.length} assets</span>
                </h2>

                {/* Tab switcher */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                  {[
                    { key:'all',     label:'All assets' },
                    { key:'gainers', label:'Top gainers' },
                    { key:'new',     label:'New on Coinbase' },
                  ].map(t => (
                    <button key={t.key} onClick={() => setActiveTab(t.key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
                        activeTab===t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}>{t.label}</button>
                  ))}
                </div>
              </div>

              {/* API error notice */}
              {error && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                  ⚠ {error}
                </div>
              )}

              {/* Loading state */}
              {loadingData ? (
                <div className="flex items-center justify-center py-16 text-gray-400">
                  <div className="w-6 h-6 border-2 border-[#0052FF] border-t-transparent rounded-full animate-spin mr-3"/>
                  Loading prices...
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 w-8"/>
                      <Th label="Asset"        k="name"  className="text-left pl-2"/>
                      <Th label="Market price" k="price" className="text-right"/>
                      <th className="py-3 text-sm font-semibold text-gray-700 text-center hidden md:table-cell">Chart</th>
                      <Th label="Change"       k="chg"   className="text-right"/>
                      <th className="py-3 text-sm font-semibold text-gray-700 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a) => {
                      const pos   = a.change24h >= 0
                      const color = getColor(a.symbol)
                      const sparkData = Array.from({length:20}, (_,i) =>
                        a.price * (1 + (pos?1:-1) * 0.003 * i + (Math.random()-0.5)*0.002))
                      return (
                        <tr key={a._id || a.id}
                          className="border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => nav(`/asset/${a._id || a.id}`)}>
                          <td className="py-4">
                            <button className="text-gray-300 hover:text-yellow-400 transition-colors" onClick={e=>e.stopPropagation()}>☆</button>
                          </td>
                          <td className="py-4 pl-2">
                            <div className="flex items-center gap-3">
                              {a.image ? (
                                <img src={a.image} alt={a.name} className="w-9 h-9 rounded-full object-contain"/>
                              ) : (
                                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                                  style={{ background: color + '22', color }}>
                                  {a.symbol[0]}
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{a.name}</p>
                                <p className="text-xs text-gray-400">{a.symbol}
                                  {a.symbol==='USDC' && <span className="text-[#0052FF] ml-1">• Earns 3.35% APY</span>}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <p className="text-sm font-semibold text-gray-900">{formatPrice(a.price)}</p>
                          </td>
                          <td className="py-4 text-center hidden md:table-cell">
                            <Sparkline data={sparkData} positive={pos} width={60} height={28}/>
                          </td>
                          <td className="py-4 text-right">
                            <span className={`text-sm font-semibold ${pos?'text-green-600':'text-red-500'}`}>
                              {pos?'↑':'↓'} {Math.abs(a.change24h).toFixed(2)}%
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <button onClick={e=>{e.stopPropagation();nav(`/asset/${a._id||a.id}`)}}
                              className="px-4 py-1.5 bg-[#0052FF] text-white text-sm font-bold rounded-full hover:bg-blue-700 transition-colors">
                              Trade
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="space-y-4 pt-1">
            <div className="bg-[#0052FF] rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-60">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center">
                  <span className="text-2xl">✦</span>
                </div>
              </div>
              <p className="text-lg font-bold text-white mb-1">Get started</p>
              <p className="text-sm text-blue-100 mb-4">Create your account today</p>
              <button onClick={() => nav('/signup')}
                className="px-5 py-2 bg-white text-gray-900 font-bold text-sm rounded-full hover:bg-gray-100 transition-colors">
                Sign up
              </button>
            </div>

            {/* Top movers */}
            <div className="border border-gray-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-base font-bold text-gray-900">Top movers</p>
                <div className="flex gap-1">
                  <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-xs hover:bg-gray-50">←</button>
                  <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-xs hover:bg-gray-50">→</button>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-3">24hr change</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { sym:'FAI',  pct:'28.28%', price:'$0.0944', col:'#4CAF50' },
                  { sym:'EDGE', pct:'12.77%', price:'$1.80',   col:'#2196F3' },
                ].map(m => (
                  <div key={m.sym} className="bg-gray-50 rounded-xl p-3">
                    <div className="w-8 h-8 rounded-full mb-2" style={{background:m.col}}/>
                    <p className="text-xs font-bold text-gray-900">{m.sym}</p>
                    <p className="text-sm font-bold text-green-600">↗ {m.pct}</p>
                    <p className="text-xs text-gray-500">{m.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* New on Coinbase */}
            <div className="border border-gray-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-base font-bold text-gray-900">New on Coinbase</p>
                <div className="flex gap-1">
                  <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-xs hover:bg-gray-50">←</button>
                  <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-xs hover:bg-gray-50">→</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name:'Hyperliquid', sym:'HYPE',    date:'Added Feb 5', col:'#4CAF50' },
                  { name:'Jupiter',     sym:'JUPITER', date:'Added Dec 9', col:'#9C27B0' },
                ].map(n => (
                  <div key={n.sym} className="bg-gray-50 rounded-xl p-3">
                    <div className="w-8 h-8 rounded-full mb-2" style={{background:n.col}}/>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">{n.sym}</p>
                    <p className="text-sm font-bold text-gray-900">{n.name}</p>
                    <p className="text-xs text-gray-400">{n.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Explore
