//import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { observer } from "mobx-react-lite";
import { useRootStore } from "../state/root-store";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Editicon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from "react";

export const ProductList = observer(() => {
  const store = useRootStore();
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [id, setId] = React.useState("");
  
  const viewProductDetails = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    navigate(`/product/${id}`);  
  };

  const deleteConfirmDialog = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    setId(id);
    setOpenDeleteDialog (true);
  };

  const deleteProduct = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    store.productService.remove(id);
    navigate('/product');
  };

  const navigateBackAfterCancelProductDeletion = () => {
    setOpenDeleteDialog (false);
    navigate("/product");
  };

  const updateProduct = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    navigate(`/product-update/${id}`);  
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
      <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
      }}>
                {Object.values(store.productStore.products).map((product) => (
                        <Card key={product.id} className="card" sx={{ maxWidth: 345 }}>
                        <CardContent>
                          <Typography className="cardTitle">
                            {product.title} 
                          </Typography>
                        <Typography className="textField" >
                            {product.stock} 
                        </Typography>
                        <Typography className="textField" >
                            {product.price} 
                        </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            alt=""
                            height="140"
                            image = ""
                         />
                         <CardActions>
              <IconButton     onClick={(e) => viewProductDetails(e, product.id!)}>
                <VisibilityIcon />
              </IconButton>

              <IconButton onClick={(e) => updateProduct(e, product.id!)}>
                admin
                <Editicon />
              </IconButton>
              
              <IconButton onClick={(e) => deleteConfirmDialog(e, product.id!)}>
                admin
                <DeleteIcon />
              </IconButton>
          </CardActions>
                        </Card>
                ))}
       
      </Box>
      </div>

<Dialog
open={openDeleteDialog}
onClose={(e) => navigateBackAfterCancelProductDeletion()}
>
<DialogTitle>Delete Product</DialogTitle>
<DialogContent>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
    }}
  >
                    <Typography className="cardTitle">
                    sure to delete this product?
                </Typography>

    <Button aria-label="Delete"
      onClick={(e) => { deleteProduct(e, id);}}>
      Delete
    </Button>
    <Button onClick={(e) => navigateBackAfterCancelProductDeletion()}>
          Cancel
    </Button>
  </div>
</DialogContent>
</Dialog>
</>
  );
}
)
