"use client";

import { Pagination } from "@nextui-org/react";
import { ReviewCard, FiltersSection } from "@/components";
import { useDashboardReviews } from "@/hooks";

const Dashboard = () => {
  const { reviews, totalPages, loading, setPage, handleDelete } =
    useDashboardReviews();

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <FiltersSection />

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onDelete={handleDelete}
            isLoaded={!loading}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          total={totalPages}
          initialPage={1}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
