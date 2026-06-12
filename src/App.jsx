import { useState, useMemo } from "react";

// ── ITEM MASTER ───────────────────────────────────────────────────────────────
const ITEM_MASTER = [
  {id:1,   name:'Bacon Bits Real Cooked .375" Gas Flushed',                    packSize:'2/5 lb',        cat:'Beef & Pork',         loc:'Walk-In',     uom:'lb'},
  {id:2,   name:'Bacon Precooked Thick Slice',                                  packSize:'2/150 ct',      cat:'Beef & Pork',         loc:'Walk-In',     uom:'Count'},
  {id:3,   name:'Beef Chopped Burnt Ends',                                       packSize:'2/5 lb',        cat:'Beef & Pork',         loc:'Walk-In',     uom:'lb'},
  {id:4,   name:'Beef Roast Shredded Cooked Choice',                             packSize:'2/5 lb',        cat:'Beef & Pork',         loc:'Walk-In',     uom:'lb'},
  {id:5,   name:'Beef Steak Pub Burger Cooked',                                  packSize:'53/3 oz',       cat:'Beef & Pork',         loc:'Walk-In',     uom:'Each'},
  {id:6,   name:'Ham Pit Boneless Smoked Old Fashioned Water-added',             packSize:'1/14-19 lb',    cat:'Beef & Pork',         loc:'Walk-In',     uom:'lb'},
  {id:7,   name:'Pork Pulled Smoked',                                            packSize:'2/5 lb',        cat:'Beef & Pork',         loc:'Walk-In',     uom:'lb'},
  {id:8,   name:'Chicken Breast Breaded Fully Cooked No Antibiotics Ever',       packSize:'40/4 oz',       cat:'Poultry',             loc:'Walk-In',     uom:'lb'},
  {id:9,   name:'Chicken Breast Diced Grill Fully-cooked Reduced',               packSize:'2/5 lb',        cat:'Poultry',             loc:'Walk-In',     uom:'lb'},
  {id:10,  name:'Chicken Tender Breaded Homestyle',                              packSize:'2/5 lb',        cat:'Poultry',             loc:'Walk-In',     uom:'lb'},
  {id:11,  name:'Turkey Breast Oil Brown Skinless',                              packSize:'2/8-10 lb',     cat:'Poultry',             loc:'Walk-In',     uom:'lb'},
  {id:12,  name:'Appetizer Cheese Curd Breaded Wisconsin',                       packSize:'2/5 lb',        cat:'Sides',               loc:'Freezer',     uom:'lb'},
  {id:13,  name:'Macaroni And Cheese White',                                     packSize:'4/4 lb',        cat:'Sides',               loc:'Freezer',     uom:'lb'},
  {id:14,  name:'Onion Ring Beer Battered .375" Ovenable',                       packSize:'6/2.5 lb',      cat:'Sides',               loc:'Freezer',     uom:'lb'},
  {id:15,  name:'Potato Fry 1/4" Shoestring Ultimate Crisp',                     packSize:'6/4.5 lb',      cat:'Sides',               loc:'Freezer',     uom:'lb'},
  {id:16,  name:'Potato Tater Barrel',                                           packSize:'6/5 lb',        cat:'Sides',               loc:'Freezer',     uom:'lb'},
  {id:17,  name:'Chip Potato Jalapeno Kettle',                                   packSize:'64/cs',         cat:'Sides',               loc:'Dry Storage', uom:'Bag'},
  {id:18,  name:'Chip Potato Regular Sea Salt',                                  packSize:'64/cs',         cat:'Sides',               loc:'Dry Storage', uom:'Bag'},
  {id:19,  name:'Chip Potato Salted & Vinegar Kettle',                           packSize:'64/cs',         cat:'Sides',               loc:'Dry Storage', uom:'Bag'},
  {id:20,  name:'Chip Potato Smokehouse Bbq Kettle',                             packSize:'64/cs',         cat:'Sides',               loc:'Dry Storage', uom:'Bag'},
  {id:21,  name:'Chip Potato Spicy Dill Kettle',                                 packSize:'64/cs',         cat:'Sides',               loc:'Dry Storage', uom:'Bag'},
  {id:22,  name:'Bread Deli White Slice 5/8" Salt City Baking (18 Slices / Loaf)', packSize:'12/32 oz',   cat:'Bread & Rolls',       loc:'Freezer',     uom:'Loaf'},
  {id:23,  name:'Bread Loaf Multigrain Gluten Free Sliced (14 Slices / Loaf)',   packSize:'6/24 oz',       cat:'Bread & Rolls',       loc:'Freezer',     uom:'Loaf'},
  {id:24,  name:'Bun Hamburger Brioche 4 Inch',                                  packSize:'5/12 Ct',       cat:'Bread & Rolls',       loc:'Freezer',     uom:'Dozen'},
  {id:25,  name:'Brownie Chocolate Bar (Brookie)',                                packSize:'4/24 Ct',       cat:'Desserts',            loc:'Freezer',     uom:'Each'},
  {id:26,  name:'Cake Funnel Fries',                                              packSize:'1/8 lb',        cat:'Desserts',            loc:'Freezer',     uom:'lb'},
  {id:27,  name:"Hope's Dough Cookie Chocolate Chunk Semi Sweet",                 packSize:'128/2.5 oz',    cat:'Desserts',            loc:'Freezer',     uom:'each'},
  {id:28,  name:"F'Real Milkshake Chocolate",                                    packSize:'12/Case',       cat:'Desserts',            loc:'Freezer',     uom:'each'},
  {id:29,  name:"F'Real Milkshake Cookie N Cream Oreo",                          packSize:'12/Case',       cat:'Desserts',            loc:'Freezer',     uom:'each'},
  {id:30,  name:"F'Real Milkshake Vanilla",                                      packSize:'12/Case',       cat:'Desserts',            loc:'Freezer',     uom:'each'},
  {id:31,  name:"F'real Milkshake Strawberry",                                   packSize:'12/Case',       cat:'Desserts',            loc:'Freezer',     uom:'each'},
  {id:32,  name:'Topping Whipped Aerosol',                                       packSize:'12/14 Oz',      cat:'Desserts',            loc:'Walk-In',     uom:'Can'},
  {id:33,  name:'Sauce Caramel Designer Dessert',                                packSize:'12/17 Oz',      cat:'Desserts',            loc:'Dry Storage', uom:'Bottle'},
  {id:34,  name:'Hersheys Chocolate Syrup',                                      packSize:'1/24 Oz',       cat:'Desserts',            loc:'Dry Storage', uom:'Bottle'},
  {id:35,  name:'Cream Cheese Frosting / Icing',                                 packSize:'1/16 Oz',       cat:'Desserts',            loc:'Walk-In',     uom:'Each'},
  {id:36,  name:'Spread Cookie Creamy Butter',                                   packSize:'1/14 Oz',       cat:'Desserts',            loc:'Dry Storage', uom:'Jar'},
  {id:37,  name:'Spread Hazelnut Creamy Nutella',                                packSize:'1/26.5 oz',     cat:'Desserts',            loc:'Dry Storage', uom:'Jar'},
  {id:38,  name:'Soup Broccoli Cheddar',                                         packSize:'4/4 lb',        cat:'Soups',               loc:'Freezer',     uom:'lb'},
  {id:39,  name:'Soup Chicken Noodle Ready To Use',                              packSize:'4/4 lb',        cat:'Soups',               loc:'Freezer',     uom:'lb'},
  {id:40,  name:'Soup Tomato Basil Bisque Ready To Use',                         packSize:'4/4 lb',        cat:'Soups',               loc:'Freezer',     uom:'lb'},
  {id:41,  name:'Cheese American 120 Slice Yellow',                              packSize:'4/5 lb',        cat:'Cheese',              loc:'Walk-In',     uom:'lb'},
  {id:42,  name:'Cheese Cheddar Sharp Feather Shredded Yellow',                  packSize:'4/5 lb',        cat:'Cheese',              loc:'Walk-In',     uom:'lb'},
  {id:43,  name:'Cheese Cream Whipped Tub Spread',                               packSize:'4/3 lb',        cat:'Cheese',              loc:'Walk-In',     uom:'lb'},
  {id:44,  name:'Cheese Fontina Shredded',                                       packSize:'4/5 lb',        cat:'Cheese',              loc:'Walk-In',     uom:'lb'},
  {id:45,  name:'Cheese Havarti Sliced',                                         packSize:'4/2.5 lb',      cat:'Cheese',              loc:'Walk-In',     uom:'lb'},
  {id:46,  name:'Cheese Mascarpone',                                             packSize:'6/1 lb',        cat:'Cheese',              loc:'Walk-In',     uom:'lb'},
  {id:47,  name:'Cheese Mozzarella Low Moisture Whole Milk Mozzarella',           packSize:'6/5 lb',        cat:'Cheese',              loc:'Walk-In',     uom:'lb'},
  {id:48,  name:'Cheese Mozzarella Fresh Slice Thin',                            packSize:'6/1 lb',        cat:'Cheese',              loc:'Walk-In',     uom:'lb'},
  {id:49,  name:'Cheese Parmesan Shredded Usa',                                  packSize:'2/5 lb',        cat:'Cheese',              loc:'Walk-In',     uom:'lb'},
  {id:50,  name:'Cheese Pepper Jack Feather Shredded',                           packSize:'4/5 lb',        cat:'Cheese',              loc:'Walk-In',     uom:'lb'},
  {id:51,  name:'Cheese Provolone Non-smoked Sliced .75 Ounce',                  packSize:'6/2.5 lb',      cat:'Cheese',              loc:'Walk-In',     uom:'lb'},
  {id:52,  name:'Cheese Swiss Sliced .75 Ounce',                                 packSize:'8/1.5 lb',      cat:'Cheese',              loc:'Walk-In',     uom:'lb'},
  {id:53,  name:'Cheese Queso Bravo White Dip In Bag-Land O Lakes',              packSize:'6/5 lb',        cat:'Cheese',              loc:'Walk-In',     uom:'lb'},
  {id:54,  name:'Sauce Pesto Basil',                                             packSize:'6/30 oz',       cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Each'},
  {id:55,  name:'Dijon Mustard',                                                 packSize:'1/12 oz',       cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Bottle'},
  {id:56,  name:'Garlic Chopped In Water',                                       packSize:'1/32 oz',       cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Each'},
  {id:57,  name:'Cracker Saltine 2 Per Packet',                                  packSize:'500/2 CT',      cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Each'},
  {id:58,  name:'Sauce Cranberry Whole Fancy',                                   packSize:'6/#10',         cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Can'},
  {id:59,  name:'Dressing Buttermilk Ranch',                                     packSize:'1/Gal',         cat:'Grocery & Dry Goods', loc:'Walk-In',     uom:'Gallon'},
  {id:60,  name:'Dressing Caesar With Egg',                                      packSize:'1/Gal',         cat:'Grocery & Dry Goods', loc:'Walk-In',     uom:'Gallon'},
  {id:61,  name:'Glaze Balsamic Vinegar Of Modena',                              packSize:'6/12.9 Oz',     cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Bottle'},
  {id:62,  name:'Gravy Turkey Roasted Ready To Use',                             packSize:'12/50 oz',      cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Can'},
  {id:63,  name:'Jelly Jalapeno Green Mild',                                     packSize:'6/10.9 Oz',     cat:'Grocery & Dry Goods', loc:'Walk-In',     uom:'Jar'},
  {id:64,  name:'Juice Lemon Pasteurized Ultra Premium',                         packSize:'1 Qt',          cat:'Grocery & Dry Goods', loc:'Walk-In',     uom:'Quart'},
  {id:65,  name:'Ketchup Jug Red In Plastic Bottle With Pump',                   packSize:'6/7.125 lb',    cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Jug'},
  {id:66,  name:'Margarine Butter Whipped European Style',                       packSize:'4/5 lb',        cat:'Grocery & Dry Goods', loc:'Walk-In',     uom:'lb'},
  {id:67,  name:'Mayonnaise Heavy Duty',                                         packSize:'4/1 Gal',       cat:'Grocery & Dry Goods', loc:'Walk-In',     uom:'Gallon'},
  {id:68,  name:'Mix Gravy Au Jus',                                              packSize:'12/2.75 Oz',    cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Packs'},
  {id:69,  name:'Pepper Chipotle In Adobo Sauce',                                packSize:'24/7 Oz',       cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Bottle'},
  {id:70,  name:'Pickle Dill Sliced 3/16" Krinkle Kut 450 Count',                packSize:'1/Gal',         cat:'Grocery & Dry Goods', loc:'Walk-In',     uom:'Gallon'},
  {id:71,  name:'Relish Pickle Dill',                                            packSize:'1 Gal',         cat:'Grocery & Dry Goods', loc:'Walk-In',     uom:'Gallon'},
  {id:72,  name:'Salt Kosher Flake Coarse',                                      packSize:'3 lb',          cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'lb'},
  {id:73,  name:'Sauce Barbecue Original',                                       packSize:'4/1 Gal',       cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Gallon'},
  {id:74,  name:'Sauce Chili Sweet Thai',                                        packSize:'12/32 Oz',      cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Bottle'},
  {id:75,  name:'Sauce Hot Sriracha 28 Ounce',                                   packSize:'12/28 Oz',      cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Bottle'},
  {id:76,  name:'Sauce Pasta Ultra Premium (6.9 lb per Can or 41.4 lbs/cs.)',    packSize:'6/6.9 lb-Can',  cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'lb'},
  {id:77,  name:'Seasoning Italian Whole',                                       packSize:'1/6.25 Oz',     cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Jar'},
  {id:78,  name:'Shortening Fry Liquid Clear Zero Trans Fat',                    packSize:'35 lb',         cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'lb'},
  {id:79,  name:'Soup Tomato Condensed',                                         packSize:'12/50 Oz',      cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Can'},
  {id:80,  name:'Spice Blend Shichimi Togarashi',                                packSize:'1/16 Oz',       cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Jar'},
  {id:81,  name:'Spice Blend Vampire Killer',                                    packSize:'1/16 Oz',       cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Jar'},
  {id:82,  name:'Spice Garlic Powder',                                           packSize:'1/21 Oz',       cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Jar'},
  {id:83,  name:'Spice Pepper Black Ground Pure',                                packSize:'1/18 Oz',       cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Jar'},
  {id:84,  name:'Stove Top Turkey Stuffing Mix',                                 packSize:'1/6 oz',        cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Box'},
  {id:85,  name:'Sugar Granulated Extra Fine Cane',                              packSize:'1/25 lb',       cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'lb'},
  {id:86,  name:'Tortilla Strips Tri-colored Fried',                             packSize:'10/1 lb',       cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'lb'},
  {id:87,  name:'Beans Black With Corn Flame Roasted Fiesta',                    packSize:'6/2.5 lb',      cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'lb'},
  {id:88,  name:'Vinegar Rice Seasoned Japanese (1/Gal)',                        packSize:'1/Gal',         cat:'Grocery & Dry Goods', loc:'Dry Storage', uom:'Gal'},
  {id:89,  name:'Bam Sauce',                                                     packSize:'1.49/Gal',      cat:'House Sauces',        loc:'Walk-In',     uom:'Batch'},
  {id:90,  name:'Chipotle Mayo',                                                 packSize:'1.33/Gal',      cat:'House Sauces',        loc:'Walk-In',     uom:'Batch'},
  {id:91,  name:'Fry Sauce',                                                     packSize:'1.89/Gal',      cat:'House Sauces',        loc:'Walk-In',     uom:'Batch'},
  {id:92,  name:'Melty Sauce',                                                   packSize:'1.61/Gal',      cat:'House Sauces',        loc:'Walk-In',     uom:'Batch'},
  {id:93,  name:'Mustard Aioli',                                                 packSize:'.63/Gal',       cat:'House Sauces',        loc:'Walk-In',     uom:'Batch'},
  {id:94,  name:'Avocado Hass Fresh Chunk Pulp Packaged Tray',                   packSize:'8/2 lb',        cat:'Produce',             loc:'Walk-In',     uom:'lb'},
  {id:95,  name:'Lettuce Romaine Fresh',                                         packSize:'1/6 Ct',        cat:'Produce',             loc:'Walk-In',     uom:'Head'},
  {id:96,  name:'Onion Green Iceless',                                           packSize:'1/2 lb',        cat:'Produce',             loc:'Walk-In',     uom:'lb'},
  {id:97,  name:'Onion Red Jumbo Sack',                                          packSize:'1/10 lb',       cat:'Produce',             loc:'Walk-In',     uom:'lb'},
  {id:98,  name:'Onion Diced Iqf Poly Packaging',                                packSize:'6/2 lb',        cat:'Produce',             loc:'Walk-In',     uom:'lb'},
  {id:99,  name:'Pepper Jalapeno Fresh',                                         packSize:'1/10 lb',       cat:'Produce',             loc:'Walk-In',     uom:'lb'},
  {id:100, name:'Tomato 1 Layer 5x6',                                            packSize:'10 lb',         cat:'Produce',             loc:'Walk-In',     uom:'lb'},
  {id:101, name:'Juice Concentrate Frozen Lemonade 5% 5:1 Yield',               packSize:'3 Liter',       cat:'Beverages',           loc:'Dry Storage', uom:'Gallon'},
  {id:102, name:'Syrup Coke Classic 5:1 Yield Bag-in-box',                       packSize:'5 Gal',         cat:'Beverages',           loc:'Dry Storage', uom:'Gallon'},
  {id:103, name:'Syrup Coke Diet 5:1 Yield Bag-in-box',                          packSize:'5 Gal',         cat:'Beverages',           loc:'Dry Storage', uom:'Gallon'},
  {id:104, name:'Syrup Coke Zero Sugar Concentrate 5:1 Yield Bag In Box',        packSize:'5 Gal',         cat:'Beverages',           loc:'Dry Storage', uom:'Gallon'},
  {id:105, name:'Syrup Dr Pepper Bag-in-box',                                    packSize:'5 Gal',         cat:'Beverages',           loc:'Dry Storage', uom:'Gallon'},
  {id:106, name:'Syrup Dr Pepper Diet Bag In Box',                               packSize:'2.5 Gal',       cat:'Beverages',           loc:'Dry Storage', uom:'Gallon'},
  {id:107, name:'Syrup Mountain Blast Sport Bag In Box',                         packSize:'2.5 Gal',       cat:'Beverages',           loc:'Dry Storage', uom:'Gallon'},
  {id:108, name:'Syrup Root Beer Bag In Box',                                    packSize:'2.5 Gal',       cat:'Beverages',           loc:'Dry Storage', uom:'Gallon'},
  {id:109, name:'Syrup Sprite 5:1 Yield Bag-in-box',                             packSize:'5 Gal',         cat:'Beverages',           loc:'Dry Storage', uom:'Gallon'},
  {id:110, name:'Tea Brew Filter Pack',                                           packSize:'32/3 oz',       cat:'Beverages',           loc:'Dry Storage', uom:'Pack'},
  {id:111, name:'12 oz Canned Soda',                                             packSize:'35/12 oz',      cat:'Beverages',           loc:'Dry Storage', uom:'Can'},
  {id:112, name:'Dasani Purified Water',                                          packSize:'32/16.9 oz',    cat:'Beverages',           loc:'Dry Storage', uom:'Bottle'},
  {id:113, name:'Juice Apple 100%',                                              packSize:'24/7.2 Oz',     cat:'Beverages',           loc:'Dry Storage', uom:'Each'},
  {id:114, name:'Puree Strawberry',                                              packSize:'1/1 Liter',     cat:'Beverages',           loc:'Walk-In',     uom:'Bottle'},
  {id:115, name:'Puree Mango',                                                   packSize:'1/1 Liter',     cat:'Beverages',           loc:'Walk-In',     uom:'Bottle'},
  {id:116, name:'Puree Raspberry',                                               packSize:'1/1 Liter',     cat:'Beverages',           loc:'Walk-In',     uom:'Bottle'},
];

const ALL_CATS = [...new Set(ITEM_MASTER.map(i => i.cat))];
const ALL_LOCS = [...new Set(ITEM_MASTER.map(i => i.loc))];

// ── SIMPLE UUID for session tracking ─────────────────────────────────────────
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

// ── SUPABASE SUBMIT ───────────────────────────────────────────────────────────
async function submitToSupabase(supabaseUrl, anonKey, payload) {
  const { storeName, submitter, weekNumber, weekDate, period, counts, sessionId } = payload;
  const submittedAt = new Date().toISOString();

  // Build one row per counted item
  const rows = counts.map(item => ({
    submitted_at: submittedAt,
    store_name:   storeName,
    submitter,
    week_number:  weekNumber,
    week_date:    weekDate || null,
    period:       period || null,
    item_name:    item.name,
    category:     item.cat,
    location:     item.loc,
    uom:          item.uom,
    count:        item.count,
    session_id:   sessionId,
  }));

  const resp = await fetch(`${supabaseUrl}/rest/v1/inventory_submissions`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        anonKey,
      'Authorization': `Bearer ${anonKey}`,
      'Prefer':        'return=minimal',
    },
    body: JSON.stringify(rows),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Supabase error ${resp.status}: ${err}`);
  }
  return rows.length;
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
const IconCheck  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>;
const IconMinus  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconPlus   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconSearch = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconSend   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const IconDown   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IconReset  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg>;

function Stepper({ value, onChange }) {
  const counted = value != null && value !== "";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:5 }}>
      <button onClick={() => onChange(Math.max(0,(value||0)-1))} style={btnSm("#e5e7eb","#374151")}><IconMinus/></button>
      <input
        type="number" min="0" value={value??""} placeholder="—"
        onChange={e => { const v=e.target.value; onChange(v===""?undefined:Math.max(0,Number(v))); }}
        style={{ width:52, textAlign:"center", border:"1.5px solid", borderColor:counted?"#ef4444":"#d1d5db", borderRadius:8, padding:"6px 2px", fontSize:15, fontWeight:700, color:counted?"#111":"#9ca3af", background:counted?"#fff7f7":"#f9fafb", outline:"none" }}
      />
      <button onClick={() => onChange((value||0)+1)} style={btnSm("#ef4444","#fff")}><IconPlus/></button>
    </div>
  );
}
function btnSm(bg,color){ return { width:30, height:30, borderRadius:7, border:"none", background:bg, color, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }; }

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [counts,      setCounts]      = useState({});
  const [search,      setSearch]      = useState("");
  const [filterCat,   setFilterCat]   = useState("All");
  const [filterLoc,   setFilterLoc]   = useState("All");
  const [view,        setView]        = useState("count");
  const [storeName,   setStoreName]   = useState("");
  const [submitter,   setSubmitter]   = useState("");
  const [weekNumber,  setWeekNumber]  = useState(1);
  const [weekDate,    setWeekDate]    = useState("");
  const [period,      setPeriod]      = useState("");
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [anonKey,     setAnonKey]     = useState("");
  const [toast,       setToast]       = useState(null);
  const [submitting,  setSubmitting]  = useState(false);
  const [lastSubmit,  setLastSubmit]  = useState(null);
  const [sessionId]                   = useState(uuid());

  const setCount = (id,val) => setCounts(prev=>({...prev,[id]:val}));

  const showToast = (msg, type="info", dur=3000) => {
    setToast({msg, type});
    setTimeout(() => setToast(null), dur);
  };

  const filtered = useMemo(() => ITEM_MASTER.filter(item => {
    const q = search.toLowerCase();
    return (item.name.toLowerCase().includes(q) || item.packSize.toLowerCase().includes(q))
      && (filterCat==="All" || item.cat===filterCat)
      && (filterLoc==="All" || item.loc===filterLoc);
  }), [search, filterCat, filterLoc]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(item => {
      if (!map[item.cat]) map[item.cat] = [];
      map[item.cat].push(item);
    });
    return map;
  }, [filtered]);

  const countedItems = ITEM_MASTER.filter(i => counts[i.id]!=null && counts[i.id]!=="");
  const uncounted    = ITEM_MASTER.filter(i => counts[i.id]==null || counts[i.id]==="");
  const pct = Math.round((countedItems.length / ITEM_MASTER.length) * 100);

  const canSubmit = supabaseUrl && anonKey && storeName && submitter && countedItems.length > 0;

  async function handleSubmit() {
    if (!supabaseUrl || !anonKey) { showToast("Add Supabase credentials in Settings first", "warn", 3500); setView("settings"); return; }
    if (!storeName)   { showToast("Enter store name in Settings", "warn"); setView("settings"); return; }
    if (!submitter)   { showToast("Enter your name in Settings", "warn"); setView("settings"); return; }
    if (!countedItems.length) { showToast("No items counted yet", "warn"); return; }

    setSubmitting(true);
    try {
      const countsPayload = countedItems.map(item => ({
        name:  item.name,
        cat:   item.cat,
        loc:   item.loc,
        uom:   item.uom,
        count: Number(counts[item.id]),
      }));

      const written = await submitToSupabase(supabaseUrl, anonKey, {
        storeName, submitter, weekNumber, weekDate, period,
        counts: countsPayload,
        sessionId,
      });

      const ts = new Date().toLocaleTimeString('en-US', {hour:'numeric', minute:'2-digit'});
      setLastSubmit({ time: ts, week: weekNumber, count: written });
      showToast(`✓ ${written} items submitted for Week ${weekNumber}`, "success", 4000);
    } catch(err) {
      showToast(`Submit failed: ${err.message}`, "error", 6000);
    }
    setSubmitting(false);
  }

  function downloadCSV() {
    const rows = [["Store","Week","Period","Submitter","Item","Category","Location","UOM","Count","Date"]];
    const ts = new Date().toISOString().slice(0,10);
    countedItems.forEach(item => {
      rows.push([storeName, weekNumber, period, submitter, item.name, item.cat, item.loc, item.uom, counts[item.id], ts]);
    });
    const csv = rows.map(r => r.map(c => `"${c ?? ''}"`).join(",")).join("\n");
    const blob = new Blob([csv], {type:"text/csv"});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = `Melty_${storeName||"Store"}_Week${weekNumber}_${ts}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("CSV downloaded", "info");
  }

  const toastBg = { info:"#1a1a1a", success:"#15803d", warn:"#d97706", error:"#dc2626" };
  const inp = { width:"100%", border:"1.5px solid #e5e7eb", borderRadius:8, padding:"9px 12px", fontSize:13, boxSizing:"border-box", outline:"none", marginBottom:10, background:"#fff" };
  const lbl = { display:"block", fontSize:11, color:"#9ca3af", marginBottom:3 };

  return (
    <div style={{ minHeight:"100vh", background:"#f3f4f6", fontFamily:"'Inter',system-ui,sans-serif", paddingBottom:80 }}>

      {/* TOAST */}
      {toast && (
        <div style={{ position:"fixed", top:16, left:"50%", transform:"translateX(-50%)", background:toastBg[toast.type]||"#1a1a1a", color:"#fff", padding:"10px 20px", borderRadius:20, fontSize:13, fontWeight:600, zIndex:999, boxShadow:"0 4px 16px rgba(0,0,0,.3)", maxWidth:"88vw", textAlign:"center" }}>
          {toast.msg}
        </div>
      )}

      {/* HEADER */}
      <div style={{ background:"#1a1a1a", padding:"14px 16px 10px", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ color:"#ef4444", fontWeight:900, fontSize:22, letterSpacing:"-1px" }}>MELTY</div>
            <div style={{ color:"#6b7280", fontSize:11, marginTop:1 }}>
              {storeName||"Set store in Settings"} · Week {weekNumber}{submitter ? ` · ${submitter}` : ""}
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ color:"#fff", fontSize:22, fontWeight:800 }}>{countedItems.length}<span style={{ color:"#4b5563", fontSize:12, fontWeight:400 }}>/{ITEM_MASTER.length}</span></div>
            <div style={{ color:"#6b7280", fontSize:10 }}>{pct}% complete</div>
          </div>
        </div>
        <div style={{ height:3, background:"#333", borderRadius:2, marginTop:8, overflow:"hidden" }}>
          <div style={{ height:"100%", background:"#ef4444", borderRadius:2, transition:"width .4s", width:`${pct}%` }}/>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display:"flex", background:"#fff", borderBottom:"1px solid #e5e7eb", position:"sticky", top:88, zIndex:40 }}>
        {[["count","Count"],["review","Review"],["settings","Settings"]].map(([key,label]) => {
          const badge = key==="review" ? countedItems.length : null;
          return (
            <button key={key} onClick={()=>setView(key)} style={{ flex:1, padding:"10px 4px", fontSize:12, fontWeight:view===key?700:500, color:view===key?"#ef4444":"#6b7280", background:"none", border:"none", borderBottom:view===key?"2px solid #ef4444":"2px solid transparent", cursor:"pointer" }}>
              {label}{badge!=null && <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:16, height:16, borderRadius:8, background:badge>0?"#ef4444":"#e5e7eb", color:badge>0?"#fff":"#9ca3af", fontSize:9, fontWeight:700, marginLeft:4 }}>{badge}</span>}
            </button>
          );
        })}
      </div>

      {/* ── COUNT TAB ── */}
      {view==="count" && <>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", background:"#fff", borderBottom:"1px solid #f0f0f0" }}>
          <IconSearch/>
          <input style={{ flex:1, border:"none", outline:"none", fontSize:14, background:"transparent" }} placeholder="Search items or pack size…" value={search} onChange={e=>setSearch(e.target.value)}/>
          {search && <button onClick={()=>setSearch("")} style={{ background:"none", border:"none", color:"#9ca3af", cursor:"pointer", fontSize:16 }}>✕</button>}
        </div>
        <div style={{ display:"flex", gap:6, padding:"8px 12px", overflowX:"auto", background:"#fff", borderBottom:"1px solid #f0f0f0" }}>
          {["All",...ALL_CATS].map(c=><button key={c} onClick={()=>setFilterCat(c)} style={{ padding:"4px 10px", borderRadius:20, fontSize:11, fontWeight:600, border:"none", cursor:"pointer", whiteSpace:"nowrap", background:filterCat===c?"#ef4444":"#f3f4f6", color:filterCat===c?"#fff":"#374151" }}>{c}</button>)}
        </div>
        <div style={{ display:"flex", gap:6, padding:"6px 12px", overflowX:"auto", background:"#fafafa", borderBottom:"2px solid #e5e7eb" }}>
          {["All",...ALL_LOCS].map(l=><button key={l} onClick={()=>setFilterLoc(l)} style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600, border:"none", cursor:"pointer", whiteSpace:"nowrap", background:filterLoc===l?"#1a1a1a":"#f3f4f6", color:filterLoc===l?"#fff":"#374151" }}>{l}</button>)}
        </div>
        <div style={{ padding:"0 12px 12px" }}>
          {Object.keys(grouped).length===0 && <div style={{ textAlign:"center", color:"#9ca3af", padding:40 }}>No items match.</div>}
          {Object.entries(grouped).map(([cat, catItems]) => (
            <div key={cat}>
              <div style={{ fontSize:10, fontWeight:700, color:"#ef4444", textTransform:"uppercase", letterSpacing:1.2, padding:"14px 0 6px", display:"flex", justifyContent:"space-between" }}>
                <span>{cat}</span>
                <span style={{ color:"#9ca3af", fontWeight:400, textTransform:"none" }}>
                  {catItems.filter(i=>counts[i.id]!=null&&counts[i.id]!=="").length}/{catItems.length}
                </span>
              </div>
              {catItems.map(item => {
                const counted = counts[item.id]!=null && counts[item.id]!=="";
                return (
                  <div key={item.id} style={{ background:"#fff", borderRadius:10, padding:"10px 12px", marginBottom:6, display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:counted?"0 0 0 1.5px #fca5a5":"0 1px 2px rgba(0,0,0,.06)" }}>
                    <div style={{ flex:1, minWidth:0, marginRight:10 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:"#111", display:"flex", alignItems:"center", gap:5 }}>
                        {counted && <span style={{ color:"#ef4444", flexShrink:0 }}><IconCheck/></span>}
                        <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</span>
                      </div>
                      <div style={{ fontSize:10, color:"#9ca3af", marginTop:2 }}>{item.packSize} · {item.uom} · {item.loc}</div>
                    </div>
                    <Stepper value={counts[item.id]} onChange={val=>setCount(item.id,val)}/>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </>}

      {/* ── REVIEW TAB ── */}
      {view==="review" && (
        <div style={{ padding:"12px 12px 20px" }}>

          {/* SUBMIT */}
          <div style={{ background:"#fff", borderRadius:14, padding:16, marginBottom:10, boxShadow:"0 1px 4px rgba(0,0,0,.08)", border:`1.5px solid ${canSubmit?"#fca5a5":"#e5e7eb"}` }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#111", marginBottom:4 }}>Submit to Melty</div>
            <div style={{ fontSize:11, color:"#6b7280", marginBottom:12, lineHeight:1.5 }}>
              {canSubmit
                ? `Ready — ${countedItems.length} items counted for ${storeName} Week ${weekNumber}.`
                : "Complete Settings (name, store, and Supabase credentials) before submitting."}
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{ width:"100%", padding:"14px", borderRadius:11, border:"none", cursor:canSubmit?"pointer":"not-allowed", fontWeight:800, fontSize:15, background:canSubmit?"#ef4444":"#e5e7eb", color:canSubmit?"#fff":"#9ca3af", display:"flex", alignItems:"center", justifyContent:"center", gap:8, opacity:submitting?.6:1, transition:"all .15s" }}
            >
              {submitting ? "Submitting…" : <><IconSend/> Submit Week {weekNumber}</>}
            </button>
            {lastSubmit && (
              <div style={{ marginTop:10, fontSize:11, color:"#15803d", textAlign:"center", fontWeight:600 }}>
                ✓ Last submitted: Week {lastSubmit.week} · {lastSubmit.count} items · {lastSubmit.time}
              </div>
            )}
          </div>

          {/* CSV backup */}
          <button onClick={downloadCSV} style={{ width:"100%", padding:"11px", borderRadius:10, border:"none", cursor:"pointer", fontWeight:600, fontSize:12, background:"#1a1a1a", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginBottom:10 }}>
            <IconDown/> Download CSV (backup)
          </button>

          <button onClick={()=>{ if(window.confirm("Clear all counts for this session?")){ setCounts({}); showToast("Counts cleared"); }}} style={{ width:"100%", marginBottom:14, padding:"9px", borderRadius:8, border:"1px solid #e5e7eb", background:"#fff", color:"#6b7280", fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
            <IconReset/> Clear All Counts
          </button>

          {countedItems.length > 0 && <>
            <div style={{ fontSize:10, fontWeight:700, color:"#ef4444", textTransform:"uppercase", letterSpacing:1.2, padding:"4px 0 8px" }}>Counted ({countedItems.length})</div>
            {countedItems.map(item=>(
              <div key={item.id} style={{ background:"#fff", borderRadius:9, padding:"9px 12px", marginBottom:5, display:"flex", justifyContent:"space-between", boxShadow:"0 1px 2px rgba(0,0,0,.06)" }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600 }}>{item.name}</div>
                  <div style={{ fontSize:10, color:"#9ca3af" }}>{item.cat} · {item.loc}</div>
                </div>
                <div style={{ fontSize:18, fontWeight:800, color:"#ef4444" }}>{counts[item.id]}<span style={{ fontSize:10, color:"#9ca3af", fontWeight:400, marginLeft:3 }}>{item.uom}</span></div>
              </div>
            ))}
          </>}

          {uncounted.length > 0 && <>
            <div style={{ fontSize:10, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1.2, padding:"12px 0 8px" }}>Not Yet Counted ({uncounted.length})</div>
            {uncounted.map(item=>(
              <div key={item.id} style={{ background:"#f9fafb", borderRadius:9, padding:"9px 12px", marginBottom:4, display:"flex", justifyContent:"space-between", opacity:.6 }}>
                <div style={{ fontSize:12, fontWeight:500, color:"#6b7280" }}>{item.name}</div>
                <div style={{ fontSize:12, color:"#d1d5db" }}>—</div>
              </div>
            ))}
          </>}
        </div>
      )}

      {/* ── SETTINGS TAB ── */}
      {view==="settings" && (
        <div style={{ padding:"12px" }}>

          <div style={{ background:"#fff", borderRadius:10, padding:14, marginBottom:10, boxShadow:"0 1px 3px rgba(0,0,0,.06)" }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:10 }}>Session Info</div>
            <label style={lbl}>Your Name</label>
            <input value={submitter} onChange={e=>setSubmitter(e.target.value)} placeholder="e.g. Sarah M." style={inp}/>
            <label style={lbl}>Store / Location</label>
            <input value={storeName} onChange={e=>setStoreName(e.target.value)} placeholder="e.g. Bristol" style={inp}/>
            <label style={lbl}>Period (optional)</label>
            <input value={period} onChange={e=>setPeriod(e.target.value)} placeholder="e.g. Period 7 2026" style={inp}/>
            <label style={lbl}>Week Number</label>
            <div style={{ display:"flex", gap:8, marginBottom:10 }}>
              {[1,2,3,4].map(w=>(
                <button key={w} onClick={()=>setWeekNumber(w)} style={{ flex:1, padding:"9px", borderRadius:8, border:"1.5px solid", borderColor:weekNumber===w?"#ef4444":"#e5e7eb", background:weekNumber===w?"#fff7f7":"#fff", color:weekNumber===w?"#ef4444":"#6b7280", fontWeight:700, fontSize:13, cursor:"pointer" }}>
                  {w}
                </button>
              ))}
            </div>
            <label style={lbl}>Week Ending Date</label>
            <input value={weekDate} onChange={e=>setWeekDate(e.target.value)} placeholder="e.g. Jun 21, 2026" style={inp}/>
          </div>

          <div style={{ background:"#fff", borderRadius:10, padding:14, marginBottom:10, boxShadow:"0 1px 3px rgba(0,0,0,.06)" }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:4 }}>Supabase Connection</div>
            <div style={{ fontSize:11, color:"#6b7280", marginBottom:10, lineHeight:1.5 }}>
              Paste your Supabase Project URL and anon public key. These are the same for every franchisee — set once and forget.
            </div>
            <label style={lbl}>Project URL</label>
            <input
              value={supabaseUrl}
              onChange={e=>setSupabaseUrl(e.target.value.trim())}
              placeholder="https://xxxx.supabase.co"
              style={{ ...inp, fontFamily:"monospace", fontSize:11 }}
            />
            <label style={lbl}>Anon Public Key</label>
            <input
              value={anonKey}
              onChange={e=>setAnonKey(e.target.value.trim())}
              placeholder="eyJhbGciOiJIUzI1NiIs..."
              style={{ ...inp, fontFamily:"monospace", fontSize:11 }}
            />
            {supabaseUrl && anonKey && (
              <button
                onClick={async () => {
                  try {
                    const resp = await fetch(`${supabaseUrl}/rest/v1/inventory_submissions?limit=1`, {
                      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` }
                    });
                    if (resp.ok || resp.status === 406) {
                      showToast("✓ Connected to Supabase", "success");
                    } else {
                      showToast(`Connection issue: ${resp.status}`, "warn");
                    }
                  } catch(e) {
                    showToast("Could not reach Supabase — check URL", "error");
                  }
                }}
                style={{ fontSize:11, color:"#ef4444", background:"none", border:"none", cursor:"pointer", padding:0, fontWeight:600 }}
              >
                Test connection →
              </button>
            )}
          </div>

          <div style={{ padding:12, background:canSubmit?"#f0fdf4":"#fef2f2", borderRadius:10, border:`1px solid ${canSubmit?"#bbf7d0":"#fecaca"}` }}>
            <div style={{ fontSize:11, fontWeight:700, color:canSubmit?"#15803d":"#dc2626", marginBottom:4 }}>
              {canSubmit ? "✓ Ready to submit" : "⚠ Setup incomplete"}
            </div>
            <div style={{ fontSize:11, color:"#6b7280", lineHeight:1.8 }}>
              {!submitter    && "• Your name required\n"}
              {!storeName    && "• Store name required\n"}
              {!supabaseUrl  && "• Supabase URL required\n"}
              {!anonKey      && "• Supabase anon key required\n"}
              {canSubmit     && `${countedItems.length} items counted — go to Review tab to submit.`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
