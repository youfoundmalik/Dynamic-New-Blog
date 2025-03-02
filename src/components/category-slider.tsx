"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";

import ArrowIcon from "./icons/arrow";
import useSort from "@/hooks/useSort";
import { useDataContext } from "@/context/data-context";

// Extracted CategoryButton component for better performance
const CategoryButton = memo(({ category, isSelected, onClick }: { category: string; isSelected: boolean; onClick: () => void }) => (
  <button
    className={`flex-shrink-0 h-8 md:h-10 min-w-[100px] md:min-w-[120px] px-2.5 border border-gray-200 hover:bg-slate-100 flex items-center justify-center rounded text-sm md:text-base text-gray-600 font-medium ${
      isSelected ? "!bg-cyan-100 !border-cyan-300" : ""
    }`}
    onClick={onClick}
    aria-pressed={isSelected}
    aria-label={`Filter by ${category}`}
  >
    {category}
  </button>
));

CategoryButton.displayName = "CategoryButton";

const CategorySlider: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const { handleSort } = useSort();
  const { data, filters } = useDataContext();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft < scrollWidth - clientWidth);
    }
  }, []);

  // Memoized scroll function
  const scroll = useCallback((direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, []);

  // Memoized key handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        scroll("left");
      } else if (e.key === "ArrowRight") {
        scroll("right");
      }
    },
    [scroll]
  );

  // Memoized category click handler
  const handleCategoryClick = useCallback(
    (category: string) => {
      const payload = filters.categories.includes(category)
        ? filters.categories.filter((cat) => cat !== category)
        : [...filters.categories, category];
      handleSort("categories", payload);
    },
    [filters.categories, handleSort]
  );

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      slider?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    handleScroll();
  }, [data, handleScroll]);

  return (
    <section
      className='categories w-full bg-gray-50 relative px-2.5 h-[50px] md:h-[60px] flex items-center gap-1.5 md:gap-2.5 rounded overflow-hidden'
      aria-label='Category filters'
    >
      {!isLoading && showLeft && (
        <button
          className='absolute left-0 z-10 bg-gray-100 bg-opacity-95 h-[84px] w-10 md:w-14 flex items-center justify-center'
          onClick={() => scroll("left")}
          aria-label='Scroll categories left'
        >
          <ArrowIcon className='rotate-180' aria-hidden='true' />
        </button>
      )}

      <div
        ref={sliderRef}
        className='scroll-container flex gap-4 overflow-x-auto hide-scroll w-full scroll-smooth'
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label='Category list'
      >
        {isLoading
          ? Array.from({ length: 12 }, (_, index) => <div key={index} className='animate-pulse h-8 md:h-10 w-[100px] md:w-[120px] bg-gray-100' />)
          : data.categories.map((category) => (
              <CategoryButton
                key={category}
                category={category}
                isSelected={filters.categories.includes(category)}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
      </div>

      {!isLoading && showRight && (
        <button
          className='absolute right-0 z-10 bg-gray-100 bg-opacity-95 h-[84px] w-10 md:w-14 flex items-center justify-center shadow-[-40px_0px_30px_0px_rgba(0,_0,_0,_0.05)]'
          onClick={() => scroll("right")}
          aria-label='Scroll categories right'
        >
          <ArrowIcon aria-hidden='true' />
        </button>
      )}
    </section>
  );
};

export default CategorySlider;
