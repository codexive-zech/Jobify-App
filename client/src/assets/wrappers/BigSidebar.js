import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0 0 1px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      min-height: 100vh;
      height: 100%;
      background: var(--background-secondary-color);
      width: 250px;
      margin-left: -250px;
      transition: margin-left 0.3s ease-in-out;
    }

    .show-sidebar {
      margin-left: 0;
      transition: margin-left 0.3s ease-in-out;
    }

    .content {
      position: sticky;
      top: 0;
    }

    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding: 2.5rem;
    }

    .nav-links {
      padding-top: 2rem;
      display: grid;
      place-items: center;
    }

    .nav-link {
      display: flex;
      align-items: center;
      color: var(--text-secondary-color);
      padding: 1rem 0;
      text-transform: capitalize;
      transition: padding 0.3s ease-in-out;
    }

    .nav-link:hover {
      padding-left: 2rem;
      color: var(--primary-500);
      transition: var(--transition);
    }

    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
    }

    .active {
      color: var(--primary-500);
    }

    .pending {
      background: var(--background-color);
      width: 100%;
      margin: 0 auto;
    }
  }
`;
export default Wrapper;
