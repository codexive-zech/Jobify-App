/* eslint-disable react/prop-types */
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import StatItem from "./StatItem";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = ({ defaultStat }) => {
  const jobStats = [
    {
      title: "Pending Application",
      count: defaultStat?.pending || 0,
      color: "#f59e0b",
      bcg: "#fef3c7",
      icon: <FaSuitcaseRolling />,
    },
    {
      title: "Interviews Scheduled",
      count: defaultStat?.interview || 0,
      color: "#647acb",
      bcg: "#e0e8f9",
      icon: <FaCalendarCheck />,
    },
    {
      title: "Declined Jobs",
      count: defaultStat?.decline || 0,
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
