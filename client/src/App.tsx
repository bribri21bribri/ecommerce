import { Suspense, lazy } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    useNavigate,
    useLocation,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { Button, GlobalStyle } from './styles/global';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import ProtectedRoutes from './components/ProtectedRoutes';
import OrderDetail from './pages/OrderDetail';
import 'react-datepicker/dist/react-datepicker.css';
import NotFound from './pages/NotFound';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
    selectModal,
    selectLoading,
    setModal,
} from './features/common/commonSlice';
import Loader from './components/Loader';
import Modal from './components/Modal';
import { logout } from './features/auth/authSlice';

const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Auth = lazy(() => import('./pages/Auth'));
const Cart = lazy(() => import('./pages/Cart'));
const User = lazy(() => import('./pages/User'));
const Profile = lazy(() => import('./pages/User/Profile'));
const Favorites = lazy(() => import('./pages/User/Favorites'));
const OrderHistory = lazy(() => import('./pages/User/OrderHistory'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderCompleted = lazy(() => import('./pages/OrderCompleted'));

const PageContent = styled.div`
    min-height: calc(100vh - 290px - 94px);
    /* position: relative; */
    padding-top: 7rem;
    padding-bottom: 5rem;
`;

const Layout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const loading = useAppSelector(selectLoading);
    const modal = useAppSelector(selectModal);
    const modalConfirmHandler = (errorCode?: number) => {
        if (errorCode) {
            switch (errorCode) {
                // authentication, forbidden
                case 401: {
                    if (location.pathname !== '/auth') {
                        dispatch(logout());
                        navigate('/auth');
                    }
                    break;
                }
                // not found
                case 404: {
                    navigate('/');
                    break;
                }
                // generic api error (server related) unexpected
                default: {
                    break;
                }
            }
        }
        dispatch(setModal(null));
    };
    return (
        <div className="app">
            {loading ? <Loader /> : null}
            {modal && (
                <Modal.Root>
                    <Modal.Header
                        handleClose={() => modalConfirmHandler(modal.errorCode)}
                    >
                        {modal.title}
                    </Modal.Header>
                    <Modal.Body>{modal.message}</Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => modalConfirmHandler(modal.errorCode)}
                        >
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal.Root>
            )}
            <Navbar />
            <Suspense>
                <PageContent>
                    <Outlet />
                </PageContent>
            </Suspense>
            <Footer />
        </div>
    );
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="" element={<Products />} />
                        <Route path="auth" element={<Auth />} />
                        <Route
                            path="product_detail/:id"
                            element={<ProductDetail />}
                        />
                        <Route path="cart" element={<Cart />} />
                        <Route element={<ProtectedRoutes />}>
                            <Route path="user" element={<User />}>
                                <Route
                                    // path="profile"
                                    index
                                    element={<Profile />}
                                />
                                <Route
                                    path="favorites"
                                    element={<Favorites />}
                                />
                                <Route
                                    path="orders"
                                    element={<OrderHistory />}
                                />
                                <Route
                                    path="orders/:id"
                                    element={<OrderDetail />}
                                />
                            </Route>
                            <Route path="checkout" element={<Checkout />} />
                            <Route
                                path="order_completed"
                                element={<OrderCompleted />}
                            />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
