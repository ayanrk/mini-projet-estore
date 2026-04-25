import api from './axios'

export const catalogApi = {
  // Liste avec recherche optionnelle ou filtre par catégorie
  getProducts: ({ search, categoryId } = {}) => {
    const params = {}
    if (search) params.search = search
    if (categoryId) params.categoryId = categoryId
    return api.get('/products', { params }).then(r => r.data)
  },
  getProduct: (id) => api.get(`/products/${id}`).then(r => r.data),
  getCategories: () => api.get('/categories').then(r => r.data),
}
