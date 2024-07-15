/* eslint-disable react-refresh/only-export-components */
import { Form, useOutletContext, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { JobStatus, JobType } from "../../../utils/constant";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const addJobData = Object.fromEntries(formData);
    try {
      await customFetch.post("/jobs", addJobData);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job Added Successfully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const AddJob = () => {
  const { user } = useOutletContext();
  return (
    <Wrapper>
      <Form method="POST" className=" form">
        <h4 className=" form-title">Add Job</h4>
        <div className=" form-center">
          <FormRow name="position" labelText="Position" required />
          <FormRow name="company" labelText="Company" required />
          <FormRow
            name="jobLocation"
            labelText="Job Location"
            required
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            defaultValue={JobStatus.PENDING}
            list={Object.values(JobStatus)}
            required
          />

          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            defaultValue={JobType.FULL_TIME}
            list={Object.values(JobType)}
            required
          />
          <SubmitBtn formData />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
