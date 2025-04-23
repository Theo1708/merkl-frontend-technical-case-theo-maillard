import { create } from "zustand";

type TokenFilterState = {
  selectedToken: string | null;
  setSelectedToken: (token: string | null) => void;
};

export const useTokenFilterStore = create<TokenFilterState>((set) => ({
  selectedToken: null,
  setSelectedToken: (token) => set({ selectedToken: token }),
}));