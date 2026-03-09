import { useState } from 'react'
import { learnArticles } from '../data/cryptoData'

const CATS = ['All', 'Crypto basics', 'Bitcoin', 'Ethereum', 'DeFi', 'NFTs', 'Web3']
const levelColor = { Beginner: 'bg-green-50 text-cb-green', Intermediate: 'bg-blue-50 text-cb-blue', Advanced: 'bg-red-50 text-cb-red' }

const Learn = () => {
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = learnArticles.filter(a => {
    const matchCat = cat === 'All' || a.category === cat
    const matchQ = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <div className="bg-white flex-1">
      {/* Hero */}
      <div className="bg-cb-gray7 border-b border-cb-gray6">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-3">
              <p className="text-xs font-bold text-cb-blue uppercase tracking-widest">Coinbase Learn</p>
              <h1 className="text-4xl font-bold text-cb-black leading-tight">
                Learn crypto.<br />Earn crypto.
              </h1>
              <p className="text-base text-cb-gray2 leading-relaxed max-w-md">
                Build your knowledge with short, beginner-friendly articles and earn
                crypto rewards along the way.
              </p>
            </div>
            <div className="lg:flex lg:justify-end">
              <div className="relative max-w-sm w-full">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cb-gray3">🔍</span>
                <input type="text" placeholder="Search articles..." value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input-field pl-10 text-base py-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="bg-white border-b border-cb-gray6 sticky top-[93px] z-10 overflow-x-auto">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-max">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-3 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  cat === c
                    ? 'border-cb-blue text-cb-blue'
                    : 'border-transparent text-cb-gray2 hover:text-cb-black'
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(a => (
              <div key={a.id}
                className="card p-5 flex flex-col cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: a.color + '18' }}>
                    {a.icon}
                  </div>
                  <span className="text-sm font-semibold mt-1.5" style={{ color: a.color }}>
                    {a.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-cb-black mb-2 flex-1">{a.title}</h3>
                <p className="text-sm text-cb-gray2 leading-relaxed mb-4">{a.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${levelColor[a.level]}`}>
                      {a.level}
                    </span>
                    <span className="text-xs text-cb-gray3">{a.time}</span>
                  </div>
                  <span className="text-sm font-semibold text-cb-blue">Read →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 space-y-3">
            <div className="text-5xl">🔍</div>
            <p className="text-xl font-bold text-cb-black">No articles found</p>
            <p className="text-sm text-cb-gray2">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default Learn
