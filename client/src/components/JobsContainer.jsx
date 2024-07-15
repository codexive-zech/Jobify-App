import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
// import PageBtnContainer from "./PageBtnContainer";
import SecondPageBtnContainer from "./SecondPageBtnContainer";
const JobsContainer = ({ data }) => {
  const { count, totalJobs, jobs } = data;

  if (count === 0) {
    return (
      <Wrapper>
        <h2>No Jobs Available To Display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h4>
        {totalJobs} Job{totalJobs > 1 && "s"} Found
      </h4>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {totalJobs > 1 && <SecondPageBtnContainer data={data} />}
    </Wrapper>
  );
};

export default JobsContainer;
