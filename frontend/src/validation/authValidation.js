import * as Yup from "yup";

export const signUpScheme = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(6),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "passwords must be matched"),
  approved: Yup.boolean().oneOf([true]),
});

export const loginScheme = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().min(6),
});
