import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Went Wrong";
  res.status(status).json({ message });
};

export default errorHandlerMiddleware;
