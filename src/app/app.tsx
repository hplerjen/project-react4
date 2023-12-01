import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProductList from './pages/product-list';
import { Layout } from './pages/layout';
import { ProductDetail } from './components/product-detail';
import Cart from './pages/cart';
import CssBaseline from '@mui/material/CssBaseline';
import { EventList } from './pages/event-list';
import { RootStore, StoreRootProvider } from './state/root-store';
import { observer } from 'mobx-react-lite';
import { EventDetail } from './pages/event-detail';
import EventNew2 from './pages/event-new';
import User from './pages/user';

const AppObserver = observer(() => {

  return (
    <div className="App">
<CssBaseline />
<BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="event" />} />
            <Route path="event" element={<EventList />}>
                <Route path=":id" element={<EventDetail />} />
            </Route>
            <Route path="event-new" element={<EventNew2 />}>
            </Route>
            <Route path="product" element={<ProductList />}>
                <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route path="shoppingcart" element={<Cart />}></Route>
            <Route path="user" element={<User />}></Route>
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
