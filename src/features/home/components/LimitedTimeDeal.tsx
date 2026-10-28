
"use client";

import { useEffect, useRef, useState } from "react";
import type { UIEvent } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function LimitedTimeDeal() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [totalDots, setTotalDots] = useState(1);

  const totalCards = 7;

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const updateDots = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (maxScroll <= 0 || container.clientWidth <= 0) {
        setTotalDots(1);
        setActiveIndex(0);
        return;
      }

      const dots = Math.max(
        1,
        Math.ceil(container.scrollWidth / container.clientWidth)
      );

      setTotalDots(dots);

      const progress = container.scrollLeft / maxScroll;
      setActiveIndex(Math.round(progress * (dots - 1)));
    };

    updateDots();

    const resizeObserver = new ResizeObserver(updateDots);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (maxScroll <= 0 || totalDots <= 1) {
      setActiveIndex(0);
      return;
    }

    const progress = container.scrollLeft / maxScroll;
    const newIndex = Math.round(progress * (totalDots - 1));

    setActiveIndex(newIndex);
  };

  const scrollToPage = (index: number) => {
    const container = scrollRef.current;

    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;

    if (totalDots <= 1) {
      container.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    const targetScroll = (maxScroll / (totalDots - 1)) * index;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const scrollByDirection = (direction: "left" | "right") => {
    const container = scrollRef.current;

    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-[1240px] flex-col justify-center gap-8 pb-25">
      <div className="flex items-center justify-between px-4">
        <p className="text-[24px] font-bold sm:text-[32px]">
          Limited-Time Deal
        </p>

        <button
          type="button"
          onClick={() => scrollToPage(totalDots - 1)}
          className="cursor-pointer rounded-full border border-black px-4 py-2 transition-all duration-300 hover:bg-black hover:text-white sm:px-6 sm:py-3"
        >
          View All
        </button>
      </div>

      <div className="px-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Oldingi mahsulotlar"
            onClick={() => scrollByDirection("left")}
            className="shrink-0 cursor-pointer rounded-full border border-black p-3 transition-all hover:bg-black hover:text-white"
          >
            <FaChevronLeft size={16} />
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="no-scrollbar flex min-w-0 flex-1 items-center gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {Array.from({ length: totalCards }, (_, index) => (
              <div
                key={index}
                className="h-[400px] w-[272px] shrink-0 rounded-2xl bg-[#ccc]"
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Keyingi mahsulotlar"
            onClick={() => scrollByDirection("right")}
            className="shrink-0 cursor-pointer rounded-full border border-black p-3 transition-all hover:bg-black hover:text-white"
          >
            <FaChevronRight size={16} />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5">
          {Array.from({ length: totalDots }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`${index + 1}-sahifaga o'tish`}
              onClick={() => scrollToPage(index)}
              className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-black"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
