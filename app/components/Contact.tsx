"use client";
import { useState } from "react";
import "./Contact.css";
import { useTranslate } from "../hooks/useTranslate"; 
import { FaCheckCircle } from "react-icons/fa";

export default function Contact() {
  const { t } = useTranslate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setShowModal(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => {
      setShowModal(false);
    }, 3000);
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

  
{showModal && (
  <div
    className="contact-modal"
    onClick={() => setShowModal(false)}
  >
    <div className="contact-modal-content flex flex-col items-center gap-3">
      <FaCheckCircle className="text-gray-500 text-4xl" />
      <p className="text-gray-700 text-center text-lg">
        {t("formSuccess") || "Thanks for feedback!"}
      </p>
    </div>
  </div>
)}
    </section>
  );
}
