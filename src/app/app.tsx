import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './pages/layout';
import { ProductDetail } from './pages/productRbuy';
import Cart from './pages/cart';
import CssBaseline from '@mui/material/CssBaseline';
import { RootStore, StoreRootProvider } from './state/root-store';
import { observer } from 'mobx-react-lite';
import { User } from './pages/user_XX';
import { ProductList } from './pages/product-list';
import { ProductNew } from './pages/productC';
import { ProductUpdate } from './pages/productRU';
import { EventR } from './pages/event-r';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { EventList } from './pages/event-list';
import { EventCRU } from './pages/event-cu';
import { Orders } from './pages/orders';

const AppObserver = observer(() => {

  return (
    <div className="App">

<LocalizationProvider dateAdapter={AdapterDayjs}>
<CssBaseline />
<BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="event" />} />
            <Route path="event" element={<EventList future={true} />} />
            <Route path="event/:id" element={<EventR />} /> 
            <Route path="event-past" element={<EventList future={false}/>}/>
            
            <Route path="product" element={<ProductList />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />}/>
            <Route path="user" element={<User />}/>
            
            {/* ADMIN only - FIXME needs to be guarded */}

            
            <Route path="event-new" element={<EventCRU />}/>
            <Route path="event-update/:id" element={<EventCRU />} /> 
            
            <Route path="order" element={<Orders />} /> 
            
            <Route path="product-new" element={<ProductNew />}/>
            <Route path="product-update/:id" element={<ProductUpdate />}/> 
          </Route>
        </Routes>
    </BrowserRouter>
    </LocalizationProvider>
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
