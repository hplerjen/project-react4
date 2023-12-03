//import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { observer } from "mobx-react-lite";
//import { useRootStore } from "../state/root-store";
//import { useNavigate } from "react-router-dom";

export const ProductList = observer(() => {
  //const store = useRootStore();
  //const navigate = useNavigate();

  const products = [ 
    { id: 1, title: 'DEH1', description: 'CD' },
    { id: 2, title: 'DEH2', description: 'CD' },
    { id: 3, title: 'Wimme Saari', description: 'CD' }] ;
  
  const productList = products.map(product => {
  return <li>id: {product.id}, title: {product.title}, description: {product.description}</li>});
  
  return (
    <div className='container'>
      <h1>Welcome to ProductList!</h1>
      <ul> {productList}</ul>
    </div>
  );
}
)
