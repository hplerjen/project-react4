import {AppBar, Button, IconButton, Toolbar} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LinkIcon from "@mui/icons-material/Link";
import {useNavigate} from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const navigateEvents= () => {
    navigate("/event");
  };

  const navigateProducts= () => {
    navigate("/product");
  };

  const navigateCart= () => {
    navigate("/shoppingcart");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }} onClick={navigateHome}>
            <HomeIcon />
          </IconButton>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button data-testid="event" sx={{ textTransform: "none" }} color="inherit"
                    startIcon={ <LinkIcon /> }
                    onClick={navigateEvents}>
              Events
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
            <Button data-testid="cart" sx={{ textTransform: "none" }} color="inherit"
                    startIcon={ <LinkIcon /> }
                    onClick={navigateCart}>
              Shopping Cart
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      </div>
  );
};



