import { Link } from "react-router-dom";
import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
const Login = () => {
  return (
    <Wrapper>
      <form className=" form">
        <Logo />
        <h3>Login</h3>
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
        <button type="submit" className=" btn btn-block ">
          Login
        </button>
        <button type="submit" className=" btn btn-block ">
          Explore The App
        </button>
        <p>
          Do Not Have an Account Yet ?{" "}
          <Link to={`/register`} className="member-btn">
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
