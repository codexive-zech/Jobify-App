import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    visibility: hidden;
    width: 100%;
    box-shadow: var(--shadow-2);
    text-align: center;
    border-radius: var(--border-radius);
    background: var(--primary-500);
  }

  .show-dropdown {
    visibility: visible;
  }

  .dropdown-btn {
    border: transparent;
    background: transparent;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    color: var(--white);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`;

export default Wrapper;
