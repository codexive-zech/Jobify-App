import styled from "styled-components";

const Wrapper = styled.button`
  background: transparent;
  border: transparent;
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 1.5rem;
  padding: 0 0.5rem;
  cursor: pointer;
  .toggle-icon {
    font-size: 1.15rem;
    color: var(--text-color);
  }
`;
export default Wrapper;
