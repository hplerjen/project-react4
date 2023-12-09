import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './pages/layout';
import { ProductDetail } from './pages/product-detail';
import Cart from './pages/cart';
import CssBaseline from '@mui/material/CssBaseline';
import { RootStore, StoreRootProvider } from './state/root-store';
import { observer } from 'mobx-react-lite';
import { User } from './pages/user';
import { EventListTable } from './pages/event-list-table';
import { EventUpdate } from './pages/event-update';
import { EventNew } from './pages/event-new';
import { ProductList } from './pages/product-list';
import { ProductNew } from './pages/product-new';
import { ProductUpdate } from './pages/product-update';

const AppObserver = observer(() => {

  return (
    <div className="App">
<CssBaseline />
<BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="event-curr" />} />
            <Route path="event-curr" element={<EventListTable />}/>
            <Route path="event-past" element={<EventListTable />}/>
            <Route path="event-update/:id" element={<EventUpdate />} /> 
            <Route path="event-new" element={<EventNew />}/>
            <Route path="product" element={<ProductList />}>
                <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route path="product-new" element={<ProductNew />}/>
            <Route path="product-update/:id" element={<ProductUpdate />} /> 
            <Route path="shoppingcart" element={<Cart />}/>
            <Route path="user" element={<User />}/>
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
