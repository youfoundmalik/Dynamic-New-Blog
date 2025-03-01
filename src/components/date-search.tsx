import { useDataContext } from "@/context/data-context";
import useFetchArticles from "@/hooks/useNews";
import React, { ChangeEvent } from "react";
import CustomInput from "./shared/input";

const DateSearch = () => {
  const { params, setParams } = useDataContext();
  const { fetchArticles, isFetching } = useFetchArticles();

  const handleChange = async (key: "startDate" | "endDate", value: string) => {
    const payload = { ...params, [key]: value };
    setParams(payload);
    await fetchArticles(payload);
  };

  return (
    <div className='flex items-center gap-1 flex-grow md:flex-grow-0'>
      <CustomInput
        disabled={isFetching}
        type='date'
        min='2025-02-20'
        max={params.endDate ?? new Date()?.toISOString()?.split("T")?.[0] ?? ""}
        value={params.startDate}
        className='basis-1/2 md:basis-auto'
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("startDate", e.target.value)}
      />
      <span className='text-gray-400 font-medium'>-</span>
      <CustomInput
        disabled={isFetching}
        type='date'
        min={params.startDate ?? "2025-02-20"}
        max={new Date()?.toISOString()?.split("T")?.[0] ?? ""}
        value={params.endDate}
        className='basis-1/2 md:basis-auto'
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("endDate", e.target.value)}
      />
    </div>
  );
};

export default DateSearch;
