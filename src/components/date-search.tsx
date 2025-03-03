import { useDataContext } from "@/context/data-context";
import React, { ChangeEvent, useCallback, useMemo } from "react";
import CustomInput from "./shared/input";

type DateKey = "startDate" | "endDate";

const DateSearch = () => {
  const { params, setParams, fetchData: fetchArticles, isLoading: isFetching } = useDataContext();

  const currentDate = useMemo(() => new Date().toISOString().split("T")[0], []);
  const DEFAULT_START_DATE = "2025-02-20";
  const dates = useMemo(
    () => ({
      startDate: params.startDate || DEFAULT_START_DATE,
      endDate: params.endDate || currentDate,
    }),
    [params.startDate, params.endDate, currentDate]
  );

  const handleChange = useCallback(
    async (key: DateKey, value: string) => {
      const payload = { ...params, [key]: value };
      setParams(payload);
      await fetchArticles(payload);
    },
    [params, setParams, fetchArticles]
  );

  const renderDateInput = useCallback(
    (key: DateKey, min: string, max: string) => (
      <CustomInput
        disabled={isFetching}
        type='date'
        min={min}
        max={max}
        value={dates[key]}
        className='w-full md:w-fit'
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(key, e.target.value)}
      />
    ),
    [dates, isFetching, handleChange]
  );

  return (
    <div className='flex items-center gap-1 flex-grow md:flex-grow-0'>
      {renderDateInput("startDate", DEFAULT_START_DATE, dates.endDate)}
      <span className='text-gray-400 font-medium'>-</span>
      {renderDateInput("endDate", dates.startDate, currentDate)}
    </div>
  );
};

export default React.memo(DateSearch);
