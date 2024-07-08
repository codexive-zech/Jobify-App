import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const PageBtnContainer = () => {
  const { data } = useLoaderData();
  const { numbOfPage, currentPage, totalJobs, count } = data;
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const pages = Array.from({ length: numbOfPage }, (_, index) => {
    return index + 1;
  });

  const handlePageChange = (pageNumb) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumb);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Wrapper>
      <button
        className=" btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numbOfPage;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft /> Prev
      </button>
      <div className="page-container">
        {pages.map((pageNumb) => {
          return (
            <button
              className={`btn page-btn ${
                pageNumb === currentPage ? "active" : null
              }`}
              key={pageNumb}
              onClick={() => handlePageChange(pageNumb)}
            >
              {pageNumb}
            </button>
          );
        })}
      </div>
      <button
        className=" btn prev-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numbOfPage) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        Next <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
