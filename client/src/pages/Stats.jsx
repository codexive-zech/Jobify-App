import customFetch from "../utils/customFetch";
import { StatsContainer, ChartsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";

const statsQuery = {
  queryKey: ["stats"], // query name [query unique identifier]
  queryFn: async () => {
    const { data } = await customFetch.get("/jobs/stats");
    return data;
  }, // query function [query to execute when it is triggered]
};

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery); // retrieving cached data available
  return data;
};

const Stats = () => {
  const { data } = useQuery(statsQuery);
  const { monthlyJobApp, defaultStat } = data;
  return (
    <>
      <StatsContainer defaultStat={defaultStat} />
      {monthlyJobApp.length > 1 && <ChartsContainer data={monthlyJobApp} />}
    </>
  );
};

export default Stats;
