import { Link } from 'react-router-dom'

/* Exact footer from coinbase.com screenshots */
const col1Company = {
  heading: 'Company',
  links: ['About','Careers','Affiliates','Blog','Press','Security','Investors','Vendors','Legal & privacy','Cookie policy','Cookie preferences','Digital Asset Disclosures'],
}
const col1Learn = {
  heading: 'Learn',
  links: ['Explore','Market statistics','Coinbase Bytes newsletter','Crypto basics','Tips & tutorials','Crypto glossary','Market updates','What is Bitcoin?','What is crypto?','What is a blockchain?','How to set up a crypto wallet?','How to send crypto?','Taxes'],
}
const col2Individuals = {
  heading: 'Individuals',
  links: ['Buy & sell','Earn free crypto','Base App','Coinbase One','Debit Card'],
}
const col2Businesses = {
  heading: 'Businesses',
  links: ['Asset Listings','Coinbase Business','Payments','Commerce','Token Manager'],
}
const col2Institutions = {
  heading: 'Institutions',
  links: ['Prime','Staking','Exchange','International Exchange','Derivatives Exchange','Verified Pools'],
}
const col3Developers = {
  heading: 'Developers',
  links: ['Developer Platform','Base','Server Wallets','Embedded Wallets','Base Accounts (Smart Wallets)','Onramp & Offramp','x402','Trade API','Paymaster','OnchainKit','Data API','Verifications','Node','AgentKit','Staking','Faucet','Exchange API','International Exchange API','Prime API','Derivatives API'],
}
const col4Support = {
  heading: 'Support',
  links: ['Help center','Contact us','Create account','ID verification','Account information','Payment methods','Account access','Supported crypto','Status'],
}
const col4AssetPrices = {
  heading: 'Asset prices',
  links: ['Bitcoin price','Ethereum price','Solana price','XRP price'],
}
const col4StockPrices = {
  heading: 'Stock prices',
  links: ['NVIDIA price','Apple price','Microsoft price','Amazon price'],
}

const FooterSection = ({ section }) => (
  <div className="mb-6">
    <p className="text-sm font-bold text-gray-900 mb-3">{section.heading}</p>
    <ul className="space-y-2">
      {section.links.map(l => (
        <li key={l}>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-900 no-underline transition-colors">{l}</a>
        </li>
      ))}
    </ul>
  </div>
)

const Footer = () => (
  <footer className="bg-[#F5F5F5] border-t border-gray-200">
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-12 pb-8">

      {/* Logo */}
      <div className="mb-10">
        <Link to="/" className="no-underline inline-block">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#0052FF"/>
            <path d="M20 9C13.925 9 9 13.925 9 20s4.925 11 11 11 11-4.925 11-11S26.075 9 20 9zm0 4.4a6.6 6.6 0 1 1 0 13.2 6.6 6.6 0 0 1 0-13.2z" fill="white"/>
          </svg>
        </Link>
      </div>

      {/* 4 column grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {/* Col 1: Company + Learn */}
        <div>
          <FooterSection section={col1Company}/>
          <FooterSection section={col1Learn}/>
        </div>
        {/* Col 2: Individuals + Businesses + Institutions */}
        <div>
          <FooterSection section={col2Individuals}/>
          <FooterSection section={col2Businesses}/>
          <FooterSection section={col2Institutions}/>
        </div>
        {/* Col 3: Developers */}
        <div>
          <FooterSection section={col3Developers}/>
        </div>
        {/* Col 4: Support + Asset prices + Stock prices */}
        <div>
          <FooterSection section={col4Support}/>
          <FooterSection section={col4AssetPrices}/>
          <FooterSection section={col4StockPrices}/>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 pt-6">
        {/* Social icons */}
        <div className="flex items-center gap-5 mb-4">
          {/* X / Twitter */}
          <a href="https://x.com/coinbase" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-gray-500 hover:text-gray-900 transition-colors no-underline">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="https://linkedin.com/company/coinbase" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-gray-900 transition-colors no-underline">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="https://instagram.com/coinbase" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-gray-900 transition-colors no-underline">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>
          {/* TikTok */}
          <a href="https://tiktok.com/@coinbase" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-500 hover:text-gray-900 transition-colors no-underline">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.02-.04z"/>
            </svg>
          </a>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-sm text-gray-500">© 2026 Coinbase</span>
          <span className="hidden sm:block text-gray-300">•</span>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-900 no-underline transition-colors">Privacy</a>
          <span className="hidden sm:block text-gray-300">•</span>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-900 no-underline transition-colors">Terms & Conditions</a>
        </div>
      </div>
    </div>
  </footer>
)
export default Footer
