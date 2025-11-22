import { Form } from "react-bootstrap";

const InputField = ({ label, type, name, placeholder, formik, ...props }) => {
  const isInvalid = formik.touched[name] && !!formik.errors[name];

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        {...formik.getFieldProps(name)}
        isInvalid={isInvalid}
        {...props}
      />
      {isInvalid && (
        <Form.Text className="text-danger">{formik.errors[name]}</Form.Text>
      )}
    </Form.Group>
  );
};

export default InputField;
