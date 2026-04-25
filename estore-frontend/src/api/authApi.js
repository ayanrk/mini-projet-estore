import api from './axios'

export const authApi = {
  register: (data) => api.post('/auth/register', data).then(r => r.data),
  login: (data) => api.post('/auth/login', data).then(r => r.data),
  getProfile: (userId) => api.get(`/auth/profile/${userId}`).then(r => r.data),
  updateProfile: (userId, data) => api.put(`/auth/profile/${userId}`, data).then(r => r.data),
}
