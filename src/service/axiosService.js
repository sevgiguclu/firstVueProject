const axios = require("axios");
const controlToken = async function(){
    let user_email = localStorage.getItem("tokenUser-useremail");
    let user_pass = localStorage.getItem("tokenUser-userpass");
    console.log("tokenlı userın idsi - controlToken metodu",localStorage.getItem("tokenUser-id"));
    await axios
    .post("http://localhost:8000/users/finduserbyidwithauth/"+ localStorage.getItem("tokenUser-id"),
        {
            "email":user_email,
            "password":user_pass
        },
        {
            headers: {
                'authorization': localStorage.getItem("tokenUser-accesToken"),
            }
        }
    )
    .then( (res) => {
        console.log("middleware e geldiinnnn",res);
        alert("iznin var");
    })
    .catch(err => {
        console.log("middle ware içinde err",err);
        alert("tekrar giriş yapmalısın");      
        // return this.$route.push('/login')
        window.location.href = '/#/login'
    });
}

let getAllUser = async function(){
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

const addUser = async function(){
    console.log("userOne - adduser Metodu",this.userOne);
    await axios
    .post('http://localhost:8000/users/register',this.userOne)
    .then((response) => {
        this.snackbarText = response.data;
        this.snackbar = true;
      
    })
    .catch((error) => {
        this.snackbarText = "please check form" + error;
        this.snackbar = true;
    });
    // await this.initialize();
    await getAllUser();
}

module.exports = {
    getAllUser,
    addUser,
    controlToken
}