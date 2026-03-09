import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { cryptoAssets, formatPrice, formatBigNum } from '../data/cryptoData'
import Sparkline from '../components/crypto/Sparkline'

const statCards = [
  { label:'Total market cap',  val:'$24.71T', change:'+2.46%', pos:true  },
  { label:'Trade volume',      val:'$1.93T',  change:'+53.76%',pos:true  },
  { label:'Buy-sell ratio',    val:'0.76',    change:'+0.32%', pos:true  },
  { label:'BTC dominance',     val:'60.39%',  change:'+0.33%', pos:true  },
]

const MiniChart = ({ positive }) => {
  const pts = positive
    ? "10,55 30,48 50,52 70,40 90,44 110,35 130,38 150,28 170,32 190,20 210,25 230,15"
    : "10,25 30,32 50,28 70,38 90,34 110,45 130,40 150,50 170,46 190,55 210,50 230,58"
  return (
    <svg viewBox="0 0 240 70" className="w-full h-12">
      <defs>
        <linearGradient id={`g${positive}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={positive?'#00b894':'#d63031'} stopOpacity="0.2"/>
          <stop offset="100%" stopColor={positive?'#00b894':'#d63031'} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={positive?'#00b894':'#d63031'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const Explore = () => {
  const nav = useNavigate()
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('rank')
  const [sortDir, setSortDir] = useState('asc')

  const data = useMemo(() => {
    let d = [...cryptoAssets]
    if (search.trim()) {
      const q = search.toLowerCase()
      d = d.filter(a => a.name.toLowerCase().includes(q) || a.symbol.toLowerCase().includes(q))
    }
    const keyMap = { price:'price', chg:'change24h', mcap:'marketCap', vol:'volume24h', rank:'rank' }
    const k = keyMap[sortKey] || 'rank'
    d.sort((a,b) => sortDir==='asc' ? (a[k]??0)-(b[k]??0) : (b[k]??0)-(a[k]??0))
    return d
  }, [search, sortKey, sortDir])

  const sort = k => { if (sortKey===k) setSortDir(d=>d==='asc'?'desc':'asc'); else { setSortKey(k); setSortDir('asc') } }
  const Th = ({label,k,className=''}) => (
    <th className={`py-3 text-sm font-semibold text-gray-700 cursor-pointer hover:text-gray-900 select-none ${className}`} onClick={()=>sort(k)}>
      <span className="flex items-center gap-1">{label} {sortKey===k?(sortDir==='asc'?'↑':'↓'):<span className="text-gray-400 text-xs">⇅</span>}</span>
    </th>
  )

  return (
    <div className="bg-white flex-1 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 pt-10">

          {/* Main content */}
          <div>
            {/* Header */}
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
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">The overall crypto market is growing this week. As of today, the total crypto market capitalization is 24.59 trillion, representing a 4.16% increase from last week.</p>
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
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <h2 className="text-xl font-bold text-gray-900">Crypto market prices <span className="text-sm font-normal text-gray-400">18,534 assets</span></h2>
              </div>
              <p className="text-sm text-gray-500 mb-2">The overall crypto market is growing this week. As of today, the total crypto market capitalization is 24.59 trillion, representing a 4.16% increase from last week.</p>
              <button className="text-sm text-[#0052FF] font-semibold mb-4">Read more</button>

              {/* Filters */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {['All assets','1D','GHS','10 rows'].map((f,i) => (
                  <button key={f} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    {i===0 && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
                    {f} <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                ))}
              </div>

              {/* Table */}
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-3 w-8"/>
                    <Th label="Asset" k="name" className="text-left pl-2"/>
                    <Th label="Market price" k="price" className="text-right"/>
                    <th className="py-3 text-sm font-semibold text-gray-700 text-center hidden md:table-cell">Chart</th>
                    <Th label="Change" k="chg" className="text-right"/>
                    <Th label="Mkt cap" k="mcap" className="text-right hidden md:table-cell"/>
                    <Th label="Volume" k="vol" className="text-right hidden lg:table-cell"/>
                    <th className="py-3 text-sm font-semibold text-gray-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(a => {
                    const pos = a.change24h >= 0
                    return (
                      <tr key={a.id} onClick={() => nav(`/asset/${a.id}`)}
                        className="border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors">
                        <td className="py-4">
                          <button className="text-gray-300 hover:text-yellow-400 transition-colors" onClick={e=>e.stopPropagation()}>☆</button>
                        </td>
                        <td className="py-4 pl-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                              style={{ background: a.color + '22', color: a.color }}>{a.symbol[0]}</div>
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
                          <Sparkline data={a.sparkline} positive={pos} width={60} height={28}/>
                        </td>
                        <td className="py-4 text-right">
                          <span className={`text-sm font-semibold ${pos?'text-green-600':'text-red-500'}`}>
                            {pos?'↑':'↓'} {Math.abs(a.change24h).toFixed(2)}%
                          </span>
                        </td>
                        <td className="py-4 text-right hidden md:table-cell">
                          <p className="text-sm text-gray-600">{formatBigNum(a.marketCap)}</p>
                        </td>
                        <td className="py-4 text-right hidden lg:table-cell">
                          <p className="text-sm text-gray-600">{formatBigNum(a.volume24h)}</p>
                        </td>
                        <td className="py-4 text-right">
                          <button onClick={e=>{e.stopPropagation();nav(`/asset/${a.id}`)}}
                            className="px-4 py-1.5 bg-[#0052FF] text-white text-sm font-bold rounded-full hover:bg-blue-700 transition-colors">
                            Trade
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4 pt-1">
            {/* Get started card */}
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
              <div className="flex items-center justify-between mb-1">
                <p className="text-base font-bold text-gray-900">Top movers</p>
                <div className="flex gap-1">
                  <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-xs hover:bg-gray-50">←</button>
                  <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-xs hover:bg-gray-50">→</button>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-3">24hr change</p>
              <div className="grid grid-cols-2 gap-3">
                {[{sym:'FAI',pct:'28.28%',price:'GHS 0.0944',col:'#4CAF50'},{sym:'EDGE',pct:'12.77%',price:'GHS 1.80',col:'#2196F3'}].map(m => (
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
                {[{name:'Hyperliquid',sym:'HYPE',date:'Added Feb 5',col:'#4CAF50'},{name:'Jupiter',sym:'JUPITER',date:'Added Dec 9',col:'#9C27B0'}].map(n => (
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
