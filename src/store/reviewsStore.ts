import { Review } from "@/types";
import { create } from "zustand";

type ReviewsState = {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  filters: { author: string; rating: number | null; search: string };
  setFilters: (filters: Partial<ReviewsState["filters"]>) => void;
};

export const useReviewsStore = create<ReviewsState>((set) => ({
  reviews: [],
  setReviews: (reviews) => set({ reviews }),
  filters: { author: "", rating: null, search: "" },
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
}));
