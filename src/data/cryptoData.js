export const cryptoAssets = [
  { id:'bitcoin',   rank:1, name:'Bitcoin',   symbol:'BTC',  color:'#F7931A',
    price:67843.21, change24h:2.41,  marketCap:1332e9, volume24h:31.2e9, high24h:68500, low24h:66200,
    sparkline:[64200,64800,65400,65100,66200,66800,67100,66900,67500,67843],
    description:'Bitcoin is the world\'s first decentralized cryptocurrency, created in 2009 by the pseudonymous Satoshi Nakamoto. It operates on a peer-to-peer network without a central authority, enabling secure, borderless transactions.' },
  { id:'ethereum',  rank:2, name:'Ethereum',  symbol:'ETH',  color:'#627EEA',
    price:3548.67,  change24h:1.93,  marketCap:426e9,  volume24h:16.1e9, high24h:3580,  low24h:3440,
    sparkline:[3380,3400,3420,3410,3450,3480,3510,3490,3530,3548],
    description:'Ethereum is a decentralized platform that runs smart contracts—applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference.' },
  { id:'solana',    rank:3, name:'Solana',    symbol:'SOL',  color:'#9945FF',
    price:181.34,   change24h:-0.87, marketCap:82.3e9, volume24h:3.8e9,  high24h:184,   low24h:178,
    sparkline:[183,182,181,180,179,180,181,182,181,181.34],
    description:'Solana is a high-performance blockchain known for its fast transaction speeds and low fees, supporting smart contracts and popular DeFi applications.' },
  { id:'usdc',      rank:4, name:'USD Coin',  symbol:'USDC', color:'#2775CA',
    price:1.00,     change24h:0.01,  marketCap:32.1e9, volume24h:7.2e9,  high24h:1.001, low24h:0.999,
    sparkline:[1,1,1,1,1,1,1,1,1,1],
    description:'USD Coin is a fully reserved stablecoin redeemable 1:1 for US dollars, issued by regulated financial institutions and backed by fully reserved assets.' },
  { id:'cardano',   rank:5, name:'Cardano',   symbol:'ADA',  color:'#0033AD',
    price:0.4912,   change24h:3.24,  marketCap:17.4e9, volume24h:540e6,  high24h:0.499, low24h:0.472,
    sparkline:[0.472,0.475,0.478,0.480,0.483,0.485,0.487,0.489,0.490,0.4912],
    description:'Cardano is a proof-of-stake blockchain built on peer-reviewed research, aiming to provide a more balanced and sustainable ecosystem for cryptocurrencies.' },
  { id:'avalanche', rank:6, name:'Avalanche', symbol:'AVAX', color:'#E84142',
    price:39.72,    change24h:4.56,  marketCap:16.3e9, volume24h:720e6,  high24h:40.1,  low24h:37.8,
    sparkline:[37.5,37.9,38.2,38.6,38.9,39.1,39.3,39.5,39.6,39.72],
    description:'Avalanche is a layer-1 blockchain platform known for its high throughput and near-instant transaction finality for DeFi applications.' },
  { id:'polkadot',  rank:7, name:'Polkadot',  symbol:'DOT',  color:'#E6007A',
    price:7.38,     change24h:-1.12, marketCap:10.2e9, volume24h:290e6,  high24h:7.55,  low24h:7.20,
    sparkline:[7.55,7.50,7.45,7.42,7.40,7.38,7.36,7.37,7.38,7.38],
    description:'Polkadot enables cross-blockchain transfers of any type of data or asset, connecting multiple specialized blockchains into one unified network.' },
  { id:'chainlink', rank:8, name:'Chainlink', symbol:'LINK', color:'#375BD2',
    price:15.24,    change24h:2.88,  marketCap:8.9e9,  volume24h:450e6,  high24h:15.4,  low24h:14.7,
    sparkline:[14.6,14.7,14.8,14.9,15.0,15.1,15.15,15.2,15.22,15.24],
    description:'Chainlink is a decentralized oracle network that provides real-world data to smart contracts on any blockchain.' },
]

export const formatPrice = (p) => {
  if (p >= 1000) return '$' + p.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 })
  if (p >= 1)    return '$' + p.toFixed(2)
  if (p >= 0.001)return '$' + p.toFixed(4)
  return '$' + p.toFixed(6)
}

export const formatBigNum = (n) => {
  if (n >= 1e12) return '$' + (n/1e12).toFixed(2) + 'T'
  if (n >= 1e9)  return '$' + (n/1e9).toFixed(2) + 'B'
  if (n >= 1e6)  return '$' + (n/1e6).toFixed(2) + 'M'
  return '$' + n.toLocaleString()
}

export const learnArticles = [
  { id:1, category:'Crypto basics', title:'What is cryptocurrency?', desc:'Learn what crypto is, how it works, and why it matters.', time:'5 min read', level:'Beginner', color:'#0052FF', icon:'🪙' },
  { id:2, category:'Bitcoin',       title:'What is Bitcoin?',        desc:'Understand the world\'s first and most valuable digital currency.', time:'7 min read', level:'Beginner', color:'#F7931A', icon:'₿' },
  { id:3, category:'Ethereum',      title:'What is Ethereum?',       desc:'Discover the platform behind smart contracts and dApps.', time:'6 min read', level:'Beginner', color:'#627EEA', icon:'⟠' },
  { id:4, category:'DeFi',          title:'What is DeFi?',           desc:'Explore the world of decentralized finance and open protocols.', time:'8 min read', level:'Intermediate', color:'#05B169', icon:'🏦' },
  { id:5, category:'NFTs',          title:'What are NFTs?',          desc:'Learn about non-fungible tokens and digital ownership.', time:'5 min read', level:'Beginner', color:'#9945FF', icon:'🖼️' },
  { id:6, category:'Web3',          title:'What is Web3?',           desc:'Understand the vision for a decentralized internet.', time:'9 min read', level:'Intermediate', color:'#E84142', icon:'🌐' },
]
