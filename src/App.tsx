import { useState, type JSX } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = 'home' | 'map' | 'routes' | 'gems' | 'profile'
type Role = 'guest' | 'driver' | 'scout' | 'admin'
type Screen = Tab | 'scout-tool' | 'admin-console'

// ─── Icons (inline SVG to avoid deps) ─────────────────────────────────────────
const Icon = {
  home: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/>
    </svg>
  ),
  map: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
    </svg>
  ),
  routes: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M5 8v3a2 2 0 002 2h10a2 2 0 012 2v1"/><path d="M12 8l3-3-3-3"/>
    </svg>
  ),
  gems: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  profile: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  alert: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  navigation: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11"/>
    </svg>
  ),
  star: (filled = false) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  bookmark: (filled = false) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
    </svg>
  ),
  chevronUp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
  ),
  chevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
  ),
  pin: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  settings: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 0012 2a10 10 0 00-7.07 2.93"/>
      <path d="M4.93 19.07A10 10 0 0012 22a10 10 0 007.07-2.93"/>
    </svg>
  ),
  close: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  arrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  pothole: () => <span style={{fontSize:'14px'}}>🕳️</span>,
  flood: () => <span style={{fontSize:'14px'}}>🌊</span>,
  construction: () => <span style={{fontSize:'14px'}}>🚧</span>,
  incident: () => <span style={{fontSize:'14px'}}>⚠️</span>,
  hotel: () => <span style={{fontSize:'14px'}}>🏨</span>,
  food: () => <span style={{fontSize:'14px'}}>🍽️</span>,
  scenic: () => <span style={{fontSize:'14px'}}>🌄</span>,
  attraction: () => <span style={{fontSize:'14px'}}>🎯</span>,
  fuel: () => <span style={{fontSize:'14px'}}>⛽</span>,
  facility: () => <span style={{fontSize:'14px'}}>🏢</span>,
  check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  x: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const GEMS = [
  { id:1, name:'Karura Forest Waterfall', category:'scenic', rating:4.8, confirmations:312, saved:true, distance:'3.2 km', desc:'Hidden waterfall in Karura Forest, great for morning runs' },
  { id:2, name:'Mama Oliech Restaurant', category:'food', rating:4.6, confirmations:891, saved:false, distance:'1.1 km', desc:'Legendary omena and ugali in Huruma — cash only, worth the queue' },
  { id:3, name:'Karen Blixen Museum', category:'attraction', rating:4.5, confirmations:204, saved:true, distance:'12.4 km', desc:'Preserved colonial farmhouse from Out of Africa, lush gardens' },
  { id:4, name:'Total Westlands', category:'fuel', rating:4.2, confirmations:156, saved:false, distance:'0.8 km', desc:'Reliable 24hr fuel with carwash and Naivas inside' },
  { id:5, name:'Ngong Hills Viewpoint', category:'scenic', rating:4.9, confirmations:447, saved:true, distance:'18.6 km', desc:'360° views of the Rift Valley and Nairobi skyline at dawn' },
  { id:6, name:'Artcaffe Garden City', category:'food', rating:4.3, confirmations:278, saved:false, distance:'5.7 km', desc:'Reliable wifi, good espresso, and a quiet corner — laptops welcome' },
]

const INCIDENTS = [
  { id:1, type:'pothole', title:'Deep pothole cluster', road:'Ngong Road near Junction', distance:'0.4 km', severity:4 },
  { id:2, type:'flood', title:'Flooding reported', road:'Lower Kabete Rd, Karen junction', distance:'1.2 km', severity:3 },
  { id:3, type:'construction', title:'Lane closure', road:'Uhuru Highway, CBD-bound', distance:'2.1 km', severity:2 },
  { id:4, type:'incident', title:'Accident — slow traffic', road:'Waiyaki Way, Westlands flyover', distance:'3.6 km', severity:3 },
]

const NEARBY_GEMS = [
  { id:1, name:'Westlands Market Rooftop', category:'food', distance:'0.6 km' },
  { id:2, name:'Sankara Hotel Pool Bar', category:'hotel', distance:'0.9 km' },
  { id:3, name:'Karura Forest Gate B', category:'scenic', distance:'2.3 km' },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function IQRing({ score = 742 }: { score?: number }) {
  const pct = score / 1000
  const r = 52
  const circ = 2 * Math.PI * r
  const dash = circ * pct
  return (
    <div style={{position:'relative', width:132, height:132}}>
      <svg width="132" height="132" style={{transform:'rotate(-90deg)'}}>
        <circle cx="66" cy="66" r={r} fill="none" stroke="var(--border)" strokeWidth="8"/>
        <circle cx="66" cy="66" r={r} fill="none" stroke="var(--primary)" strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{transition:'stroke-dasharray 0.6s ease'}}/>
      </svg>
      <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <span style={{fontFamily:'var(--font-mono)', fontWeight:600, fontSize:26, color:'var(--foreground)', lineHeight:1}}>{score}</span>
        <span style={{fontSize:10, color:'var(--muted-foreground)', marginTop:2, letterSpacing:'0.08em'}}>IQ SCORE</span>
      </div>
    </div>
  )
}

function BarMeter({ value, color = 'var(--primary)', label }: { value: number; color?: string; label: string }) {
  return (
    <div style={{marginBottom:6}}>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:3}}>
        <span style={{fontSize:11, color:'var(--muted-foreground)'}}>{label}</span>
        <span style={{fontSize:11, fontFamily:'var(--font-mono)', color:'var(--foreground)'}}>{Math.round(value * 100)}%</span>
      </div>
      <div style={{height:5, background:'var(--border)', borderRadius:3, overflow:'hidden'}}>
        <div style={{height:'100%', width:`${value*100}%`, background:color, borderRadius:3, transition:'width 0.4s ease'}}/>
      </div>
    </div>
  )
}

function SeverityDot({ severity }: { severity: number }) {
  const color = severity >= 4 ? 'var(--red)' : severity >= 3 ? 'var(--amber)' : '#60a5fa'
  return <div style={{width:8, height:8, borderRadius:'50%', background:color, flexShrink:0, marginTop:3}}/>
}

function GemCategoryIcon({ category }: { category: string }) {
  const map: Record<string, () => JSX.Element> = {
    scenic: Icon.scenic, food: Icon.food, attraction: Icon.attraction,
    hotel: Icon.hotel, fuel: Icon.fuel, facility: Icon.facility,
  }
  return (map[category] || Icon.attraction)()
}

function StarRating({ rating, interactive = false }: { rating: number; interactive?: boolean }) {
  const [hover, setHover] = useState(0)
  const [selected, setSelected] = useState(Math.round(rating))
  const display = interactive ? (hover || selected) : rating
  return (
    <div style={{display:'flex', gap:1, color:'var(--amber)'}}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{cursor: interactive ? 'pointer' : 'default', lineHeight:1}}
          onMouseEnter={() => interactive && setHover(i)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && setSelected(i)}>
          {Icon.star(interactive ? i <= display : i <= Math.round(display))}
        </span>
      ))}
    </div>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} style={{
      width:44, height:24, borderRadius:12, border:'none', cursor:'pointer',
      background: checked ? 'var(--primary)' : 'var(--border)',
      position:'relative', transition:'background 0.2s', padding:0, flexShrink:0,
    }}>
      <div style={{
        position:'absolute', top:3, left: checked ? 23 : 3,
        width:18, height:18, borderRadius:'50%', background:'white',
        transition:'left 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.3)',
      }}/>
    </button>
  )
}

