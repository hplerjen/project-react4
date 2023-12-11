import {AppBar, Avatar, Box, Button, IconButton, Toolbar} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LinkIcon from "@mui/icons-material/Link";
import {useNavigate} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AccountCircle } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import joik from '../images/joik.jpg'
import avatar from '../images/avatar.jpg'
export const Appbar = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const navigateEventsCurr = () => {
    navigate("/event");
  };

  const navigateEventsPast= () => {
    navigate("/event-past");
  };

  const navigateEventNew= () => {
    navigate("/event-new");
  };

  const navigateProducts= () => {
    navigate("/product");
  };

  const navigateProductNew= () => {
    navigate("/product-new");
  };

  const navigateCart= () => {
    navigate("/shoppingcart");
  };

  const navigateUser= () => {
    navigate("/user");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }} onClick={navigateHome}>
            <HomeIcon />
          </IconButton>

          <Avatar alt="Hans-Peter Lerjen" src={avatar} />
          <Avatar alt="Joik" src={joik} />

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button data-testid="eventlistCurr" sx={{ textTransform: "none" }} color="inherit"
                    startIcon={ <LinkIcon /> }
                    onClick={navigateEventsCurr}>
              Events Upcoming
            </Button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button data-testid="eventlistCurr" sx={{ textTransform: "none" }} color="inherit"
                    startIcon={ <LinkIcon /> }
                    onClick={navigateEventsPast}>
              Events Past
            </Button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button data-testid="eventNew" sx={{ textTransform: "none" }} color="inherit"
                    startIcon={ <LinkIcon /> }
                    onClick={navigateEventNew}>
              Add new Event
            </Button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button data-testid="product" sx={{ textTransform: "none" }} color="inherit"
                    startIcon={ <LinkIcon /> }
                    onClick={navigateProducts}>
              Products
            </Button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button data-testid="product" sx={{ textTransform: "none" }} color="inherit"
                    startIcon={ <LinkIcon /> }
                    onClick={navigateProductNew}>
              Add a new Product
            </Button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button data-testid="cart" sx={{ textTransform: "none" }} color="inherit"
                    startIcon={ <ShoppingCartIcon /> }
                    onClick={navigateCart}>
              Shopping Cart
            </Button>
            <div style={{ display: "flex", alignItems: "center" }}>
            <FavoriteIcon />
          
          </div>
            <div style={{ display: "flex", alignItems: "center" }}>
            <Button data-testid="login_register" sx={{ textTransform: "none" }} color="inherit"
                    startIcon={ <AccountCircle /> }
                    onClick={navigateUser}>
            </Button>
          
          </div>
          </div>
        </Toolbar>
      </AppBar>
      </Box>
  );
};



