import api from './axios'

export const reviewApi = {
  addReview: (data) => api.post('/reviews', data).then(r => r.data),
  getByProduct: (productId) => api.get(`/reviews/product/${productId}`).then(r => r.data),
  getByUser: (userId) => api.get(`/reviews/user/${userId}`).then(r => r.data),
}
