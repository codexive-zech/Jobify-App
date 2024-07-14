import customFetch from "../utils/customFetch";
import { StatsContainer, ChartsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const { data } = await customFetch.get("/jobs/stats");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
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
