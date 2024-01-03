//import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { observer } from "mobx-react-lite";
import { useRootStore } from "../store/root-store";
import { useNavigate } from "react-router-dom";
import { IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Editicon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';

export const ProductList = observer(() => {
  const store = useRootStore();
  const navigate = useNavigate();

  const viewProductDetails = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    navigate(`/product/${id}`);  
  };

  const deleteProduct = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    store.productService.remove(id);
    navigate('/product');
  };

  const updateProduct = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    navigate(`/product-update/${id}`);  
  };

  return (
      <div style={{ overflow: "auto", flex: "1 1 100%" }}>
              <List>
                {Object.values(store.productStore.products).map((product) => (
                        <ListItem
                            disablePadding
                            key={product.id}
                            className="product"
                          > 
                            <ListItemText primary={product.id} />
                            <ListItemText primary={product.title} />
                            <ListItemText primary={product.description} />
                            <ListItemText primary={product.stock} />
                            <ListItemText primary={product.price} />


                            <ListItemButton>
                            <IconButton
                                onClick={(e) => viewProductDetails(e, product.id!)}>
                                <VisibilityIcon />
                            </IconButton>
                          </ListItemButton>

                            <ListItemButton>
                            <IconButton
                                onClick={(e) => updateProduct(e, product.id!)}>
                                <Editicon />
                            </IconButton>
                          </ListItemButton>
                      


                          <ListItemButton>
                            <IconButton
                                onClick={(e) => deleteProduct(e, product.id!)}>
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
