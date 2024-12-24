"use client";
import { useRouter } from "next/navigation";
import { ReviewForm } from "@/components";
import { createReview } from "@/services/reviewService";
import { toast } from "react-toastify";
import { ReviewFormValues } from "@/types";

const NewReviewPage = () => {
  const router = useRouter();

  const handleCreateReview = async (data: ReviewFormValues) => {
    try {
      await createReview(data);
      toast.success("Review added successfully!");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create review");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Add New Review
      </h1>
      <ReviewForm onSubmit={handleCreateReview} />
    </div>
  );
};

export default NewReviewPage;
