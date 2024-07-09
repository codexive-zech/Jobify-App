/* eslint-disable react/prop-types */
import day from "dayjs";
import advanceFormat from "dayjs/plugin/advancedFormat";
day.extend(advanceFormat);
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import { Link, Form } from "react-router-dom";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";

const Job = ({
  _id,
  position,
  company,
  jobType,
  jobStatus,
  createdAt,
  jobLocation,
}) => {
  const jobAddedDate = day(createdAt).format("DD MM, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={jobAddedDate} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className="actions">
          <Link to={`/dashboard/edit-job/${_id}`} className=" btn edit-btn">
            Edit
          </Link>
          <Form method="POST" action={`/dashboard/delete-job/${_id}`}>
            <button className=" btn delete-btn" type="submit">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
