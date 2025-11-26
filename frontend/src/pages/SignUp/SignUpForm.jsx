import InputField from "components/auth/InputField";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState } from "store/slices/auth/authSlice";
import { signUpAsync } from "store/slices/auth/authThunks";
import { signUpScheme } from "validation/authValidation";

const SignUpForm = () => {
  const auth = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAuthState());
  }, [dispatch]);

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      approved: false,
    },
    validationSchema: signUpScheme,
    onSubmit: (allCreds) => {
      const regCreds = {
        username: allCreds.username,
        email: allCreds.email,
        password: allCreds.password,
      };

      dispatch(signUpAsync(regCreds));
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      {auth.error && <Alert variant="danger">{auth.error}</Alert>}
      <InputField
        label="Username"
        type="text"
        name="username"
        placeholder="Enter your username"
        formik={formik}
      />
      <InputField
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        formik={formik}
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        formik={formik}
      />
      <InputField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Enter your password confirmation"
        formik={formik}
      />
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="I have read the terms and the conditions"
          {...formik.getFieldProps("approved")}
        />
      </Form.Group>
      <Button
        className="w-100"
        variant="primary"
        type="submit"
        disabled={!formik.isValid || auth.loading}
      >
        {auth.loading ? "Loading..." : "Submit"}
      </Button>
    </Form>
  );
};

export default SignUpForm;
