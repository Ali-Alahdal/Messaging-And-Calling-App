import axios from "axios"



const url = "http://127.0.0.1:8000/api/";
const url_users = "http://127.0.0.1:8000/api/users";
const url_messaging = "http://127.0.0.1:8000/api/messaging";





export const loginAPI = async (email , password) => {
    
    const response = await axios.post(`${url_users}/login/` , {
        email : email,
        password : password
    },{
        withCredentials : true
    });

    return  response.data
}

export const refreshAPI = async () => {
    const response = await axios.post(`${url_users}/refresh/` , {} , {
        withCredentials : true
    })

    return response.data.access
}

export const getChatsAPI = async (token) => {
    try {
        const response = await axios.get(`${url_messaging}/getChats/`  , {
            withCredentials : true
        });
        return response.data
    } catch (error) {
        callRefresh(error ,axios.get(`${url_messaging}/getChats/`  , {
            withCredentials : true
        }) )
    }
    



    
}


export const callRefresh = async (err , func)  =>{

    if(err.response.status = 401){
        const refreshed = await refreshAPI();

        if(refreshed){
            const retryResponse = await func();
            return retryResponse.data;
        }

      
    }
    return false;

}   
