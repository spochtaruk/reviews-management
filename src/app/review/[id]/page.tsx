"use client";
import { useParams, useRouter } from "next/navigation";
import { ReviewForm } from "@/components";
import { createReview } from "@/services/reviewService";
import { toast } from "react-toastify";
import { ReviewFormValues } from "@/types";

const EditReviewPage = () => {
  const router = useRouter();
  const { id } = useParams();

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

  if (!id) {
    toast.error("Review with this ID does not exist");
    router.push("/");
    return;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Edit Review
      </h1>
      <ReviewForm onSubmit={handleCreateReview} reviewId={+id} />
    </div>
  );
};

export default EditReviewPage;
