import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "store/slices/auth/authThunks";
import * as Yup from "yup";

const LoginForm = () => {
  const auth = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      // ========= Todo: remove initial values before production ===========
      username: "mohammed",
      password: "123456",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required().min(6),
    }),
    onSubmit: (creds) => {
      dispatch(loginAsync(creds));
    },
  });
  return (
    <Form className="border p-4 my-4" onSubmit={formik.handleSubmit}>
      {auth.error && <div className="alert alert-danger">{auth.error}</div>}
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your username"
          {...formik.getFieldProps("username")}
          isInvalid={formik.touched.username && formik.errors.username}
        />
        {formik.touched.username && formik.errors.username && (
          <Form.Text className="text-danger">
            {formik.errors.username}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...formik.getFieldProps("password")}
          isInvalid={formik.touched.password && formik.errors.password}
        />
        {formik.touched.password && formik.errors.password && (
          <Form.Text className="text-danger">
            {formik.errors.password || auth.error}
          </Form.Text>
        )}
      </Form.Group>

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
