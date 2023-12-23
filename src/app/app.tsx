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
import { EventDetail } from './pages/event-details';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const AppObserver = observer(() => {

  return (
    <div className="App">

<LocalizationProvider dateAdapter={AdapterDayjs}>
<CssBaseline />
<BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="event" />} />
            <Route path="event" element={<EventListTable />} />
            <Route path="event/:id" element={<EventDetail />} /> 
            <Route path="event-past" element={<EventListTable />}/>
            
            <Route path="product" element={<ProductList />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />}/>
            <Route path="user" element={<User />}/>
            
            {/* ADMIN only - FIXME needs to be guarded */}

            
            <Route path="event-new" element={<EventNew />}/>
            <Route path="event-update/:id" element={<EventUpdate />} /> 
            <Route path="product-new" element={<ProductNew />}/>
            <Route path="product-update/:id" element={<ProductUpdate />} /> 

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
