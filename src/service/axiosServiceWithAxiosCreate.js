const axios = require("axios");
const baseUrl = "http://localhost:8000";

const instance  = axios.create({
    baseURL:baseUrl,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*", // Allow CORS
      }
});

//interceptor for request 
instance.interceptors.request.use(function(config){
    // Do something before request is sent
    if(localStorage.getItem("tokenUser-accesToken")){
        config.headers.authorization = localStorage.getItem("tokenUser-accesToken");
        return config;
    }
    
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

//interceptor for response
instance.interceptors.response.use(function(response){
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    await console.log("error",error);
    const originalRequest = await error.config;
    if(error.status == 401){
        try {
            const response  = await axios.post('http://localhost:8000/users/refreshToken',{'refreshToken':localStorage.getItem("tokenUser-refreshToken")});
            localStorage.removeItem("tokenUser-accesToken");
            localStorage.setItem("tokenUser-accesToken", response.data.accessToken);
            localStorage.removeItem("tokenUser-accesToken");
            localStorage.setItem("tokenUser-accesToken", response.data.accessToken);
            //refresh request
            return instance(originalRequest);
        } catch (error) {
            console.log("logine gitmeli",error);
            window.location.href = '/#/login'
        }
    }

    return error;
});

const getAllUser = async function(){
   const response =  await instance.get("/users");
   console.log("getalluser response",response);
   return response.data;   
}

const getAllCompany = async function() {
    const response = await instance.get("/companies");
    console.log("getall company response",response);
    return response.data; 
}

const getAllAddress = async function() {
    const response = await instance.get("/addresses");
    console.log("getall addresses response",response);
    return response.data; 
}

const addUser = async function(userValues) {
    if(!userValues){
        return "Please check values";
    }
    else{
        instance.post("/users/register",userValues);
    }
    
}

const findUserById = async function(id) {
    const response = await instance.get("/users/finduserbyid/"+id);
    return response.data;
}

const updateUser = async function(id,values) {
    const response = await instance.patch("/users/updateuser/" + id,values);
    return response.data;
}

const deleteUser = async function (id){
    const response = await instance.delete("/users/deleteuser/" + id);
    return response.data;
}


module.exports = {
    getAllUser,
    getAllCompany,
    getAllAddress,
    addUser,
    findUserById,
    updateUser,
    deleteUser
}