import { create } from "zustand";

type ChainFilterState = {
  selectedChain: string | null;
  setSelectedChain: (chain: string | null) => void;
};

export const useChainFilterStore = create<ChainFilterState>((set) => ({
  selectedChain: '1',
  setSelectedChain: (chain) => set({ selectedChain: chain }),
}));