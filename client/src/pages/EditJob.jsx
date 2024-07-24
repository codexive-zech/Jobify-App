/* eslint-disable react-refresh/only-export-components */

import { Form, redirect, useLoaderData } from "react-router-dom";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { JobStatus, JobType } from "../../../utils/constant";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useQuery } from "@tanstack/react-query";

const editJobQuery = (id) => {
  return {
    queryKey: ["editJob", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(editJobQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return redirect("/dashboard/all-jobs");
    }
  };

export const action =
  (queryClient) =>
  async (
    { params, request } // params to get the id to make request to and request to retrieve the formData()
  ) => {
    const formData = await request.formData();
    const updatedData = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/jobs/${params.id}`, updatedData);
      queryClient.invalidateQueries(["jobs"]); // clear the cached [jobs] data/queries that are available
      toast.success("Job Edited Successfully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const { data } = useQuery(editJobQuery(id));

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
            list={Object.values(JobStatus)}
            required
          />

          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            defaultValue={data?.job?.JobType}
            list={Object.values(JobType)}
            required
          />
          <SubmitBtn formData />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
