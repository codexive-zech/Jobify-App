import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import StatItem from "./StatItem";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  const { data } = useLoaderData();
  const jobStats = [
    {
      title: "Pending Application",
      count: data?.defaultStat?.pending || 0,
      color: "#f59e0b",
      bcg: "#fef3c7",
      icon: <FaSuitcaseRolling />,
    },
    {
      title: "Interviews Scheduled",
      count: data?.defaultStat?.interview || 0,
      color: "#647acb",
      bcg: "#e0e8f9",
      icon: <FaCalendarCheck />,
    },
    {
      title: "Declined Jobs",
      count: data?.defaultStat?.decline || 0,
      color: "#d66a6a",
      bcg: "#ffeeee",
      icon: <FaBug />,
    },
  ];
  return (
    <Wrapper>
      {jobStats?.map((job, index) => {
        return <StatItem key={index} {...job} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
