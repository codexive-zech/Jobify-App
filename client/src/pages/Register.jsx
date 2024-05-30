import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const registerData = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", registerData);
    toast.success("Registration Successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="POST" className=" form">
        <Logo />
        <h3>Register</h3>
        <FormRow
          type="text"
          name="name"
          defaultValue="Zechariah"
          labelText="Name"
        />
        <FormRow
          type="text"
          name="lastName"
          defaultValue="Martins"
          labelText="Last Name"
        />
        <FormRow
          type="text"
          name="location"
          defaultValue="Earth"
          labelText="Location"
        />
        <FormRow
          type="email"
          name="email"
          defaultValue="zechariahmartins@gmail.com"
          labelText="Email"
        />
        <FormRow
          type="password"
          name="password"
          defaultValue="secret"
          labelText="Password"
        />
        <button
          type="submit"
          className=" btn btn-block "
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
        <p>
          Already a Member?
          <Link to={`/login`} className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
