import { useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const PageBtnContainer = () => {
  const { data } = useLoaderData();
  const { numbOfPage, currentPage, totalJobs, count } = data;
  const pages = Array.from({ length: numbOfPage }, (_, index) => {
    return index + 1;
  });

  return (
    <Wrapper>
      <button className=" btn prev-btn">
        <HiChevronDoubleLeft /> Prev
      </button>
      <div className="page-container">
        {pages.map((page) => {
          return (
            <button
              className={`btn page-btn ${
                page === currentPage ? "active" : null
              }`}
              key={page}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button className=" btn prev-btn">
        Next <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
