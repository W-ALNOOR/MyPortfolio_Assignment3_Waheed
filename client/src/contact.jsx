// contact page and form

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      // Backend Contact model expects: firstname, lastname, email
      const payload = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
      };
      await axios.post("http://localhost:5000/api/contacts", payload);
      setStatus("Message submitted! Redirecting to Home...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setStatus(
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Failed to submit"
      );
    }
  };

  return (
    <div className="contact">
      <h1>Contact Me</h1>
      <p>Email: alone.33423@gmail.com</p>
      <p>Phone: +1 613-363-3864</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Send</button>
        {status && <p>{status}</p>}
         </form>
         </div>
  );
}
