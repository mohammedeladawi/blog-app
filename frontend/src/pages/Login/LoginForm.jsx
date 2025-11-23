import InputField from "components/common/InputField";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState, resetState } from "store/slices/auth/authSlice";
import { loginAsync } from "store/slices/auth/authThunks";
import { loginScheme } from "validation/authValidation";

const LoginForm = () => {
  const auth = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAuthState());
  }, [dispatch]);

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      // ========= Todo: remove initial values before production ===========
      username: "mohammed",
      password: "123456",
    },
    validationSchema: loginScheme,
    onSubmit: (creds) => {
      dispatch(loginAsync(creds));
    },
  });
  return (
    <Form
      style={{ maxWidth: "400px" }}
      className="border p-4 my-4 mx-auto"
      onSubmit={formik.handleSubmit}
    >
      {auth.error && <Alert variant="danger">{auth.error}</Alert>}
      <InputField
        label="Username"
        type="text"
        name="username"
        placeholder="Enter your username"
        formik={formik}
      />
      <InputField
        label="Password"
        type="text"
        name="password"
        placeholder="Enter your password"
        formik={formik}
      />
      <Button
        className="w-100"
        variant="primary"
        type="submit"
        disabled={auth.loading || !formik.isValid}
      >
        {auth.loading ? "Loading..." : "Submit"}
      </Button>
    </Form>
  );
};

export default LoginForm;
