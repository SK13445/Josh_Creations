import { useEffect, useState } from "react";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa6";

export default function FloatingContact() {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      // Show after 60% on mobile (pages are shorter)
      const threshold = window.innerWidth < 768 ? 0.6 : 0.75;

      if (scrollPosition >= pageHeight * threshold) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex fixed bottom-4 right-4 md:bottom-6 md:right-6 flex-col gap-3 z-50 transition-all duration-500 ${
        showButtons
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      {/* WhatsApp */}
      <a
        href="https://wa.me/6362168196"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-3 md:p-4 rounded-full shadow-lg 
                   hover:bg-green-600 transition-transform hover:scale-110 active:scale-95"
      >
        <FaWhatsapp size={20} />
      </a>

      {/* Phone */}
      <a
        href="tel:+916362168196"
        className="bg-blue-600 text-white p-3 md:p-4 rounded-full shadow-lg 
                   hover:bg-blue-700 transition-transform hover:scale-110 active:scale-95"
      >
        <FaPhone size={18} />
      </a>

      {/* Email */}
      <a
        href="mailto:skjosh102030@gmail.com"
        className="bg-white text-blue-600 p-3 md:p-4 rounded-full shadow-lg 
                   hover:bg-gray-200 transition-transform hover:scale-110 active:scale-95"
      >
        <FaEnvelope size={18} />
      </a>
    </div>
  );
}
