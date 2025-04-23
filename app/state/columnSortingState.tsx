import { create } from "zustand";

export type Order = "asc" | "desc";

type ColumnSortingState = {
  selectedColumn: string | null;
  setSelectedColumn: (column: string | null) => void;
  selectedOrder: Order
  setSelectedOrder: (order: Order) => void;
};

export const useColumnSortingStore = create<ColumnSortingState>((set) => ({
  selectedColumn: null,
  setSelectedColumn: (column) => set({ selectedColumn: column }),
  selectedOrder: "desc",
  setSelectedOrder: (order) => set({ selectedOrder: order })
}));