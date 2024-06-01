import { useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
const JobsContainer = () => {
  const data = useLoaderData();
  if (data.count === 0) {
    return (
      <Wrapper>
        <h2>No Job Available To Display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {data?.jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
