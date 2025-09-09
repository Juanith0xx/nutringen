import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppBubble = () => {
  const phoneNumber = "56912345678";

  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setBounce(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setBounce(false), 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
   <a
  href={`https://wa.me/${phoneNumber}`}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chatea con nosotros por WhatsApp"
  className={`
    fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50
    bg-[#25d366] hover:bg-green-600 
    text-white rounded-full shadow-md sm:shadow-lg
    transform transition duration-300 hover:scale-105 active:scale-95
    p-3 sm:p-4 md:p-5
    ${bounce ? "animate-bounce" : ""}
  `}
>
  <FaWhatsapp className="text-2xl sm:text-3xl md:text-4xl" />
</a>
  );
};

export default WhatsAppBubble;
