import React, { useState, useEffect } from 'react';
import { Check, Send, Globe } from 'lucide-react';
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser';

import conectarImg from './assets/connect.png';
import colaborarImg from './assets/collab.png'; 
import crearImg from './assets/create.png'; 
//import compartirImg from './assets/share.png';

const App = () => {
  const [language, setLanguage] = useState('es');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });


  useEffect(() => {
    
    const handleScrollToSection = (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        if (element) {
          const offset = 80; 
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    
    document.addEventListener('click', handleScrollToSection);
    
    
    return () => {
      document.removeEventListener('click', handleScrollToSection);
    };
  }, []);


  const translations = {
    en: {
      heroTitle: "Create Music Together, Anywhere in the World",
      heroSubtitle: "HoloJam connects musicians globally to collaborate, share, and create unforgettable music.",
      features: [
        "Connect with musicians worldwide",
        "Collaborate on asynchronous projects",
        "Share your music with a global community",
        "Discover new talent and opportunities"
      ],
      whyHoloJam: "Why HoloJam?",
      howItWorks: [
        {
          title: "Connect",
          description: "Find and connect with musicians who share your passion and musical style.",
          imageUrl: conectarImg
        },
        {
          title: "Collaborate",
          description: "Work together on projects with real-time collaboration tools and version control.",
          imageUrl: colaborarImg
        },
        {
          title: "Create",
          description: "Use our integrated tools to compose, record, and produce music together.",
          imageUrl: crearImg
        },
        {
          title: "Share",
          description: "Publish your collaborative works and reach a global audience of music lovers.",
          imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
        }
      ],
      contactUs: "Get Started Today",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      placeholderName: "Your name",
      placeholderEmail: "your@email.com",
      placeholderMessage: "Tell us about your musical journey..."
    },
    es: {
      heroTitle: "Creemos música juntos, en cualquier parte del mundo.",
      heroSubtitle: "HoloJam conecta músicos globalmente para colaborar, compartir y crear música inolvidable.",
      features: [
        "Conéctate con músicos de todo el mundo",
        "Colabora en proyectos de forma asincrónica",
        "Comparte tu música con una comunidad global",
        "Descubre nuevo talento y oportunidades"
      ],
      whyHoloJam: "¿Por qué HoloJam?",
howItWorks: [
  {
        title: "Conectar",
        description: "Encuentra y conéctate con músicos que comparten tu pasión y estilo musical.",
        imageUrl: conectarImg 
      },
      {
        title: "Colaborar",
        description: "Trabaja en proyectos con herramientas de colaboración de forma asincrónica y control de versiones.",
        imageUrl: colaborarImg 
      },
      {
        title: "Crear",
        description: "Utiliza nuestras herramientas integradas para componer, grabar y producir música juntos.",
        imageUrl: crearImg 
      },
  {
    title: "Compartir",
    description: "Publica tus obras colaborativas y llega a una audiencia global de amantes de la música.",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
  }
],
      contactUs: "Comienza Hoy",
      name: "Nombre",
      email: "Correo Electrónico",
      message: "Mensaje",
      send: "Enviar Mensaje",
      placeholderName: "Tu nombre",
      placeholderEmail: "tu@email.com",
      placeholderMessage: "Cuéntanos sobre tu viaje musical..."
    }
  };

  const t = translations[language];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  };


    emailjs.init({
        publicKey: publicKey,
        limitRate: {
            id: 'app', 
            throttle: 10000, 
        },
    });


  emailjs
    .send(serviceID, templateID, templateParams) 
    .then(() => {
      alert(
        language === 'en'
          ? 'Thank you for your message! We will contact you soon.'
          : '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.'
      );
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      alert(
        language === 'en'
          ? 'Something went wrong. Please try again later.'
          : 'Algo salió mal. Por favor intenta más tarde.'
      );
    });
};

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <div className="min-h-screen bg-[#FCF9DF] font-sans">
      {/* NAV */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#FBC658] rounded-full flex items-center justify-center">
                <img src="src/assets/logo.png" alt="logo" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800">HoloJam</span>
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#FF4B33] to-[#FF8117] text-white rounded-full hover:bg-[#e8b447] transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'ES' : 'EN'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Seccion home */}

<section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0D0D0D] text-white">
  {/* fondo */}
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute -inset-[200px] bg-[radial-gradient(circle_at_center,_rgba(251,198,88,0.25)_0%,_transparent_60%)] blur-3xl"
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        repeat: Infinity,
        duration: 15,
        ease: "linear",
      }}
    />
    <motion.div
      className="absolute -inset-[150px] bg-[conic-gradient(from_180deg_at_50%_50%,_#FCF9DF,_#FBC658,_#FCF9DF,_#FBC658)] opacity-30 blur-2xl"
      animate={{
        rotate: [360, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 40,
        ease: "linear",
      }}
    />
  </div>

  <div className="relative max-w-7xl mx-auto">
    <div className="flex flex-col lg:flex-row items-center gap-12">
      
      {/* Ganchito piola */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-[#FF4B33] via-[#FF8117] to-[#FFFFFF] bg-clip-text text-transparent"
        >
          {t.heroTitle}
        </motion.h1>

        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          {t.heroSubtitle}
        </p>

        <div className="max-w-2xl mx-auto lg:mx-0 mb-8">
          <div className="space-y-4">
            {t.features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-[#FF4B33] to-[#FF8117] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-200 text-lg">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center lg:text-left">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF4B33] to-[#FF8117] text-white font-semibold rounded-full hover:opacity-90 transition-opacity text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t.contactUs}
            <Send className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* fondo animado */}
      <motion.div 
        className="lg:w-1/2 flex justify-center relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative group">
          <motion.img
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80"
            alt="HoloJam Music Collaboration"
            className="rounded-2xl shadow-2xl w-full max-w-lg h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent"></div>

          {/* borde de la foto */}
          <motion.div
            className="absolute inset-0 rounded-2xl border border-[#FBC658]/40"
            animate={{
              boxShadow: [
                "0 0 15px rgba(251,198,88,0.4)",
                "0 0 25px rgba(62,148,255,0.5)",
                "0 0 15px rgba(251,198,88,0.4)",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* Por que harmonia */}
<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
        {t.whyHoloJam}
      </h2>
      <div className="w-24 h-1 bg-[#FBC658] mx-auto"></div>
    </div>

    {/* Contenedor que gira */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {t.howItWorks.map((card, index) => (
        <div
          key={index}
          className="group h-80 [perspective:1000px]" // 3d
        >
          {/* El elemento que gira */}
          <div
            className="relative h-full w-full rounded-2xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
          >
            {/* Cara Frontal */}
            <div className="absolute inset-0 [backface-visibility:hidden]">
              <img src={card.imageUrl} alt={card.title} className="h-full w-full rounded-2xl object-cover" />
              <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-end p-6">
                <h3 className="text-white text-2xl font-bold">{card.title}</h3>
              </div>
            </div>
            
            {/* Cara Trasera */}
            <div
              className="absolute inset-0 rounded-2xl bg-[#FCF9DF] p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]"
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-gray-700 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Contacto seccion*/}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FCF9DF]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                {t.contactUs}
              </h2>
              <p className="text-gray-600">
                {language === 'en'
                  ? "Join our community of musicians today"
                  : "Únete a nuestra comunidad de músicos hoy"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBC658] focus:border-transparent outline-none transition"
                  placeholder={t.placeholderName}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBC658] focus:border-transparent outline-none transition"
                  placeholder={t.placeholderEmail}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBC658] focus:border-transparent outline-none transition resize-none"
                  placeholder={t.placeholderMessage}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FF4B33] to-[#FF8117] text-white font-semibold py-4 rounded-lg hover:bg-[#e8b447] transition-colors text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
              >
                {t.send}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-[#FBC658] rounded-full flex items-center justify-center">
              <img className = "h-8 w-8" src="src/assets/logo.png" alt="logo" />
            </div>
            
            <span className="ml-2 text-xl font-bold">HoloJam</span>
          </div>
          <p className="text-gray-400">
            {language === 'en'
              ? "Connecting musicians worldwide since 2025"
              : "Conectando músicos en todo el mundo desde 2025"}
          </p>
        </div>
      </footer>
    </div>
  );
};
export default App;