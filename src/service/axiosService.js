const axios = require("axios");
const controlToken = async function(){
    // let user_email = localStorage.getItem("tokenUser-useremail");
    // let user_pass = localStorage.getItem("tokenUser-userpass");
    // console.log("tokenlı userın idsi - controlToken metodu",localStorage.getItem("tokenUser-id"));
    await axios
        .get("http://localhost:8000/users/finduserbyid/"+ localStorage.getItem("tokenUser-id"),
            {
                headers: {
                    'authorization': localStorage.getItem("tokenUser-accesToken"),
                }
            }
        )
        .then( () => {
            // console.log("controlToken metodu",res);
            // alert("iznin var");
            console.log("izinliii");
        })
        .catch(async () => {
            // console.log("controlToken err",err);
            alert("tekrar giriş yapmalısın");
            await axios
            .post("http://localhost:8000/users/refreshToken",{'refreshToken':localStorage.getItem("tokenUser-refreshToken")})
            .then((res)=>{
                console.log("controlToken res",res);
                localStorage.removeItem("tokenUser-accesToken");
                localStorage.removeItem("tokenUser-refreshToken");
                localStorage.setItem("tokenUser-accesToken", res.data.accessToken);
                localStorage.setItem("tokenUser-refreshToken", res.data.refreshToken);
            })
            .catch(err => {
                console.log(err);
                 // return this.$route.push('/login')
                window.location.href = '/#/login'
            })
           
            
        });
}

const getAllUser = async function(){
    await controlToken();
    // console.log("result",result);
    try{
        const response = await axios.get("http://localhost:8000/users");
        // console.log("tüm kullanıcılar ",response.data);
        return response.data;
    }
    catch{
        return null;
    }
        
}

const getAllCompany = async function(){
    await controlToken();
    // console.log("result",result);
    try{
        const response = await axios.get("http://localhost:8000/companies");
        return response.data;
    }
    catch{
        return null;
    }
        
}

const getAllAddress = async function(){
    await controlToken();
    // console.log("result",result);
    try{
        const response = await axios.get("http://localhost:8000/addresses");
        return response.data;
    }
    catch{
        return null;
    }
        
}

const addUser = async function(userValues){
    await controlToken();
    if(!userValues){
        return "Please check values";
    }
    else{
        try{
            const response = await axios
            .post('http://localhost:8000/users/register',userValues)
            return response.data;
        }
        catch{
            return 'error';
        }
    } 
}

const findUserById = async function(id) {
    await controlToken();
    try {
        const response = await axios.get("http://localhost:8000/users/finduserbyid/"+id);
        return response.data;
    } 
    catch(error) {
        return error.data;
    }
}

const updateUser = async function(id,values) {
    await controlToken();
    try {
        const response = await axios.patch('http://localhost:8000/users/updateuser/' + id,values);
        return response.data;
    } catch(error) {
        return error.data;
    }
}

const deleteUser = async function (id) {
    await controlToken();
    try {
        const response = await axios.delete("http://localhost:8000/users/deleteuser/" + id);
        return response.data;
    } catch {
        return "error";
    }
}

module.exports = {
    controlToken,
    getAllUser,
    getAllCompany,
    getAllAddress,
    addUser,
    findUserById,
    updateUser,
    deleteUser
}