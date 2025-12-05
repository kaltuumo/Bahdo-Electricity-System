import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="layout flex">
      <Sidebar />
      <div className="content flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
