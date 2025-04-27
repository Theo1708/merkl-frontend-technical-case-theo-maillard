import { create } from "zustand";

type ChainFilterState = {
  selectedChain: string;
  setSelectedChain: (chain: string) => void;
};

export const useChainFilterStore = create<ChainFilterState>((set) => ({
  selectedChain: '1',
  setSelectedChain: (chain) => set({ selectedChain: chain }),
}));