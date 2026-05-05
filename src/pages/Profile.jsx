import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Profile = () => {
  const { user, checking, signOut } = useAuth()
  const nav = useNavigate()

  // Redirect to login if not authenticated once initial check is done
  useEffect(() => {
    if (!checking && !user) {
      nav('/signin')
    }
  }, [checking, user, nav])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <div className="w-8 h-8 border-2 border-[#0052FF] border-t-transparent rounded-full animate-spin"/>
          <p className="text-sm">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) return null   // will redirect

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  const joinedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex-1">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your Coinbase account details.</p>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

          {/* Blue banner */}
          <div className="h-24 bg-gradient-to-r from-[#0052FF] to-[#1a56ff]"/>

          {/* Avatar + info */}
          <div className="px-8 pb-8">
            <div className="flex items-end justify-between -mt-10 mb-6">
              <div className="w-20 h-20 rounded-full bg-[#0052FF] border-4 border-white flex items-center justify-center shadow-md">
                <span className="text-2xl font-bold text-white">{initials}</span>
              </div>
              <button
                onClick={async () => { await signOut(); nav('/') }}
                className="px-5 py-2 text-sm font-semibold border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-gray-700">
                Sign out
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 text-sm mt-0.5">Member since {joinedDate}</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mx-8"/>

          {/* Info rows */}
          <div className="px-8 py-6 space-y-5">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Full name</p>
              <p className="text-base font-semibold text-gray-900">{user.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email address</p>
              <p className="text-base font-semibold text-gray-900">{user.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Account ID</p>
              <p className="text-sm font-mono text-gray-600">{user._id}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Member since</p>
              <p className="text-base font-semibold text-gray-900">{joinedDate}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mx-8"/>

          {/* Quick links */}
          <div className="px-8 py-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Quick links</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label:'Explore prices', path:'/explore' },
                { label:'View assets',   path:'/explore' },
                { label:'Learn crypto',  path:'/learn'   },
              ].map(l => (
                <button key={l.label} onClick={() => nav(l.path)}
                  className="py-3 px-4 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors text-left">
                  {l.label} →
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile
