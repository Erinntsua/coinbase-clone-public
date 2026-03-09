import { useState, useMemo } from 'react'

const PERIODS = ['1H', '1D', '1W', '1M', '1Y', 'All']

const genData = (base, n = 80) => {
  const pts = []
  let p = base * (0.88 + Math.random() * 0.06)
  for (let i = 0; i < n; i++) { p *= 1 + (Math.random() - 0.49) * 0.018; pts.push(p) }
  pts.push(base)
  return pts
}

const PriceChart = ({ price }) => {
  const [period, setPeriod] = useState('1W')
  const data = useMemo(() => genData(price), [period])

  const W = 600, H = 160, PL = 56, PR = 8, PT = 8, PB = 28
  const cw = W - PL - PR, ch = H - PT - PB
  const min = Math.min(...data), max = Math.max(...data), rng = max - min || 1
  const sx = i => ((i / (data.length - 1)) * cw + PL).toFixed(1)
  const sy = v => (ch - ((v - min) / rng) * ch + PT).toFixed(1)
  const up = data[data.length - 1] >= data[0]
  const stroke = up ? '#05B169' : '#CF303B'
  const linePath = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${sx(i)},${sy(v)}`).join(' ')
  const areaPath = `${linePath} L${sx(data.length-1)},${H-PB} L${PL},${H-PB} Z`
  const yTicks = [min, (min+max)/2, max]
  const fmtY = v => price >= 1000 ? `$${Math.round(v/1000)}k` : `$${v.toFixed(2)}`

  return (
    <div>
      {/* Period tabs */}
      <div className="flex gap-1 mb-4">
        {PERIODS.map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
              period === p ? 'bg-cb-gray7 text-cb-black' : 'text-cb-gray2 hover:bg-cb-gray7'
            }`}>
            {p}
          </button>
        ))}
      </div>

      {/* SVG chart */}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 160 }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.15" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        {yTicks.map((v, i) => (
          <g key={i}>
            <line x1={PL} y1={sy(v)} x2={W-PR} y2={sy(v)} stroke="#EAECEF" strokeWidth="1" />
            <text x={PL-6} y={parseFloat(sy(v))+4} textAnchor="end" fontSize="10" fill="#8A919E">{fmtY(v)}</text>
          </g>
        ))}
        <path d={areaPath} fill="url(#chartGrad)" />
        <path d={linePath} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={sx(data.length-1)} cy={sy(data[data.length-1])} r="3.5" fill={stroke} />
      </svg>
    </div>
  )
}
export default PriceChart
