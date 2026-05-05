import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import HeaderPages from './components/HeaderPages'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import HomePage from './features/catalog/HomePage'
import CatalogPage from './features/catalog/CatalogPage'
import ProductDetailPage from './features/catalog/ProductDetailPage'

import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'

import CartPage from './features/cart/CartPage'
import OrdersPage from './features/orders/OrdersPage'
import ProfilePage from './features/profile/ProfilePage'
import AdminPage from './features/admin/AdminPage'

export default function App() {
  const location = useLocation()
  // Auth pages utilisent un layout en split-screen sans header/footer classiques
  const isAuthRoute = ['/login', '/register'].includes(location.pathname)
  const isHome = location.pathname === '/'
  if (isAuthRoute) {
    return (
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className="app" >
    {isHome ? <Header /> : <HeaderPages />}

      
      <main >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />

          <Route path="/cart" element={
            <ProtectedRoute><CartPage /></ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute><OrdersPage /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><ProfilePage /></ProtectedRoute>
          } />
          <Route path="/admin" element={<AdminPage />} />

          {/* 404 */}
          <Route path="*" element={
            <div className="page">
              <div className="container">
                <div className="empty">
                  <h3>Page introuvable</h3>
                  <p>L'adresse demandée n'existe pas.</p>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
