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
    <div className='flex items-center gap-1'>
      <CustomInput
        disabled={isFetching}
        type='date'
        min='2025-02-20'
        value={params.startDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("startDate", e.target.value)}
      />
      <span className='text-gray-400 font-medium'>-</span>
      <CustomInput
        disabled={isFetching}
        type='date'
        max={new Date()?.toISOString()?.split("T")?.[0] ?? ""}
        value={params.endDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("endDate", e.target.value)}
      />
    </div>
  );
};

export default DateSearch;
