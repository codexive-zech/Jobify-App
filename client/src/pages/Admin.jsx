import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";
import { StatItem } from "../components";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/stats");
    return response.data;
  } catch (error) {
    toast.error("You Are Not Authorized To View This Page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { jobs, users } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title={`Current User`}
        count={users}
        color={`#e9b949`}
        bcg={`#fcefc7`}
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title={`Total Jobs`}
        count={jobs}
        color={`#647acb`}
        bcg={`#e0e0f9`}
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
