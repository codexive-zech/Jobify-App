/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useDashboardContext } from "../pages/DashboardLayout";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className=" nav-links">
      {links.map((link) => {
        const { id, text, path, icon } = link;
        if (path === "admin" && user.role !== "admin") return;
        return (
          <NavLink
            to={path}
            key={id}
            className="nav-link"
            onClick={!isBigSidebar && toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