// ─── Screen: Home ──────────────────────────────────────────────────────────────
function HomeScreen({ role }: { role: Role }) {
  return (
    <div style={{padding:'24px 16px', overflowY:'auto', height:'100%'}}>
      {/* Header */}
      <div style={{marginBottom:24}}>
        <p style={{color:'var(--muted-foreground)', fontSize:13, margin:0}}>Wed, 23 Sep · Westlands, NBI</p>
        <h2 style={{margin:'2px 0 0', fontSize:22, fontFamily:'var(--font-heading)', fontWeight:700}}>
          {role === 'guest' ? 'Welcome, Guest' : role === 'admin' ? 'Admin Overview' : 'Good morning, Wanjiru'}
        </h2>
      </div>

      {/* IQ Score + Stats */}
      <div style={{display:'flex', gap:12, marginBottom:20, alignItems:'center'}}>
        <IQRing score={742} />
        <div style={{display:'flex', flexDirection:'column', gap:10, flex:1}}>
          <div className="card" style={{padding:'12px 14px'}}>
            <div style={{fontSize:11, color:'var(--muted-foreground)', fontFamily:'var(--font-mono)', letterSpacing:'0.06em'}}>TRIPS / MONTH</div>
            <div style={{fontSize:28, fontFamily:'var(--font-mono)', fontWeight:600, lineHeight:1.1, marginTop:2}}>47</div>
          </div>
          <div className="card" style={{padding:'12px 14px'}}>
            <div style={{fontSize:11, color:'var(--muted-foreground)', fontFamily:'var(--font-mono)', letterSpacing:'0.06em'}}>GEMS FOUND</div>
            <div style={{fontSize:28, fontFamily:'var(--font-mono)', fontWeight:600, lineHeight:1.1, color:'var(--primary)', marginTop:2}}>12</div>
          </div>
        </div>
      </div>

      {/* Active route */}
      <div className="card" style={{padding:'14px 16px', marginBottom:20, borderLeft:'3px solid var(--primary)'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div style={{fontSize:11, color:'var(--muted-foreground)', marginBottom:4, letterSpacing:'0.06em', fontFamily:'var(--font-mono)'}}>ACTIVE ROUTE</div>
            <div style={{fontFamily:'var(--font-heading)', fontWeight:600, fontSize:15}}>Westlands → Karen</div>
            <div style={{fontSize:12, color:'var(--muted-foreground)', marginTop:2}}>via Ngong Road</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:'var(--font-mono)', fontSize:22, fontWeight:600, color:'var(--primary)'}}>34<span style={{fontSize:13, fontWeight:400}}> min</span></div>
            <div style={{fontSize:11, color:'var(--muted-foreground)'}}>18.2 km</div>
          </div>
        </div>
        <div style={{marginTop:12}}>
          <BarMeter value={0.72} label="Road quality" color="var(--primary)"/>
          <BarMeter value={0.45} label="Traffic" color="var(--amber)"/>
        </div>
      </div>

      {/* Incidents near you */}
      <div style={{marginBottom:20}}>
        <h3 style={{fontFamily:'var(--font-heading)', fontSize:15, fontWeight:600, marginBottom:12, margin:'0 0 12px'}}>
          Incidents near you
        </h3>
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {INCIDENTS.slice(0,3).map(inc => (
            <div key={inc.id} className="card" style={{padding:'12px 14px', display:'flex', gap:10, alignItems:'flex-start'}}>
              <SeverityDot severity={inc.severity}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontWeight:500, fontSize:14}}>{inc.title}</div>
                <div style={{fontSize:12, color:'var(--muted-foreground)', marginTop:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{inc.road}</div>
              </div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted-foreground)', flexShrink:0}}>{inc.distance}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gems near you */}
      <div style={{marginBottom:32}}>
        <h3 style={{fontFamily:'var(--font-heading)', fontSize:15, fontWeight:600, margin:'0 0 12px'}}>
          Gems near you
        </h3>
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {NEARBY_GEMS.map(gem => (
            <div key={gem.id} className="card" style={{padding:'12px 14px', display:'flex', gap:10, alignItems:'center'}}>
              <span style={{fontSize:20}}><GemCategoryIcon category={gem.category}/></span>
              <div style={{flex:1}}>
                <div style={{fontWeight:500, fontSize:14}}>{gem.name}</div>
                <div style={{fontSize:12, color:'var(--muted-foreground)', marginTop:1, textTransform:'capitalize'}}>{gem.category}</div>
              </div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--primary)'}}>{gem.distance}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Screen: Map ───────────────────────────────────────────────────────────────
function MapScreen() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetContent, setSheetContent] = useState<'route'|'gem'>('route')
  const [alert, setAlert] = useState(true)
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <div style={{position:'relative', height:'100%', overflow:'hidden', background:'#071410'}}>
      {/* Map background */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(160deg, #081a14 0%, #071210 40%, #050d0b 100%)',
      }}>
        {/* Road grid simulation */}
        <svg width="100%" height="100%" style={{opacity:0.25, position:'absolute', inset:0}}>
          <defs>
            <pattern id="roads" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <line x1="40" y1="0" x2="40" y2="80" stroke="#00C9A7" strokeWidth="1"/>
              <line x1="0" y1="40" x2="80" y2="40" stroke="#00C9A7" strokeWidth="1"/>
            </pattern>
            <pattern id="blocks" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="2" y="2" width="36" height="36" rx="2" fill="#0F2018" stroke="none"/>
              <rect x="42" y="42" width="36" height="36" rx="2" fill="#0F2018" stroke="none"/>
              <rect x="2" y="42" width="36" height="36" rx="2" fill="#102016" stroke="none"/>
              <rect x="42" y="2" width="36" height="36" rx="2" fill="#102016" stroke="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blocks)"/>
          <rect width="100%" height="100%" fill="url(#roads)"/>
          {/* Active route line */}
          <path d="M 50 520 Q 120 420 180 350 Q 220 300 260 200 Q 290 140 320 80"
            stroke="#00C9A7" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8"/>
          {/* Condition markers on route */}
          <circle cx="155" cy="380" r="8" fill="#f59e0b" opacity="0.9"/>
          <text x="155" y="384" textAnchor="middle" fontSize="8" fill="white">⚠</text>
          <circle cx="220" cy="285" r="8" fill="#ef4444" opacity="0.9"/>
          <text x="220" y="289" textAnchor="middle" fontSize="8" fill="white">🕳</text>
          {/* Gem pins */}
          <circle cx="100" cy="300" r="10" fill="#a78bfa" opacity="0.95"/>
          <text x="100" y="305" textAnchor="middle" fontSize="10">🍽️</text>
          <circle cx="280" cy="150" r="10" fill="#60a5fa" opacity="0.95"/>
          <text x="280" y="155" textAnchor="middle" fontSize="10">🌄</text>
          <circle cx="180" cy="440" r="10" fill="#00C9A7" opacity="0.95"/>
          <text x="180" y="445" textAnchor="middle" fontSize="10">🎯</text>
          {/* User location */}
          <circle cx="50" cy="520" r="14" fill="#00C9A7" opacity="0.2"/>
          <circle cx="50" cy="520" r="7" fill="#00C9A7"/>
          <circle cx="50" cy="520" r="4" fill="white"/>
        </svg>
        {/* Location label */}
        <div style={{position:'absolute', top:'62%', left:'28px', fontSize:10, color:'var(--primary)', fontFamily:'var(--font-mono)', opacity:0.7}}>
          WESTLANDS
        </div>
        <div style={{position:'absolute', top:'20%', left:'52%', fontSize:10, color:'#60a5fa', fontFamily:'var(--font-mono)', opacity:0.7}}>
          KAREN
        </div>
      </div>

      {/* Search bar */}
      <div style={{
        position:'absolute', top:16, left:16, right:16, zIndex:10,
        background: searchFocused ? 'var(--card)' : 'rgba(10,21,18,0.92)',
        border:'1px solid var(--border)',
        borderRadius:14, padding:'10px 14px',
        display:'flex', gap:10, alignItems:'center',
        backdropFilter:'blur(12px)',
        boxShadow:'0 4px 24px rgba(0,0,0,0.4)',
        transition:'background 0.2s',
      }}>
        <span style={{color:'var(--muted-foreground)', flexShrink:0}}><Icon.search/></span>
        <input
          placeholder="Search destination — Ngong Road, Karen..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            background:'none', border:'none', outline:'none', flex:1,
            color:'var(--foreground)', fontSize:14, fontFamily:'var(--font-body)',
          }}
        />
        <button style={{
          background:'none', border:'1px solid var(--border)', borderRadius:8,
          padding:'3px 8px', fontSize:11, color:'var(--muted-foreground)', cursor:'pointer',
          fontFamily:'var(--font-mono)',
        }}>GEM ▾</button>
      </div>

      {/* Category filter chips */}
      <div style={{
        position:'absolute', top:68, left:16, right:0, zIndex:10,
        display:'flex', gap:8, overflowX:'auto', paddingRight:16,
      }}>
        {[
          {label:'🍽️ Food', key:'food', active:true},
          {label:'🌄 Scenic', key:'scenic', active:false},
          {label:'🎯 Attractions', key:'attraction', active:false},
          {label:'🏨 Hotels', key:'hotel', active:false},
          {label:'⛽ Fuel', key:'fuel', active:false},
        ].map(c => (
          <div key={c.key} className={`chip${c.active?' active':''}`} style={{whiteSpace:'nowrap'}}>{c.label}</div>
        ))}
      </div>

      {/* Approaching gem alert */}
      {alert && (
        <div style={{
          position:'absolute', top:120, left:16, right:16, zIndex:20,
          background:'rgba(10,21,18,0.95)', border:'1px solid var(--primary)',
          borderRadius:14, padding:'12px 14px',
          display:'flex', gap:10, alignItems:'center',
          backdropFilter:'blur(12px)',
          animation:'slideDown 0.3s ease',
        }}>
          <div style={{
            width:36, height:36, borderRadius:10, background:'rgba(0,201,167,0.15)',
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
          }}>
            <span style={{fontSize:18}}>🍽️</span>
          </div>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontFamily:'var(--font-heading)', fontWeight:600, fontSize:13, color:'var(--primary)'}}>Hidden Gem approaching</div>
            <div style={{fontSize:12, color:'var(--muted-foreground)', marginTop:1}}>Mama Oliech Restaurant · 2.1 km detour</div>
          </div>
          <button onClick={() => setAlert(false)} style={{background:'none', border:'none', cursor:'pointer', color:'var(--muted-foreground)', padding:4}}>
            <Icon.close/>
          </button>
        </div>
      )}

      {/* Bottom sheet toggle */}
      <div style={{
        position:'absolute', bottom: sheetOpen ? 240 : 0, left:0, right:0, zIndex:10,
        transition:'bottom 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <button
          onClick={() => setSheetOpen(v => !v)}
          style={{
            position:'absolute', top:-20, left:'50%', transform:'translateX(-50%)',
            background:'var(--card)', border:'1px solid var(--border)', borderRadius:'50%',
            width:36, height:36, cursor:'pointer', display:'flex', alignItems:'center',
            justifyContent:'center', color:'var(--muted-foreground)',
          }}
        >
          {sheetOpen ? <Icon.chevronDown/> : <Icon.chevronUp/>}
        </button>
      </div>

      {/* Bottom sheet */}
      <div style={{
        position:'absolute', left:0, right:0, bottom: sheetOpen ? 0 : -220,
        background:'var(--card)', borderTop:'1px solid var(--border)',
        borderRadius:'18px 18px 0 0', padding:'20px 16px',
        zIndex:10, transition:'bottom 0.35s cubic-bezier(0.4,0,0.2,1)',
        height:240,
      }}>
        <div style={{display:'flex', gap:8, marginBottom:16}}>
          {(['route','gem'] as const).map(t => (
            <button key={t} onClick={() => setSheetContent(t)} style={{
              flex:1, padding:'8px', border:'1px solid', borderRadius:10, cursor:'pointer',
              fontFamily:'var(--font-heading)', fontWeight:600, fontSize:13,
              background: sheetContent===t ? 'var(--primary)' : 'transparent',
              color: sheetContent===t ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
              borderColor: sheetContent===t ? 'var(--primary)' : 'var(--border)',
              transition:'all 0.2s',
            }}>
              {t === 'route' ? '🛣️ Route' : '💎 Gem'}
            </button>
          ))}
        </div>
        {sheetContent === 'route' ? (
          <div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12}}>
              <div>
                <div style={{fontFamily:'var(--font-heading)', fontWeight:700, fontSize:17}}>Westlands → Karen</div>
                <div style={{fontSize:12, color:'var(--muted-foreground)'}}>via Ngong Road · 18.2 km</div>
              </div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:26, fontWeight:600, color:'var(--primary)'}}>34<span style={{fontSize:13, fontWeight:400}}> min</span></div>
            </div>
            <BarMeter value={0.72} label="Road quality" color="var(--primary)"/>
            <BarMeter value={0.45} label="Traffic" color="var(--amber)"/>
          </div>
        ) : (
          <div style={{display:'flex', gap:12, alignItems:'flex-start'}}>
            <div style={{
              width:48, height:48, borderRadius:12, background:'rgba(167,139,250,0.15)',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:24,
            }}>🍽️</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--font-heading)', fontWeight:700, fontSize:16}}>Mama Oliech Restaurant</div>
              <div style={{fontSize:12, color:'var(--muted-foreground)', marginTop:2}}>Food · 0.6 km away · 2.1 km detour</div>
              <div style={{display:'flex', alignItems:'center', gap:8, marginTop:8}}>
                <StarRating rating={4.6}/>
                <span style={{fontSize:12, color:'var(--muted-foreground)'}}>891 confirmations</span>
              </div>
            </div>
            <button style={{background:'none', border:'none', cursor:'pointer', color:'var(--muted-foreground)', padding:4}}>
              {Icon.bookmark(true)}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Screen: Routes ────────────────────────────────────────────────────────────
