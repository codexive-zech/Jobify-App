import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.status || 500;
  const message = err.message || "Something Went Wrong";
  res.status(statusCode).json({ message });
};

export default errorHandlerMiddleware;
