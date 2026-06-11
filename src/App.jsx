import { useState, useMemo, useRef } from "react";
import * as XLSX from "xlsx";

// ── WORKBOOK ROW MAP ──────────────────────────────────────────────────────────
// Maps each item name to its Excel row number in the "Week N by Category" sheets.
// Column Q (index 17) = Ending Inv. — the only column the app writes.
// Generated from: Weekly Count Sheet by Category, Melty Bristol Period 7 workbook.
const WORKBOOK_ROW_MAP = {
  "Bacon Bits Real Cooked .375\" Gas Flushed": 8,
  "Bacon Precooked Thick Slice": 9,
  "Beef Chopped Burnt Ends": 10,
  "Beef Roast Shredded Cooked Choice": 11,
  "Beef Steak Pub Burger Cooked": 12,
  "Ham Pit Boneless Smoked Old Fashioned Water-added": 13,
  "Pork Pulled Smoked": 14,
  "Chicken Breast Breaded Fully Cooked No Antibiotics Ever": 17,
  "Chicken Breast Diced Grill Fully-cooked Reduced": 18,
  "Chicken Tender Breaded Homestyle": 19,
  "Turkey Breast Oil Brown Skinless": 20,
  "Appetizer Cheese Curd Breaded Wisconsin": 23,
  "Macaroni And Cheese White": 24,
  "Onion Ring Beer Battered .375\" Ovenable": 25,
  "Potato Fry 1/4\" Shoestring Ultimate Crisp": 26,
  "Potato Tater Barrel": 27,
  "Chip Potato Jalapeno Kettle": 28,
  "Chip Potato Regular Sea Salt": 29,
  "Chip Potato Salted & Vinegar Kettle": 30,
  "Chip Potato Smokehouse Bbq Kettle": 31,
  "Chip Potato Spicy Dill Kettle": 32,
  "Bread Deli White Slice 5/8\" Salt City Baking (18 Slices / Loaf)": 35,
  "Bread Loaf Multigrain Gluten Free Sliced (14 Slices / Loaf)": 36,
  "Bun Hamburger Brioche 4 Inch": 37,
  "Brownie Chocolate Bar (Brookie)": 40,
  "Cake Funnel Fries": 41,
  "Hope's Dough Cookie Chocolate Chunk Semi Sweet": 42,
  "F'Real Milkshake Chocolate": 43,
  "F'Real Milkshake Cookie N Cream Oreo": 44,
  "F'Real Milkshake Vanilla": 45,
  "F'real Milkshake Strawberry": 46,
  "Topping Whipped Aerosol": 47,
  "Sauce Caramel Designer Dessert": 48,
  "Hersheys Chocolate Syrup": 49,
  "Cream Cheese Frosting / Icing": 50,
  "Spread Cookie Creamy Butter": 51,
  "Spread Hazelnut Creamy Nutella": 52,
  "Soup Broccoli Cheddar": 55,
  "Soup Chicken Noodle Ready To Use": 56,
  "Soup Tomato Basil Bisque Ready To Use": 57,
  "Cheese American 120 Slice Yellow": 60,
  "Cheese Cheddar Sharp Feather Shredded Yellow": 61,
  "Cheese Cream Whipped Tub Spread": 62,
  "Cheese Fontina Shredded": 63,
  "Cheese Havarti Sliced": 64,
  "Cheese Mascarpone": 65,
  "Cheese Mozzarella Low Moisture Whole Milk Mozzarella": 66,
  "Cheese Mozzarella Fresh Slice Thin": 67,
  "Cheese Parmesan Shredded Usa": 68,
  "Cheese Pepper Jack Feather Shredded": 69,
  "Cheese Provolone Non-smoked Sliced .75 Ounce": 70,
  "Cheese Swiss Sliced .75 Ounce": 71,
  "Cheese Queso Bravo White Dip In Bag-Land O Lakes": 72,
  "Sauce Pesto Basil": 75,
  "Dijon Mustard": 76,
  "Garlic Chopped In Water": 77,
  "Cracker Saltine 2 Per Packet": 78,
  "Sauce Cranberry Whole Fancy": 79,
  "Dressing Buttermilk Ranch": 80,
  "Dressing Caesar With Egg": 81,
  "Glaze Balsamic Vinegar Of Modena": 82,
  "Gravy Turkey Roasted Ready To Use": 83,
  "Jelly Jalapeno Green Mild": 84,
  "Juice Lemon Pasteurized Ultra Premium": 85,
  "Ketchup Jug Red In Plastic Bottle With Pump": 86,
  "Margarine Butter Whipped European Style": 87,
  "Mayonnaise Heavy Duty": 88,
  "Mix Gravy Au Jus": 89,
  "Pepper Chipotle In Adobo Sauce": 90,
  "Pickle Dill Sliced 3/16\" Krinkle Kut 450 Count": 91,
  "Relish Pickle Dill": 92,
  "Salt Kosher Flake Coarse": 93,
  "Sauce Barbecue Original": 94,
  "Sauce Chili Sweet Thai": 95,
  "Sauce Hot Sriracha 28 Ounce": 96,
  "Sauce Pasta Ultra Premium (6.9 lb per Can or 41.4 lbs/cs.)": 97,
  "Seasoning Italian Whole": 98,
  "Shortening Fry Liquid Clear Zero Trans Fat": 99,
  "Soup Tomato Condensed": 100,
  "Spice Blend Shichimi Togarashi": 101,
  "Spice Blend Vampire Killer": 102,
  "Spice Garlic Powder": 103,
  "Spice Pepper Black Ground Pure": 104,
  "Stove Top Turkey Stuffing Mix": 105,
  "Sugar Granulated Extra Fine Cane": 106,
  "Tortilla Strips Tri-colored Fried": 107,
  "Beans Black With Corn Flame Roasted Fiesta": 108,
  "Vinegar Rice Seasoned Japanese (1/Gal)": 109,
  "Bam Sauce": 110,
  "Chipotle Mayo": 111,
  "Fry Sauce": 112,
  "Melty Sauce": 113,
  "Mustard Aioli": 114,
  "Avocado Hass Fresh Chunk Pulp Packaged Tray": 117,
  "Lettuce Romaine Fresh": 118,
  "Onion Green Iceless": 119,
  "Onion Red Jumbo Sack": 120,
  "Onion Diced Iqf Poly Packaging": 121,
  "Pepper Jalapeno Fresh": 122,
  "Tomato 1 Layer 5x6": 123,
  "Juice Concentrate Frozen Lemonade 5% 5:1 Yield": 126,
  "Syrup Coke Classic 5:1 Yield Bag-in-box": 127,
  "Syrup Coke Diet 5:1 Yield Bag-in-box": 128,
  "Syrup Coke Zero Sugar Concentrate 5:1 Yield Bag In Box": 129,
  "Syrup Dr Pepper Bag-in-box": 130,
  "Syrup Dr Pepper Diet Bag In Box": 131,
  "Syrup Mountain Blast Sport Bag In Box": 132,
  "Syrup Root Beer Bag In Box": 133,
  "Syrup Sprite 5:1 Yield Bag-in-box": 134,
  "Tea Brew Filter Pack": 135,
  "12 oz Canned Soda": 136,
  "Dasani Purified Water": 137,
  "Juice Apple 100%": 138,
  "Puree Strawberry": 139,
  "Puree Mango": 140,
  "Puree Raspberry": 141,
};

