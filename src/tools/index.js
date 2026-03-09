import { PLATFORMS, INTENT_ROUTING, DEALS_INFO } from "../knowledge.js";

export const routeOrderTool = {
  name: "route_order",
  description: "Routes any order request to the best platform & service on Swiggy, Zomato, or Blinkit. Use for food, groceries, medicines, electronics, baby products, pet supplies, beauty, home essentials, pickup/drop, dining, catering, or nightlife.",
  handler: ({ query, city = "Mumbai", urgency = "normal" }) => {
    const q = query.toLowerCase();
    let matchedIntent = null, matchScore = 0;
    for (const [intent, data] of Object.entries(INTENT_ROUTING)) {
      const hits = data.keywords.filter(k => q.includes(k)).length;
      if (hits > matchScore) { matchScore = hits; matchedIntent = { intent, ...data }; }
    }
    if (!matchedIntent) matchedIntent = { intent: "food", ...INTENT_ROUTING.food };
    const recommendations = matchedIntent.platforms.map(platformKey => {
      const platform = PLATFORMS[platformKey];
      const serviceKey = Object.keys(platform.services).find(sk =>
        sk === matchedIntent.intent || (matchedIntent.intent === "food" && sk === "food") ||
        (matchedIntent.intent === "groceries" && (sk === "groceries" || sk === "instamart")) ||
        (matchedIntent.intent === "dining" && (sk === "dining" || sk === "dineout")) ||
        (matchedIntent.intent === "genie" && sk === "genie") ||
        (matchedIntent.intent === "snacks" && sk === "snacks")
      ) || Object.keys(platform.services)[0];
      const service = platform.services[serviceKey];
      const searchUrl = service.searchUrl ? service.searchUrl(query) : service.url;
      return {
        platform: platform.name, service: service.label, icon: service.icon,
        deliveryTime: service.deliveryTime, description: service.description,
        directLink: `[🔗 ${service.icon} Open ${platform.name} — ${service.label}](${searchUrl})`,
        trackLink: `[📍 Track ${platform.name} Orders](${platform.trackOrderUrl})`,
        subscription: platform.subscription ? `💳 Save with **${platform.subscription.name}**: ${platform.subscription.benefits[0]}` : null,
      };
    });
    return {
      detected_order_type: matchedIntent.intent, query_understood: query, city,
      tip: matchedIntent.tip || null,
      urgency_note: (urgency === "urgent" || matchedIntent.urgent) ? "⚡ Urgent? Blinkit delivers in 8-15 min." : "",
      recommendations,
      summary: `For "${query}": ${recommendations.map(r => `${r.icon} **${r.platform}** ${r.service} (${r.deliveryTime})`).join(" OR ")}`,
    };
  },
};

export const getPlatformServicesTool = {
  name: "get_platform_services",
  description: "Returns ALL services and order types available on Swiggy, Zomato, or Blinkit with direct links.",
  handler: ({ platform }) => {
    const targets = platform === "all" ? ["swiggy","zomato","blinkit"] : [platform];
    const result = targets.map(key => {
      const p = PLATFORMS[key];
      return {
        platform: p.name, color: p.color, subscription: p.subscription,
        services: Object.entries(p.services).map(([sk, s]) => ({
          id: sk, label: s.label, icon: s.icon, description: s.description,
          deliveryTime: s.deliveryTime, directLink: `[${s.icon} ${s.label}](${s.url})`,
          categories: s.categories || [], note: s.note || null,
        })),
        trackOrders: `[📍 Track Orders](${p.trackOrderUrl})`,
        support: `[🆘 Support](${p.supportUrl})`,
      };
    });
    return platform === "all" ? result : result[0];
  },
};

export const getDealsTool = {
  name: "get_deals",
  description: "Returns current deals, discounts and money-saving tips for Swiggy, Zomato, and/or Blinkit.",
  handler: ({ platform }) => {
    const targets = platform === "all" ? ["swiggy","zomato","blinkit"] : [platform];
    const deals = targets.map(key => ({
      platform: PLATFORMS[key].name, offers: DEALS_INFO[key],
      subscriptionOffer: PLATFORMS[key].subscription,
      checkDealsLink: `[💰 See Deals on ${PLATFORMS[key].name}](${PLATFORMS[key].baseUrl})`,
    }));
    return {
      deals: platform === "all" ? deals : deals[0],
      general_tips: DEALS_INFO.general,
      pro_tip: "Best combo: Swiggy One + Zomato Gold + Blinkit Pass = save ₹500-800/month",
    };
  },
};

