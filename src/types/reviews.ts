export type Review = {
  id: number;
  title: string;
  content: string;
  rating: number;
  author: string;
  createdAt: string;
};

export type CreateReviewDto = {
  title: string;
  content: string;
  rating: number;
  author: string;
};

export type UpdateReviewDto = Partial<CreateReviewDto>;

export type ReviewFilters = {
  author?: string;
  rating?: number | null;
  search?: string;
};

export type ReviewFormValues = {
  title: string;
  content: string;
  rating: number;
  author: string;
};