// Week sheet names by week number
const WEEK_SHEETS = {
  1: "Week 1 by Category",
  2: "Week 2 by Category",
  3: "Week 3 by Category",
  4: "Week 4 by Category",
};

// ── ITEM MASTER ───────────────────────────────────────────────────────────────
// workbookName must exactly match the key in WORKBOOK_ROW_MAP
const ITEM_MASTER = [
  { id: 1,  workbookName: "Bacon Bits Real Cooked .375\" Gas Flushed", packSize: "2/5 lb",      category: "Beef & Pork",         location: "Walk-In",     unit: "lb" },
  { id: 2,  workbookName: "Bacon Precooked Thick Slice",               packSize: "2/150 ct",    category: "Beef & Pork",         location: "Walk-In",     unit: "Count" },
  { id: 3,  workbookName: "Beef Chopped Burnt Ends",                   packSize: "2/5 lb",      category: "Beef & Pork",         location: "Walk-In",     unit: "lb" },
  { id: 4,  workbookName: "Beef Roast Shredded Cooked Choice",         packSize: "2/5 lb",      category: "Beef & Pork",         location: "Walk-In",     unit: "lb" },
  { id: 5,  workbookName: "Beef Steak Pub Burger Cooked",              packSize: "53/3 oz",     category: "Beef & Pork",         location: "Walk-In",     unit: "Each" },
  { id: 6,  workbookName: "Ham Pit Boneless Smoked Old Fashioned Water-added", packSize: "1/14-19 lb", category: "Beef & Pork", location: "Walk-In",     unit: "lb" },
  { id: 7,  workbookName: "Pork Pulled Smoked",                        packSize: "2/5 lb",      category: "Beef & Pork",         location: "Walk-In",     unit: "lb" },
  { id: 8,  workbookName: "Chicken Breast Breaded Fully Cooked No Antibiotics Ever", packSize: "40/4 oz", category: "Poultry", location: "Walk-In",     unit: "lb" },
  { id: 9,  workbookName: "Chicken Breast Diced Grill Fully-cooked Reduced", packSize: "2/5 lb", category: "Poultry",           location: "Walk-In",     unit: "lb" },
  { id: 10, workbookName: "Chicken Tender Breaded Homestyle",          packSize: "2/5 lb",      category: "Poultry",             location: "Walk-In",     unit: "lb" },
  { id: 11, workbookName: "Turkey Breast Oil Brown Skinless",          packSize: "2/8-10 lb",   category: "Poultry",             location: "Walk-In",     unit: "lb" },
  { id: 12, workbookName: "Appetizer Cheese Curd Breaded Wisconsin",   packSize: "2/5 lb",      category: "Sides",               location: "Freezer",     unit: "lb" },
  { id: 13, workbookName: "Macaroni And Cheese White",                 packSize: "4/4 lb",      category: "Sides",               location: "Freezer",     unit: "lb" },
  { id: 14, workbookName: "Onion Ring Beer Battered .375\" Ovenable",  packSize: "6/2.5 lb",    category: "Sides",               location: "Freezer",     unit: "lb" },
  { id: 15, workbookName: "Potato Fry 1/4\" Shoestring Ultimate Crisp",packSize: "6/4.5 lb",    category: "Sides",               location: "Freezer",     unit: "lb" },
  { id: 16, workbookName: "Potato Tater Barrel",                       packSize: "6/5 lb",      category: "Sides",               location: "Freezer",     unit: "lb" },
  { id: 17, workbookName: "Chip Potato Jalapeno Kettle",               packSize: "64/cs",       category: "Sides",               location: "Dry Storage", unit: "Bag" },
  { id: 18, workbookName: "Chip Potato Regular Sea Salt",              packSize: "64/cs",       category: "Sides",               location: "Dry Storage", unit: "Bag" },
  { id: 19, workbookName: "Chip Potato Salted & Vinegar Kettle",       packSize: "64/cs",       category: "Sides",               location: "Dry Storage", unit: "Bag" },
  { id: 20, workbookName: "Chip Potato Smokehouse Bbq Kettle",         packSize: "64/cs",       category: "Sides",               location: "Dry Storage", unit: "Bag" },
  { id: 21, workbookName: "Chip Potato Spicy Dill Kettle",             packSize: "64/cs",       category: "Sides",               location: "Dry Storage", unit: "Bag" },
  { id: 22, workbookName: "Bread Deli White Slice 5/8\" Salt City Baking (18 Slices / Loaf)", packSize: "12/32 oz", category: "Bread & Rolls", location: "Freezer", unit: "Loaf" },
  { id: 23, workbookName: "Bread Loaf Multigrain Gluten Free Sliced (14 Slices / Loaf)", packSize: "6/24 oz", category: "Bread & Rolls", location: "Freezer", unit: "Loaf" },
  { id: 24, workbookName: "Bun Hamburger Brioche 4 Inch",              packSize: "5/12 Ct",     category: "Bread & Rolls",       location: "Freezer",     unit: "Dozen" },
  { id: 25, workbookName: "Brownie Chocolate Bar (Brookie)",           packSize: "4/24 Ct",     category: "Desserts",            location: "Freezer",     unit: "Each" },
  { id: 26, workbookName: "Cake Funnel Fries",                         packSize: "1/8 lb",      category: "Desserts",            location: "Freezer",     unit: "lb" },
  { id: 27, workbookName: "Hope's Dough Cookie Chocolate Chunk Semi Sweet", packSize: "128/2.5 oz", category: "Desserts",        location: "Freezer",     unit: "each" },
  { id: 28, workbookName: "F'Real Milkshake Chocolate",               packSize: "12/Case",     category: "Desserts",            location: "Freezer",     unit: "each" },
  { id: 29, workbookName: "F'Real Milkshake Cookie N Cream Oreo",     packSize: "12/Case",     category: "Desserts",            location: "Freezer",     unit: "each" },
  { id: 30, workbookName: "F'Real Milkshake Vanilla",                 packSize: "12/Case",     category: "Desserts",            location: "Freezer",     unit: "each" },
  { id: 31, workbookName: "F'real Milkshake Strawberry",              packSize: "12/Case",     category: "Desserts",            location: "Freezer",     unit: "each" },
  { id: 32, workbookName: "Topping Whipped Aerosol",                  packSize: "12/14 Oz",    category: "Desserts",            location: "Walk-In",     unit: "Can" },
  { id: 33, workbookName: "Sauce Caramel Designer Dessert",           packSize: "12/17 Oz",    category: "Desserts",            location: "Dry Storage", unit: "Bottle" },
  { id: 34, workbookName: "Hersheys Chocolate Syrup",                 packSize: "1/24 Oz",     category: "Desserts",            location: "Dry Storage", unit: "Bottle" },
  { id: 35, workbookName: "Cream Cheese Frosting / Icing",            packSize: "1/16 Oz",     category: "Desserts",            location: "Walk-In",     unit: "Each" },
  { id: 36, workbookName: "Spread Cookie Creamy Butter",              packSize: "1/14 Oz",     category: "Desserts",            location: "Dry Storage", unit: "Jar" },
  { id: 37, workbookName: "Spread Hazelnut Creamy Nutella",           packSize: "1/26.5 oz",   category: "Desserts",            location: "Dry Storage", unit: "Jar" },
  { id: 38, workbookName: "Soup Broccoli Cheddar",                    packSize: "4/4 lb",      category: "Soups",               location: "Freezer",     unit: "lb" },
  { id: 39, workbookName: "Soup Chicken Noodle Ready To Use",         packSize: "4/4 lb",      category: "Soups",               location: "Freezer",     unit: "lb" },
  { id: 40, workbookName: "Soup Tomato Basil Bisque Ready To Use",    packSize: "4/4 lb",      category: "Soups",               location: "Freezer",     unit: "lb" },
  { id: 41, workbookName: "Cheese American 120 Slice Yellow",         packSize: "4/5 lb",      category: "Cheese",              location: "Walk-In",     unit: "lb" },
  { id: 42, workbookName: "Cheese Cheddar Sharp Feather Shredded Yellow", packSize: "4/5 lb", category: "Cheese",              location: "Walk-In",     unit: "lb" },
  { id: 43, workbookName: "Cheese Cream Whipped Tub Spread",          packSize: "4/3 lb",      category: "Cheese",              location: "Walk-In",     unit: "lb" },
  { id: 44, workbookName: "Cheese Fontina Shredded",                  packSize: "4/5 lb",      category: "Cheese",              location: "Walk-In",     unit: "lb" },
  { id: 45, workbookName: "Cheese Havarti Sliced",                    packSize: "4/2.5 lb",    category: "Cheese",              location: "Walk-In",     unit: "lb" },
  { id: 46, workbookName: "Cheese Mascarpone",                        packSize: "6/1 lb",      category: "Cheese",              location: "Walk-In",     unit: "lb" },
  { id: 47, workbookName: "Cheese Mozzarella Low Moisture Whole Milk Mozzarella", packSize: "6/5 lb", category: "Cheese",      location: "Walk-In",     unit: "lb" },
  { id: 48, workbookName: "Cheese Mozzarella Fresh Slice Thin",       packSize: "6/1 lb",      category: "Cheese",              location: "Walk-In",     unit: "lb" },
  { id: 49, workbookName: "Cheese Parmesan Shredded Usa",             packSize: "2/5 lb",      category: "Cheese",              location: "Walk-In",     unit: "lb" },
  { id: 50, workbookName: "Cheese Pepper Jack Feather Shredded",      packSize: "4/5 lb",      category: "Cheese",              location: "Walk-In",     unit: "lb" },
  { id: 51, workbookName: "Cheese Provolone Non-smoked Sliced .75 Ounce", packSize: "6/2.5 lb", category: "Cheese",            location: "Walk-In",     unit: "lb" },
  { id: 52, workbookName: "Cheese Swiss Sliced .75 Ounce",            packSize: "8/1.5 lb",    category: "Cheese",              location: "Walk-In",     unit: "lb" },
  { id: 53, workbookName: "Cheese Queso Bravo White Dip In Bag-Land O Lakes", packSize: "6/5 lb", category: "Cheese",          location: "Walk-In",     unit: "lb" },
  { id: 54, workbookName: "Sauce Pesto Basil",                        packSize: "6/30 oz",     category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Each" },
  { id: 55, workbookName: "Dijon Mustard",                            packSize: "1/12 oz",     category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Bottle" },
  { id: 56, workbookName: "Garlic Chopped In Water",                  packSize: "1/32 oz",     category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Each" },
  { id: 57, workbookName: "Cracker Saltine 2 Per Packet",             packSize: "500/2 CT",    category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Each" },
  { id: 58, workbookName: "Sauce Cranberry Whole Fancy",              packSize: "6/#10",       category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Can" },
  { id: 59, workbookName: "Dressing Buttermilk Ranch",                packSize: "1/Gal",       category: "Grocery & Dry Goods", location: "Walk-In",     unit: "Gallon" },
  { id: 60, workbookName: "Dressing Caesar With Egg",                 packSize: "1/Gal",       category: "Grocery & Dry Goods", location: "Walk-In",     unit: "Gallon" },
  { id: 61, workbookName: "Glaze Balsamic Vinegar Of Modena",         packSize: "6/12.9 Oz",   category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Bottle" },
  { id: 62, workbookName: "Gravy Turkey Roasted Ready To Use",        packSize: "12/50 oz",    category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Can" },
  { id: 63, workbookName: "Jelly Jalapeno Green Mild",                packSize: "6/10.9 Oz",   category: "Grocery & Dry Goods", location: "Walk-In",     unit: "Jar" },
  { id: 64, workbookName: "Juice Lemon Pasteurized Ultra Premium",    packSize: "1 Qt",        category: "Grocery & Dry Goods", location: "Walk-In",     unit: "Quart" },
  { id: 65, workbookName: "Ketchup Jug Red In Plastic Bottle With Pump", packSize: "6/7.125 lb", category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Jug" },
  { id: 66, workbookName: "Margarine Butter Whipped European Style",  packSize: "4/5 lb",      category: "Grocery & Dry Goods", location: "Walk-In",     unit: "lb" },
  { id: 67, workbookName: "Mayonnaise Heavy Duty",                    packSize: "4/1 Gal",     category: "Grocery & Dry Goods", location: "Walk-In",     unit: "Gallon" },
  { id: 68, workbookName: "Mix Gravy Au Jus",                         packSize: "12/2.75 Oz",  category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Packs" },
  { id: 69, workbookName: "Pepper Chipotle In Adobo Sauce",           packSize: "24/7 Oz",     category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Bottle" },
  { id: 70, workbookName: "Pickle Dill Sliced 3/16\" Krinkle Kut 450 Count", packSize: "1/Gal", category: "Grocery & Dry Goods", location: "Walk-In", unit: "Gallon" },
  { id: 71, workbookName: "Relish Pickle Dill",                       packSize: "1 Gal",       category: "Grocery & Dry Goods", location: "Walk-In",     unit: "Gallon" },
  { id: 72, workbookName: "Salt Kosher Flake Coarse",                 packSize: "3 lb",        category: "Grocery & Dry Goods", location: "Dry Storage", unit: "lb" },
  { id: 73, workbookName: "Sauce Barbecue Original",                  packSize: "4/1 Gal",     category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Gallon" },
  { id: 74, workbookName: "Sauce Chili Sweet Thai",                   packSize: "12/32 Oz",    category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Bottle" },
  { id: 75, workbookName: "Sauce Hot Sriracha 28 Ounce",              packSize: "12/28 Oz",    category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Bottle" },
  { id: 76, workbookName: "Sauce Pasta Ultra Premium (6.9 lb per Can or 41.4 lbs/cs.)", packSize: "6/6.9 lb-Can", category: "Grocery & Dry Goods", location: "Dry Storage", unit: "lb" },
  { id: 77, workbookName: "Seasoning Italian Whole",                  packSize: "1/6.25 Oz",   category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Jar" },
  { id: 78, workbookName: "Shortening Fry Liquid Clear Zero Trans Fat",packSize: "35 lb",      category: "Grocery & Dry Goods", location: "Dry Storage", unit: "lb" },
  { id: 79, workbookName: "Soup Tomato Condensed",                    packSize: "12/50 Oz",    category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Can" },
  { id: 80, workbookName: "Spice Blend Shichimi Togarashi",           packSize: "1/16 Oz",     category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Jar" },
  { id: 81, workbookName: "Spice Blend Vampire Killer",               packSize: "1/16 Oz",     category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Jar" },
  { id: 82, workbookName: "Spice Garlic Powder",                      packSize: "1/21 Oz",     category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Jar" },
  { id: 83, workbookName: "Spice Pepper Black Ground Pure",           packSize: "1/18 Oz",     category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Jar" },
  { id: 84, workbookName: "Stove Top Turkey Stuffing Mix",            packSize: "1/6 oz",      category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Box" },
  { id: 85, workbookName: "Sugar Granulated Extra Fine Cane",         packSize: "1/25 lb",     category: "Grocery & Dry Goods", location: "Dry Storage", unit: "lb" },
  { id: 86, workbookName: "Tortilla Strips Tri-colored Fried",        packSize: "10/1 lb",     category: "Grocery & Dry Goods", location: "Dry Storage", unit: "lb" },
  { id: 87, workbookName: "Beans Black With Corn Flame Roasted Fiesta",packSize: "6/2.5 lb",   category: "Grocery & Dry Goods", location: "Dry Storage", unit: "lb" },
  { id: 88, workbookName: "Vinegar Rice Seasoned Japanese (1/Gal)",   packSize: "1/Gal",       category: "Grocery & Dry Goods", location: "Dry Storage", unit: "Gal" },
  { id: 89, workbookName: "Bam Sauce",                                packSize: "1.49/Gal",    category: "House Sauces",        location: "Walk-In",     unit: "Batch" },
  { id: 90, workbookName: "Chipotle Mayo",                            packSize: "1.33/Gal",    category: "House Sauces",        location: "Walk-In",     unit: "Batch" },
  { id: 91, workbookName: "Fry Sauce",                                packSize: "1.89/Gal",    category: "House Sauces",        location: "Walk-In",     unit: "Batch" },
  { id: 92, workbookName: "Melty Sauce",                              packSize: "1.61/Gal",    category: "House Sauces",        location: "Walk-In",     unit: "Batch" },
  { id: 93, workbookName: "Mustard Aioli",                            packSize: ".63/Gal",     category: "House Sauces",        location: "Walk-In",     unit: "Batch" },
  { id: 94, workbookName: "Avocado Hass Fresh Chunk Pulp Packaged Tray", packSize: "8/2 lb",  category: "Produce",             location: "Walk-In",     unit: "lb" },
  { id: 95, workbookName: "Lettuce Romaine Fresh",                    packSize: "1/6 Ct",      category: "Produce",             location: "Walk-In",     unit: "Head" },
  { id: 96, workbookName: "Onion Green Iceless",                      packSize: "1/2 lb",      category: "Produce",             location: "Walk-In",     unit: "lb" },
  { id: 97, workbookName: "Onion Red Jumbo Sack",                     packSize: "1/10 lb",     category: "Produce",             location: "Walk-In",     unit: "lb" },
  { id: 98, workbookName: "Onion Diced Iqf Poly Packaging",           packSize: "6/2 lb",      category: "Produce",             location: "Walk-In",     unit: "lb" },
  { id: 99, workbookName: "Pepper Jalapeno Fresh",                    packSize: "1/10 lb",     category: "Produce",             location: "Walk-In",     unit: "lb" },
  { id: 100,workbookName: "Tomato 1 Layer 5x6",                       packSize: "10 lb",       category: "Produce",             location: "Walk-In",     unit: "lb" },
  { id: 101,workbookName: "Juice Concentrate Frozen Lemonade 5% 5:1 Yield", packSize: "3 Liter", category: "Beverages",        location: "Dry Storage", unit: "Gallon" },
  { id: 102,workbookName: "Syrup Coke Classic 5:1 Yield Bag-in-box",  packSize: "5 Gal",       category: "Beverages",           location: "Dry Storage", unit: "Gallon" },
  { id: 103,workbookName: "Syrup Coke Diet 5:1 Yield Bag-in-box",     packSize: "5 Gal",       category: "Beverages",           location: "Dry Storage", unit: "Gallon" },
  { id: 104,workbookName: "Syrup Coke Zero Sugar Concentrate 5:1 Yield Bag In Box", packSize: "5 Gal", category: "Beverages", location: "Dry Storage", unit: "Gallon" },
  { id: 105,workbookName: "Syrup Dr Pepper Bag-in-box",               packSize: "5 Gal",       category: "Beverages",           location: "Dry Storage", unit: "Gallon" },
  { id: 106,workbookName: "Syrup Dr Pepper Diet Bag In Box",          packSize: "2.5 Gal",     category: "Beverages",           location: "Dry Storage", unit: "Gallon" },
  { id: 107,workbookName: "Syrup Mountain Blast Sport Bag In Box",    packSize: "2.5 Gal",     category: "Beverages",           location: "Dry Storage", unit: "Gallon" },
  { id: 108,workbookName: "Syrup Root Beer Bag In Box",               packSize: "2.5 Gal",     category: "Beverages",           location: "Dry Storage", unit: "Gallon" },
  { id: 109,workbookName: "Syrup Sprite 5:1 Yield Bag-in-box",        packSize: "5 Gal",       category: "Beverages",           location: "Dry Storage", unit: "Gallon" },
  { id: 110,workbookName: "Tea Brew Filter Pack",                     packSize: "32/3 oz",     category: "Beverages",           location: "Dry Storage", unit: "Pack" },
  { id: 111,workbookName: "12 oz Canned Soda",                        packSize: "35/12 oz",    category: "Beverages",           location: "Dry Storage", unit: "Can" },
  { id: 112,workbookName: "Dasani Purified Water",                    packSize: "32/16.9 oz",  category: "Beverages",           location: "Dry Storage", unit: "Bottle" },
  { id: 113,workbookName: "Juice Apple 100%",                         packSize: "24/7.2 Oz",   category: "Beverages",           location: "Dry Storage", unit: "Each" },
  { id: 114,workbookName: "Puree Strawberry",                         packSize: "1/1 Liter",   category: "Beverages",           location: "Walk-In",     unit: "Bottle" },
  { id: 115,workbookName: "Puree Mango",                              packSize: "1/1 Liter",   category: "Beverages",           location: "Walk-In",     unit: "Bottle" },
  { id: 116,workbookName: "Puree Raspberry",                          packSize: "1/1 Liter",   category: "Beverages",           location: "Walk-In",     unit: "Bottle" },
];

// ── EXPORT: inject counts into uploaded workbook ──────────────────────────────
async function exportToWorkbook(file, counts, weekNumber, items) {
  const arrayBuf = await file.arrayBuffer();
  const wb = XLSX.read(arrayBuf, { type: "array", cellFormula: true, cellStyles: true });

  const sheetName = WEEK_SHEETS[weekNumber];
  if (!wb.SheetNames.includes(sheetName)) {
    throw new Error(`Sheet "${sheetName}" not found in workbook. Check that this is a Melty Period workbook.`);
  }

  const ws = wb.Sheets[sheetName];
  let written = 0, skipped = 0;

  items.forEach(item => {
    const count = counts[item.id];
    if (count == null || count === "") return;
    const excelRow = WORKBOOK_ROW_MAP[item.workbookName];
    if (!excelRow) { skipped++; return; }
    // Column Q = index 17 = "Q"
    const cellRef = `Q${excelRow}`;
    ws[cellRef] = { t: "n", v: Number(count), w: String(count) };
    written++;
  });

  // Update the sheet range if needed
  const range = XLSX.utils.decode_range(ws["!ref"] || "A1:U150");
  if (range.e.c < 16) range.e.c = 16; // ensure col Q is in range
  ws["!ref"] = XLSX.utils.encode_range(range);

  return { wb, written, skipped };
}

// ── FLAT CSV EXPORT (unchanged) ───────────────────────────────────────────────
function downloadCSV(counts, storeName, weekDate, items) {
  const header = ["Store","Week Of","Item","Pack Size","Category","Location","Unit","Count"];
  const rows = items.map(item => [
    storeName, weekDate, item.workbookName, item.packSize,
    item.category, item.location, item.unit, counts[item.id] ?? ""
  ]);
  const csv = [header, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Melty_Inventory_${storeName.replace(/\s+/g,"_")}_${weekDate.replace(/[\s,]+/g,"_")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
const IconCheck  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>;
const IconMinus  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconPlus   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconSearch = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconDown   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IconUpload = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
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
  const [counts,     setCounts]     = useState({});
  const [search,     setSearch]     = useState("");
  const [filterCat,  setFilterCat]  = useState("All");
  const [filterLoc,  setFilterLoc]  = useState("All");
  const [view,       setView]       = useState("count");
  const [storeName,  setStoreName]  = useState("Bristol");
  const [weekNumber, setWeekNumber] = useState(1);
  const [weekDate,   setWeekDate]   = useState("");
  const [toast,      setToast]      = useState(null);
  const [items,      setItems]      = useState(ITEM_MASTER);
  const [newItem,    setNewItem]    = useState({workbookName:"",packSize:"",category:"",location:"",unit:""});
  const [exporting,  setExporting]  = useState(false);
  const [workbookFile, setWorkbookFile] = useState(null);
  const fileInputRef = useRef(null);

  const setCount = (id,val) => setCounts(prev=>({...prev,[id]:val}));
  const showToast = (msg,dur=2500) => { setToast(msg); setTimeout(()=>setToast(null),dur); };

  const allCategories = [...new Set(items.map(i=>i.category))];
  const allLocations  = [...new Set(items.map(i=>i.location))];

  const filtered = useMemo(() => items.filter(item => {
    const q = search.toLowerCase();
    return (item.workbookName.toLowerCase().includes(q) || item.packSize.toLowerCase().includes(q))
      && (filterCat==="All" || item.category===filterCat)
      && (filterLoc==="All" || item.location===filterLoc);
  }), [items, search, filterCat, filterLoc]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(item => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, [filtered]);

  const countedItems = Object.values(counts).filter(v => v!=null && v!=="").length;
  const pct = items.length > 0 ? Math.round((countedItems/items.length)*100) : 0;
  const reviewItems = items.filter(i => counts[i.id]!=null && counts[i.id]!=="");
  const uncounted   = items.filter(i => counts[i.id]==null || counts[i.id]==="");

  async function handleWorkbookExport() {
    if (!workbookFile) {
      showToast("Upload the period workbook first", 3500);
      return;
    }
    setExporting(true);
    try {
      const { wb, written, skipped } = await exportToWorkbook(workbookFile, counts, weekNumber, items);
      const fname = workbookFile.name.replace(/\.xlsx$/i, `_Week${weekNumber}_Filled.xlsx`);
      XLSX.writeFile(wb, fname);
      showToast(`✓ ${written} counts written to Week ${weekNumber} workbook${skipped ? ` (${skipped} unmapped)` : ""}`, 3500);
    } catch(e) {
      showToast(`Error: ${e.message}`, 4000);
    }
    setExporting(false);
  }

  function handleCSVExport() {
    downloadCSV(counts, storeName, weekDate || `Week ${weekNumber}`, items);
    showToast("CSV downloaded ✓");
  }

  function addCustomItem() {
    if(!newItem.workbookName.trim()) return;
    setItems(prev=>[...prev,{id:Date.now(),...newItem,category:newItem.category||"Other",location:newItem.location||"Dry Storage",unit:newItem.unit||"units",packSize:newItem.packSize||""}]);
    setNewItem({workbookName:"",packSize:"",category:"",location:"",unit:""});
    showToast("Item added");
  }

  const labelStyle = { display:"block", fontSize:11, color:"#9ca3af", marginBottom:3 };
  const inputStyle = { width:"100%", border:"1.5px solid #e5e7eb", borderRadius:8, padding:"8px 12px", fontSize:13, marginBottom:10, boxSizing:"border-box", outline:"none" };

  return (
    <div style={{ minHeight:"100vh", background:"#f3f4f6", fontFamily:"'Inter',system-ui,sans-serif", paddingBottom:80 }}>
      {toast && (
        <div style={{ position:"fixed", top:16, left:"50%", transform:"translateX(-50%)", background:"#1a1a1a", color:"#fff", padding:"10px 20px", borderRadius:20, fontSize:13, fontWeight:600, zIndex:999, boxShadow:"0 4px 16px rgba(0,0,0,.3)", whiteSpace:"nowrap" }}>{toast}</div>
      )}

      {/* HEADER */}
      <div style={{ background:"#1a1a1a", padding:"14px 16px 10px", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ color:"#ef4444", fontWeight:900, fontSize:22, letterSpacing:"-1px" }}>MELTY</div>
            <div style={{ color:"#6b7280", fontSize:11, marginTop:1 }}>{storeName} · Week {weekNumber}{weekDate ? ` · ${weekDate}` : ""}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ color:"#fff", fontSize:22, fontWeight:800 }}>{countedItems}<span style={{ color:"#4b5563", fontSize:12, fontWeight:400 }}>/{items.length}</span></div>
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
          const badge = key==="review" ? reviewItems.length : null;
          return (
            <button key={key} onClick={()=>setView(key)} style={{ flex:1, padding:"10px 4px", fontSize:12, fontWeight:view===key?700:500, color:view===key?"#ef4444":"#6b7280", background:"none", border:"none", borderBottom:view===key?"2px solid #ef4444":"2px solid transparent", cursor:"pointer" }}>
              {label}{badge!=null && <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:16, height:16, borderRadius:8, background:badge>0?"#ef4444":"#e5e7eb", color:badge>0?"#fff":"#9ca3af", fontSize:9, fontWeight:700, marginLeft:4 }}>{badge}</span>}
            </button>
          );
        })}
      </div>

      {/* COUNT TAB */}
      {view==="count" && <>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", background:"#fff", borderBottom:"1px solid #f0f0f0" }}>
          <IconSearch/>
          <input style={{ flex:1, border:"none", outline:"none", fontSize:14, background:"transparent" }} placeholder="Search items or pack size…" value={search} onChange={e=>setSearch(e.target.value)}/>
          {search && <button onClick={()=>setSearch("")} style={{ background:"none", border:"none", color:"#9ca3af", cursor:"pointer", fontSize:16 }}>✕</button>}
        </div>
        <div style={{ display:"flex", gap:6, padding:"8px 12px", overflowX:"auto", background:"#fff", borderBottom:"1px solid #f0f0f0" }}>
          {["All",...allCategories].map(c=><button key={c} onClick={()=>setFilterCat(c)} style={{ padding:"4px 10px", borderRadius:20, fontSize:11, fontWeight:600, border:"none", cursor:"pointer", whiteSpace:"nowrap", background:filterCat===c?"#ef4444":"#f3f4f6", color:filterCat===c?"#fff":"#374151" }}>{c}</button>)}
        </div>
        <div style={{ display:"flex", gap:6, padding:"6px 12px", overflowX:"auto", background:"#fafafa", borderBottom:"2px solid #e5e7eb" }}>
          {["All",...allLocations].map(l=><button key={l} onClick={()=>setFilterLoc(l)} style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600, border:"none", cursor:"pointer", whiteSpace:"nowrap", background:filterLoc===l?"#1a1a1a":"#f3f4f6", color:filterLoc===l?"#fff":"#374151" }}>{l}</button>)}
        </div>
        <div style={{ padding:"0 12px 12px" }}>
          {Object.keys(grouped).length===0 && <div style={{ textAlign:"center", color:"#9ca3af", padding:40, fontSize:14 }}>No items match.</div>}
          {Object.entries(grouped).map(([group, groupItems]) => (
            <div key={group}>
              <div style={{ fontSize:10, fontWeight:700, color:"#ef4444", textTransform:"uppercase", letterSpacing:1.2, padding:"14px 0 6px", display:"flex", justifyContent:"space-between" }}>
                <span>{group}</span>
                <span style={{ color:"#9ca3af", fontWeight:400, textTransform:"none" }}>{groupItems.filter(i=>counts[i.id]!=null&&counts[i.id]!=="").length}/{groupItems.length}</span>
              </div>
              {groupItems.map(item => {
                const counted = counts[item.id]!=null && counts[item.id]!=="";
                return (
                  <div key={item.id} style={{ background:"#fff", borderRadius:10, padding:"10px 12px", marginBottom:6, display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:counted?"0 0 0 1.5px #fca5a5":"0 1px 2px rgba(0,0,0,.06)" }}>
                    <div style={{ flex:1, minWidth:0, marginRight:10 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:"#111", display:"flex", alignItems:"center", gap:5 }}>
                        {counted && <span style={{ color:"#ef4444", flexShrink:0 }}><IconCheck/></span>}
                        <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.workbookName}</span>
                      </div>
                      <div style={{ fontSize:10, color:"#9ca3af", marginTop:2 }}>{item.packSize} · {item.unit} · {item.location}</div>
                    </div>
                    <Stepper value={counts[item.id]} onChange={val=>setCount(item.id,val)}/>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </>}

      {/* REVIEW TAB */}
      {view==="review" && (
        <div style={{ padding:"12px 12px 20px" }}>

          {/* Workbook export — primary action */}
          <div style={{ background:"#fff", borderRadius:12, padding:14, marginBottom:10, boxShadow:"0 1px 3px rgba(0,0,0,.07)" }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:10 }}>Export to Melty Workbook</div>
            <div style={{ fontSize:11, color:"#6b7280", marginBottom:10, lineHeight:1.5 }}>
              Upload the period workbook, then export to write counts directly into the <strong>Week {weekNumber} by Category</strong> sheet (column Q — Ending Inv.).
            </div>

            {/* File upload */}
            <input ref={fileInputRef} type="file" accept=".xlsx" style={{ display:"none" }}
              onChange={e => { const f = e.target.files?.[0]; if(f) { setWorkbookFile(f); showToast(`Loaded: ${f.name}`, 2000); } }}
            />
            <button onClick={()=>fileInputRef.current?.click()} style={{ width:"100%", padding:"10px", borderRadius:9, border:"1.5px dashed #d1d5db", background:"#f9fafb", color:"#374151", fontSize:12, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginBottom:8 }}>
              <IconUpload/>
              {workbookFile ? `✓ ${workbookFile.name}` : "Upload Period Workbook (.xlsx)"}
            </button>

            <button onClick={handleWorkbookExport} disabled={exporting||!workbookFile} style={{ width:"100%", padding:"12px", borderRadius:10, border:"none", cursor:workbookFile?"pointer":"not-allowed", fontWeight:700, fontSize:13, background:workbookFile?"#ef4444":"#e5e7eb", color:workbookFile?"#fff":"#9ca3af", display:"flex", alignItems:"center", justifyContent:"center", gap:6, opacity:exporting?.6:1 }}>
              <IconDown/> Export to Workbook (Week {weekNumber})
            </button>
          </div>

          {/* CSV fallback */}
          <button onClick={handleCSVExport} style={{ width:"100%", padding:"11px", borderRadius:10, border:"none", cursor:"pointer", fontWeight:600, fontSize:12, background:"#1a1a1a", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginBottom:10 }}>
            <IconDown/> Download CSV (Google Sheets)
          </button>

          <button onClick={()=>{ if(window.confirm("Clear all counts?")){ setCounts({}); showToast("Counts cleared"); } }} style={{ width:"100%", marginBottom:14, padding:"9px", borderRadius:8, border:"1px solid #e5e7eb", background:"#fff", color:"#6b7280", fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}><IconReset/> Clear All Counts</button>

          {/* Counted items */}
          {reviewItems.length>0 && <>
            <div style={{ fontSize:10, fontWeight:700, color:"#ef4444", textTransform:"uppercase", letterSpacing:1.2, padding:"4px 0 8px" }}>Counted ({reviewItems.length})</div>
            {reviewItems.map(item=>(
              <div key={item.id} style={{ background:"#fff", borderRadius:9, padding:"9px 12px", marginBottom:5, display:"flex", justifyContent:"space-between", boxShadow:"0 1px 2px rgba(0,0,0,.06)" }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600 }}>{item.workbookName}</div>
                  <div style={{ fontSize:10, color:"#9ca3af" }}>{item.category} · row {WORKBOOK_ROW_MAP[item.workbookName] ?? "custom"}</div>
                </div>
                <div style={{ fontSize:18, fontWeight:800, color:"#ef4444" }}>{counts[item.id]}<span style={{ fontSize:10, color:"#9ca3af", fontWeight:400, marginLeft:3 }}>{item.unit}</span></div>
              </div>
            ))}
          </>}
          {uncounted.length>0 && <>
            <div style={{ fontSize:10, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1.2, padding:"12px 0 8px" }}>Not Yet Counted ({uncounted.length})</div>
            {uncounted.map(item=>(
              <div key={item.id} style={{ background:"#f9fafb", borderRadius:9, padding:"9px 12px", marginBottom:4, display:"flex", justifyContent:"space-between", opacity:0.6 }}>
                <div style={{ fontSize:12, fontWeight:500, color:"#6b7280" }}>{item.workbookName}</div>
                <div style={{ fontSize:12, color:"#d1d5db" }}>—</div>
              </div>
            ))}
          </>}
        </div>
      )}

      {/* SETTINGS TAB */}
      {view==="settings" && (
        <div style={{ padding:"12px" }}>
          <div style={{ background:"#fff", borderRadius:10, padding:14, marginBottom:10, boxShadow:"0 1px 3px rgba(0,0,0,.06)" }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:10 }}>Session Info</div>
            <label style={labelStyle}>Store / Location Name</label>
            <input value={storeName} onChange={e=>setStoreName(e.target.value)} style={inputStyle}/>
            <label style={labelStyle}>Week Number</label>
            <div style={{ display:"flex", gap:8, marginBottom:10 }}>
              {[1,2,3,4].map(w=>(
                <button key={w} onClick={()=>setWeekNumber(w)} style={{ flex:1, padding:"9px", borderRadius:8, border:"1.5px solid", borderColor:weekNumber===w?"#ef4444":"#e5e7eb", background:weekNumber===w?"#fff7f7":"#fff", color:weekNumber===w?"#ef4444":"#6b7280", fontWeight:700, fontSize:13, cursor:"pointer" }}>
                  Week {w}
                </button>
              ))}
            </div>
            <label style={labelStyle}>Week Ending Date (optional)</label>
            <input value={weekDate} onChange={e=>setWeekDate(e.target.value)} placeholder="e.g. Jun 21, 2026" style={inputStyle}/>
          </div>

          <div style={{ background:"#fff", borderRadius:10, padding:14, marginBottom:10, boxShadow:"0 1px 3px rgba(0,0,0,.06)" }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:10 }}>Add Custom Item</div>
            <div style={{ fontSize:11, color:"#9ca3af", marginBottom:8, lineHeight:1.4 }}>Custom items won't map to the workbook automatically — use CSV export for those.</div>
            {[["workbookName","Item Name (as in workbook)"],["packSize","Pack Size"],["category","Category"],["location","Location"],["unit","Unit (lb, each…)"]].map(([f,ph])=>(
              <input key={f} placeholder={ph} value={newItem[f]} onChange={e=>setNewItem(p=>({...p,[f]:e.target.value}))} style={{ ...inputStyle, marginBottom:7 }}/>
            ))}
            <button onClick={addCustomItem} style={{ width:"100%", padding:10, borderRadius:9, border:"none", background:"#ef4444", color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer" }}>+ Add Item</button>
          </div>

          <div style={{ padding:12, background:"#f9fafb", borderRadius:10, border:"1px solid #e5e7eb" }}>
            <div style={{ fontSize:11, color:"#6b7280", lineHeight:1.6 }}>
              <strong style={{ color:"#374151" }}>116 items</strong> mapped to Melty Period workbook rows. Workbook export writes directly to column Q (Ending Inv.) in the selected week sheet. All existing formulas, costs, and delivery columns are preserved.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
