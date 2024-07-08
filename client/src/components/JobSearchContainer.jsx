import { FormRow, FormRowSelect, SubmitBtn } from ".";
import { Form, Link, useSubmit } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JobSortBy, JobStatus, JobType } from "../../../utils/constant";
const JobSearchContainer = () => {
  return (
    <Wrapper>
      <Form className=" form">
        <h4 className=" form-title">Search Jobs</h4>
        <div className=" form-center">
          <FormRow
            type="search"
            name="search"
            labelText="Search"
            defaultValue={`a`}
          />
          <FormRowSelect
            labelText={`Job Status`}
            name="jobStatus"
            list={["all", ...Object.values(JobStatus)]}
            defaultValue={`all`}
          />
          <FormRowSelect
            labelText={`Job Type`}
            name="jobType"
            list={["all", ...Object.values(JobType)]}
            defaultValue={`all`}
          />
          <FormRowSelect
            labelText={`Job Status`}
            name="sort"
            list={["all", ...Object.values(JobSortBy)]}
            defaultValue={JobSortBy.LATEST}
          />
          <Link to={`/dashboard/all-jobs`} className=" btn form-btn delete-btn">
            Reset Search Value
          </Link>
          <SubmitBtn formData />
        </div>
      </Form>
    </Wrapper>
  );
};

export default JobSearchContainer;
