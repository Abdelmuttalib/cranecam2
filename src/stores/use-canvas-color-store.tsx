import { create } from "zustand";

type CanvasColorStore = {
  color: string;
  changeColor: (color: string) => void;
};

export const DEFAULT_CANVAS_COLOR = "#18181b";

export const CANVAS_COLORS = [
  "#18181b",
  "#f8f8f8",
  "#696969",
  "#000000",
  // "#ff0000",
  // "#800000",
  // "#ffff00",
  "#808000",
  // "#00ff00",
  "#008000",
  // "#00ffff",
  "#008080",
  // "#0000ff",
  "#000080",
  // "#ff00ff",
  "#800080",
  "#808080",
  // "#ffffff",
];

export const useCanvasColorStore = create<CanvasColorStore>((set) => ({
  color: DEFAULT_CANVAS_COLOR,
  changeColor: (color: string) => set({ color }),
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
}));
