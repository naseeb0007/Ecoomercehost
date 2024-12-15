import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import './App.css'; 

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className='app-container'>
      <div className='background-gradient'>
        <div className='gradient-overlay'>
          <div className='radial-gradient' />
        </div>
      </div>

      <div className='content-wrapper'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
          <Route
            path='/secret-dashboard'
            element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
          />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
          <Route
            path='/purchase-success'
            element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
          />
          <Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
