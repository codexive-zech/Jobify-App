import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { FormRow, FormRowSelect } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { JobStatus, JobType } from "../../../utils/constant";
import Wrapper from "../assets/wrappers/DashboardFormPage";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/all-jobs");
  }
};

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const updatedData = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${params.id}`, updatedData);
    toast.success("Job Edited Successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const EditJob = () => {
  const data = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  console.log(data?.job);
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <h4 className=" form-title">Edit Job</h4>
        <div className=" form-center">
          <FormRow
            name="position"
            labelText="Position"
            defaultValue={data?.job?.position}
            required
          />
          <FormRow
            name="company"
            labelText="Company"
            defaultValue={data?.job?.company}
            required
          />
          <FormRow
            name="jobLocation"
            labelText="Job Location"
            required
            defaultValue={data?.job?.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            defaultValue={data?.job?.JobStatus}
            list={JobStatus}
            required
          />

          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            defaultValue={data?.job?.JobType}
            list={JobType}
            required
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Edit Job"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
