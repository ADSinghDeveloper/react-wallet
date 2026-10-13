import { useState } from "react";
import { Form } from "react-bootstrap";
import { Eye, EyeSlash } from 'react-bootstrap-icons';

export default function Input({id, type, value, label, hint, error, children, ...props}) {
  const [ showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(prevState => !prevState);


  return (
    <Form.Group className="mb-2 form-floating" controlId={id}>
      <Form.Control
          type={type === "password" && showPassword ? 'text' : type}
        {...props}
      />
      <Form.Label>{label}</Form.Label>
      {type === "password" && value && <button
        type="button"
        className="show-password"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Hide Password" : "Show Password"}
      >
        {showPassword ? <EyeSlash /> : <Eye />}
      </button>}
      {hint && <Form.Text className="text-muted">{hint}</Form.Text>}
      { error && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  );
}
