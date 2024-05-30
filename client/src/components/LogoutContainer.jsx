import { useState } from "react";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { useDashboardContext } from "../pages/DashboardLayout";
import { FaCaretDown, FaUser } from "react-icons/fa";

const LogoutContainer = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout, user } = useDashboardContext();
  const showDropdownOption = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <Wrapper>
      <button
        type="button"
        className=" btn logout-btn"
        onClick={showDropdownOption}
      >
        <FaUser />
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={`dropdown ${showDropdown && "show-dropdown"}`}>
        <button type="button" className="dropdown-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;
