// Food Delivery Rider API — Cloudflare Worker (ES module)
// Routes: GET /  |  GET /riders  |  GET /riders/:id  |  GET /orders  |  POST /orders/:id/assign

const RIDERS = [
  { id: "r1", name: "Amadou", phone: "+22990000001", status: "available", lat: 6.4489, lng: 2.3556, rating: 4.8, deliveries: 132 },
  { id: "r2", name: "Fatou", phone: "+22990000002", status: "busy", lat: 6.4521, lng: 2.3612, rating: 4.6, deliveries: 98 },
  { id: "r3", name: "Koffi", phone: "+22990000003", status: "offline", lat: 6.4410, lng: 2.3490, rating: 4.9, deliveries: 210 },
];

const ORDERS = [
  { id: "o1001", riderId: "r1", status: "in_transit", total: 4500, currency: "XOF", customer: "Awa", address: "Akassato", items: 3, createdAt: "2026-11-07T10:12:00Z" },
  { id: "o1002", riderId: null, status: "pending", total: 2800, currency: "XOF", customer: "Ibrahim", address: "Calavi Centre", items: 2, createdAt: "2026-11-07T10:40:00Z" },
];

const CORS = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type,authorization",
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data, null, 2), { status, headers: CORS });

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    const parts = pathname.split("/").filter(Boolean);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

    if (pathname === "/" || pathname === "") {
      return json({ ok: true, service: "food-delivery-rider-api", version: "1.0.0", time: new Date().toISOString() });
    }

    if (parts[0] === "riders" && request.method === "GET") {
      if (parts[1]) {
        const rider = RIDERS.find((r) => r.id === parts[1]);
        return rider ? json(rider) : json({ error: "rider_not_found" }, 404);
      }
      return json({ count: RIDERS.length, riders: RIDERS });
    }

    if (parts[0] === "orders" && request.method === "GET") {
      return json({ count: ORDERS.length, orders: ORDERS });
    }

    if (parts[0] === "orders" && parts[2] === "assign" && request.method === "POST") {
      const order = ORDERS.find((o) => o.id === parts[1]);
      if (!order) return json({ error: "order_not_found" }, 404);
      const body = await request.json().catch(() => ({}));
      const rider = RIDERS.find((r) => r.id === body.riderId);
      if (!rider) return json({ error: "rider_not_found" }, 404);
      order.riderId = rider.id;
      order.status = "assigned";
      return json({ ok: true, order });
    }

    return json({ error: "not_found", path: pathname }, 404);
  },
};
