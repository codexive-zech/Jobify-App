import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { StatsContainer, ChartsContainer } from "../components";

export const loader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response;
  } catch (error) {
    return error;
  }
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
