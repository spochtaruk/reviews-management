import { useState, useEffect } from "react";
import {
  fetchReviews,
  fetchAuthors,
  deleteReview,
} from "@/services/reviewService";
import { toast } from "react-toastify";
import { useReviewsStore } from "@/store/reviewsStore";
import { debounce } from "lodash";
import { Review, ReviewFilters } from "@/types";

type UseDashboardReviewsReturnType = {
  reviews: Review[];
  totalPages: number;
  filters: ReviewFilters;
  page: number;
  loading: boolean;
  authors: string[];
  searchInput: string | undefined;
  handleSearchChange: (value: string) => void;
  handleAuthorChange: (value: string) => void;
  handleRatingChange: (value: number) => void;
  handleClearFilters: () => void;
  handleDelete: (id: number) => void;
  loadAuthors: () => void;
  setPage: (page: number) => void;
};

export const useDashboardReviews = (): UseDashboardReviewsReturnType => {
  const {
    reviews,
    setReviews,
    filters,
    setFilters,
    totalPages,
    authors,
    setAuthors,
  } = useReviewsStore();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [authorsLoaded, setAuthorsLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const cleanFilters = {
        ...filters,
        rating: filters.rating ?? undefined,
      };

      const { reviews, totalPages } = await fetchReviews(
        10,
        (page - 1) * 10,
        cleanFilters
      );
      setReviews(reviews, totalPages);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(`Failed to fetch reviews: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const loadAuthors = async () => {
    if (authorsLoaded) {
      return;
    }
    try {
      const authors = await fetchAuthors();
      setAuthors(authors);
      setAuthorsLoaded(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(`Failed to load authors: ${errorMessage}`);
    }
  };

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page]);

  const handleSearchChangeDebounced = debounce((value: string) => {
    setFilters({ ...filters, search: value });
    setPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    handleSearchChangeDebounced(value);
  };

  const handleAuthorChange = (value: string) => {
    setFilters({ author: value });
    setPage(1);
  };

  const handleRatingChange = (value: number) => {
    setFilters({ rating: value });
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ author: "", rating: null, search: "" });
    setPage(1);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(id);
        setReviews(
          reviews.filter((review) => review.id !== id),
          totalPages
        );
        toast.success("Review deleted successfully!");
      } catch (error) {
        console.error("Failed to delete review", error);
        toast.error("Failed to delete review");
      }
    }
  };

  return {
    reviews,
    totalPages,
    filters,
    page,
    loading,
    authors,
    searchInput,
    setPage,
    handleSearchChange,
    handleAuthorChange,
    handleRatingChange,
    handleClearFilters,
    handleDelete,
    loadAuthors,
  };
};
