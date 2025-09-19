"use client";
import { useState } from "react";
import "./Contact.css";
import { useTranslate } from "../hooks/useTranslate"; 

export default function Contact() {
  const { t } = useTranslate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted!");
  };

  return (
    <section className="contact">
      <h2 className="contact-title">{t("contactTitle")}</h2>
      <p className="contact-subtitle">{t("contactSubtitle1")}</p>
      <p className="contact-subtitle">
        {t("contactSubtitle2")}{" "}
        <a href="mailto:energyFlow@gmail.com">energyFlow@gmail.com</a>
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-row">
          <input
            type="text"
            name="name"
            placeholder={t("contactName")}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t("contactEmail")}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name="message"
          placeholder={t("contactMessage")}
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">{t("contactSubmit")}</button>
      </form>
    </section>
  );
}
