import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProductList from './components/product-list';
import { Layout } from './components/layout';
import { EventDetail } from './components/event-detail';
import { ProductDetail } from './components/product-detail';
import { EventList } from './components/event-list';
import ShoppingCart from './components/shopping-cart';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';


export function App() {
  return (
    <React.Fragment>
    <CssBaseline />
<BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="event" />} />
            <Route path="event" element={<EventList />}>
                <Route path=":id" element={<EventDetail />} />
            </Route>
            <Route path="product" element={<ProductList />}>
                <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route path="shoppingcart" element={<ShoppingCart />}></Route>
          </Route>
        </Routes>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
