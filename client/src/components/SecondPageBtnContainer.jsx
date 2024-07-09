import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const SecondPageBtnContainer = () => {
  const { data } = useLoaderData();
  const { numbOfPage, currentPage } = data;
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  // const pages = Array.from({ length: numbOfPage }, (_, index) => {
  //   return index + 1;
  // });

  const handlePageChange = (pageNumb) => {
    const searchParams = new URLSearchParams(search); // retrieve the search query string by creating a new URLSearchParams object with it
    searchParams.set("page", pageNumb); // attach page property to the search params constructed URL
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumb, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass ? "active" : null}`}
        key={pageNumb}
        onClick={() => handlePageChange(pageNumb)}
      >
        {pageNumb}
      </button>
    );
  }; // page button to display

  const renderPageButtons = () => {
    let pageButtons = [];
    // First Page Button
    pageButtons.push(
      addPageButton({ pageNumb: 1, activeClass: currentPage === 1 })
    );

    //Dots In-between
    // if (currentPage > 3) {
    //   pageButtons.push(
    //     <span className="page-btn dots" key="dots-1">
    //       ...
    //     </span>
    //   );
    // }

    //One Button Before Current Page Button
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({ pageNumb: currentPage - 1, activeClass: false })
      );
    }

    // Current Middle Page Button
    if (currentPage !== 1 && currentPage !== numbOfPage) {
      pageButtons.push(
        addPageButton({ pageNumb: currentPage, activeClass: true })
      );
    }

    //One Button After Current Page Button
    if (currentPage !== numbOfPage && currentPage !== numbOfPage - 1) {
      pageButtons.push(
        addPageButton({ pageNumb: currentPage + 1, activeClass: false })
      );
    }

    //Dots In-between
    // if (currentPage < numbOfPage - 2) {
    //   pageButtons.push(
    //     <span className="page-btn dots" key="dots+1">
    //       ...
    //     </span>
    //   );
    // }

    //Last Page Button
    pageButtons.push(
      addPageButton({
        pageNumb: numbOfPage,
        activeClass: currentPage === numbOfPage,
      })
    );
    return pageButtons;
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
      <div className="page-container">{renderPageButtons()}</div>
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

export default SecondPageBtnContainer;
