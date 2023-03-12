import DashboardLayout from 'module/dashboard/DashboardLayout';
import OrderDetailManage from 'module/order/OrderDetailManage';
import OrderManage from 'module/order/OrderManage';
import OrderUpdate from 'module/order/OrderUpdate';
import ProductAdd from 'module/product/ProductAdd';
import ProductManage from 'module/product/ProductManage';
import ProductUpdate from 'module/product/ProductUpdate';
import UnitAddNew from 'module/unit/UnitAdd';
import UnitManage from 'module/unit/UnitManage';
import UnitUpdate from 'module/unit/UnitUpdate';
import UserManage from 'module/user/UserManage';
import UserUpdate from 'module/user/UserUpdate';
import CartPage from 'pages/CartPage';
import CheckoutPage from 'pages/CheckoutPage';
import DashboardPage from 'pages/DashboardPage';
import ForgotPasswordPage from 'pages/ForgotPasswordPage';
import OrderDetailPage from 'pages/OrderDetailPage';
import OrderPage from 'pages/OrderPage';
import PageNotFound from 'pages/PageNotFound';
import ProductDetail from 'pages/ProductDetail';
import ProductList from 'pages/ProductList';
import ProductListSearch from 'pages/ProductListSeach';
import ProfilePage from 'pages/ProfilePage';
import ChartPage from 'pages/ChartPage';
import SignOutPage from 'pages/SignOutPage';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { userRole } from 'utils/constants';
import DeliveryManage from 'module/delivery/DeliveryManage';
import DeliveryAddNew from 'module/delivery/DeliveryAdd';
import DeliveryUpdate from 'module/delivery/DeliveryUpdate';

const HomePage = lazy(() => import('pages/HomePage'));
const SignUpPage = lazy(() => import('pages/SignUpPage'));
const SignInPage = lazy(() => import('pages/SignInPage'));
const CategoryManage = lazy(() => import('module/category/CategoryManage'));
const CategoryAdd = lazy(() => import('module/category/CategoryAdd'));
const CategoryUpdate = lazy(() => import('module/category/CategoryUpdate'));

const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:id" element={<ProductList />} />
          <Route path="/product/" element={<ProductListSearch />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/sign-out" element={<SignOutPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {user?.roleId === userRole.ADMIN && (
            <Route element={<DashboardLayout />}>
              <Route path="/manage/dashboard" element={<DashboardPage />} />
              <Route path="/manage/chart" element={<ChartPage />} />
              <Route path="/manage/category" element={<CategoryManage />} />
              <Route path="/manage/add-category" element={<CategoryAdd />} />
              <Route path="/manage/update-category" element={<CategoryUpdate />} />
              <Route path="/manage/product" element={<ProductManage />} />
              <Route path="/manage/add-product" element={<ProductAdd />} />
              <Route path="/manage/update-product/:id" element={<ProductUpdate />} />
              <Route path="/manage/user" element={<UserManage />} />
              <Route path="/manage/update-user/:id" element={<UserUpdate />} />
              <Route path="/manage/order" element={<OrderManage />} />
              <Route path="/manage/update-order/:id" element={<OrderUpdate />} />
              <Route path="/manage/order/:id" element={<OrderDetailManage />} />
              <Route path="/manage/unit" element={<UnitManage />} />
              <Route path="/manage/add-unit" element={<UnitAddNew />} />
              <Route path="/manage/update-unit/:id" element={<UnitUpdate />} />
              <Route path="/manage/delivery" element={<DeliveryManage />} />
              <Route path="/manage/add-delivery" element={<DeliveryAddNew />} />
              <Route path="/manage/update-delivery/:id" element={<DeliveryUpdate />} />
            </Route>
          )}
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
