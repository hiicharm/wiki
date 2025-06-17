"use client"
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface ImageSliderProps {
  images: string[]; // Array of image URLs
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(100);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;

    const { scrollLeft, clientWidth } = containerRef.current;
    const scrollAmount = clientWidth * 0.9;

    containerRef.current.scrollTo({
      left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`img-cont relative w-full
`}>
      {/* Arrows */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-mocha-mantle/70 hover:bg-mocha-overlay2 rounded-full p-2 shadow"
      >
        <ArrowLeft />
      </button>

      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-4 scroll-smooth scrollbar-hide py-2 px-10"
      >
        {images.map((src, index) => (

          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            className={`flex-shrink-0 rounded-lg shadow-md
  scale-${scale}`}
          />
        ))
        }
      </div >

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-mocha-mantle/70 hover:bg-mocha-overlay2 rounded-full p-2 shadow"
      >
        <ArrowRight />
      </button>

    </div >
  );
};

export default ImageSlider;
