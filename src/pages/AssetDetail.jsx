import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { cryptoAssets, formatPrice, formatBigNum } from '../data/cryptoData'
import PriceChart from '../components/crypto/PriceChart'
import { useAuth } from '../hooks/useAuth'

const AssetDetail = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const { user } = useAuth()
  const [tradeTab, setTradeTab] = useState('buy')
  const [amount, setAmount] = useState('')

  const asset = cryptoAssets.find(a => a.id === id)
  if (!asset) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <p className="text-2xl font-bold text-cb-black">Asset not found</p>
      <button onClick={() => nav('/explore')} className="btn-primary">Browse assets</button>
    </div>
  )

  const pos = asset.change24h >= 0
  const est = amount && !isNaN(amount) && parseFloat(amount) > 0
    ? (parseFloat(amount) / asset.price).toFixed(6) : '0'

  const stats = [
    { label: 'Market cap',    value: formatBigNum(asset.marketCap) },
    { label: 'Volume (24h)',  value: formatBigNum(asset.volume24h) },
    { label: '24h high',      value: formatPrice(asset.high24h) },
    { label: '24h low',       value: formatPrice(asset.low24h) },
    { label: 'All-time high', value: formatPrice(asset.price * 1.18) },
    { label: 'Rank',          value: `#${asset.rank}` },
  ]

  return (
    <div className="bg-white flex-1">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-8 text-sm text-cb-gray3">
          <Link to="/" className="hover:text-cb-black transition-colors no-underline">Home</Link>
          <span>/</span>
          <Link to="/explore" className="hover:text-cb-black transition-colors no-underline">Prices</Link>
          <span>/</span>
          <span className="text-cb-black font-semibold">{asset.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

          {/* LEFT */}
          <div className="space-y-6">
            {/* Asset header */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0"
                style={{ background: asset.color + '20', color: asset.color }}>
                {asset.symbol[0]}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-4xl font-bold text-cb-black">{asset.name}</h1>
                  <span className="bg-cb-gray7 text-cb-gray2 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {asset.symbol}
                  </span>
                  <span className="bg-cb-gray7 text-cb-gray2 text-xs font-semibold px-2 py-0.5 rounded-full">
                    #{asset.rank}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-4xl font-bold text-cb-black">{formatPrice(asset.price)}</span>
                  <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                    pos ? 'bg-green-50 text-cb-green' : 'bg-red-50 text-cb-red'
                  }`}>
                    {pos ? '+' : ''}{asset.change24h.toFixed(2)}%
                  </span>
                  <span className="text-xs text-cb-gray3">Past 24 hours</span>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="card p-6">
              <PriceChart price={asset.price} />
            </div>

            {/* Stats */}
            <div className="card">
              <div className="p-5 border-b border-cb-gray6">
                <h2 className="text-lg font-bold text-cb-black">{asset.name} stats</h2>
              </div>
              <div className="divide-y divide-cb-gray6">
                {stats.map(s => (
                  <div key={s.label} className="flex justify-between items-center px-5 py-3.5">
                    <span className="text-sm text-cb-gray2">{s.label}</span>
                    <span className="text-sm font-semibold text-cb-black">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-cb-black mb-3">About {asset.name}</h2>
              <p className="text-sm text-cb-gray2 leading-relaxed">{asset.description}</p>
            </div>
          </div>

          {/* RIGHT — trade panel */}
          <div>
            <div className="card p-5 sticky top-[93px]">
              {/* Buy/Sell toggle */}
              <div className="flex bg-cb-gray7 rounded-xl p-1 mb-5">
                {['buy', 'sell'].map(t => (
                  <button key={t} onClick={() => setTradeTab(t)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                      tradeTab === t
                        ? 'bg-white text-cb-black shadow-sm'
                        : 'text-cb-gray2 hover:text-cb-black'
                    }`}>{t}</button>
                ))}
              </div>

              {user ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-cb-gray2 mb-1.5">
                      {tradeTab === 'buy' ? 'Amount in USD' : `Amount in ${asset.symbol}`}
                    </p>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-cb-gray2">
                        {tradeTab === 'buy' ? '$' : asset.symbol}
                      </span>
                      <input type="number" placeholder="0.00" value={amount}
                        onChange={e => setAmount(e.target.value)}
                        className="input-field pl-8" />
                    </div>
                  </div>

                  {/* Quick amounts */}
                  <div className="grid grid-cols-4 gap-2">
                    {['25', '50', '100', '250'].map(v => (
                      <button key={v} onClick={() => setAmount(v)}
                        className="py-1.5 text-xs font-semibold text-cb-gray2 border border-cb-gray6 rounded-lg hover:bg-cb-gray7 transition-colors">
                        ${v}
                      </button>
                    ))}
                  </div>

                  {/* Preview */}
                  {amount && parseFloat(amount) > 0 && (
                    <div className="bg-cb-gray7 rounded-xl p-3.5 space-y-2">
                      {[
                        { label: tradeTab === 'buy' ? 'You receive' : 'You pay', val: tradeTab === 'buy' ? `${est} ${asset.symbol}` : `$${(parseFloat(amount)*asset.price).toFixed(2)}` },
                        { label: 'Coinbase fee', val: '$0.99' },
                        { label: 'Total', val: `$${(parseFloat(amount)+0.99).toFixed(2)}` },
                      ].map(r => (
                        <div key={r.label} className="flex justify-between">
                          <span className="text-xs text-cb-gray2">{r.label}</span>
                          <span className="text-xs font-semibold text-cb-black">{r.val}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    disabled={!amount || parseFloat(amount) <= 0}
                    className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed">
                    {tradeTab === 'buy' ? `Buy ${asset.symbol}` : `Sell ${asset.symbol}`}
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-4 py-2">
                  <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center font-bold text-2xl"
                    style={{ background: asset.color + '20', color: asset.color }}>
                    {asset.symbol[0]}
                  </div>
                  <div>
                    <p className="text-base font-bold text-cb-black">Buy {asset.name}</p>
                    <p className="text-sm text-cb-gray2 mt-1">Create an account to start trading {asset.symbol}</p>
                  </div>
                  <button onClick={() => nav('/signup')} className="btn-primary w-full">Get started</button>
                  <button onClick={() => nav('/signin')} className="btn-secondary w-full">Sign in</button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
export default AssetDetail
