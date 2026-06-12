import { useState, useMemo } from "react";
import "./fonts.css";
import LogoLight from "./LogoLight.jsx";
import LogoDark from "./LogoDark.jsx";

// ── MELTY BRAND TOKENS ────────────────────────────────────────────────────────
const B = {
  gold:      '#FFAD41',
  darkGold:  '#C4881F',
  charcoal:  '#404040',
  orange:    '#E8621A',
  black:     '#1C1C1C',
  cream:     '#F5F0E6',
  light:     '#F8F5EF',
  white:     '#FFFFFF',
  gray:      '#888888',
  border:    '#E0D8CC',
  font:      "'MuseoSansRounded','Trebuchet MS',sans-serif",
  futura:    "'FuturaCondEB','Arial Narrow Black',sans-serif",
};

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

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

async function submitToSupabase(supabaseUrl, anonKey, payload) {
  const { storeName, submitter, weekNumber, weekDate, period, counts, sessionId } = payload;
  const submittedAt = new Date().toISOString();
  const rows = counts.map(item => ({
    submitted_at: submittedAt, store_name: storeName, submitter,
    week_number: weekNumber, week_date: weekDate || null, period: period || null,
    item_name: item.name, category: item.cat, location: item.loc,
    uom: item.uom, count: item.count, session_id: sessionId,
  }));
  const resp = await fetch(`${supabaseUrl}/rest/v1/inventory_submissions`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'apikey':anonKey, 'Authorization':`Bearer ${anonKey}`, 'Prefer':'return=minimal' },
    body: JSON.stringify(rows),
  });
  if (!resp.ok) throw new Error(`Supabase error ${resp.status}: ${await resp.text()}`);
  return rows.length;
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
const IconCheck  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>;
const IconMinus  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconPlus   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconSearch = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={B.gray} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconSend   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const IconDown   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IconReset  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg>;

