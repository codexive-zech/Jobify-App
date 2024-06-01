import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { JobSearchContainer, JobsContainer } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AllJobs = () => {
  return (
    <>
      <JobSearchContainer />
      <JobsContainer />
    </>
    // </AllJobsContext.Provider>
  );
};

export default AllJobs;
