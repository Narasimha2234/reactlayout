
import { useMemo, useEffect, useReducer, useCallback, createContext } from 'react';

import axiosInstance from '../axios/utils';
import { isValidToken, jwtDecode, setSession } from './authentication';

export const AuthContext=createContext()

const initialState = {
  user: null,
};

const reducer = (state, action) => {
  
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
     ...state,
     user:null
    };
  }
  return state;
};




export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
   
      const token = localStorage.getItem("token");

      if (token && isValidToken(token)) {
        setSession(token);
      } 
    
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (data) => {
    const response=await axiosInstance.post("api/auth/login",data)
   console.log(response);
   
    const mobile=response.data.body?.mobile
    const userName=response.data.body?.username
    const role=response.data.body?.role
    const message=response.data.body?.message
    
   const token=response?.data?.body?.token
   if(response.data.statusCodeValue===200){
    var user = jwtDecode(token);
   }
    
    
    
    setSession(token);
    dispatch({
        type: 'LOGIN',
        payload: {
          user: {
            ...user,
            message,
            token,
            mobile,
            userName,
            role
          },
        },
      });
      return response.data.statusCodeValue===200
  }, []);

 
  const registerUser = useCallback(async (data) => {
    const response=await axiosInstance.post("api/auth/register",data)
    
    return response
  }, []);

  
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  

const isLoggedIn=state.user?.token?true:false

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      login,
      registerUser,
      logout,
     isLoggedIn
    }),
    [login, registerUser,logout, state.user,isLoggedIn]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}


