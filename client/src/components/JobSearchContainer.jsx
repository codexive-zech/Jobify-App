import { FormRow, FormRowSelect } from ".";
import { Form, Link, useLoaderData, useSubmit } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JobSortBy, JobStatus, JobType } from "../../../utils/constant";
const JobSearchContainer = () => {
  const submit = useSubmit();
  const { searchValues } = useLoaderData();
  console.log(searchValues);
  const { search, jobStatus, jobType, sort } = searchValues;

  const debounce = (onChange) => {
    return (e) => {
      let timeOut;
      const form = e.currentTarget.form;
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className=" form">
        <h4 className=" form-title">Search Jobs</h4>
        <div className=" form-center">
          <FormRow
            type="search"
            name="search"
            labelText="Search"
            defaultValue={search ? search : "a"}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText={`Job Status`}
            name="jobStatus"
            list={["all", ...Object.values(JobStatus)]}
            defaultValue={jobStatus ? jobStatus : "all"}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText={`Job Type`}
            name="jobType"
            list={["all", ...Object.values(JobType)]}
            defaultValue={jobType ? jobType : "all"}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText={`Job Status`}
            name="sort"
            list={Object.values(JobSortBy)}
            defaultValue={sort ? sort : JobSortBy.LATEST}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <Link
            to={`/dashboard/all-jobs`}
            className=" btn form-btn delete-btn text-size"
          >
            Reset Search Value
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default JobSearchContainer;

// onChange={(e) => {
//               submit(e.currentTarget.form);
//             }}
