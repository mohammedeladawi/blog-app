import React from "react";
import { Alert } from "react-bootstrap";

const DangerAlert = ({ msg }) => {
  return (
    <div className="text-center my-3">
      <Alert variant="danger">{msg}</Alert>
    </div>
  );
};

export default DangerAlert;
