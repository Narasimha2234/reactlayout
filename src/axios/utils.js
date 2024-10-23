import axios from 'axios';




const BASE_URL= "http://localhost:8080/"

const axiosInstance = axios.create({ baseURL: BASE_URL });
axiosInstance.interceptors.request.use(
    (config) => {
        if (!config.url || config.url.includes("api/auth/login") || config.url.includes("api/auth/register")) {
          
            return config;
          }
      const token = localStorage.getItem('accessToken');
     
      console.log(token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(token);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
axiosInstance.interceptors.response.use(
    (res)=>res,
    (error)=>Promise.reject((error.response  && error.response.data) || "somethng went wrong")
)


export default axiosInstance;



  export const applyForm=async(data)=>{
    const response=await axiosInstance.post("api/user/save",data)
    return response.data
  }

  