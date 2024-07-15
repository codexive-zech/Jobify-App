import customFetch from "../utils/customFetch";
import { JobSearchContainer, JobsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";

const allJobsQuery = (params) => {
  const { search, jobType, jobStatus, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", { params });
      console.log(data, "data");
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    /*
  Explain!
  new URL(request.url): This creates a new URL object by passing the request.url to the URL constructor. 

.searchParams: The searchParams property of the URL object gives you access to the query parameters in the URL. 

.entries(): The entries() method of searchParams returns an iterator containing arrays of key-value pairs for each query parameter.

The spread operator ... is used to convert the iterator obtained from searchParams.entries() into an array.

Object.fromEntries(): This static method creates an object from an array of key-value pairs.

Putting it all together, the code retrieves the URL from the request.url property, extracts the search parameters using the searchParams property, converts them into an array of key-value pairs using entries(), and finally uses Object.fromEntries() to create an object with the parameter names as keys and their corresponding values.
  */

    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: { ...params } };
  };

const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allJobsQuery(searchValues));
  return (
    <>
      <JobSearchContainer />
      <JobsContainer data={data} />
    </>
  );
};

export default AllJobs;
