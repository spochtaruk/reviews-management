"use client";

import React from "react";
import { Card, Skeleton, Divider, Button } from "@nextui-org/react";
import Link from "next/link";
import { Review } from "@/types";

export type ReviewCardProps = {
  review: Review;
  onDelete: (id: number) => void;
  isLoaded: boolean;
};

const ReviewCard = ({ review, onDelete, isLoaded }: ReviewCardProps) => {
  const { id, author, title, content, rating, createdAt } = review;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <span
        key={idx}
        className={`${
          idx < rating ? "text-yellow-500" : "text-gray-300"
        } text-xl`}
      >
        ★
      </span>
    ));
  };

  return (
    <Card className="w-full space-y-4 p-4" radius="lg">
      <div className="flex justify-between">
        <Skeleton isLoaded={isLoaded}>
          <p className="font-semibold text-gray-600">{author}</p>
        </Skeleton>
        <Skeleton isLoaded={isLoaded}>
          <p className="text-gray-500 text-sm">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </Skeleton>
      </div>

      <div>
        <div className="flex items-center gap-2 mt-1">
          <Skeleton isLoaded={isLoaded}>
            <div className="flex">{renderStars(rating)}</div>
          </Skeleton>
          <Skeleton isLoaded={isLoaded}>
            <span className="text-sm font-medium text-gray-600">
              {rating} / 5
            </span>
          </Skeleton>
        </div>
      </div>

      <Divider />

      <Skeleton isLoaded={isLoaded} className="w-2/3">
        <h4 className="text-lg font-bold">{title}</h4>
      </Skeleton>
      <Skeleton isLoaded={isLoaded} className="w-full">
        <p className="text-gray-700">{content}</p>
      </Skeleton>

      <Divider />

      <div className="flex justify-end gap-2 mt-4">
        <Skeleton isLoaded={isLoaded}>
          <Link href={`/review/${id}`}>
            <Button size="sm" color="success">
              Edit
            </Button>
          </Link>
        </Skeleton>
        <Skeleton isLoaded={isLoaded}>
          <Button size="sm" color="danger" onPress={() => onDelete(id)}>
            Delete
          </Button>
        </Skeleton>
      </div>
    </Card>
  );
};

export default ReviewCard;
