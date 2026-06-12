import { useState, useEffect, useCallback } from "react";

const COST_MAP = {
  'Bacon Bits Real Cooked .375" Gas Flushed': 7.255,
  'Bacon Precooked Thick Slice': 0.2067,
  'Beef Chopped Burnt Ends': 11.678,
  'Beef Roast Shredded Cooked Choice': 9.962,
  'Beef Steak Pub Burger Cooked': 1.8692,
  'Ham Pit Boneless Smoked Old Fashioned Water-added': 4.19,
  'Pork Pulled Smoked': 5.826,
  'Chicken Breast Breaded Fully Cooked No Antibiotics Ever': 4.695,
  'Chicken Breast Diced Grill Fully-cooked Reduced': 4.125,
  'Chicken Tender Breaded Homestyle': 3.804,
  'Turkey Breast Oil Brown Skinless': 5.077,
  'Appetizer Cheese Curd Breaded Wisconsin': 5.598,
  'Macaroni And Cheese White': 3.7012,
  'Onion Ring Beer Battered .375" Ovenable': 3.9073,
  'Potato Fry 1/4" Shoestring Ultimate Crisp': 1.7481,
  'Potato Tater Barrel': 1.73,
  'Chip Potato Jalapeno Kettle': 0.6989,
  'Chip Potato Regular Sea Salt': 0.6989,
  'Chip Potato Salted & Vinegar Kettle': 0.6989,
  'Chip Potato Smokehouse Bbq Kettle': 0.6989,
  'Chip Potato Spicy Dill Kettle': 0.7455,
  'Bread Deli White Slice 5/8" Salt City Baking (18 Slices / Loaf)': 4.4333,
  'Bread Loaf Multigrain Gluten Free Sliced (14 Slices / Loaf)': 11.5333,
  'Bun Hamburger Brioche 4 Inch': 6.482,
  'Brownie Chocolate Bar (Brookie)': 0.8534,
  'Cake Funnel Fries': 7.9737,
  "Hope's Dough Cookie Chocolate Chunk Semi Sweet": 0.611,
  "F'Real Milkshake Chocolate": 2.2842,
  "F'Real Milkshake Cookie N Cream Oreo": 2.2842,
  "F'Real Milkshake Vanilla": 2.2842,
  "F'real Milkshake Strawberry": 2.2842,
  'Topping Whipped Aerosol': 3.1675,
  'Sauce Caramel Designer Dessert': 3.4108,
  'Hersheys Chocolate Syrup': 4.99,
  'Cream Cheese Frosting / Icing': 1.96,
  'Spread Cookie Creamy Butter': 5.47,
  'Spread Hazelnut Creamy Nutella': 9.48,
  'Soup Broccoli Cheddar': 3.2856,
  'Soup Chicken Noodle Ready To Use': 2.5381,
  'Soup Tomato Basil Bisque Ready To Use': 3.4087,
  'Cheese American 120 Slice Yellow': 2.794,
  'Cheese Cheddar Sharp Feather Shredded Yellow': 3.257,
  'Cheese Cream Whipped Tub Spread': 3.6008,
  'Cheese Fontina Shredded': 4.877,
  'Cheese Havarti Sliced': 6.633,
  'Cheese Mascarpone': 5.0517,
  'Cheese Mozzarella Low Moisture Whole Milk Mozzarella': 2.696,
  'Cheese Mozzarella Fresh Slice Thin': 4.1283,
  'Cheese Parmesan Shredded Usa': 5.384,
  'Cheese Pepper Jack Feather Shredded': 2.9315,
  'Cheese Provolone Non-smoked Sliced .75 Ounce': 3.3493,
  'Cheese Swiss Sliced .75 Ounce': 3.995,
  'Cheese Queso Bravo White Dip In Bag-Land O Lakes': 3.2457,
  'Sauce Pesto Basil': 13.125,
  'Dijon Mustard': 1.62,
  'Garlic Chopped In Water': 8.24,
  'Cracker Saltine 2 Per Packet': 0.0354,
  'Sauce Cranberry Whole Fancy': 13.7133,
  'Dressing Buttermilk Ranch': 17.41,
  'Dressing Caesar With Egg': 28.79,
  'Glaze Balsamic Vinegar Of Modena': 3.19,
  'Juice Lemon Pasteurized Ultra Premium': 5.11,
  'Ketchup Jug Red In Plastic Bottle With Pump': 6.995,
  'Margarine Butter Whipped European Style': 2.418,
  'Mayonnaise Heavy Duty': 11.71,
  'Mix Gravy Au Jus': 2.6192,
  'Pepper Chipotle In Adobo Sauce': 1.6617,
  'Pickle Dill Sliced 3/16" Krinkle Kut 450 Count': 9.33,
  'Salt Kosher Flake Coarse': 1.54,
  'Sauce Barbecue Original': 13.8325,
  'Sauce Chili Sweet Thai': 4.3258,
  'Sauce Hot Sriracha 28 Ounce': 4.1333,
  'Sauce Pasta Ultra Premium (6.9 lb per Can or 41.4 lbs/cs.)': 1.2029,
  'Seasoning Italian Whole': 10.0,
  'Shortening Fry Liquid Clear Zero Trans Fat': 1.1706,
  'Soup Tomato Condensed': 4.5183,
  'Spice Blend Shichimi Togarashi': 37.61,
  'Spice Blend Vampire Killer': 27.9,
  'Spice Garlic Powder': 18.88,
  'Spice Pepper Black Ground Pure': 21.56,
  'Stove Top Turkey Stuffing Mix': 1.33,
  'Sugar Granulated Extra Fine Cane': 0.9148,
  'Tortilla Strips Tri-colored Fried': 3.572,
  'Beans Black With Corn Flame Roasted Fiesta': 2.4967,
  'Vinegar Rice Seasoned Japanese (1/Gal)': 21.88,
  'Bam Sauce': 29.78, 'Chipotle Mayo': 20.64, 'Fry Sauce': 22.92,
  'Melty Sauce': 18.02, 'Mustard Aioli': 9.05,
  'Avocado Hass Fresh Chunk Pulp Packaged Tray': 4.1863,
  'Lettuce Romaine Fresh': 3.2583, 'Onion Green Iceless': 3.785,
  'Onion Red Jumbo Sack': 1.343, 'Onion Diced Iqf Poly Packaging': 1.8967,
  'Pepper Jalapeno Fresh': 3.212, 'Tomato 1 Layer 5x6': 4.164,
  'Juice Concentrate Frozen Lemonade 5% 5:1 Yield': 33.19,
  'Syrup Coke Classic 5:1 Yield Bag-in-box': 115.95,
  'Syrup Coke Diet 5:1 Yield Bag-in-box': 115.95,
  'Syrup Coke Zero Sugar Concentrate 5:1 Yield Bag In Box': 115.95,
  'Syrup Dr Pepper Bag-in-box': 122.02,
  'Syrup Dr Pepper Diet Bag In Box': 63.7,
  'Syrup Mountain Blast Sport Bag In Box': 60.5,
  'Syrup Root Beer Bag In Box': 60.5,
  'Syrup Sprite 5:1 Yield Bag-in-box': 115.95,
  'Tea Brew Filter Pack': 1.3703, '12 oz Canned Soda': 0.528,
  'Dasani Purified Water': 0.3706, 'Juice Apple 100%': 0.9071,
  'Puree Strawberry': 12.59, 'Puree Mango': 17.38, 'Puree Raspberry': 17.38,
};

