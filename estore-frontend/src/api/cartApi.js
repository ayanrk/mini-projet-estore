import api from './axios'

export const cartApi = {
  getCart: (userId) => api.get(`/cart/${userId}`).then(r => r.data),
  addToCart: (userId, productId, quantity) =>
    api.post(`/cart/add?quantity=${quantity}`, { userId, productId }).then(r => r.data),
  updateQuantity: (itemId, quantity) =>
    api.put(`/cart/update/${itemId}?quantity=${quantity}`).then(r => r.data),
  removeItem: (itemId) => api.delete(`/cart/remove/${itemId}`),
  clearCart: (userId) => api.delete(`/cart/clear/${userId}`),
}
