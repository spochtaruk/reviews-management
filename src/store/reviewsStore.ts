import { Review, ReviewFilters } from "@/types";
import { create } from "zustand";

type ReviewsState = {
  reviews: Review[];
  totalPages: number;
  setReviews: (reviews: Review[], totalPages: number) => void;
  filters: ReviewFilters;
  setFilters: (newFilters: Partial<ReviewFilters>) => void;
  authors: string[];
  setAuthors: (authors: string[]) => void;
};

export const useReviewsStore = create<ReviewsState>((set) => ({
  reviews: [],
  totalPages: 1,
  setReviews: (reviews, totalPages) => set({ reviews, totalPages }),
  filters: { author: "", rating: null, search: "" },
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  authors: [],
  setAuthors: (authors) => set({ authors }),
}));