const fmt$ = n => `$${Number(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const fmtDate = s => s ? new Date(s).toLocaleDateString('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}) : '—';

const IconRefresh = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg>;
const IconClock   = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;

const DARK = '#0f0f0f', RED = '#ef4444', CARD = '#1a1a1a', BORD = '#2a2a2a';
const inp = { width:'100%', background:'#111', border:`1px solid ${BORD}`, borderRadius:8, padding:'10px 12px', fontSize:12, color:'#e5e7eb', outline:'none', boxSizing:'border-box', fontFamily:'monospace', marginBottom:8 };

export default function Dashboard() {
  // Credentials stored in dashboard's own localStorage key
  const [url,     setUrl]     = useState(() => localStorage.getItem('melty_db_url')  || '');
  const [key,     setKey]     = useState(() => localStorage.getItem('melty_db_key')  || '');
  const [ready,   setReady]   = useState(() => !!(localStorage.getItem('melty_db_url') && localStorage.getItem('melty_db_key')));
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [store,   setStore]   = useState('All');
  const [week,    setWeek]    = useState('All');
  const [expCat,  setExpCat]  = useState(null);
  const [lastRef, setLastRef] = useState(null);

  const fetchData = useCallback(async (supabaseUrl, anonKey) => {
    setLoading(true); setError(null);
    try {
      const resp = await fetch(
        `${supabaseUrl}/rest/v1/inventory_submissions?select=store_name,submitter,week_number,week_date,period,item_name,category,location,uom,count,submitted_at&order=submitted_at.desc&limit=5000`,
        { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } }
      );
      if (!resp.ok) throw new Error(`Error ${resp.status} — check credentials`);
      const rows = await resp.json();
      // Deduplicate: keep latest per store+week+item
      const seen = new Map();
      rows.forEach(r => {
        const k = `${r.store_name}||${r.week_number}||${r.item_name}`;
        if (!seen.has(k)) seen.set(k, r);
      });
      setData([...seen.values()]);
      setLastRef(new Date());
    } catch(e) { setError(e.message); }
    setLoading(false);
  }, []);

  function handleConnect() {
    if (!url || !key) return;
    localStorage.setItem('melty_db_url', url);
    localStorage.setItem('melty_db_key', key);
    setReady(true);
    fetchData(url, key);
  }

  useEffect(() => { if (ready && url && key) fetchData(url, key); }, [ready]);

  // ── CREDENTIAL ENTRY SCREEN ───────────────────────────────────────────────
  if (!ready) {
    return (
      <div style={{ minHeight:'100vh', background:DARK, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Inter',system-ui,sans-serif", padding:20 }}>
        <div style={{ width:'100%', maxWidth:400 }}>
          <div style={{ color:RED, fontWeight:900, fontSize:28, letterSpacing:'-1px', marginBottom:4 }}>MELTY</div>
          <div style={{ color:'#4b5563', fontSize:13, marginBottom:32 }}>Ops Dashboard</div>
          <div style={{ background:CARD, borderRadius:14, padding:24, border:`1px solid ${BORD}` }}>
            <div style={{ fontSize:13, fontWeight:700, color:'#f9fafb', marginBottom:4 }}>Connect to Supabase</div>
            <div style={{ fontSize:11, color:'#6b7280', marginBottom:16, lineHeight:1.6 }}>
              Enter your Supabase Project URL and anon key. These are saved in this browser — you only need to do this once.
            </div>
            <label style={{ fontSize:11, color:'#6b7280', display:'block', marginBottom:4 }}>Project URL</label>
            <input value={url} onChange={e=>setUrl(e.target.value.trim())} placeholder="https://xxxx.supabase.co" style={inp}/>
            <label style={{ fontSize:11, color:'#6b7280', display:'block', marginBottom:4 }}>Anon Public Key</label>
            <input value={key} onChange={e=>setKey(e.target.value.trim())} placeholder="eyJhbGci..." style={{...inp, marginBottom:16}}/>
            <button
              onClick={handleConnect}
              disabled={!url || !key}
              style={{ width:'100%', padding:'12px', borderRadius:10, border:'none', cursor:url&&key?'pointer':'not-allowed', fontWeight:700, fontSize:14, background:url&&key?RED:'#2a2a2a', color:url&&key?'#fff':'#4b5563' }}
            >
              Connect →
            </button>
          </div>
          <div style={{ fontSize:11, color:'#374151', marginTop:12, textAlign:'center' }}>
            Find these in your Supabase project under Settings → API Keys
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN DASHBOARD ────────────────────────────────────────────────────────
  const stores  = ['All', ...new Set(data.map(r => r.store_name))].sort();
  const weeks   = ['All', ...new Set(data.map(r => r.week_number))].sort((a,b) => a===b?0:a==='All'?-1:b==='All'?1:a-b);

  const filtered = data.filter(r =>
    (store==='All' || r.store_name===store) &&
    (week==='All'  || r.week_number===Number(week))
  );

  const totalValue = filtered.reduce((s,r) => s + Number(r.count)*(COST_MAP[r.item_name]||0), 0);

  const byCategory = {};
  filtered.forEach(r => {
    if (!byCategory[r.category]) byCategory[r.category] = [];
    byCategory[r.category].push(r);
  });

  const byStore = {};
  data.filter(r => week==='All' || r.week_number===Number(week)).forEach(r => {
    if (!byStore[r.store_name]) byStore[r.store_name] = {items:0, value:0, lastSub:null, submitter:''};
    const s = byStore[r.store_name];
    s.items++;
    s.value += Number(r.count)*(COST_MAP[r.item_name]||0);
    if (!s.lastSub || r.submitted_at > s.lastSub) { s.lastSub = r.submitted_at; s.submitter = r.submitter; }
  });

  return (
    <div style={{ minHeight:'100vh', background:DARK, fontFamily:"'Inter',system-ui,sans-serif", color:'#e5e7eb' }}>

      {/* HEADER */}
      <div style={{ background:CARD, borderBottom:`1px solid ${BORD}`, padding:'16px 20px', position:'sticky', top:0, zIndex:50 }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ color:RED, fontWeight:900, fontSize:20, letterSpacing:'-0.5px' }}>
              MELTY <span style={{ color:'#4b5563', fontWeight:400, fontSize:13 }}>Ops Dashboard</span>
            </div>
            <div style={{ color:'#4b5563', fontSize:11, marginTop:2, display:'flex', alignItems:'center', gap:4 }}>
              <IconClock/> {lastRef ? `Updated ${fmtDate(lastRef.toISOString())}` : 'Loading…'}
            </div>
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <button onClick={()=>fetchData(url,key)} disabled={loading} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:8, border:`1px solid ${BORD}`, background:'transparent', color:'#9ca3af', fontSize:12, cursor:'pointer', fontWeight:600 }}>
              <IconRefresh/> {loading ? 'Refreshing…' : 'Refresh'}
            </button>
            <button onClick={()=>{ localStorage.removeItem('melty_db_url'); localStorage.removeItem('melty_db_key'); setReady(false); setData([]); }} style={{ padding:'8px 12px', borderRadius:8, border:`1px solid ${BORD}`, background:'transparent', color:'#4b5563', fontSize:11, cursor:'pointer' }}>
              Disconnect
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'20px 16px' }}>

        {error && (
          <div style={{ background:'#450a0a', border:'1px solid #7f1d1d', borderRadius:10, padding:'12px 16px', marginBottom:16, color:'#fca5a5', fontSize:13 }}>
            ⚠ {error}
          </div>
        )}

        {/* FILTERS */}
        <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
          <div style={{ display:'flex', gap:4, background:CARD, borderRadius:10, padding:4, border:`1px solid ${BORD}` }}>
            <span style={{ padding:'6px 10px', fontSize:11, color:'#6b7280' }}>Store</span>
            {stores.map(s => (
              <button key={s} onClick={()=>setStore(s)} style={{ padding:'6px 12px', borderRadius:7, border:'none', cursor:'pointer', fontSize:12, fontWeight:600, background:store===s?RED:'transparent', color:store===s?'#fff':'#9ca3af', transition:'all .15s' }}>{s}</button>
            ))}
          </div>
          <div style={{ display:'flex', gap:4, background:CARD, borderRadius:10, padding:4, border:`1px solid ${BORD}` }}>
            <span style={{ padding:'6px 10px', fontSize:11, color:'#6b7280' }}>Week</span>
            {weeks.map(w => (
              <button key={w} onClick={()=>setWeek(String(w))} style={{ padding:'6px 12px', borderRadius:7, border:'none', cursor:'pointer', fontSize:12, fontWeight:600, background:String(week)===String(w)?RED:'transparent', color:String(week)===String(w)?'#fff':'#9ca3af', transition:'all .15s' }}>{w==='All'?'All':`W${w}`}</button>
            ))}
          </div>
        </div>

        {loading && !data.length ? (
          <div style={{ textAlign:'center', color:'#4b5563', padding:60, fontSize:14 }}>Loading submissions…</div>
        ) : (
          <>
            {/* STAT CARDS */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:12, marginBottom:24 }}>
              {[
                { label:'Inventory Value', value:fmt$(totalValue), sub:'at cost' },
                { label:'Items Counted',   value:filtered.length,  sub:'line items' },
                { label:'Locations',       value:Object.keys(byStore).length, sub:'active' },
                { label:'Store-Weeks',     value:new Set(data.map(r=>`${r.store_name}||${r.week_number}`)).size, sub:'submissions' },
              ].map(s => (
                <div key={s.label} style={{ background:CARD, border:`1px solid ${BORD}`, borderRadius:12, padding:'16px 18px' }}>
                  <div style={{ fontSize:11, color:'#6b7280', marginBottom:4, textTransform:'uppercase', letterSpacing:.8 }}>{s.label}</div>
                  <div style={{ fontSize:26, fontWeight:800, color:'#f9fafb', letterSpacing:'-1px' }}>{s.value}</div>
                  <div style={{ fontSize:11, color:'#4b5563', marginTop:2 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* STORE CARDS */}
            {store==='All' && Object.keys(byStore).length > 0 && (
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:1, marginBottom:10 }}>Locations</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:10 }}>
                  {Object.entries(byStore).sort().map(([name, s]) => (
                    <div key={name} onClick={()=>setStore(name)}
                      style={{ background:CARD, border:`1px solid ${BORD}`, borderRadius:12, padding:'14px 16px', cursor:'pointer', transition:'border-color .15s' }}
                      onMouseEnter={e=>e.currentTarget.style.borderColor=RED}
                      onMouseLeave={e=>e.currentTarget.style.borderColor=BORD}>
                      <div style={{ fontSize:14, fontWeight:700, color:'#f9fafb', marginBottom:6 }}>{name}</div>
                      <div style={{ fontSize:22, fontWeight:800, color:RED }}>{fmt$(s.value)}</div>
                      <div style={{ fontSize:11, color:'#4b5563', marginTop:4 }}>{s.items} items · {s.submitter}</div>
                      <div style={{ fontSize:10, color:'#374151', marginTop:2, display:'flex', alignItems:'center', gap:3 }}><IconClock/>{fmtDate(s.lastSub)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CATEGORY BREAKDOWN */}
            {filtered.length > 0 && (
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:1, marginBottom:10 }}>
                  {store !== 'All' ? store : 'All Locations'} · By Category
                </div>
                {Object.entries(byCategory).sort().map(([cat, items]) => {
                  const catVal = items.reduce((s,r) => s + Number(r.count)*(COST_MAP[r.item_name]||0), 0);
                  const open   = expCat === cat;
                  return (
                    <div key={cat} style={{ marginBottom:8, background:CARD, border:`1px solid ${BORD}`, borderRadius:12, overflow:'hidden' }}>
                      <div onClick={()=>setExpCat(open?null:cat)} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'13px 16px', cursor:'pointer' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:3, height:16, background:RED, borderRadius:2 }}/>
                          <span style={{ fontSize:13, fontWeight:700, color:'#f9fafb' }}>{cat}</span>
                          <span style={{ fontSize:11, color:'#4b5563' }}>{items.length} items</span>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                          <span style={{ fontSize:15, fontWeight:800, color:RED }}>{fmt$(catVal)}</span>
                          <span style={{ color:'#4b5563', fontSize:12 }}>{open?'▲':'▼'}</span>
                        </div>
                      </div>
                      {open && (
                        <div style={{ borderTop:`1px solid ${BORD}`, padding:'4px 0 8px' }}>
                          {items.sort((a,b)=>a.item_name.localeCompare(b.item_name)).map(r => {
                            const val = Number(r.count)*(COST_MAP[r.item_name]||0);
                            return (
                              <div key={r.item_name+r.store_name} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 16px', borderBottom:'1px solid #1f1f1f' }}>
                                <div style={{ flex:1, minWidth:0 }}>
                                  <div style={{ fontSize:12, fontWeight:500, color:'#d1d5db', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.item_name}</div>
                                  <div style={{ fontSize:10, color:'#4b5563' }}>{r.store_name} · W{r.week_number} · {r.submitter}</div>
                                </div>
                                <div style={{ textAlign:'right', flexShrink:0, marginLeft:12 }}>
                                  <div style={{ fontSize:13, fontWeight:700, color:'#f9fafb' }}>{r.count} <span style={{ fontSize:10, color:'#4b5563', fontWeight:400 }}>{r.uom}</span></div>
                                  <div style={{ fontSize:11, color:'#6b7280' }}>{fmt$(val)}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {filtered.length === 0 && !loading && (
              <div style={{ textAlign:'center', color:'#4b5563', padding:60 }}>
                <div style={{ fontSize:32, marginBottom:8 }}>📋</div>
                <div style={{ fontSize:14 }}>No submissions yet for this filter.</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
