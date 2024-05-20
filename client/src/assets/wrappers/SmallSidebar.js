import styled from "styled-components";

const Wrapper = styled.aside`
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
  }
  .content {
    background: var(--background-secondary-color);
    padding: 4rem 2rem;
    display: flex;
    align-items: center;
    position: relative;
    flex-direction: column;
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--border-radius);
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 2rem;
    color: var(--red-dark);
    background: transparent;
    border: transparent;
    cursor: pointer;
  }

  .nav-links {
    padding-top: 2rem;
    display: grid;
  }

  .nav-links .active {
    color: var(--primary-500);
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition);
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }

  .nav-link:hover {
    color: var(--primary-500);
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
    visibility: visible;
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

export default Wrapper;
