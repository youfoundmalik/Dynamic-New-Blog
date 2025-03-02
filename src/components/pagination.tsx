import { useMemo, useCallback } from "react";
import ArrowIcon from "./icons/arrow";

interface Props {
  isLoading: boolean;
  totalPage: number;
  page: number;
  siblings?: number;
  onPageChange: (p: number) => void;
}

const sharedClass =
  "flex items-center justify-center h-7 w-7 rounded-sm leading-tight cursor-pointer bg-transparent border border-grey-200 hover:bg-grey-50";

const getClassList = (value: string | number, active: number) => {
  switch (value.toString().trim()) {
    case "...":
      return "flex items-end justify-center h-7 w-5 rounded-sm leading-tight pointer-events-none";
    case active.toString():
      return "flex items-center justify-center h-7 w-7 rounded-sm leading-tight cursor-pointer text-white bg-secondary border border-secondary hover:bg-secondary";
    default:
      return sharedClass;
  }
};

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const returnPaginationRange = (totalPage: number, page: number, siblings: number) => {
  const totalPageNoInArray = 5 + siblings;

  if (totalPageNoInArray >= totalPage) {
    return range(1, totalPage);
  }

  const leftSiblingsIndex = Math.max(page - siblings, 1);
  const rightSiblingsIndex = Math.min(page + siblings, totalPage);

  const showLeftDots = leftSiblingsIndex > 2;
  const showRightDots = rightSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    const leftItemsCount = 3 + 2 * siblings;
    const leftRange = range(1, leftItemsCount);
    return [...leftRange, "...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    const rightItemsCount = 3 + 2 * siblings;
    const rightRange = range(totalPage - rightItemsCount + 1, totalPage);
    return [1, "...", ...rightRange];
  } else {
    const middleRange = range(leftSiblingsIndex, rightSiblingsIndex);
    return [1, "...", ...middleRange, "...", totalPage];
  }
};

const PageButton = ({ value, page, isLoading, onClick }: { value: string | number; page: number; isLoading: boolean; onClick: () => void }) => (
  <li>
    <button
      onClick={onClick}
      disabled={value === "..." || isLoading}
      aria-label={`Go to page ${value}`}
      aria-current={value === page ? "page" : undefined}
      className={getClassList(value, page)}
    >
      {value}
    </button>
  </li>
);

const NavigationButton = ({
  direction,
  page,
  totalPage,
  isLoading,
  onClick,
}: {
  direction: "prev" | "next";
  page: number;
  totalPage: number;
  isLoading: boolean;
  onClick: () => void;
}) => (
  <li>
    <button
      onClick={onClick}
      disabled={direction === "prev" ? page === 1 : page === totalPage || isLoading}
      aria-label={`Go to ${direction === "prev" ? "previous" : "next"} page`}
      className={`${sharedClass} focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
        direction === "prev" ? (page === 1 ? "opacity-50" : "") : page === totalPage ? "opacity-50" : ""
      }`}
    >
      <ArrowIcon className={`w-4 h-4 ${direction === "prev" ? "rotate-180" : ""}`} aria-hidden='true' />
    </button>
  </li>
);

const Pagination = ({ totalPage, page, siblings = 2, onPageChange, isLoading }: Props) => {
  const paginationRange = useMemo(() => returnPaginationRange(totalPage, page, siblings), [totalPage, page, siblings]);

  const handlePageChange = useCallback(
    (value: number) => {
      if (value > 0 && value <= totalPage && value !== page && !isLoading) {
        onPageChange(value);
      }
    },
    [totalPage, page, onPageChange, isLoading]
  );

  if (totalPage <= 1) return null;

  return (
    <div className={`flex mt-12 gap-3 items-center justify-center mx-4 ${isLoading ? "pointer-events-none" : ""}`}>
      <nav aria-label='pagination' className='w-fit max-w-full'>
        <ul className='flex items-start -space-x-px gap-2 h-fit text-sm'>
          <NavigationButton direction='prev' page={page} totalPage={totalPage} isLoading={isLoading} onClick={() => handlePageChange(page - 1)} />
          <div className='flex items-center justify-center -space-x-px gap-2 h-fit text-sm flex-wrap' role='group'>
            {paginationRange.map((value, i) => (
              <PageButton
                key={i}
                value={value}
                page={page}
                isLoading={isLoading}
                onClick={() => typeof value === "number" && handlePageChange(value)}
              />
            ))}
          </div>
          <NavigationButton direction='next' page={page} totalPage={totalPage} isLoading={isLoading} onClick={() => handlePageChange(page + 1)} />
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
