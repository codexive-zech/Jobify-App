import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { StatsContainer, ChartsContainer } from "../components";

export const loader = async () => {
  const response = await customFetch.get("/jobs/statss");
  return response;
};

const Stats = () => {
  const { data } = useLoaderData();
  return (
    <>
      <StatsContainer />
      {data?.monthlyJobApp.length >= 1 && <ChartsContainer />}
    </>
  );
};

export default Stats;
