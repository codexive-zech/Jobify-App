import { Form, useOutletContext } from "react-router-dom";
import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const imageFile = formData.get("avatar"); // getting the file based on the avatar property from the form.
  if (imageFile && imageFile.size > 500000) {
    toast.error("Image Size is Too Large");
    return null;
  } // checking if the avatar field via image-file exist and the size is bigger than 5MB
  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Profile Updated Successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="POST" className="form" encType="multipart/form-data">
        <h3 className="form-title">Profile</h3>
        <div className="form-center">
          {/* Image File */}
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an Image File (max 0.5 MB)
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          {/* End of Image File */}
          <FormRow
            type="text"
            name="name"
            defaultValue={user.name}
            labelText="Name"
          />
          <FormRow
            type="text"
            name="lastName"
            defaultValue={user.lastName}
            labelText="Last Name"
          />
          <FormRow
            type="email"
            name="email"
            defaultValue={user.email}
            labelText="Email"
          />
          <FormRow
            type="text"
            name="location"
            defaultValue={user.location}
            labelText="Location"
          />
          <SubmitBtn formData />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
