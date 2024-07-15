/* eslint-disable react-refresh/only-export-components */

import {
  Link,
  Form,
  useNavigation,
  redirect,
  useNavigate,
} from "react-router-dom";
import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const loginData = Object.fromEntries(formData);
    try {
      await customFetch.post("/auth/login", loginData);
      queryClient.invalidateQueries();
      toast.success("Login Successful");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };
const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Login Test Account Successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Wrapper>
      <Form method="POST" className=" form">
        <Logo />
        <h3>Login</h3>
        <FormRow
          type="email"
          name="email"
          placeholder="youremail@gmail.com"
          labelText="Email"
        />
        <FormRow
          type="password"
          name="password"
          placeholder="Password"
          labelText="Password"
        />
        <button
          type="submit"
          className=" btn btn-block "
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
        <button
          type="submit"
          className=" btn btn-block "
          onClick={loginDemoUser}
        >
          Explore The App
        </button>
        <p>
          Do Not Have an Account Yet ?{" "}
          <Link to={`/register`} className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
