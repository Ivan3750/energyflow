"use client"; 
import { useState } from "react"; 
import "./Contact.css";

export default function Contact()
 { const [formData, setFormData] = useState({ name: "", email: "", message: "", });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
  { setFormData({ ...formData, [e.target.name]: e.target.value }); 
  }; const handleSubmit = (e: React.FormEvent) => { e.preventDefault();
   console.log(formData); 
   alert("Form submitted!");
    }; return ( <section className="contact">
         <h2 className="contact-title"> Хочете покращити своє тіло?</h2> 
         <p className="contact-subtitle"> Наша команда на зв'язку 24/7 </p>
          <p className="contact-subtitle"> Надішліть нам електронного листа на адресу {" "}
             <a href="mailto:hej@webhjerte.dk">energyFlow@gmail.com</a> </p>
              <form className="contact-form" onSubmit={handleSubmit}>
                 <div className="contact-row"> <input type="text" name="name" placeholder="Ім'я" 
                 value={formData.name} onChange={handleChange} required />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /> 
                  </div> <textarea name="message" placeholder="Розкажіть про свою ціль" value={formData.message}
                   onChange={handleChange} required ></textarea> 
                   <button type="submit">Відправити</button> 
</form> 
</section> );
 }