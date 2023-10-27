import React from "react";
import useFetchData from "./useFetchData";

export type DeveloperDetail = {
  id: number;
  name: string;
  description: string;
};

const useFetchDeveloperDetail = (id: number) => {
  return useFetchData<DeveloperDetail>(`/developers/${id}`);
};

export default useFetchDeveloperDetail;
