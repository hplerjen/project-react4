import {Link, Outlet} from "react-router-dom";

import "./layout.css";
import { Appbar } from "./app-bar";

export const Layout = () => {
  
  return (
    <div className="layout">
      <Appbar></Appbar>
      <Outlet />
    </div>
  );
};
