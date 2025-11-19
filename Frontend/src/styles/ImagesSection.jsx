import { useState } from "react";
import { motion } from "framer-motion";
import image1 from "../assets/images/event1.jpeg";
import image2 from "../assets/images/event2.png";
import image3 from "../assets/images/event3.jpeg";
import image4 from "../assets/images/event4.jpg";
import image5 from "../assets/images/event5.jpeg";
import image6 from "../assets/images/event6.jpg";
import image7 from "../assets/images/event7.jpeg";
import image8 from "../assets/images/event8.jpg";

const images = [image1, image2, image3, image4, image5, image6, image7, image8];

function CenteredCarousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => setCurrent((prev) => Math.max(prev - 1, 0));
  const nextSlide = () => setCurrent((prev) => Math.min(prev + 1, images.length - 1));

  const getPositionClass = (index) => {
    if (index === current) return "scale-110 z-10"; 
    if (index === current - 1) return "scale-95 z-5 opacity-70"; 
    if (index === current + 1) return "scale-95 z-5 opacity-70"; 
    return "scale-90 z-0 opacity-0 hidden"; 
  };

  return (
    <div className="relative w-full flex items-center justify-center gap-6 overflow-hidden h-[400px]">
      <button
        onClick={prevSlide}
        className={`absolute h-8 w-8 left-0 z-20 text-3xl font-bold  bg-gradient-to-r from-purple-400 to-pink-600 text-center rounded-[50%] flex justify-center items-center ${current === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span className="translate-y-[-3px] translate-x-[-1px] text-white">{'<'}</span>
      </button>
      <div className="flex items-center justify-center gap-6">
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            className={`rounded-lg object-cover h-[300px] w-[250px] transform border-2 border-gray-500 transition-all duration-500 ${getPositionClass(index)}`}
          />
        ))}
      </div>
      <button
        onClick={nextSlide}
        className={`absolute h-8 w-8 rounded-[50%]  flex justify-center items-center right-0 z-20 text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-600 ${current === images.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span className="translate-y-[-3px] text-white translate-x-[1px] text-black">{'>'}</span>
      </button>
    </div>
  );
}

export default CenteredCarousel;
