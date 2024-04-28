'use client'
import Image from "next/image";
import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const ImageSlideShow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative">
      <Image
        className="w-full h-48 md:h-[70vh] transition-all duration-600"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        width={1200}
        height={800}
      />
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white h-8 md:h-32 text-black px-3 py-1 rounded-full md:rounded-md transition-opacity duration-300 hover:shadow-md"
        onClick={goToPrevious}
      >
        <IoIosArrowBack />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white h-8 md:h-32 text-black px-3 py-1 rounded-full md:rounded-md transition-opacity duration-300 hover:shadow-md"
        onClick={goToNext}
      >
       <IoIosArrowForward />
      </button>
    </div>
  );
};

export default ImageSlideShow