export const trackOrderTool = {
  name: "track_order",
  description: "Returns direct links for tracking orders on Swiggy, Zomato, or Blinkit.",
  handler: ({ platform }) => {
    if (platform === "unknown") {
      return {
        message: "Track on all platforms:",
        platforms: ["swiggy","zomato","blinkit"].map(key => ({
          name: PLATFORMS[key].name,
          trackLink: `[📍 Track on ${PLATFORMS[key].name}](${PLATFORMS[key].trackOrderUrl})`,
          supportLink: `[🆘 ${PLATFORMS[key].name} Support](${PLATFORMS[key].supportUrl})`,
        })),
        tip: "Open the app notification from when you placed your order for direct live tracking.",
      };
    }
    const p = PLATFORMS[platform];
    return {
      platform: p.name,
      trackLink: `[📍 Track Your ${p.name} Order](${p.trackOrderUrl})`,
      supportLink: `[🆘 ${p.name} Support](${p.supportUrl})`,
      appTip: `Open the ${p.name} app → tap order icon → see live tracking`,
      cancelPolicy: "Orders can usually be cancelled within 60 seconds",
      lateOrderTip: "If order is late, tap Help in the order screen for support or refund",
    };
  },
};

export const comparePlatformsTool = {
  name: "compare_platforms",
  description: "Compares Swiggy, Zomato, and Blinkit for a specific use case.",
  handler: ({ use_case }) => {
    const uc = use_case.toLowerCase();
    const isGrocery = ["grocery","groceries","vegetable","fruits","instamart"].some(k => uc.includes(k));
    const isFood = ["food","restaurant","dinner","lunch","meal"].some(k => uc.includes(k));
    const comparisons = {
      food: { winner: "both", swiggy: { score: 9, pros: ["Faster delivery","Better in tier-2 cities","Instamart combo"], cons: [] }, zomato: { score: 9, pros: ["Better reviews","Larger network","Gold dining combo"], cons: [] }, blinkit: { score: 2, pros: [], cons: ["Not for restaurant food"] }, verdict: "Both Swiggy & Zomato are excellent for food. Choose based on your subscription." },
      groceries: { winner: "blinkit", blinkit: { score: 10, pros: ["Fastest (8-15 min)","Widest product range","24/7 medicines"], cons: ["Only in major cities"] }, swiggy: { score: 7, pros: ["Good variety","More cities","Combine with food"], cons: ["Slower (20-30 min)"] }, zomato: { score: 4, pros: [], cons: ["Routes to Blinkit anyway"] }, verdict: "Blinkit wins for groceries — fastest, widest range." },
      default: { winner: "use case specific", swiggy: { score: 8, pros: ["Food + groceries combo","Genie pickup/drop","Minis local shops"] }, zomato: { score: 9, pros: ["Best restaurant discovery","Dining out deals","Catering & events"] }, blinkit: { score: 9, pros: ["Fastest delivery","Medicines 24/7","Electronics & more"] }, verdict: "Each platform excels in different areas — use all three." },
    };
    const result = isGrocery ? comparisons.groceries : isFood ? comparisons.food : comparisons.default;
    return { use_case, comparison: result, links: { swiggy: `[🟠 Swiggy](${PLATFORMS.swiggy.baseUrl})`, zomato: `[🔴 Zomato](${PLATFORMS.zomato.baseUrl})`, blinkit: `[⚡ Blinkit](${PLATFORMS.blinkit.baseUrl})` } };
  },
};

export const getSearchLinkTool = {
  name: "get_search_link",
  description: "Generates a direct deep-link search URL for a specific item on Swiggy, Zomato, or Blinkit.",
  handler: ({ query, platform, service }) => {
    const p = PLATFORMS[platform];
    let svc = service ? p.services[service] : null;
    if (!svc) svc = Object.values(p.services).find(s => s.searchUrl) || Object.values(p.services)[0];
    const url = svc.searchUrl ? svc.searchUrl(query) : svc.url;
    return { platform: p.name, service: svc.label, query, url, directLink: `[🔍 Search "${query}" on ${p.name}](${url})`, deliveryTime: svc.deliveryTime };
  },
};
