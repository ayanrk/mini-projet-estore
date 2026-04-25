import axios from 'axios'

// URL du backend Spring Boot (CorsConfig autorise localhost:5173)
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

// Intercepteur d'erreur : extrait le message renvoyé par GlobalExceptionHandler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data
    let message = 'Une erreur est survenue'
    if (typeof data === 'string') message = data
    else if (data?.message) message = data.message
    else if (data && typeof data === 'object') {
      // Erreurs de validation : { field: msg, ... }
      const first = Object.values(data)[0]
      if (typeof first === 'string') message = first
    }
    return Promise.reject({ ...error, displayMessage: message })
  }
)

export default api
