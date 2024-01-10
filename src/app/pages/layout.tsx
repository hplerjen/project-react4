import { Outlet } from "react-router-dom";

//import "./layout.css";
import { Appbar } from "./app-bar";
import { Message } from "./message";

export const Layout = () => {

  return (
    <div className="layout">
      <Appbar></Appbar>
      <Message></Message>
      <Outlet />
    </div>
  );
};
