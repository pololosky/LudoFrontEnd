import { create } from "zustand";

interface GameState {
  isMusicEnabled: boolean;
  currentScreen: "menu" | "game" | "settings" | "new-game"; // Ajout de 'new-game'
  playerCount: number;
  toggleMusic: () => void;
  setScreen: (screen: "menu" | "game" | "settings" | "new-game") => void;
  setPlayerCount: (count: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  isMusicEnabled: true,
  currentScreen: "menu",
  playerCount: 2,
  toggleMusic: () =>
    set((state) => ({ isMusicEnabled: !state.isMusicEnabled })),
  setScreen: (screen) => set({ currentScreen: screen }),
  setPlayerCount: (count) => set({ playerCount: count }),
}));