function RoutesScreen() {
  const [selected, setSelected] = useState(0)

  const routes = [
    {
      label:'Recommended', icon:'⭐', time:34, dist:18.2,
      quality:0.72, traffic:0.45, incidents:1,
      desc:'Best overall — moderate traffic, good road surface',
    },
    {
      label:'Fastest', icon:'⚡', time:28, dist:22.4,
      quality:0.51, traffic:0.75, incidents:3,
      desc:'Quickest now, but rough section on Lang\'ata Road',
    },
    {
      label:'Best Road', icon:'🛣️', time:41, dist:16.8,
      quality:0.91, traffic:0.30, incidents:0,
      desc:'Smooth tarmac all the way — zero potholes reported',
    },
  ]

  return (
    <div style={{padding:'24px 16px', overflowY:'auto', height:'100%', display:'flex', flexDirection:'column'}}>
      <div style={{marginBottom:20}}>
        <h2 style={{fontFamily:'var(--font-heading)', fontWeight:700, fontSize:22, margin:0}}>Route options</h2>
        <p style={{color:'var(--muted-foreground)', fontSize:13, marginTop:4}}>Westlands → Karen · updated just now</p>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:12, flex:1}}>
        {routes.map((r, i) => (
          <div key={i} onClick={() => setSelected(i)} className="card" style={{
            padding:'16px', cursor:'pointer',
            border: selected===i ? '1px solid var(--primary)' : '1px solid var(--border)',
            transition:'border-color 0.2s',
          }}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12}}>
              <div>
                <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:4}}>
                  <span style={{fontSize:18}}>{r.icon}</span>
                  <span style={{fontFamily:'var(--font-heading)', fontWeight:700, fontSize:17}}>{r.label}</span>
                  {i === 0 && <span style={{fontSize:10, background:'rgba(0,201,167,0.15)', color:'var(--primary)', padding:'2px 8px', borderRadius:100, fontWeight:600}}>BEST</span>}
                </div>
                <div style={{fontSize:12, color:'var(--muted-foreground)'}}>{r.desc}</div>
              </div>
              <div style={{textAlign:'right', flexShrink:0}}>
                <div style={{fontFamily:'var(--font-mono)', fontSize:24, fontWeight:600, color: selected===i ? 'var(--primary)' : 'var(--foreground)'}}>{r.time}<span style={{fontSize:12, fontWeight:400}}> min</span></div>
                <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--muted-foreground)'}}>{r.dist} km</div>
              </div>
            </div>
            <BarMeter value={r.quality} label="Road quality" color="var(--primary)"/>
            <BarMeter value={r.traffic} label="Traffic" color="var(--amber)"/>
            <div style={{display:'flex', gap:4, marginTop:8, alignItems:'center'}}>
              <Icon.alert/>
              <span style={{fontSize:12, color: r.incidents > 0 ? 'var(--amber)' : 'var(--muted-foreground)'}}>
                {r.incidents} incident{r.incidents !== 1 ? 's' : ''} on route
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-primary" style={{
        width:'100%', padding:'15px', fontSize:16, marginTop:20, marginBottom:8,
        display:'flex', alignItems:'center', justifyContent:'center', gap:8,
      }}>
        <Icon.navigation/>
        Start navigation
      </button>
    </div>
  )
}

