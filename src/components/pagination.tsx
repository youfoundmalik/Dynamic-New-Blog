import ArrowIcon from "./icons/arrow";

interface Props {
  isLoading: boolean;
  totalPage: number;
  page: number;
  siblings?: number;
  onPageChange: (p: number) => void;
}

const Pagination = ({ totalPage, page, siblings = 2, onPageChange, isLoading }: Props) => {
  const arr = returnPaginationRange(totalPage, page, siblings);

  const onChange = (value: number) => {
    if (value > 0 && value <= totalPage && value !== page) {
      onPageChange(value);
    }
  };

  return (
    <div className={`flex mt-12 gap-3 items-center justify-center mx-4 ${isLoading ? "pointer-events-none" : ""}`}>
      <nav aria-label='pagination' className='w-fit max-w-full'>
        <ul className='flex items-start -space-x-px gap-2 h-fit text-sm'>
          <li>
            <span onClick={() => onChange(page - 1)} className={`${sharedClass} ${page === 1 ? "pointer-events-none opacity-50" : ""}`}>
              <span className='sr-only'>Previous</span>
              <ArrowIcon className='rotate-180 w-4 h-4' />
            </span>
          </li>
          <div className='flex items-center justify-center -space-x-px gap-2 h-fit text-sm flex-wrap'>
            {arr.map((value, i) => (
              <li key={i}>
                <span onClick={() => onChange(Number(value))} className={getClassList(value, page)}>
                  {value}
                </span>
              </li>
            ))}
          </div>
          <li>
            <span onClick={() => onChange(page + 1)} className={`${sharedClass} ${page === totalPage ? "pointer-events-none opacity-50" : ""}`}>
              <span className='sr-only'>Next</span>
              <ArrowIcon className='w-4 h-4' />
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;

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
