import axios from 'axios';


const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",

    },
});

//request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;

    },
    (error) => {
        return Promise.reject(error);
    }

);

//response inteceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/"
        }
        return Promise.reject(error);
    }
);


//auth apis calls
export const authAPI = {
    register: (userData) => api.post("/auth/register", userData),
    login: (credentials) => api.post('/auth/login', credentials),
    me: () => api.get('/auth/user'),
}

export const productAPI = {
    getAll: (category) => api.get(category ? `/products?category=${category}` : '/products'),
    get: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`)
}

export const orderAPI = {
    checkout: (data) => api.post('/orders/checkout', data),
    myOrders: () => api.get('/orders/myorders'),
    getAll: () => api.get('/orders'),
    updateStatus: (id, status) => api.put(`/orders/${id}/status`, { delivery_status: status })
}

export default api;