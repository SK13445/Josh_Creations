import { useEffect, useState } from "react";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa6";

export default function FloatingContact() {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      // Show buttons when user scrolls past 75% of the page
      if (scrollPosition >= pageHeight * 0.75) {
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
      className={`hidden md:flex fixed bottom-6 right-6 flex-col gap-3 z-50 transition-all duration-500 ${
        showButtons
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/6362168196"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 active:scale-95"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={18} />
      </a>

      {/* Phone Button */}
      <a
        href="tel:+916362168196"
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-110 active:scale-95"
        title="Call Me"
      >
        <FaPhone size={18} />
      </a>

      {/* Email Button */}
      <a
        href="mailto:skjosh102030@gmail.com"
        className="bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-gray-200 transition-transform hover:scale-110 active:scale-95"
        title="Email Me"
      >
        <FaEnvelope size={18} />
      </a>
    </div>
  );
}
