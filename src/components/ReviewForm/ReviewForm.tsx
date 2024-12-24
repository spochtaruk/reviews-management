"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Spinner,
  Form,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { fetchReviewById } from "@/services/reviewService";
import { stars } from "@/constants";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation";
import Link from "next/link";
import { ReviewFormValues } from "@/types";

type ReviewFormProps = {
  reviewId?: number;
  onSubmit: (data: ReviewFormValues) => void;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ reviewId, onSubmit }) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      content: "",
      rating: 1,
      author: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  useEffect(() => {
    if (reviewId) {
      const loadReviewData = async () => {
        setFetchingData(true);
        try {
          const review = await fetchReviewById(reviewId);

          setValue("title", review.title);
          setValue("content", review.content);
          setValue("rating", review.rating);
          setValue("author", review.author);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          toast.error(`Failed to load review data: ${errorMessage}`);
        } finally {
          setFetchingData(false);
        }
      };

      loadReviewData();
    }
  }, [reviewId, setValue]);

  const onSubmitHandler = (data: ReviewFormValues) => {
    setLoading(true);
    onSubmit(data);
  };

  if (fetchingData) {
    return (
      <div className="flex justify-center my-4">
        <Spinner />
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input
            label="Title"
            {...field}
            required
            isInvalid={!!errors.title}
            errorMessage={errors.title ? errors.title.message : ""}
          />
        )}
      />

      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <Textarea
            label="Content"
            {...field}
            required
            isInvalid={!!errors.content}
            errorMessage={errors.content ? errors.content.message : ""}
          />
        )}
      />

      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <Select
            label="Rating"
            {...field}
            required
            isInvalid={!!errors.rating}
            errorMessage={errors.rating ? errors.rating.message : ""}
            defaultSelectedKeys={
              reviewId ? [getValues("rating").toString()] : undefined
            }
          >
            {stars.map((ratingValue) => (
              <SelectItem key={ratingValue}>
                {"★".repeat(Number(ratingValue))}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <Controller
        name="author"
        control={control}
        render={({ field }) => (
          <Input
            label="Author"
            {...field}
            required
            isInvalid={!!errors.author}
            errorMessage={errors.author ? errors.author.message : ""}
          />
        )}
      />

      <div className="flex gap-5  flex-col md:flex-row w-full">
        <Link href="/">
          <Button type="button" className="w-full md:w-52">
            Cancel
          </Button>
        </Link>
        <Button
          type="submit"
          color="primary"
          isLoading={loading}
          className="w-full md:w-52"
        >
          {reviewId ? "Save Changes" : "Add Review"}
        </Button>
      </div>
    </Form>
  );
};

export default ReviewForm;
