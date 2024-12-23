import { Review, CreateReviewDto, UpdateReviewDto } from "@/types";
import { api } from "@/utils";

export const fetchReviews = async (
  take: number = 10,
  skip: number = 0,
  filters: { author?: string; rating?: number; search?: string } = {}
): Promise<{ reviews: Review[]; totalPages: number }> => {
  console.log(filters);

  const response = await api.get<{ reviews: Review[]; totalPages: number }>(
    "/reviews",
    {
      params: { take, skip, ...filters },
    }
  );
  return response.data;
};

export const fetchReviewById = async (id: number): Promise<Review> => {
  const response = await api.get<Review>(`/reviews/${id}`);
  return response.data;
};

export const createReview = async (
  createReviewDto: CreateReviewDto
): Promise<Review> => {
  const response = await api.post<Review>("/reviews", createReviewDto);
  return response.data;
};

export const updateReview = async (
  id: number,
  updateReviewDto: UpdateReviewDto
): Promise<Review> => {
  const response = await api.patch<Review>(`/reviews/${id}`, updateReviewDto);
  return response.data;
};

export const deleteReview = async (
  id: number
): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/reviews/${id}`);
  return response.data;
};

export const fetchAuthors = async (): Promise<string[]> => {
  const response = await api.get("/reviews/authors");
  return response.data;
};
