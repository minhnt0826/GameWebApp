import React from "react";
import useFetchData from "./useFetchData";

export type PublisherDetail = {
  id: number;
  name: string;
  description: string;
};

const useFetchPublisherDetail = (id: number) => {
  return useFetchData<PublisherDetail>(`/publishers/${id}`);
};

export default useFetchPublisherDetail;
