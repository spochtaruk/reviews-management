import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(30, "Title cannot exceed 30 characters"),
  content: Yup.string()
    .required("Content is required")
    .min(30, "Content must be at least 30 characters")
    .max(150, "Content cannot exceed 150 characters"),
  rating: Yup.number().required("Rating is required"),
  author: Yup.string()
    .required("Author is required")
    .min(1, "Author cannot be empty"),
});
