import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  username: Yup.string().required("Please enter a valid username"),
  password: Yup.string()
    .required("Please enter a valid password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
});

export const loginValidationSchema = Yup.object({
  username: Yup.string().required("Please enter a valid username"),
  password: Yup.string().required("Please enter a valid password"),
});
