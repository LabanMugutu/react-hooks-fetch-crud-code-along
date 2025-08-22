// src/mocks/handlers.js
import { rest } from "msw";

// Initial data
let items = [
  { id: 1, name: "Yogurt", category: "Dairy", isInCart: false },
  { id: 2, name: "Pomegranate", category: "Fruit", isInCart: false },
  { id: 3, name: "Lettuce", category: "Vegetable", isInCart: false },
];

// Keep track of IDs for new items
let nextId = items.length + 1;

export const handlers = [
  // GET all items
  rest.get("/items", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(items));
  }),

  // POST new item
  rest.post("/items", async (req, res, ctx) => {
    const newItem = await req.json();
    // ✅ Spread newItem first, then overwrite id and isInCart
    const item = { ...newItem, id: nextId++, isInCart: false };
    items.push(item);
    return res(ctx.status(201), ctx.json(item));
  }),

  // PATCH update an item
  rest.patch("/items/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const updates = await req.json();
    items = items.map((item) =>
      item.id === parseInt(id) ? { ...item, ...updates } : item
    );
    const updatedItem = items.find((i) => i.id === parseInt(id));
    return res(ctx.status(200), ctx.json(updatedItem));
  }),

  // DELETE item
  rest.delete("/items/:id", (req, res, ctx) => {
    const { id } = req.params;
    items = items.filter((item) => item.id !== parseInt(id));
    return res(ctx.status(204));
  }),
];

// ✅ Utility to reset items between tests
export function resetData() {
  items = [
    { id: 1, name: "Yogurt", category: "Dairy", isInCart: false },
    { id: 2, name: "Pomegranate", category: "Fruit", isInCart: false },
    { id: 3, name: "Lettuce", category: "Vegetable", isInCart: false },
  ];
  nextId = items.length + 1;
}
