import api from './axios'

export const inventoryApi = {
  // Nécessite l'ajout d'InventoryController côté backend (voir backend-patch/)
  getStock: (productId) => api.get(`/inventory/${productId}`).then(r => r.data),
}
