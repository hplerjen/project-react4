/* eslint-disable @typescript-eslint/no-unused-vars */
//import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { observer } from "mobx-react-lite";
import { useRootStore } from "../state/root-store";
import { useNavigate } from "react-router-dom";
import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Editicon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';

export const ProductsInCart = observer(() => {
  const store = useRootStore();
  const navigate = useNavigate();

  function getOrderFromStore() {
    if (store.orderStore.currentOrder === undefined) {
      store.orderStore.initializeOrder();
    }
    return store.orderStore.currentOrder;
  }

  const viewProductDetails = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    navigate(`/product/${id}`);
  };

  const updateProductFromOrder = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    //store.orderStore.currentOrder?.productsInCart.set(id,);
    navigate('/product');
  };

  const deleteProductFromOrder = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    store.orderStore.currentOrder?.productsInCart.delete(id);
    navigate('/product');
  };

  const productInCarMap = getOrderFromStore()!.productsInCart;
  const entriesArray = [...productInCarMap.entries()];

  const entriesItems = entriesArray.map(([productId, number]) =>
    <ListItem
      disablePadding
      key={productId}
      className="product">
      <ListItemText primary={productId} />
      <ListItemText primary={store.productStore.findById(productId)!.title} />
      <ListItemText primary={number} />

      <ListItemButton>
        <IconButton
          onClick={(e) => viewProductDetails(e, productId!)}>
          <VisibilityIcon />
        </IconButton>
      </ListItemButton>

      <ListItemButton>
        <IconButton
          onClick={(e) => deleteProductFromOrder(e, productId!)}>
          <DeleteIcon />
        </IconButton>
      </ListItemButton>
    </ListItem>);


  return (
    <div style={{ overflow: "auto", flex: "1 1 100%" }}>
      {productInCarMap.size > 0 ? (
        <List>
          {entriesItems}
        </List>
      ) : (
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          Product list is empty
        </Typography>
      )}

    </div>
  );
}
)



