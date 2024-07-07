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
        {user.avatar ? (
          <img className="img" src={user.avatar} alt="Avatar" />
        ) : (
          <FaUser />
        )}
        {/* Display profile image from the user obj or if it does not exist display a default Icon */}
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
