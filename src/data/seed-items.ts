import type { CrudItem } from "@/types/item";

export const seedItems: CrudItem[] = [
  {
    id: "starter-1",
    title: "Plan grocery run",
    notes: "Milk, coffee, spinach, and rice.",
    createdAt: "2026-05-01T09:00:00.000Z",
    updatedAt: "2026-05-01T09:00:00.000Z"
  },
  {
    id: "starter-2",
    title: "Share project notes",
    notes: "Send the README and setup steps after the app is published.",
    createdAt: "2026-05-01T09:10:00.000Z",
    updatedAt: "2026-05-01T09:10:00.000Z"
  }
];
