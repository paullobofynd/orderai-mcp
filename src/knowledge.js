export const PLATFORMS = {
  swiggy: {
    name: "Swiggy", baseUrl: "https://www.swiggy.com", color: "#FC8019",
    services: {
      food: { label: "Food Delivery", icon: "🍽️", url: "https://www.swiggy.com", searchUrl: (q) => `https://www.swiggy.com/search?query=${encodeURIComponent(q)}`, description: "Order from 200,000+ restaurants", deliveryTime: "25-45 min" },
      instamart: { label: "Instamart – Groceries", icon: "🛒", url: "https://www.swiggy.com/instamart", searchUrl: (q) => `https://www.swiggy.com/instamart/search?query=${encodeURIComponent(q)}`, description: "10-minute grocery delivery", deliveryTime: "10-30 min" },
      genie: { label: "Swiggy Genie – Pickup & Drop", icon: "📦", url: "https://www.swiggy.com/genie", description: "Send/receive parcels, pick up from any shop", deliveryTime: "30-60 min" },
      dineout: { label: "Dineout – Table Reservations", icon: "🪑", url: "https://www.swiggy.com/dineout", searchUrl: (q) => `https://www.swiggy.com/dineout/search?query=${encodeURIComponent(q)}`, description: "Book tables with pre-dining deals", deliveryTime: "Reservation" },
      minis: { label: "Minis – Local Shops", icon: "🏪", url: "https://www.swiggy.com/minis", description: "Order from local kirana stores", deliveryTime: "20-45 min" },
    },
    subscription: { name: "Swiggy One", benefits: ["Free delivery on food & Instamart", "Extra discounts"], url: "https://www.swiggy.com/one" },
    trackOrderUrl: "https://www.swiggy.com/orders",
    supportUrl: "https://www.swiggy.com/support",
  },
  zomato: {
    name: "Zomato", baseUrl: "https://www.zomato.com", color: "#E23744",
    services: {
      food: { label: "Food Delivery", icon: "🍽️", url: "https://www.zomato.com", searchUrl: (q) => `https://www.zomato.com/search?q=${encodeURIComponent(q)}`, description: "Largest restaurant network with ratings", deliveryTime: "25-50 min" },
      dining: { label: "Dining Out", icon: "🍷", url: "https://www.zomato.com/restaurants", searchUrl: (q) => `https://www.zomato.com/restaurants?q=${encodeURIComponent(q)}`, description: "Table bookings at 5000+ restaurants", deliveryTime: "Reservation" },
      scheduled: { label: "Schedule Orders", icon: "📅", url: "https://www.zomato.com", description: "Schedule meals up to 2 days ahead", deliveryTime: "Pre-scheduled" },
      catering: { label: "Catering & Bulk Orders", icon: "🎪", url: "https://www.zomato.com/catering", description: "Bulk food for events (min 10 people)", deliveryTime: "24-48 hrs notice" },
      nightlife: { label: "Nightlife & Events", icon: "🎉", url: "https://www.zomato.com/nightlife", searchUrl: (q) => `https://www.zomato.com/nightlife?q=${encodeURIComponent(q)}`, description: "Bars, clubs, live music, events" },
    },
    subscription: { name: "Zomato Gold", benefits: ["Free unlimited deliveries", "20-40% dining discount"], url: "https://www.zomato.com/gold" },
    trackOrderUrl: "https://www.zomato.com/orders",
    supportUrl: "https://www.zomato.com/support",
  },
  blinkit: {
    name: "Blinkit", baseUrl: "https://blinkit.com", color: "#F9C22E",
    services: {
      groceries: { label: "Groceries & Staples", icon: "🥦", url: "https://blinkit.com", searchUrl: (q) => `https://blinkit.com/s/?q=${encodeURIComponent(q)}`, description: "Atta, dal, rice, oils — instant delivery", deliveryTime: "8-15 min" },
      fruits_veg: { label: "Fruits & Vegetables", icon: "🍎", url: "https://blinkit.com/cn/fruits-vegetables/cid/1487/789", searchUrl: (q) => `https://blinkit.com/s/?q=${encodeURIComponent(q)}`, description: "Fresh fruits and vegetables", deliveryTime: "8-15 min" },
      dairy: { label: "Dairy, Bread & Eggs", icon: "🥛", url: "https://blinkit.com/cn/dairy-breakfast/cid/14/1", searchUrl: (q) => `https://blinkit.com/s/?q=${encodeURIComponent(q)}`, description: "Milk, curd, butter, eggs, bread", deliveryTime: "8-15 min" },
      snacks: { label: "Snacks & Beverages", icon: "🍿", url: "https://blinkit.com/cn/snacks-and-drinks/cid/12/1", searchUrl: (q) => `https://blinkit.com/s/?q=${encodeURIComponent(q)}`, description: "Chips, biscuits, drinks", deliveryTime: "8-15 min" },
      medicines: { label: "Medicines & Healthcare", icon: "💊", url: "https://blinkit.com/cn/pharma/cid/1512/1479", searchUrl: (q) => `https://blinkit.com/s/?q=${encodeURIComponent(q)}`, description: "OTC medicines & vitamins (24/7)", deliveryTime: "8-20 min", note: "Available 24/7 in metros" },
      electronics: { label: "Electronics & Accessories", icon: "🔌", url: "https://blinkit.com/cn/electronics/cid/1483/1479", searchUrl: (q) => `https://blinkit.com/s/?q=${encodeURIComponent(q)}`, description: "Chargers, cables, earphones, power banks", deliveryTime: "8-15 min" },
      baby: { label: "Baby Care", icon: "👶", url: "https://blinkit.com/cn/baby-care/cid/1493/1479", searchUrl: (q) => `https://blinkit.com/s/?q=${encodeURIComponent(q)}`, description: "Diapers, baby food, formula, wipes", deliveryTime: "8-15 min" },
      pet: { label: "Pet Supplies", icon: "🐾", url: "https://blinkit.com/cn/pet-care/cid/1498/1479", searchUrl: (q) => `https://blinkit.com/s/?q=${encodeURIComponent(q)}`, description: "Pet food, treats, accessories", deliveryTime: "8-15 min" },
      beauty: { label: "Beauty & Personal Care", icon: "💄", url: "https://blinkit.com/cn/beauty-personal-care/cid/1490/1479", searchUrl: (q) => `https://blinkit.com/s/?q=${encodeURIComponent(q)}`, description: "Skincare, haircare, cosmetics", deliveryTime: "8-15 min" },
      homecare: { label: "Home & Cleaning", icon: "🧹", url: "https://blinkit.com/cn/home-office-essentials/cid/1488/1479", searchUrl: (q) => `https://blinkit.com/s/?q=${encodeURIComponent(q)}`, description: "Detergents, cleaning, kitchen items", deliveryTime: "8-15 min" },
      stationery: { label: "Stationery & Office", icon: "📎", url: "https://blinkit.com/cn/stationery-and-sports/cid/1499/1479", searchUrl: (q) => `https://blinkit.com/s/?q=${encodeURIComponent(q)}`, description: "Pens, notebooks, office supplies", deliveryTime: "8-15 min" },
    },
    subscription: { name: "Blinkit Pass", benefits: ["Free delivery on all orders", "Priority slots"], url: "https://blinkit.com/pass" },
    trackOrderUrl: "https://blinkit.com/orders",
    supportUrl: "https://blinkit.com/support",
  },
};

