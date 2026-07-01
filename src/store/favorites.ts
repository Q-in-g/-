import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  bookIds: string[];
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clear: () => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      bookIds: [],
      toggle: (id) =>
        set((state) => ({
          bookIds: state.bookIds.includes(id)
            ? state.bookIds.filter((b) => b !== id)
            : [...state.bookIds, id],
        })),
      isFavorite: (id) => get().bookIds.includes(id),
      clear: () => set({ bookIds: [] }),
    }),
    {
      name: "shuhun:favorites",
    }
  )
);
