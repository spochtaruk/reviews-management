"use client";
import React from "react";
import Link from "next/link";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useDashboardReviews } from "@/hooks";
import { stars } from "@/constants";

const FiltersSection = () => {
  const {
    filters,
    authors,
    handleSearchChange,
    handleAuthorChange,
    handleRatingChange,
    handleClearFilters,
    loadAuthors,
  } = useDashboardReviews();

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="w-full">
        <Input
          placeholder="Search by title"
          onChange={(e) => handleSearchChange(e.target.value)}
          type="search"
          value={filters.search}
          className="w-full"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[150px] md:w-1/3">
          <Select
            placeholder="Filter by author"
            onOpenChange={loadAuthors}
            onChange={(event) => handleAuthorChange(event.target.value)}
            value={filters.author || ""}
          >
            {authors.map((author) => (
              <SelectItem key={author} value={author}>
                {author}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex-1 min-w-[150px] md:w-1/3">
          <Select
            placeholder="Filter by rating"
            onChange={(event) => handleRatingChange(+event.target.value)}
            value={filters.rating?.toString() || ""}
          >
            {stars.map((star) => (
              <SelectItem key={star} value={star}>
                {star}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[150px] md:w-auto">
          <Button onPress={handleClearFilters} className="w-full md:w-auto">
            Clear Filters
          </Button>
        </div>

        <div className="flex-1 min-w-[150px] md:w-auto">
          <Link href="/review/new">
            <Button className="w-full md:w-auto" color="primary">
              Add Review
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
