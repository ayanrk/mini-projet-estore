import api from './axios'

export const orderApi = {
  placeOrder: (userId) => api.post(`/orders/${userId}`).then(r => r.data),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`).then(r => r.data),
  getOrder: (orderId) => api.get(`/orders/${orderId}`).then(r => r.data),
}
