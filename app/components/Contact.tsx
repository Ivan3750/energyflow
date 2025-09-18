"use client";

import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted!");
  };

  return (
    <section className="contact">
      <h2 className="contact-title">
        Ви готові втілити свою ідею в життя?
      </h2>
      <p className="contact-subtitle">
        Ми обіцяємо відповісти протягом 24 годин, інакше ви отримаєте знижку 25%.
      </p>
      <p className="contact-subtitle">
        Або надішліть нам електронного листа на адресу {" "}
        <a href="mailto:hej@webhjerte.dk">energyFlow@gmail.com</a>
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-row">
          <input
            type="text"
            name="name"
            placeholder="Ім'я"
            value={formData.name}
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
        </div>

        <textarea
          name="message"
          placeholder="Розкажіть про свою ціль"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Send</button>
      </form>
    </section>
  );
}
