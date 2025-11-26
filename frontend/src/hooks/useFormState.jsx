import { useState } from "react";

const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleValueChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return {
    formData,
    setFormData,
    handleChange,
    handleValueChange,
  };
};

export default useFormState;
