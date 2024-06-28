import { Form, useNavigation, useOutletContext } from "react-router-dom";
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import customFetch from "../utils/customFetch";

const Profile = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
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
          <button
            type="submit"
            className=" btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
