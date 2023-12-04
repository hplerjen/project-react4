import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './pages/layout';
import { ProductDetail } from './components/product-detail';
import Cart from './pages/cart';
import CssBaseline from '@mui/material/CssBaseline';
import { RootStore, StoreRootProvider } from './state/root-store';
import { observer } from 'mobx-react-lite';
import { ProductList } from './pages/product-list';
import { User } from './pages/user';
import { EventListTable } from './pages/event-list-table';
import { EventUpdate } from './pages/event-update';
import { EventNew } from './pages/event-new';

const AppObserver = observer(() => {

  return (
    <div className="App">
<CssBaseline />
<BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="event" />} />
            <Route path="event" element={<EventListTable />}/>
            <Route path="event-update/:id" element={<EventUpdate />} /> 
            <Route path="event-new" element={<EventNew />}/>
            <Route path="product" element={<ProductList />}>
                <Route path=":id" element={<ProductDetail />} />
            </Route>
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
