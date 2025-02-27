"use client";

import { useEffect, useRef, useState } from "react";

import ArrowIcon from "./icons/arrow";
import useSort from "@/hooks/useSort";
import { useDataContext } from "@/context/data-context";

const CategorySlider: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const { handleSort } = useSort();
  const { data, filters } = useDataContext();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }
    return () => slider?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className='categories w-full bg-gray-50 relative p-2.5 min-h-[60px] flex items-center gap-2.5 rounded overflow-hidden'>
      {!isLoading && showLeft && (
        <button
          className='absolute left-0 z-10 bg-gray-100 bg-opacity-95 h-[84px] w-14 flex items-center justify-center shadow-[40px_0px_30px_0px_rgba(0,_0,_0,_0.05)]'
          onClick={() => scroll("left")}
        >
          <ArrowIcon className='rotate-180' />
        </button>
      )}

      <div ref={sliderRef} className='scroll-container flex gap-4 overflow-x-auto hide-scroll w-full p-2 scroll-smooth'>
        {isLoading
          ? new Array(12).fill("").map((_, index) => <div key={index} className='animate-pulse h-10 w-[120px] bg-gray-100' />)
          : data.categories.map((category, index) => (
              <button
                key={index}
                className={`flex-shrink-0 h-10 min-w-[120px] border border-gray-200 hover:bg-slate-100 flex items-center justify-center rounded text-gray-600 font-medium text-sm ${
                  filters.categories.includes(category) ? "!bg-orange-100 !border-orange-300" : ""
                }`}
                onClick={() => handleSort("category", category)}
              >
                {category}
              </button>
            ))}
      </div>

      {!isLoading && showRight && (
        <button
          className='absolute right-0 z-10 bg-gray-100 bg-opacity-95 h-[84px] w-14 flex items-center justify-center shadow-[-40px_0px_30px_0px_rgba(0,_0,_0,_0.05)]'
          onClick={() => scroll("right")}
        >
          <ArrowIcon />
        </button>
      )}
    </section>
  );
};

export default CategorySlider;
