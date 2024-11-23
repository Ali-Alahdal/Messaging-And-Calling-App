import axios from "axios"

const url = "http://127.0.0.1:8000/api/"


export const loginAPI = async (email , password) => {

    const response = await axios.post(`${url}/login/` , {
        email : email,
        password : password
    },{
        withCredentials : true
    });

    return response.data.success
}

export const refreshAPI = async () => {
    const response = await axios.post(`${url}/refresh/` , {} , {
        withCredentials : true
    })

    return response.data.access
}

const callRefresh = async (error , func)  =>{

    if(error.response?.status = 401){

        const refreshed = await refreshAPI();

        if(refreshed){
            const retryResponse = await func();
            return retryResponse.data;
        }

    }

    return false;
}   
