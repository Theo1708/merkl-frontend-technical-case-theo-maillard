import { create } from "zustand";

type SignInState = {
  userAddress: string | null;
  setUserAddress: (userAddress: string | null) => void;
  logOut: () => void;
};

export const useSignInStore = create<SignInState>((set) => ({
  userAddress: null,
  setUserAddress: (userAddress) => set({ userAddress: userAddress }),
  logOut: () => set({ userAddress : null})
}));