//import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { observer } from "mobx-react-lite";
import { useRootStore } from "../state/root-store";
import { useNavigate } from "react-router-dom";
import { IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Editicon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';

export const ProductListCart = observer(() => {
  const store = useRootStore();
  const navigate = useNavigate();

  const viewProductDetails = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    navigate(`/product/${id}`);  
  };

  const deleteProductFromCart = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    store.productService.remove(id);
    navigate('/product');
  };

  const updateProductFromCart = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    navigate(`/product-update/${id}`);  
  };

  return (
      <div style={{ overflow: "auto", flex: "1 1 100%" }}>
              <List>
                {Object.values(store.orderStore.currentOrder!.productsInCart).map((productId, number) => (
                        <ListItem
                            disablePadding
                            key={productId}
                            className="product"
                          > 
                            <ListItemText primary={productId} />
                            <ListItemText primary={store.productStore.findById(productId)!.title} />
                            <ListItemText primary={store.productStore.findById(productId)!.description} />
                            <ListItemText primary={number} />


                            <ListItemButton>
                            <IconButton
                                onClick={(e) => viewProductDetails(e, productId!)}>
                                <VisibilityIcon />
                            </IconButton>
                          </ListItemButton>

                            <ListItemButton>
                            <IconButton
                                onClick={(e) => updateProductFromCart(e, productId!)}>
                                <Editicon />
                            </IconButton>
                          </ListItemButton>
                      


                          <ListItemButton>
                            <IconButton
                                onClick={(e) => deleteProductFromCart(e, productId!)}>
                                <DeleteIcon />
                            </IconButton>
                          </ListItemButton>
                        </ListItem>
                      )
                )
                }
              </List>
      </div>
  );
}
)