export const INTENT_ROUTING = {
  food: { keywords: ["food","eat","hungry","restaurant","pizza","burger","biryani","dinner","lunch","breakfast","meal","cuisine","snack"], platforms: ["swiggy","zomato"], tip: "Compare Swiggy & Zomato — Zomato has better reviews, Swiggy is often faster" },
  groceries: { keywords: ["grocery","groceries","vegetables","fruits","atta","dal","rice","oil","masala","milk","eggs","bread","butter","dairy","fresh","sabzi"], platforms: ["blinkit","swiggy"], primaryPlatform: "blinkit", tip: "Blinkit is fastest (8-15 min)" },
  medicines: { keywords: ["medicine","tablet","capsule","pharmacy","pharma","paracetamol","healthcare","vitamin","supplement","first aid","fever","cold","flu","headache"], platforms: ["blinkit"], urgent: true, tip: "Blinkit Pharma available 24/7 in metro cities" },
  electronics: { keywords: ["charger","cable","earphone","headphone","power bank","usb","adapter","gadget","electronics","mobile accessories"], platforms: ["blinkit"], tip: "Blinkit delivers electronics in minutes" },
  baby: { keywords: ["baby","diaper","nappy","formula","baby food","infant","toddler","baby wipes"], platforms: ["blinkit"] },
  pet: { keywords: ["pet","dog","cat","pet food","dog food","cat food","grooming","treats"], platforms: ["blinkit"] },
  beauty: { keywords: ["skincare","haircare","cosmetics","makeup","shampoo","moisturiser","sunscreen","face wash","perfume","deodorant","beauty"], platforms: ["blinkit"] },
  homecare: { keywords: ["detergent","cleaning","broom","dishwash","toilet cleaner","floor cleaner","home essentials","kitchen"], platforms: ["blinkit"] },
  dining: { keywords: ["dine","dineout","table","reservation","book table","dining","fine dining","date night","celebrate","anniversary"], platforms: ["zomato","swiggy"], primaryPlatform: "zomato", tip: "Zomato Gold gives flat discounts on dining" },
  catering: { keywords: ["catering","bulk","party food","event food","corporate","wedding","large order","office party","function"], platforms: ["zomato"], tip: "Book 24-48 hrs in advance on Zomato Catering" },
  nightlife: { keywords: ["bar","club","pub","nightlife","night out","live music","lounge","cocktails"], platforms: ["zomato"] },
  genie: { keywords: ["pickup","drop","send","parcel","courier","genie","pick up from","send to","collect from","errand"], platforms: ["swiggy"], tip: "Swiggy Genie for pickup & drop from any shop" },
  snacks: { keywords: ["chips","biscuits","chocolate","snacks","drinks","cold drink","juice","energy drink"], platforms: ["blinkit","swiggy"] },
};

export const DEALS_INFO = {
  swiggy: ["Swiggy One: Free delivery + exclusive discounts","Bank offers: 10-20% cashback with HDFC/ICICI/Axis","First order: 60% off up to ₹120","Instamart: ₹75-100 off first grocery order"],
  zomato: ["Zomato Gold: Free unlimited delivery + 20-40% dining discount","Bank offers: Up to 20% off with select cards","Schedule order discount: Save 10-15%"],
  blinkit: ["Blinkit Pass: Free delivery on all orders","First order: Flat ₹100 off","Weekend sale: 20-30% off on FMCG brands"],
  general: ["Order before peak hours (12pm & 7pm) to avoid surge","Use UPI for extra cashback","Swiggy & Zomato have city-specific weekend offers"],
};
