/**
 * OrderAI MCP Server
 * Deploy on Railway/Render/Cloudflare Workers
 * Then add to Claude: Settings → Connectors → Add custom connector
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import http from "http";
import {
  routeOrderTool,
  getPlatformServicesTool,
  getDealsTool,
  trackOrderTool,
  comparePlatformsTool,
  getSearchLinkTool,
} from "./tools/index.js";

const server = new McpServer({
  name: "orderai-mcp",
  version: "1.0.0",
  description: "OrderAI: Smart delivery assistant for Swiggy, Zomato & Blinkit. Routes food, groceries, medicines, electronics, baby care, pet supplies, beauty, home essentials, pickup/drop, dining, catering, and nightlife.",
});

server.tool(routeOrderTool.name, routeOrderTool.description,
  { query: z.string(), city: z.string().optional(), urgency: z.enum(["urgent","normal","scheduled"]).optional() },
  async (args) => ({ content: [{ type: "text", text: JSON.stringify(routeOrderTool.handler(args), null, 2) }] })
);

server.tool(getPlatformServicesTool.name, getPlatformServicesTool.description,
  { platform: z.enum(["swiggy","zomato","blinkit","all"]) },
  async (args) => ({ content: [{ type: "text", text: JSON.stringify(getPlatformServicesTool.handler(args), null, 2) }] })
);

server.tool(getDealsTool.name, getDealsTool.description,
  { platform: z.enum(["swiggy","zomato","blinkit","all"]) },
  async (args) => ({ content: [{ type: "text", text: JSON.stringify(getDealsTool.handler(args), null, 2) }] })
);

server.tool(trackOrderTool.name, trackOrderTool.description,
  { platform: z.enum(["swiggy","zomato","blinkit","unknown"]) },
  async (args) => ({ content: [{ type: "text", text: JSON.stringify(trackOrderTool.handler(args), null, 2) }] })
);

server.tool(comparePlatformsTool.name, comparePlatformsTool.description,
  { use_case: z.string() },
  async (args) => ({ content: [{ type: "text", text: JSON.stringify(comparePlatformsTool.handler(args), null, 2) }] })
);

server.tool(getSearchLinkTool.name, getSearchLinkTool.description,
  { query: z.string(), platform: z.enum(["swiggy","zomato","blinkit"]), service: z.string().optional() },
  async (args) => ({ content: [{ type: "text", text: JSON.stringify(getSearchLinkTool.handler(args), null, 2) }] })
);

const PORT = process.env.PORT || 3000;
const httpServer = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Mcp-Session-Id");
  res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");

  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  if (req.method === "HEAD" && req.url === "/") {
    res.setHeader("MCP-Protocol-Version", "2025-06-18");
    res.writeHead(200); res.end(); return;
  }

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", server: "orderai-mcp", version: "1.0.0" })); return;
  }

  if (req.url === "/") {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => `orderai-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    });
    res.on("close", () => transport.close());
    await transport.handleRequest(req, res);
    await server.connect(transport);
    return;
  }

  res.writeHead(404); res.end("Not found");
});

httpServer.listen(PORT, () => {
  console.log(`OrderAI MCP Server running on port ${PORT}`);
  console.log(`MCP endpoint: http://localhost:${PORT}/`);
});

export default httpServer;
