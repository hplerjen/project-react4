import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProductList from './components/product-list';
import { Layout } from './components/layout';
import { EventDetail } from './components/event-detail';
import { ProductDetail } from './components/product-detail';
import ShoppingCart from './components/shopping-cart';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { EventList2 } from './components/event-list2';
import { RootStore, StoreRootProvider } from './state/root-store';
import { observer } from 'mobx-react-lite';

const AppObserver = observer(() => {

  return (
    <div className="App">
<CssBaseline />
<BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="event" />} />
            <Route path="event" element={<EventList2 />}>
                <Route path=":id" element={<EventDetail />} />
            </Route>
            <Route path="product" element={<ProductList />}>
                <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route path="shoppingcart" element={<ShoppingCart />}></Route>
          </Route>
        </Routes>
    </BrowserRouter>
    </div>
  );
});



function App({ rootStore }: { rootStore: RootStore }) {
  if (rootStore) {
    return (
      <StoreRootProvider value={rootStore}>
        <AppObserver />
      </StoreRootProvider>
    );
  }
  return <>MISSING ROOTSTORE</>;
}

export default App;
