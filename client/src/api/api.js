import axios from 'axios';


const api = axios.create({
    baseURL:"http://localhost:3000/api",
    headers:{
        "Content-Type":"application/json",

    },
});

//request interceptor to add token
api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;

    },
    (error)=>{
        return Promise.reject(error);
    }

);

//response inteceptor for error handling
api.interceptors.response.use(
    (response)=> response,
    (error)=>{
        if (error.response?.status===401){
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href ="/"
        }
        return Promise.reject(error);
    }
);


//auth apis calls
export const authAPI={
    register:(userData) =>api.post("/auth/register", userData),
    login:(credentials) => api.post('/auth/login', credentials),

}
 export default api