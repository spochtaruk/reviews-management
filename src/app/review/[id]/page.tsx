"use client";
import { useParams, useRouter } from "next/navigation";
import { ReviewForm } from "@/components";
import { updateReview } from "@/services/reviewService";
import { toast } from "react-toastify";
import { ReviewFormValues } from "@/types";

const EditReviewPage = () => {
  const router = useRouter();
  const { id } = useParams();

  if (!id) {
    toast.error("Review with this ID does not exist");
    router.push("/");
    return;
  }

  const handleUpdateReview = async (data: ReviewFormValues) => {
    try {
      await updateReview(+id, data);
      toast.success("Review updated successfully!");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update review");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Edit Review
      </h1>
      <ReviewForm onSubmit={handleUpdateReview} reviewId={+id} />
    </div>
  );
};

export default EditReviewPage;
