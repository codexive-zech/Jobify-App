import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { JobSearchContainer, JobsContainer } from "../components";

export const loader = async ({ request }) => {
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
