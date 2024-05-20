import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import notFoundImage from "../assets/images/not-found.svg";
const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={notFoundImage} alt=" Not Found" />
          <h3>Opps! Page Not Found</h3>
          <p>We can not seem to find the page you are looking for </p>
          <Link to={`/dashboard`}>Back Home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <>
      <h3>Error Page</h3>
      <Link to={`/`}>Back Home</Link>
    </>
  );
};

export default Error;
