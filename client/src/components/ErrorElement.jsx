import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  return <h3>There was an Error...</h3>;
};

export default ErrorElement;