// ─── Screen: Gems ──────────────────────────────────────────────────────────────
function GemsScreen() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set(GEMS.filter(g=>g.saved).map(g=>g.id)))

  const categories = ['all','scenic','food','attraction','hotel','fuel','facility']
  const filtered = activeCategory === 'all' ? GEMS : GEMS.filter(g => g.category === activeCategory)

  return (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
      <div style={{padding:'24px 16px 12px'}}>
        <h2 style={{fontFamily:'var(--font-heading)', fontWeight:700, fontSize:22, margin:'0 0 4px'}}>Hidden Gems</h2>
        <p style={{color:'var(--muted-foreground)', fontSize:13, margin:0}}>Verified local places near your routes</p>
      </div>

      {/* Category filter */}
      <div style={{display:'flex', gap:8, padding:'0 16px 12px', overflowX:'auto', flexShrink:0}}>
        {categories.map(cat => (
          <button key={cat} className={`chip${activeCategory===cat?' active':''}`}
            onClick={() => setActiveCategory(cat)}
            style={{whiteSpace:'nowrap', textTransform: cat==='all' ? 'none' : 'capitalize'}}>
            {cat === 'all' ? 'All' : <><GemCategoryIcon category={cat}/>&nbsp;{cat}</>}
          </button>
        ))}
      </div>

      {/* Gems list */}
      <div style={{flex:1, overflowY:'auto', padding:'0 16px 24px', display:'flex', flexDirection:'column', gap:10}}>
        {filtered.map(gem => (
          <div key={gem.id} className="card" style={{padding:'14px 16px'}}>
            <div style={{display:'flex', gap:12, alignItems:'flex-start'}}>
              <div style={{
                width:42, height:42, borderRadius:11, background:'var(--secondary)',
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:20,
              }}>
                <GemCategoryIcon category={gem.category}/>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <div style={{fontFamily:'var(--font-heading)', fontWeight:600, fontSize:15, flex:1, marginRight:8}}>{gem.name}</div>
                  <button
                    onClick={() => setBookmarks(prev => {
                      const n = new Set(prev)
                      n.has(gem.id) ? n.delete(gem.id) : n.add(gem.id)
                      return n
                    })}
                    style={{background:'none', border:'none', cursor:'pointer', color: bookmarks.has(gem.id) ? 'var(--primary)' : 'var(--muted-foreground)', padding:2, flexShrink:0}}
                  >
                    {Icon.bookmark(bookmarks.has(gem.id))}
                  </button>
                </div>
                <div style={{fontSize:12, color:'var(--muted-foreground)', marginTop:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{gem.desc}</div>
                <div style={{display:'flex', alignItems:'center', gap:10, marginTop:8}}>
                  <StarRating rating={gem.rating} interactive/>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--foreground)'}}>{gem.rating}</span>
                  <span style={{fontSize:11, color:'var(--muted-foreground)'}}>{gem.confirmations} confirmed</span>
                  <span style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--primary)', marginLeft:'auto'}}>{gem.distance}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Screen: Profile ───────────────────────────────────────────────────────────
function ProfileScreen({
  role, onRoleChange, darkMode, onDarkModeChange, onNavigate,
}: {
  role: Role
  onRoleChange: (r: Role) => void
  darkMode: boolean
  onDarkModeChange: (v: boolean) => void
  onNavigate: (s: Screen) => void
}) {
  const [notifications, setNotifications] = useState(true)
  const [gemAlerts, setGemAlerts] = useState(true)

  return (
    <div style={{overflowY:'auto', height:'100%', padding:'24px 16px'}}>
      {/* Avatar */}
      <div style={{display:'flex', alignItems:'center', gap:16, marginBottom:24}}>
        <div style={{
          width:64, height:64, borderRadius:'50%',
          background:'linear-gradient(135deg, var(--primary), #00856e)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:26, fontFamily:'var(--font-heading)', fontWeight:700, color:'var(--primary-foreground)',
          flexShrink:0,
        }}>
          {role === 'guest' ? '?' : 'W'}
        </div>
        <div>
          <div style={{fontFamily:'var(--font-heading)', fontWeight:700, fontSize:20}}>
            {role === 'guest' ? 'Guest User' : role === 'admin' ? 'Admin · Kamau' : 'Wanjiru Muthoni'}
          </div>
          <div style={{fontSize:13, color:'var(--muted-foreground)', marginTop:2}}>
            {role === 'guest' ? 'Anonymous session' :
             role === 'admin' ? 'Administrator · PathIQ' :
             role === 'scout' ? 'Scout · Verified' : 'Driver · Free plan'}
          </div>
          <div style={{display:'inline-flex', alignItems:'center', gap:4, marginTop:6, padding:'2px 10px', borderRadius:100,
            background: role === 'admin' ? 'rgba(96,165,250,0.15)' : role === 'scout' ? 'rgba(167,139,250,0.15)' : role === 'guest' ? 'rgba(255,255,255,0.06)' : 'rgba(0,201,167,0.12)',
            color: role === 'admin' ? '#60a5fa' : role === 'scout' ? '#a78bfa' : role === 'guest' ? 'var(--muted-foreground)' : 'var(--primary)',
          }}>
            <span style={{fontSize:10, fontWeight:600, fontFamily:'var(--font-mono)', letterSpacing:'0.06em'}}>
              {role.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      {role !== 'guest' && (
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:20}}>
          {[{label:'IQ Score', value:'742', mono:true}, {label:'Trips', value:'47', mono:true}, {label:'Gems', value:'12', mono:true}].map(s => (
            <div key={s.label} className="card" style={{padding:'12px 10px', textAlign:'center'}}>
              <div style={{fontFamily:'var(--font-mono)', fontWeight:600, fontSize:20, color:'var(--primary)'}}>{s.value}</div>
              <div style={{fontSize:10, color:'var(--muted-foreground)', marginTop:2}}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Role-conditional section */}
      {role === 'guest' && (
        <div className="card" style={{padding:'16px', marginBottom:20, borderColor:'rgba(0,201,167,0.3)'}}>
          <div style={{fontFamily:'var(--font-heading)', fontWeight:600, fontSize:15, marginBottom:4}}>Save your progress</div>
          <div style={{fontSize:13, color:'var(--muted-foreground)', marginBottom:14}}>Create a free account to save routes, rate gems, and build your IQ score.</div>
          <input placeholder="Email address" style={{
            width:'100%', background:'var(--secondary)', border:'1px solid var(--border)',
            borderRadius:10, padding:'10px 12px', color:'var(--foreground)', fontSize:14,
            fontFamily:'var(--font-body)', marginBottom:8, boxSizing:'border-box',
          }}/>
          <input placeholder="Password" type="password" style={{
            width:'100%', background:'var(--secondary)', border:'1px solid var(--border)',
            borderRadius:10, padding:'10px 12px', color:'var(--foreground)', fontSize:14,
            fontFamily:'var(--font-body)', marginBottom:12, boxSizing:'border-box',
          }}/>
          <button className="btn-primary" style={{width:'100%', padding:'12px', fontSize:14}}>Create free account</button>
        </div>
      )}

      {role === 'driver' && (
        <div className="card" style={{padding:'16px', marginBottom:20, borderColor:'rgba(167,139,250,0.3)'}}>
          <div style={{display:'flex', gap:12, alignItems:'flex-start'}}>
            <span style={{fontSize:28}}>🛰️</span>
            <div>
              <div style={{fontFamily:'var(--font-heading)', fontWeight:600, fontSize:15, marginBottom:4}}>Become a Scout</div>
              <div style={{fontSize:13, color:'var(--muted-foreground)', marginBottom:12}}>Report road conditions and earn via M-Pesa — KSh 150–500 per task.</div>
              <input placeholder="Service area (e.g. Westlands, Karen)" style={{
                width:'100%', background:'var(--secondary)', border:'1px solid var(--border)',
                borderRadius:10, padding:'10px 12px', color:'var(--foreground)', fontSize:13,
                fontFamily:'var(--font-body)', marginBottom:8, boxSizing:'border-box',
              }}/>
              <input placeholder="M-Pesa number (07XX XXX XXX)" style={{
                width:'100%', background:'var(--secondary)', border:'1px solid var(--border)',
                borderRadius:10, padding:'10px 12px', color:'var(--foreground)', fontSize:13,
                fontFamily:'var(--font-body)', marginBottom:8, boxSizing:'border-box',
              }}/>
              <textarea placeholder="Why do you want to become a Scout?" style={{
                width:'100%', background:'var(--secondary)', border:'1px solid var(--border)',
                borderRadius:10, padding:'10px 12px', color:'var(--foreground)', fontSize:13,
                fontFamily:'var(--font-body)', marginBottom:12, boxSizing:'border-box',
                resize:'none', height:72,
              }}/>
              <button className="btn-primary" style={{width:'100%', padding:'12px', fontSize:14}}>Submit application</button>
            </div>
          </div>
        </div>
      )}

      {(role === 'scout' || role === 'admin') && (
        <div style={{display:'flex', flexDirection:'column', gap:10, marginBottom:20}}>
          <button onClick={() => onNavigate('scout-tool')} style={{
            display:'flex', alignItems:'center', gap:12, padding:'14px 16px',
            background:'var(--card)', border:'1px solid var(--border)', borderRadius:14,
            cursor:'pointer', color:'var(--foreground)', textAlign:'left',
          }}>
            <span style={{fontSize:20}}>🛰️</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--font-heading)', fontWeight:600, fontSize:14}}>Open Scout tools</div>
              <div style={{fontSize:12, color:'var(--muted-foreground)'}}>Submit road reports and new gems</div>
            </div>
            <Icon.arrow/>
          </button>
          {role === 'admin' && (
            <button onClick={() => onNavigate('admin-console')} style={{
              display:'flex', alignItems:'center', gap:12, padding:'14px 16px',
              background:'var(--card)', border:'1px solid rgba(96,165,250,0.3)', borderRadius:14,
              cursor:'pointer', color:'var(--foreground)', textAlign:'left',
            }}>
              <span style={{fontSize:20}}>⚙️</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:'var(--font-heading)', fontWeight:600, fontSize:14}}>Admin review console</div>
                <div style={{fontSize:12, color:'var(--muted-foreground)'}}>Approve submissions · manage Scout payouts</div>
              </div>
              <Icon.arrow/>
            </button>
          )}
          {role === 'scout' && (
            <div className="card" style={{padding:'14px 16px', borderColor:'rgba(245,158,11,0.3)'}}>
              <div style={{fontFamily:'var(--font-heading)', fontWeight:600, fontSize:14, marginBottom:4}}>Scout earnings</div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <span style={{color:'var(--muted-foreground)', fontSize:13}}>This month</span>
                <span style={{fontFamily:'var(--font-mono)', fontWeight:600, fontSize:22, color:'var(--amber)'}}>KSh 3,450</span>
              </div>
              <div style={{fontSize:12, color:'var(--muted-foreground)', marginTop:4}}>23 tasks completed · Next payout 30 Sep</div>
            </div>
          )}
        </div>
      )}

      {/* Settings */}
      <div style={{marginBottom:20}}>
        <h3 style={{fontFamily:'var(--font-heading)', fontWeight:600, fontSize:14, color:'var(--muted-foreground)', letterSpacing:'0.06em', margin:'0 0 12px'}}>SETTINGS</h3>
        {[
          { label:'Dark mode', sub:'Switch to light theme', value:darkMode, onChange:onDarkModeChange },
          { label:'Notifications', sub:'Route and incident alerts', value:notifications, onChange:setNotifications },
          { label:'Gem alerts', sub:'Approaching gem notifications', value:gemAlerts, onChange:setGemAlerts },
        ].map(s => (
          <div key={s.label} style={{
            display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'14px 0', borderBottom:'1px solid var(--border)',
          }}>
            <div>
              <div style={{fontSize:14, fontWeight:500}}>{s.label}</div>
              <div style={{fontSize:12, color:'var(--muted-foreground)', marginTop:1}}>{s.sub}</div>
            </div>
            <Toggle checked={s.value} onChange={s.onChange}/>
          </div>
        ))}
      </div>

      {/* Demo role switcher */}
      <div style={{marginBottom:20}}>
        <h3 style={{fontFamily:'var(--font-heading)', fontWeight:600, fontSize:14, color:'var(--muted-foreground)', letterSpacing:'0.06em', margin:'0 0 12px'}}>DEMO — SWITCH ROLE</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
          {(['guest','driver','scout','admin'] as Role[]).map(r => (
            <button key={r} onClick={() => onRoleChange(r)} style={{
              padding:'9px', border:'1px solid', borderRadius:10, cursor:'pointer',
              fontFamily:'var(--font-heading)', fontWeight:600, fontSize:12, textTransform:'capitalize',
              background: role===r ? 'var(--primary)' : 'var(--secondary)',
              color: role===r ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
              borderColor: role===r ? 'var(--primary)' : 'var(--border)',
              transition:'all 0.2s',
            }}>{r}</button>
          ))}
        </div>
      </div>

      {role !== 'guest' && (
        <button style={{
          width:'100%', padding:'13px', border:'1px solid var(--border)',
          borderRadius:14, background:'none', cursor:'pointer',
          fontFamily:'var(--font-heading)', fontWeight:600, fontSize:14,
          color:'var(--red)', marginBottom:32,
        }}>Sign out</button>
      )}
    </div>
  )
}

// ─── Screen: Scout Tool ────────────────────────────────────────────────────────
function ScoutToolScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'report'|'gem'>('report')
  const [severity, setSeverity] = useState(3)

  return (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
      {/* Header */}
      <div style={{padding:'20px 16px 0', display:'flex', alignItems:'center', gap:12, marginBottom:20}}>
        <button onClick={onBack} style={{background:'none', border:'1px solid var(--border)', borderRadius:10, padding:'6px 10px', cursor:'pointer', color:'var(--foreground)'}}>
          ← Back
        </button>
        <h2 style={{fontFamily:'var(--font-heading)', fontWeight:700, fontSize:20, margin:0}}>Scout Tools</h2>
        <span style={{fontSize:10, background:'rgba(167,139,250,0.15)', color:'#a78bfa', padding:'3px 10px', borderRadius:100, fontWeight:600, fontFamily:'var(--font-mono)'}}>SCOUT</span>
      </div>

      {/* Tabs */}
      <div style={{display:'flex', gap:8, padding:'0 16px 16px', flexShrink:0}}>
        {(['report','gem'] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            flex:1, padding:'10px', border:'1px solid', borderRadius:12, cursor:'pointer',
            fontFamily:'var(--font-heading)', fontWeight:600, fontSize:13,
            background: activeTab===t ? 'var(--primary)' : 'transparent',
            color: activeTab===t ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
            borderColor: activeTab===t ? 'var(--primary)' : 'var(--border)',
            transition:'all 0.2s',
          }}>
            {t === 'report' ? '⚠️ Road Report' : '💎 New Gem'}
          </button>
        ))}
      </div>

      <div style={{flex:1, overflowY:'auto', padding:'0 16px 32px'}}>
        {activeTab === 'report' ? (
          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            <div>
              <label style={{fontSize:12, color:'var(--muted-foreground)', display:'block', marginBottom:8, fontFamily:'var(--font-mono)', letterSpacing:'0.06em'}}>CONDITION TYPE</label>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                {['Pothole','Flooding','Construction','Incident','Road Surface','Traffic'].map((type,i) => (
                  <button key={type} style={{
                    padding:'10px', border:'1px solid var(--border)', borderRadius:10, cursor:'pointer',
                    background: i===0 ? 'var(--primary)' : 'var(--secondary)',
                    color: i===0 ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                    fontFamily:'var(--font-body)', fontSize:13, textAlign:'left',
                  }}>
                    {['🕳️','🌊','🚧','⚠️','🛣️','🚦'][i]} {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{fontSize:12, color:'var(--muted-foreground)', display:'block', marginBottom:8, fontFamily:'var(--font-mono)', letterSpacing:'0.06em'}}>SEVERITY</label>
              <div style={{display:'flex', gap:8}}>
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setSeverity(n)} style={{
                    flex:1, padding:'12px 0', border:'1px solid', borderRadius:10, cursor:'pointer',
                    fontFamily:'var(--font-mono)', fontWeight:600, fontSize:14,
                    background: severity===n ? (n>=4 ? 'var(--red)' : n>=3 ? 'var(--amber)' : 'var(--blue)') : 'var(--secondary)',
                    color: severity===n ? 'white' : 'var(--muted-foreground)',
                    borderColor: severity===n ? 'transparent' : 'var(--border)',
                    transition:'all 0.2s',
                  }}>{n}</button>
                ))}
              </div>
              <div style={{fontSize:12, color:'var(--muted-foreground)', marginTop:6, textAlign:'center'}}>
                {severity <= 2 ? 'Low — minor inconvenience' : severity === 3 ? 'Medium — slow carefully' : severity === 4 ? 'High — strongly advise detour' : 'Severe — route impassable'}
              </div>
            </div>
            <div>
              <label style={{fontSize:12, color:'var(--muted-foreground)', display:'block', marginBottom:8, fontFamily:'var(--font-mono)', letterSpacing:'0.06em'}}>DESCRIPTION</label>
              <textarea placeholder="Describe what you observed..." style={{
                width:'100%', background:'var(--secondary)', border:'1px solid var(--border)',
                borderRadius:12, padding:'12px', color:'var(--foreground)', fontSize:14,
                fontFamily:'var(--font-body)', resize:'none', height:96, boxSizing:'border-box',
              }}/>
            </div>
            <button style={{
              display:'flex', alignItems:'center', gap:8, padding:'12px 14px',
              background:'var(--secondary)', border:'1px solid var(--border)', borderRadius:12,
              cursor:'pointer', color:'var(--foreground)', fontSize:14,
            }}>
              <Icon.pin/> Use current location (Westlands, Nairobi)
            </button>
            <button className="btn-primary" style={{padding:'14px', fontSize:15}}>Submit road report</button>
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            {[
              {label:'GEM NAME', placeholder:'e.g. Karura Forest Waterfall'},
              {label:'DESCRIPTION', placeholder:'What makes it special?', textarea:true},
            ].map(f => (
              <div key={f.label}>
                <label style={{fontSize:12, color:'var(--muted-foreground)', display:'block', marginBottom:8, fontFamily:'var(--font-mono)', letterSpacing:'0.06em'}}>{f.label}</label>
                {f.textarea ? (
                  <textarea placeholder={f.placeholder} style={{
                    width:'100%', background:'var(--secondary)', border:'1px solid var(--border)',
                    borderRadius:12, padding:'12px', color:'var(--foreground)', fontSize:14,
                    fontFamily:'var(--font-body)', resize:'none', height:96, boxSizing:'border-box',
                  }}/>
                ) : (
                  <input placeholder={f.placeholder} style={{
                    width:'100%', background:'var(--secondary)', border:'1px solid var(--border)',
                    borderRadius:12, padding:'12px', color:'var(--foreground)', fontSize:14,
                    fontFamily:'var(--font-body)', boxSizing:'border-box',
                  }}/>
                )}
              </div>
            ))}
            <div>
              <label style={{fontSize:12, color:'var(--muted-foreground)', display:'block', marginBottom:8, fontFamily:'var(--font-mono)', letterSpacing:'0.06em'}}>CATEGORY</label>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
                {['scenic','food','attraction','hotel','fuel','facility'].map((cat,i) => (
                  <button key={cat} style={{
                    padding:'10px', border:'1px solid var(--border)', borderRadius:10, cursor:'pointer',
                    background: i===0 ? 'var(--primary)' : 'var(--secondary)',
                    color: i===0 ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                    fontFamily:'var(--font-body)', fontSize:12, textTransform:'capitalize',
                  }}>
                    <GemCategoryIcon category={cat}/> {cat}
                  </button>
                ))}
              </div>
            </div>
            <button style={{
              display:'flex', alignItems:'center', gap:8, padding:'12px 14px',
              background:'var(--secondary)', border:'1px solid var(--border)', borderRadius:12,
              cursor:'pointer', color:'var(--foreground)', fontSize:14,
            }}>
              <Icon.pin/> Use current location
            </button>
            <button className="btn-primary" style={{padding:'14px', fontSize:15}}>Submit new gem</button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Screen: Admin Console ─────────────────────────────────────────────────────
function AdminConsoleScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'gems'|'reports'|'scouts'|'earnings'>('gems')

  const pendingGems = [
    { id:1, name:'Muthaiga Country Club Garden Walk', by:'Scout Amina', cat:'scenic', submitted:'2h ago' },
    { id:2, name:'Uchumi Supermarket Parking Café', by:'Scout Benson', cat:'food', submitted:'5h ago' },
    { id:3, name:'Wilson Airport Observation Deck', by:'Scout Ciku', cat:'attraction', submitted:'1d ago' },
  ]
  const pendingReports = [
    { id:1, type:'Pothole', road:'Langata Rd near Hardy', severity:4, by:'Scout Dora', submitted:'30m ago' },
    { id:2, type:'Flooding', road:'Mbagathi Way junction', severity:5, by:'Scout Erik', submitted:'1h ago' },
  ]
  const scoutApplications = [
    { id:1, name:'Faith Wanjiku', area:'Eastlands, Embakasi', mpesa:'0712 345 678', submitted:'3h ago' },
    { id:2, name:'George Otieno', area:'Kisumu CBD, Milimani', mpesa:'0733 456 789', submitted:'6h ago' },
  ]
  const earnings = [
    { id:1, name:'Scout Amina', tasks:18, amount:'KSh 4,200', status:'pending', period:'Sep 2026' },
    { id:2, name:'Scout Benson', tasks:12, amount:'KSh 2,700', status:'paid', period:'Sep 2026' },
    { id:3, name:'Scout Ciku', tasks:23, amount:'KSh 5,100', status:'pending', period:'Sep 2026' },
  ]

  return (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
      <div style={{padding:'20px 16px 0', display:'flex', alignItems:'center', gap:12, marginBottom:16}}>
        <button onClick={onBack} style={{background:'none', border:'1px solid var(--border)', borderRadius:10, padding:'6px 10px', cursor:'pointer', color:'var(--foreground)'}}>
          ← Back
        </button>
        <h2 style={{fontFamily:'var(--font-heading)', fontWeight:700, fontSize:20, margin:0}}>Admin Console</h2>
        <span style={{fontSize:10, background:'rgba(96,165,250,0.15)', color:'#60a5fa', padding:'3px 10px', borderRadius:100, fontWeight:600, fontFamily:'var(--font-mono)'}}>ADMIN</span>
      </div>

      {/* Tabs */}
      <div style={{display:'flex', gap:0, padding:'0 16px 16px', flexShrink:0, borderBottom:'1px solid var(--border)', marginBottom:16}}>
        {([
          {key:'gems', label:'Gems', count:pendingGems.length},
          {key:'reports', label:'Reports', count:pendingReports.length},
          {key:'scouts', label:'Scouts', count:scoutApplications.length},
          {key:'earnings', label:'Earnings', count:0},
        ] as const).map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
            flex:1, padding:'8px 4px', border:'none', borderBottom: activeTab===t.key ? '2px solid var(--primary)' : '2px solid transparent',
            background:'none', cursor:'pointer', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:12,
            color: activeTab===t.key ? 'var(--primary)' : 'var(--muted-foreground)',
            transition:'all 0.2s',
          }}>
            {t.label}{t.count > 0 && <span style={{marginLeft:4, fontSize:10, background:'var(--primary)', color:'var(--primary-foreground)', borderRadius:100, padding:'1px 5px'}}>{t.count}</span>}
          </button>
        ))}
      </div>

      <div style={{flex:1, overflowY:'auto', padding:'0 16px 32px', display:'flex', flexDirection:'column', gap:10}}>
        {activeTab === 'gems' && pendingGems.map(gem => (
          <div key={gem.id} className="card" style={{padding:'14px 16px'}}>
            <div style={{fontFamily:'var(--font-heading)', fontWeight:600, fontSize:14}}>{gem.name}</div>
            <div style={{fontSize:12, color:'var(--muted-foreground)', marginTop:2}}>by {gem.by} · <GemCategoryIcon category={gem.cat}/> {gem.cat} · {gem.submitted}</div>
            <div style={{display:'flex', gap:8, marginTop:12}}>
              <button style={{flex:1, padding:'9px', border:'none', borderRadius:10, cursor:'pointer', background:'rgba(0,201,167,0.12)', color:'var(--primary)', fontWeight:600, fontFamily:'var(--font-heading)', fontSize:13, display:'flex', alignItems:'center', justifyContent:'center', gap:4}}>
                <Icon.check/> Approve
              </button>
              <button style={{flex:1, padding:'9px', border:'none', borderRadius:10, cursor:'pointer', background:'rgba(239,68,68,0.1)', color:'var(--red)', fontWeight:600, fontFamily:'var(--font-heading)', fontSize:13, display:'flex', alignItems:'center', justifyContent:'center', gap:4}}>
                <Icon.x/> Reject
              </button>
            </div>
          </div>
        ))}

        {activeTab === 'reports' && pendingReports.map(r => (
          <div key={r.id} className="card" style={{padding:'14px 16px'}}>
            <div style={{display:'flex', gap:8, alignItems:'flex-start'}}>
              <SeverityDot severity={r.severity}/>
              <div style={{flex:1}}>
                <div style={{fontFamily:'var(--font-heading)', fontWeight:600, fontSize:14}}>{r.type} — Severity {r.severity}/5</div>
                <div style={{fontSize:12, color:'var(--muted-foreground)', marginTop:2}}>{r.road}</div>
                <div style={{fontSize:11, color:'var(--muted-foreground)', marginTop:1}}>by {r.by} · {r.submitted}</div>
              </div>
            </div>
            <div style={{display:'flex', gap:8, marginTop:12}}>
              <button style={{flex:1, padding:'9px', border:'none', borderRadius:10, cursor:'pointer', background:'rgba(0,201,167,0.12)', color:'var(--primary)', fontWeight:600, fontFamily:'var(--font-heading)', fontSize:13, display:'flex', alignItems:'center', justifyContent:'center', gap:4}}>
                <Icon.check/> Approve
              </button>
              <button style={{flex:1, padding:'9px', border:'none', borderRadius:10, cursor:'pointer', background:'rgba(239,68,68,0.1)', color:'var(--red)', fontWeight:600, fontFamily:'var(--font-heading)', fontSize:13, display:'flex', alignItems:'center', justifyContent:'center', gap:4}}>
                <Icon.x/> Reject
              </button>
            </div>
          </div>
        ))}

        {activeTab === 'scouts' && scoutApplications.map(s => (
          <div key={s.id} className="card" style={{padding:'14px 16px'}}>
            <div style={{fontFamily:'var(--font-heading)', fontWeight:600, fontSize:15}}>{s.name}</div>
            <div style={{fontSize:12, color:'var(--muted-foreground)', marginTop:2}}>Area: {s.area}</div>
            <div style={{fontSize:12, color:'var(--muted-foreground)'}}>M-Pesa: {s.mpesa} · {s.submitted}</div>
            <div style={{display:'flex', gap:8, marginTop:12}}>
              <button style={{flex:1, padding:'9px', border:'none', borderRadius:10, cursor:'pointer', background:'rgba(0,201,167,0.12)', color:'var(--primary)', fontWeight:600, fontFamily:'var(--font-heading)', fontSize:13, display:'flex', alignItems:'center', justifyContent:'center', gap:4}}>
                <Icon.check/> Approve Scout
              </button>
              <button style={{flex:1, padding:'9px', border:'none', borderRadius:10, cursor:'pointer', background:'rgba(239,68,68,0.1)', color:'var(--red)', fontWeight:600, fontFamily:'var(--font-heading)', fontSize:13, display:'flex', alignItems:'center', justifyContent:'center', gap:4}}>
                <Icon.x/> Decline
              </button>
            </div>
          </div>
        ))}

        {activeTab === 'earnings' && earnings.map(e => (
          <div key={e.id} className="card" style={{padding:'14px 16px'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
              <div>
                <div style={{fontFamily:'var(--font-heading)', fontWeight:600, fontSize:14}}>{e.name}</div>
                <div style={{fontSize:12, color:'var(--muted-foreground)', marginTop:2}}>{e.tasks} tasks · {e.period}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontFamily:'var(--font-mono)', fontWeight:600, fontSize:18, color:'var(--amber)'}}>{e.amount}</div>
                <div style={{
                  fontSize:10, fontFamily:'var(--font-mono)',
                  color: e.status === 'paid' ? 'var(--primary)' : 'var(--amber)',
                  marginTop:2, textTransform:'uppercase',
                }}>{e.status}</div>
              </div>
            </div>
            {e.status === 'pending' && (
              <button style={{
                width:'100%', marginTop:12, padding:'9px', border:'none', borderRadius:10, cursor:'pointer',
                background:'rgba(245,158,11,0.12)', color:'var(--amber)', fontWeight:600,
                fontFamily:'var(--font-heading)', fontSize:13,
              }}>
                Mark as paid via M-Pesa
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Bottom Tab Bar ────────────────────────────────────────────────────────────
function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { key: Tab; label: string; IconC: () => JSX.Element }[] = [
    { key: 'home', label: 'Home', IconC: Icon.home },
    { key: 'map', label: 'Map', IconC: Icon.map },
    { key: 'routes', label: 'Routes', IconC: Icon.routes },
    { key: 'gems', label: 'Gems', IconC: Icon.gems },
    { key: 'profile', label: 'Profile', IconC: Icon.profile },
  ]
  return (
    <div style={{
      display:'flex', background:'var(--card)',
      borderTop:'1px solid var(--border)', flexShrink:0,
      paddingBottom:'env(safe-area-inset-bottom, 0)',
    }}>
      {tabs.map(t => (
        <button key={t.key} onClick={() => onChange(t.key)} style={{
          flex:1, display:'flex', flexDirection:'column', alignItems:'center',
          gap:3, padding:'10px 0 8px', border:'none', background:'none',
          cursor:'pointer', color: active===t.key ? 'var(--primary)' : 'var(--muted-foreground)',
          transition:'color 0.15s',
        }}>
          <t.IconC />
          <span style={{fontSize:10, fontFamily:'var(--font-heading)', fontWeight:500}}>{t.label}</span>
        </button>
      ))}
    </div>
  )
}

// ─── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [screen, setScreen] = useState<Screen>('home')
  const [role, setRole] = useState<Role>('driver')
  const [darkMode, setDarkMode] = useState(true)

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setScreen(tab)
  }

  const handleNavigate = (s: Screen) => setScreen(s)
  const handleBack = () => {
    setScreen(activeTab)
  }

  const handleDarkModeChange = (v: boolean) => {
    setDarkMode(v)
    if (v) {
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
    }
  }

  const isSubScreen = screen === 'scout-tool' || screen === 'admin-console'

  return (
    <div style={{
      height:'100dvh', maxWidth:430, margin:'0 auto',
      display:'flex', flexDirection:'column',
      background:'var(--background)', overflow:'hidden',
      position:'relative',
    }}>
      {/* Status bar */}
      {!isSubScreen && (
        <div style={{
          display:'flex', justifyContent:'space-between', padding:'12px 20px 0',
          flexShrink:0,
        }}>
          <span style={{fontFamily:'var(--font-mono)', fontSize:12, color:'var(--muted-foreground)', fontWeight:600}}>9:41</span>
          <div style={{display:'flex', gap:4, alignItems:'center'}}>
            <span style={{fontFamily:'var(--font-mono)', fontSize:12, color:'var(--muted-foreground)'}}>●●●</span>
            <span style={{fontFamily:'var(--font-mono)', fontSize:12, color:'var(--muted-foreground)', marginLeft:4}}>WiFi</span>
            <span style={{fontFamily:'var(--font-mono)', fontSize:12, color:'var(--primary)', marginLeft:4}}>▐▌</span>
          </div>
        </div>
      )}

      {/* Screen content */}
      <div style={{flex:1, overflow:'hidden', display:'flex', flexDirection:'column'}}>
        {screen === 'home' && <HomeScreen role={role}/>}
        {screen === 'map' && <MapScreen/>}
        {screen === 'routes' && <RoutesScreen/>}
        {screen === 'gems' && <GemsScreen/>}
        {screen === 'profile' && (
          <ProfileScreen
            role={role}
            onRoleChange={setRole}
            darkMode={darkMode}
            onDarkModeChange={handleDarkModeChange}
            onNavigate={handleNavigate}
          />
        )}
        {screen === 'scout-tool' && <ScoutToolScreen onBack={handleBack}/>}
        {screen === 'admin-console' && <AdminConsoleScreen onBack={handleBack}/>}
      </div>

      {/* Tab bar — hidden on sub-screens */}
      {!isSubScreen && (
        <TabBar active={activeTab} onChange={handleTabChange}/>
      )}
    </div>
  )
}
