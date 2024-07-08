import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { JobSearchContainer, JobsContainer } from "../components";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/jobs", { params });
    return { data, searchValues: { ...params } };
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
  );
};

export default AllJobs;
