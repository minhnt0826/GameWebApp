import React from "react";
import useFetchData from "./useFetchData";

export type TagDetail = {
  id: number;
  name: string;
};

const useFetchTagDetail = (id: number) => {
  return useFetchData<TagDetail>(`/tags/${id}`);
};

export default useFetchTagDetail;
