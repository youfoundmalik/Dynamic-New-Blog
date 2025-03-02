import { useDataContext } from "@/context/data-context";
import useFetchArticles from "@/hooks/useNews";
import React, { ChangeEvent, useState, useEffect } from "react";
import CustomInput from "./shared/input";

const DateSearch = () => {
  const { params, setParams } = useDataContext();
  const { fetchArticles, isFetching } = useFetchArticles();
  const [mounted, setMounted] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];

  // Initialize with default values
  const [dates, setDates] = useState({
    startDate: params.startDate || "2025-02-20",
    endDate: params.endDate || currentDate,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update local state when params change
  useEffect(() => {
    setDates({
      startDate: params.startDate || "2025-02-20",
      endDate: params.endDate || currentDate,
    });
  }, [params, currentDate]);

  if (!mounted) {
    return (
      <div className='flex items-center gap-1 flex-grow md:flex-grow-0'>
        <CustomInput disabled={true} type='date' value={dates.startDate} className='basis-1/2 md:basis-auto' />
        <span className='text-gray-400 font-medium'>-</span>
        <CustomInput disabled={true} type='date' value={dates.endDate} className='basis-1/2 md:basis-auto' />
      </div>
    );
  }

  const handleChange = async (key: "startDate" | "endDate", value: string) => {
    const newDates = { ...dates, [key]: value };
    setDates(newDates);
    const payload = { ...params, ...newDates };
    setParams(payload);
    await fetchArticles(payload);
  };

  return (
    <div className='flex items-center gap-1 flex-grow md:flex-grow-0'>
      <CustomInput
        disabled={isFetching}
        type='date'
        min='2025-02-20'
        max={dates.endDate}
        value={dates.startDate}
        className='basis-1/2 md:basis-auto'
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("startDate", e.target.value)}
      />
      <span className='text-gray-400 font-medium'>-</span>
      <CustomInput
        disabled={isFetching}
        type='date'
        min={dates.startDate}
        max={currentDate}
        value={dates.endDate}
        className='basis-1/2 md:basis-auto'
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("endDate", e.target.value)}
      />
    </div>
  );
};

export default DateSearch;
