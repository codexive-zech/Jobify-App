import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  border-radius: var(--border-radius);
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;

  .form-title {
    margin-bottom: 4rem;
  }

  .form {
    margin: 0;
    max-width: 100%;
    width: 100%;
  }

  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
    font-weight: 700;
  }

  .text-size {
    font-size: 14px;
    font-weight: 500;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1024px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
