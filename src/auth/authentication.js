
import axiosInstance from './../axios/utils';

export function jwtDecode(token) {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    const jsonPayload = atob(base64); 
    return JSON.parse(jsonPayload); 
  }
  export const isValidToken = (accessToken) => {
    if (!accessToken) {
      return false;
    }
  
    const decoded = jwtDecode(accessToken);
  
    const currentTime = Date.now() / 1000;
  
    return decoded.exp > currentTime;
  };

  export const tokenExpired = (exp) => {
    let expiredTimer;
    const currentTime = Date.now();
    const timeLeft = exp * 1000 - currentTime;
    clearTimeout(expiredTimer);
  
    expiredTimer = setTimeout(() => {
      alert('Token expired');
  
      localStorage.removeItem('accessToken');
  
      window.location.href = "/";
    }, timeLeft);
  };
  
 
  
  export const setSession = (accessToken) => {
    
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
  
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
     
      
      
  
      // This function below will handle when token is expired
      const { exp } = jwtDecode(accessToken);
      tokenExpired(exp);
    } else {
      
      localStorage.removeItem('accessToken');
      localStorage.removeItem('memberID');
  
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  };