import { Link } from "react-router-dom";
import mainImg from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className=" container page">
        <div className="info">
          <h1>
            Jobify <span>Tracking</span> Application
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
            dignissimos repellat excepturi quos voluptatum quaerat animi
            reiciendis, iusto sunt pariatur reprehenderit nisi nulla saepe,
            ullam totam odit inventore vitae! Nesciunt.
          </p>
          <Link to={`/register`} className=" btn register-link">
            Register
          </Link>
          <Link to={`/login`} className=" btn login-link">
            Login / Demo User
          </Link>
        </div>
        <img
          src={mainImg}
          alt="Jobify Landing Image"
          className="img main-img "
        />
      </div>
    </Wrapper>
  );
};

export default Landing;
