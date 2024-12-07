import axios from "axios"



const url = "http://127.0.0.1:8000/api";
const url_users = "http://127.0.0.1:8000/api/users";
const url_messaging = "http://127.0.0.1:8000/api/messaging";



const user_endpoint = axios.create({
    baseURL : url_users,
    withCredentials : true
});

const messaging_endpoint = axios.create({
    baseURL : url_messaging,
    withCredentials : true
});

const normal_endpoint = axios.create({
    baseURL : url,
    withCredentials : true
});


//  *******************
//  interceptors 
//  *******************

messaging_endpoint.interceptors.response.use(
    (response) =>{
        return response;
    },

    async (error) =>{
        const originalRequest = error.config;

      if(error.response && error.response.status === 401  && !originalRequest._retry)  {
         originalRequest._retry = true;
         try {
            const response = await user_endpoint.post(`/refresh/`);
            if(!response.data.success){
                throw new Error("You Are Not Logged in")
            }
            
            return messaging_endpoint(originalRequest)
            
         } catch (error) {
            console.log(error);
            
            window.location.href = '/login';
         }
      }

      return Promise.reject(error);


    }
);

normal_endpoint.interceptors.response.use(
    (response) =>{
        return response;
    },

    async (error) =>{
        const originalRequest = error.config;

      if(error.response && error.response.status === 401  && !originalRequest._retry)  {
         originalRequest._retry = true;
         try {
            const response = await user_endpoint.post(`/refresh/`);
            if(!response.data.success){
                throw new Error("You Are Not Logged in")
            }
            
            return normal_endpoint(originalRequest)
            
         } catch (error) {
            console.log(error);
            
            window.location.href = '/login';
         }
      }

      return Promise.reject(error);


    }
);



//  *******************
//  User Operations 
//  *******************


export const registerAPI = async (first_name , last_name , email, username , password) => {
    
    const response = await user_endpoint.post(`/register/` , {
        first_name : first_name,
        last_name : last_name,
        email : email,
        username : username,
        password : password
    });

    return  response.data
}

export const loginAPI = async (email , password) => {
    
    const response = await user_endpoint.post(`/login/` , {
        email : email,
        password : password
    });
    
    return  response.data
}

export const logoutAPI = async () => {
    
    const response = await user_endpoint.post(`/logout/`);
    console.log(response);
    
    return  response.data
}



export const getProfileAPI = async () => {
    
    const response = await normal_endpoint.get(`/users/getProfile/`);
    console.log(response);
    
    return  response.data
}




//  *******************
//  Messaging Operations 
//  *******************

export const getChatsAPI = async () => {
    try {
        const response = await messaging_endpoint.get(`/getChats/`);
        return response.data
    } catch (error) {
        // callRefresh(error ,getChatsAPI);
        console.log("Server Error");
        
    }
    
}

export const createChatsAPI = async (chat_name , participnats) => {
    try {
        const response = await messaging_endpoint.post(`/createChat/`, {
            "chat_name" : chat_name,
            "participants" : participnats
            
        });
        return response.data
    } catch (error) {
        // callRefresh(error ,createChatsAPI(participnats))
        console.log("Server Error");

    }
    
}

