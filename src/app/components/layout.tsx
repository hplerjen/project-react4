import {Link, Outlet} from "react-router-dom";

import "./layout.css";
import ButtonAppBar from "./button-app-bar";

export const Layout = () => {
  
  return (
    <div className="layout">
      <ButtonAppBar></ButtonAppBar>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/event">Events</Link></li>
          <li><Link to="/product">Products</Link></li>
          <li><Link to="/shoppingcart">Shopping Cart</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};
