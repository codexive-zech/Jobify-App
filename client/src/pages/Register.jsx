import { Link } from "react-router-dom";
import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
const Register = () => {
  return (
    <Wrapper>
      <form className=" form">
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
        <button type="submit" className=" btn btn-block ">
          Submit
        </button>
        <p>
          Already a Member?
          <Link to={`/login`} className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