function Stepper({ value, onChange }) {
  const counted = value != null && value !== "";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:5 }}>
      <button onClick={() => onChange(Math.max(0,(value||0)-1))}
        style={{ width:32, height:32, borderRadius:8, border:`1.5px solid ${B.border}`, background:B.white, color:B.charcoal, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <IconMinus/>
      </button>
      <input
        type="number" min="0" value={value??""} placeholder="—"
        onChange={e => { const v=e.target.value; onChange(v===""?undefined:Math.max(0,Number(v))); }}
        style={{ width:54, textAlign:"center", border:`2px solid ${counted ? B.gold : B.border}`, borderRadius:8, padding:"6px 2px", fontSize:15, fontWeight:700, color:counted?B.black:B.gray, background:counted?'#FFFBF2':B.light, outline:"none", fontFamily:B.font }}
      />
      <button onClick={() => onChange((value||0)+1)}
        style={{ width:32, height:32, borderRadius:8, border:"none", background:B.gold, color:B.black, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <IconPlus/>
      </button>
    </div>
  );
}

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
  const [supabaseUrl, setSupabaseUrl] = useState(() => localStorage.getItem('melty_supabase_url') || '');
  const [anonKey,     setAnonKey]     = useState(() => localStorage.getItem('melty_anon_key') || '');
  const [toast,       setToast]       = useState(null);
  const [submitting,  setSubmitting]  = useState(false);
  const [lastSubmit,  setLastSubmit]  = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [sessionId]                   = useState(uuid);

  const setCount = (id, val) => setCounts(prev => ({ ...prev, [id]: val }));
  const showToast = (msg, type="info", dur=3000) => { setToast({ msg, type }); setTimeout(() => setToast(null), dur); };

  const filtered = useMemo(() => ITEM_MASTER.filter(item => {
    const q = search.toLowerCase();
    return (item.name.toLowerCase().includes(q) || item.packSize.toLowerCase().includes(q))
      && (filterCat==="All" || item.cat===filterCat)
      && (filterLoc==="All"  || item.loc===filterLoc);
  }), [search, filterCat, filterLoc]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(item => { if (!map[item.cat]) map[item.cat]=[]; map[item.cat].push(item); });
    return map;
  }, [filtered]);

  const countedItems = ITEM_MASTER.filter(i => counts[i.id]!=null && counts[i.id]!=="");
  const uncounted    = ITEM_MASTER.filter(i => counts[i.id]==null  || counts[i.id]==="");
  const pct          = Math.round((countedItems.length / ITEM_MASTER.length) * 100);
  const canSubmit    = supabaseUrl && anonKey && storeName && submitter && countedItems.length > 0;

  async function handleSubmit() {
    if (!supabaseUrl || !anonKey) { showToast("Add Supabase credentials in Settings","warn",3500); setView("settings"); return; }
    if (!storeName) { showToast("Enter store name in Settings","warn"); setView("settings"); return; }
    if (!submitter) { showToast("Enter your name in Settings","warn"); setView("settings"); return; }
    if (!countedItems.length) { showToast("No items counted yet","warn"); return; }
    setSubmitting(true);
    try {
      const written = await submitToSupabase(supabaseUrl, anonKey, {
        storeName, submitter, weekNumber, weekDate, period,
        counts: countedItems.map(i => ({ name:i.name, cat:i.cat, loc:i.loc, uom:i.uom, count:Number(counts[i.id]) })),
        sessionId,
      });
      const ts = new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
      setLastSubmit({ time:ts, week:weekNumber, count:written });
      const catTotals = {};
      countedItems.forEach(i => { if (!catTotals[i.cat]) catTotals[i.cat]={items:0}; catTotals[i.cat].items++; });
      setSubmittedData({ week:weekNumber, store:storeName, submitter, ts, count:written, catTotals, weekDate });
      setView("submitted");
    } catch(err) { showToast(`Submit failed: ${err.message}`,"error",6000); }
    setSubmitting(false);
  }

  function downloadCSV() {
    const rows=[["Store","Week","Period","Submitter","Item","Category","Location","UOM","Count","Date"]];
    const ts=new Date().toISOString().slice(0,10);
    countedItems.forEach(i=>rows.push([storeName,weekNumber,period,submitter,i.name,i.cat,i.loc,i.uom,counts[i.id],ts]));
    const csv=rows.map(r=>r.map(c=>`"${c??''}"`).join(",")).join("\n");
    const blob=new Blob([csv],{type:"text/csv"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a"); a.href=url; a.download=`Melty_${storeName||"Store"}_Week${weekNumber}_${ts}.csv`; a.click();
    URL.revokeObjectURL(url); showToast("CSV downloaded");
  }

  const toastBg = { info:B.charcoal, success:'#27784a', warn:B.orange, error:'#9b2b2b' };
  const inp = { width:"100%", border:`1.5px solid ${B.border}`, borderRadius:8, padding:"9px 12px", fontSize:13, boxSizing:"border-box", outline:"none", marginBottom:10, background:B.white, fontFamily:B.font, color:B.charcoal };
  const lbl = { display:"block", fontSize:11, color:B.gray, marginBottom:3, fontWeight:700, textTransform:"uppercase", letterSpacing:.8 };

  return (
    <div style={{ minHeight:"100vh", background:B.cream, fontFamily:B.font, paddingBottom:80 }}>

      {toast && (
        <div style={{ position:"fixed", top:16, left:"50%", transform:"translateX(-50%)", background:toastBg[toast.type]||B.charcoal, color:B.white, padding:"10px 22px", borderRadius:24, fontSize:13, fontWeight:700, zIndex:999, boxShadow:"0 4px 20px rgba(0,0,0,.2)", maxWidth:"88vw", textAlign:"center", fontFamily:B.font }}>
          {toast.msg}
        </div>
      )}

      {/* HEADER — Charcoal bg with gold wordmark (approved dark combo) */}
      <div style={{ background:B.black, borderBottom:`3px solid ${B.gold}`, padding:"14px 16px 12px", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <LogoLight width={110}/>
            <div style={{ color:"rgba(255,255,255,.5)", fontSize:11, marginTop:3, fontWeight:500 }}>
              {storeName || "Set store in Settings"} · Week {weekNumber}{submitter ? ` · ${submitter}` : ""}
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ color:B.gold, fontSize:24, fontWeight:900, lineHeight:1 }}>{countedItems.length}<span style={{ color:"rgba(255,255,255,.3)", fontSize:12, fontWeight:400 }}>/{ITEM_MASTER.length}</span></div>
            <div style={{ color:"rgba(255,255,255,.4)", fontSize:10, marginTop:2 }}>{pct}% complete</div>
          </div>
        </div>
        {/* Gold progress bar */}
        <div style={{ height:4, background:"rgba(255,255,255,.1)", borderRadius:2, marginTop:10, overflow:"hidden" }}>
          <div style={{ height:"100%", background:B.gold, borderRadius:2, transition:"width .4s ease", width:`${pct}%` }}/>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display:"flex", background:B.white, borderBottom:`2px solid ${B.border}`, position:"sticky", top:91, zIndex:40 }}>
        {[["count","Count"],["review","Review"],["settings","Settings"]].map(([key,label]) => {
          const badge = key==="review" ? countedItems.length : null;
          return (
            <button key={key} onClick={() => setView(key)} style={{ flex:1, padding:"11px 4px", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:.8, color:view===key?B.black:B.gray, background:"none", border:"none", borderBottom:view===key?`3px solid ${B.gold}`:"3px solid transparent", cursor:"pointer", fontFamily:B.futura }}>
              {label}{badge!=null && <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:17, height:17, borderRadius:9, background:badge>0?B.gold:"#e5e5e5", color:badge>0?B.black:B.gray, fontSize:9, fontWeight:700, marginLeft:5 }}>{badge}</span>}
            </button>
          );
        })}
      </div>

      {/* ── COUNT TAB ── */}
      {view==="count" && (
        <>
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", background:B.white, borderBottom:`1px solid ${B.border}` }}>
            <IconSearch/>
            <input style={{ flex:1, border:"none", outline:"none", fontSize:14, background:"transparent", fontFamily:B.font, color:B.charcoal }} placeholder="Search items or pack size…" value={search} onChange={e=>setSearch(e.target.value)}/>
            {search && <button onClick={()=>setSearch("")} style={{ background:"none", border:"none", color:B.gray, cursor:"pointer", fontSize:16 }}>✕</button>}
          </div>

          {/* Category pills */}
          <div style={{ display:"flex", gap:6, padding:"8px 12px", overflowX:"auto", background:B.white, borderBottom:`1px solid ${B.border}` }}>
            {["All",...ALL_CATS].map(c => (
              <button key={c} onClick={()=>setFilterCat(c)} style={{ padding:"5px 12px", borderRadius:20, fontSize:11, fontWeight:700, border:`1.5px solid ${filterCat===c?B.gold:B.border}`, cursor:"pointer", whiteSpace:"nowrap", background:filterCat===c?B.gold:B.white, color:filterCat===c?B.black:B.charcoal, fontFamily:B.font, transition:"all .15s" }}>{c}</button>
            ))}
          </div>

          {/* Location pills */}
          <div style={{ display:"flex", gap:6, padding:"6px 12px", overflowX:"auto", background:B.light, borderBottom:`2px solid ${B.border}` }}>
            {["All",...ALL_LOCS].map(l => (
              <button key={l} onClick={()=>setFilterLoc(l)} style={{ padding:"4px 12px", borderRadius:20, fontSize:11, fontWeight:700, border:`1.5px solid ${filterLoc===l?B.charcoal:B.border}`, cursor:"pointer", whiteSpace:"nowrap", background:filterLoc===l?B.charcoal:B.white, color:filterLoc===l?B.white:B.charcoal, fontFamily:B.font, transition:"all .15s" }}>{l}</button>
            ))}
          </div>

          <div style={{ padding:"0 12px 12px" }}>
            {Object.keys(grouped).length===0 && <div style={{ textAlign:"center", color:B.gray, padding:40, fontSize:14 }}>No items match.</div>}
            {Object.entries(grouped).map(([cat, catItems]) => (
              <div key={cat}>
                {/* Category header — Futura, gold accent bar */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 0 7px", borderBottom:`2px solid ${B.gold}`, marginBottom:8 }}>
                  <div style={{ fontFamily:B.futura, fontSize:12, fontWeight:800, color:B.charcoal, textTransform:"uppercase", letterSpacing:1.5 }}>{cat}</div>
                  <div style={{ fontSize:11, color:B.gray, fontWeight:600 }}>{catItems.filter(i=>counts[i.id]!=null&&counts[i.id]!=="").length}/{catItems.length}</div>
                </div>
                {catItems.map(item => {
                  const counted = counts[item.id]!=null && counts[item.id]!=="";
                  return (
                    <div key={item.id} style={{ background:B.white, borderRadius:10, padding:"11px 13px", marginBottom:7, display:"flex", justifyContent:"space-between", alignItems:"center", border:`1.5px solid ${counted?B.gold:B.border}`, boxShadow:counted?`0 2px 8px rgba(255,173,65,.15)`:"0 1px 3px rgba(0,0,0,.05)", transition:"border-color .15s" }}>
                      <div style={{ flex:1, minWidth:0, marginRight:10 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:B.black, display:"flex", alignItems:"center", gap:5 }}>
                          {counted && <span style={{ color:B.gold, flexShrink:0 }}><IconCheck/></span>}
                          <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</span>
                        </div>
                        <div style={{ fontSize:10, color:B.gray, marginTop:2, fontWeight:500 }}>{item.packSize} · {item.uom} · {item.loc}</div>
                      </div>
                      <Stepper value={counts[item.id]} onChange={val=>setCount(item.id,val)}/>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── REVIEW TAB ── */}
      {view==="review" && (
        <div style={{ padding:"14px 12px 20px" }}>
          {/* Submit card */}
          <div style={{ background:B.white, borderRadius:12, padding:16, marginBottom:12, border:`2px solid ${canSubmit?B.gold:B.border}`, boxShadow:canSubmit?`0 4px 16px rgba(255,173,65,.2)`:"none" }}>
            <div style={{ fontFamily:B.futura, fontSize:13, fontWeight:800, color:B.black, letterSpacing:.5, marginBottom:4, textTransform:"uppercase" }}>Submit to Melty</div>
            <div style={{ fontSize:11, color:B.gray, marginBottom:14, lineHeight:1.5 }}>
              {canSubmit ? `Ready — ${countedItems.length} items counted for ${storeName} Week ${weekNumber}.` : "Complete Settings (name, store, Supabase credentials) to enable submit."}
            </div>
            <button onClick={handleSubmit} disabled={submitting} style={{ width:"100%", padding:"14px", borderRadius:10, border:"none", cursor:canSubmit?"pointer":"not-allowed", fontWeight:800, fontSize:14, fontFamily:B.futura, letterSpacing:1, textTransform:"uppercase", background:canSubmit?B.gold:"#e0d8cc", color:canSubmit?B.black:B.gray, display:"flex", alignItems:"center", justifyContent:"center", gap:8, opacity:submitting?.6:1, transition:"all .15s" }}>
              {submitting ? "Submitting…" : <><IconSend/> Submit Week {weekNumber}</>}
            </button>
            {lastSubmit && <div style={{ marginTop:10, fontSize:11, color:'#27784a', textAlign:"center", fontWeight:700 }}>✓ Last submitted: Week {lastSubmit.week} · {lastSubmit.count} items · {lastSubmit.time}</div>}
          </div>

          <button onClick={downloadCSV} style={{ width:"100%", padding:"11px", borderRadius:10, border:`1.5px solid ${B.charcoal}`, cursor:"pointer", fontWeight:700, fontSize:12, fontFamily:B.futura, letterSpacing:.8, textTransform:"uppercase", background:B.charcoal, color:B.white, display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginBottom:10 }}>
            <IconDown/> Download CSV (backup)
          </button>

          <button onClick={()=>{ if(window.confirm("Clear all counts?")){ setCounts({}); showToast("Counts cleared"); }}} style={{ width:"100%", marginBottom:16, padding:"9px", borderRadius:8, border:`1px solid ${B.border}`, background:B.white, color:B.gray, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:5, fontFamily:B.font }}>
            <IconReset/> Clear All Counts
          </button>

          {countedItems.length>0 && <>
            <div style={{ fontFamily:B.futura, fontSize:10, fontWeight:800, color:B.charcoal, textTransform:"uppercase", letterSpacing:1.5, padding:"4px 0 10px", borderBottom:`2px solid ${B.gold}`, marginBottom:8 }}>Counted ({countedItems.length})</div>
            {countedItems.map(item=>(
              <div key={item.id} style={{ background:B.white, borderRadius:9, padding:"10px 13px", marginBottom:6, display:"flex", justifyContent:"space-between", border:`1px solid ${B.border}` }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:B.black }}>{item.name}</div>
                  <div style={{ fontSize:10, color:B.gray, marginTop:1 }}>{item.cat} · {item.loc}</div>
                </div>
                <div style={{ fontSize:18, fontWeight:900, color:B.gold }}>{counts[item.id]}<span style={{ fontSize:10, color:B.gray, fontWeight:400, marginLeft:3 }}>{item.uom}</span></div>
              </div>
            ))}
          </>}

          {uncounted.length>0 && <>
            <div style={{ fontFamily:B.futura, fontSize:10, fontWeight:800, color:B.gray, textTransform:"uppercase", letterSpacing:1.5, padding:"14px 0 8px" }}>Not Yet Counted ({uncounted.length})</div>
            {uncounted.map(item=>(
              <div key={item.id} style={{ background:B.light, borderRadius:9, padding:"9px 13px", marginBottom:4, display:"flex", justifyContent:"space-between", opacity:.65 }}>
                <div style={{ fontSize:12, fontWeight:500, color:B.charcoal }}>{item.name}</div>
                <div style={{ fontSize:12, color:B.border }}>—</div>
              </div>
            ))}
          </>}
        </div>
      )}

      {/* ── SUBMITTED VIEW ── */}
      {view==="submitted" && submittedData && (
        <div style={{ padding:"32px 16px", display:"flex", flexDirection:"column", alignItems:"center", background:B.cream, minHeight:"70vh" }}>
          {/* Gold checkmark circle */}
          <div style={{ width:80, height:80, borderRadius:40, background:B.gold, border:`3px solid ${B.darkGold}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={B.black} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <LogoDark width={100} style={{ marginBottom:12 }}/>
          <div style={{ fontFamily:B.futura, fontSize:28, fontWeight:800, color:B.black, letterSpacing:"1px", textTransform:"uppercase", marginBottom:6 }}>Submitted!</div>
          <div style={{ fontSize:13, color:B.gray, marginBottom:28, textAlign:"center", fontWeight:500, lineHeight:1.6 }}>
            Week {submittedData.week} · {submittedData.store}<br/>
            {submittedData.count} items · {submittedData.ts}
          </div>

          {/* Category breakdown — charcoal card */}
          <div style={{ width:"100%", maxWidth:400, background:B.black, borderRadius:14, overflow:"hidden", border:`2px solid ${B.gold}`, marginBottom:24 }}>
            <div style={{ padding:"12px 16px", borderBottom:`1px solid rgba(255,173,65,.2)`, fontFamily:B.futura, fontSize:10, fontWeight:800, color:B.gold, textTransform:"uppercase", letterSpacing:1.5 }}>Items by Category</div>
            {Object.entries(submittedData.catTotals).map(([cat,s])=>(
              <div key={cat} style={{ display:"flex", justifyContent:"space-between", padding:"10px 16px", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
                <span style={{ fontSize:13, color:"rgba(255,255,255,.75)", fontWeight:500 }}>{cat}</span>
                <span style={{ fontSize:13, fontWeight:900, color:B.gold }}>{s.items}</span>
              </div>
            ))}
            <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 16px", background:"rgba(255,173,65,.1)" }}>
              <span style={{ fontFamily:B.futura, fontSize:12, fontWeight:800, color:B.white, textTransform:"uppercase", letterSpacing:.8 }}>Total</span>
              <span style={{ fontSize:15, fontWeight:900, color:B.gold }}>{submittedData.count}</span>
            </div>
          </div>

          <button onClick={()=>{ setCounts({}); setSubmittedData(null); setView("count"); }} style={{ width:"100%", maxWidth:400, padding:"15px", borderRadius:11, border:"none", cursor:"pointer", fontFamily:B.futura, fontWeight:800, fontSize:15, letterSpacing:1, textTransform:"uppercase", background:B.gold, color:B.black, marginBottom:10 }}>
            Start New Count
          </button>
          <button onClick={()=>{ setSubmittedData(null); setView("review"); }} style={{ width:"100%", maxWidth:400, padding:"11px", borderRadius:11, border:`1.5px solid ${B.border}`, cursor:"pointer", fontFamily:B.font, fontWeight:600, fontSize:13, background:B.white, color:B.charcoal }}>
            Back to Review
          </button>
        </div>
      )}

      {/* ── SETTINGS TAB ── */}
      {view==="settings" && (
        <div style={{ padding:"14px 12px" }}>
          <div style={{ background:B.white, borderRadius:12, padding:16, marginBottom:12, border:`1px solid ${B.border}` }}>
            <div style={{ fontFamily:B.futura, fontSize:12, fontWeight:800, color:B.black, textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>Session Info</div>
            <label style={lbl}>Your Name</label>
            <input value={submitter} onChange={e=>setSubmitter(e.target.value)} placeholder="e.g. Sarah M." style={inp}/>
            <label style={lbl}>Store / Location</label>
            <input value={storeName} onChange={e=>setStoreName(e.target.value)} placeholder="e.g. Bristol" style={inp}/>
            <label style={lbl}>Period (optional)</label>
            <input value={period} onChange={e=>setPeriod(e.target.value)} placeholder="e.g. Period 7 2026" style={inp}/>
            <label style={lbl}>Week Number</label>
            <div style={{ display:"flex", gap:8, marginBottom:12 }}>
              {[1,2,3,4].map(w=>(
                <button key={w} onClick={()=>setWeekNumber(w)} style={{ flex:1, padding:"10px", borderRadius:8, border:`2px solid ${weekNumber===w?B.gold:B.border}`, background:weekNumber===w?B.gold:B.white, color:weekNumber===w?B.black:B.charcoal, fontFamily:B.futura, fontWeight:800, fontSize:14, cursor:"pointer", transition:"all .15s" }}>{w}</button>
              ))}
            </div>
            <label style={lbl}>Week Ending Date</label>
            <input value={weekDate} onChange={e=>setWeekDate(e.target.value)} placeholder="e.g. Jun 21, 2026" style={inp}/>
          </div>

          <div style={{ background:B.white, borderRadius:12, padding:16, marginBottom:12, border:`1px solid ${B.border}` }}>
            <div style={{ fontFamily:B.futura, fontSize:12, fontWeight:800, color:B.black, textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Supabase Connection</div>
            <div style={{ fontSize:11, color:B.gray, marginBottom:12, lineHeight:1.5 }}>Paste your Supabase Project URL and anon public key.</div>
            <label style={lbl}>Project URL</label>
            <input value={supabaseUrl} onChange={e=>{ const v=e.target.value.trim(); setSupabaseUrl(v); localStorage.setItem('melty_supabase_url',v); }} placeholder="https://xxxx.supabase.co" style={{ ...inp, fontFamily:"monospace", fontSize:11 }}/>
            <label style={lbl}>Anon Public Key</label>
            <input value={anonKey} onChange={e=>{ const v=e.target.value.trim(); setAnonKey(v); localStorage.setItem('melty_anon_key',v); }} placeholder="eyJhbGci..." style={{ ...inp, fontFamily:"monospace", fontSize:11 }}/>
            {supabaseUrl && anonKey && (
              <button onClick={async()=>{ try { const r=await fetch(`${supabaseUrl}/rest/v1/inventory_submissions?limit=1`,{headers:{apikey:anonKey,Authorization:`Bearer ${anonKey}`}}); showToast(r.ok||r.status===406?"✓ Connected":`Status ${r.status}`,r.ok||r.status===406?"success":"warn"); } catch(e){ showToast("Cannot reach Supabase","error"); } }}
                style={{ fontSize:11, color:B.gold, background:"none", border:"none", cursor:"pointer", padding:0, fontWeight:700, fontFamily:B.font }}>
                Test connection →
              </button>
            )}
          </div>

          <div style={{ padding:14, background:canSubmit?'#f0fdf4':'#fdf9f0', borderRadius:10, border:`1px solid ${canSubmit?'#bbf7d0':B.gold}` }}>
            <div style={{ fontFamily:B.futura, fontSize:11, fontWeight:800, color:canSubmit?'#27784a':B.orange, marginBottom:4, textTransform:"uppercase", letterSpacing:.8 }}>
              {canSubmit?"✓ Ready to submit":"⚠ Setup incomplete"}
            </div>
            <div style={{ fontSize:11, color:B.gray, lineHeight:1.8 }}>
              {!submitter&&"• Your name required\n"}{!storeName&&"• Store name required\n"}{!supabaseUrl&&"• Supabase URL required\n"}{!anonKey&&"• Anon key required\n"}
              {canSubmit&&`${countedItems.length} items counted — go to Review to submit.`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
