import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LinkIcon from "@mui/icons-material/Link";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
//import FavoriteIcon from '@mui/icons-material/Favorite';
import joik from '../../assets/images/joik.jpg'
import avatar from '../../assets/images/avatar.jpg'
import { useRootStore } from "../state/root-store";
import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import { MiniCart } from "./mini-cart";
import { LetterAvatar } from "../components/letter-avatar";

export const Appbar = observer(() => {
  const store = useRootStore();
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const navigateEventsCurr = () => {
    navigate("/event");
  };

  const navigateEventsPast = () => {
    navigate("/event-past");
  };

  //admin only
  const navigateEventNew = () => {
    navigate("/event-new")
    //window.location.reload();
  };

  const navigateProducts = () => {
    navigate("/product");
  };

  //admin only 
  const navigateProductNew = () => {
    navigate("/product-new");
  };

  //admin only
  const navigateOrders = () => {
    navigate("/order");
  };

  const navigateUser = () => {
    navigate("/user");
  };

  function loginStartIcon(): ReactElement {
    if (store.authStore.isConnected) {
      if (store.authStore.currentUser?.email === "hplerjen@gmx.net") {
        return <Avatar alt="Hans-Peter Lerjen" src={avatar} />
      } else if (store.authStore.currentUser?.isAdmin) {
        return <Avatar alt="Joik" src={joik} />
      } else if (store.authStore.currentUser?.displayName) {
        return <LetterAvatar displayName={store.authStore.currentUser?.displayName} />
      }
      else {
        return <AccountCircle />
      }
    } else {
      return <AccountCircle />
    }
  }

  return (
    <Box sx={{flexGrow: 1}}>

      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

          <IconButton size="large" edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }} onClick={navigateHome}>
            <HomeIcon />
          </IconButton>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button data-testid="eventlistCurr" sx={{ textTransform: "none" }} color="inherit"
              startIcon={<LinkIcon />}
              onClick={navigateEventsCurr}>
              Events Upcoming
            </Button>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button data-testid="eventlistPast" sx={{ textTransform: "none" }} color="inherit"
              startIcon={<LinkIcon />}
              onClick={navigateEventsPast}>
              Events Past
            </Button>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button data-testid="eventNew" sx={{ textTransform: "none" }} color="inherit"
              startIcon={<LinkIcon />}
              onClick={navigateEventNew}>
              Add new Event (admin only)
            </Button>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button data-testid="products" sx={{ textTransform: "none" }} color="inherit"
              startIcon={<LinkIcon />}
              onClick={navigateProducts}>
              Products
            </Button>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button data-testid="productNew" sx={{ textTransform: "none" }} color="inherit"
              startIcon={<LinkIcon />}
              onClick={navigateProductNew}>
              Add a new Product (admin only)
            </Button>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button data-testid="orders" sx={{ textTransform: "none" }} color="inherit"
              startIcon={<LinkIcon />}
              onClick={navigateOrders}>
              Orders (admin only)
            </Button>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <MiniCart />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>


            <Button data-testid="login-name" sx={{ textTransform: "none" }} color="inherit"
              startIcon={
                loginStartIcon()
              }
              onClick={navigateUser}>
              {store.authStore.displayName}
            </Button>


          </div>

        </Toolbar>
      </AppBar>
    </Box >
  );
}
)




