import axios from 'axios';
// You can use any cookie library or whatever
// library to access your client storage.
import cookie from 'cookie-machine';

axios.interceptors.request.use(function(config) {
  const token = cookie.get(__TOKEN_KEY__);

  if ( token != null ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function(err) {
  return Promise.reject(err);
});

export const setAuthToken = token => {
    if (token) {
    //applying token
    instance.defaults.headers.common['Authorization'] = token;
    } else {
    //deleting the token from header
    delete instance.defaults.headers.common['Authorization'];
    }
   }


   instance.interceptors.request.use(req => {
    if (axios.defaults.headers.common["Authorization"]) return req;
    throw ({message:"the token is not available"});
   },error=>{
    return Promise.reject(error);
   }
  );


  //on successful response
instance.interceptors.response.use(response=>response,
    error=>{
      const fallbackValue = [
        {userId: "Not authorized",id: "aerw15311sq",
         title: "Please try     again",completed: false}];
       return Promise.reject(fallbackValue);}
    );