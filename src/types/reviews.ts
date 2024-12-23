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
