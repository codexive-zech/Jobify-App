import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

const links = [
  { id: 1, path: ".", text: "Add Job", icon: <FaWpforms /> },
  { id: 2, path: "all-jobs", text: "All Job", icon: <MdQueryStats /> },
  { id: 3, path: "stats", text: "Stats", icon: <IoBarChartSharp /> },
  { id: 4, path: "profile", text: "Profile", icon: <ImProfile /> },
  { id: 5, path: "admin", text: "Admin", icon: <MdAdminPanelSettings /> },
];

export default links;
