import React from "react";
import useFetchData from "./useFetchData";

export interface Platform {
  id: number;
  name: string;
}

interface PlatformList {
  count: number;
  results: Platform[];
}
const useFetchPlatforms = () => {
  return useFetchData<PlatformList>("/platforms/lists/parents");
};

export default useFetchPlatforms;
