<template>
        <v-card 
            id="login_card"
            style="max-width:43%;"
            outlined
        >
            <div class="text-h6 text-center py-3">
                LOGIN FORM
            </div>
            <v-card-text>
                <v-row>
                    <v-col
                        cols="8"
                        class="mx-auto"
                    >
                        <v-text-field
                            v-model="userValues.email"
                            label="E-mail"
                            required
                            hint="Your email must include @"
                            :rules="emailRules"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        cols="8"
                        class="mx-auto"
                    >
                        <v-text-field
                            v-model="userValues.password"
                            label="Passworrd"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="8"
                        class="mx-auto"
                    >
                        <v-btn
                            outlined
                            rounded
                            color="primary"
                            @click="login()"
                        >
                            Login
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        
</template>


<script>
const axios = require("axios");

export default {
    data(){
        return {
            userValues:{
                email:'',
                password:''
            },
            emailRules : [
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
    methods: {
        login: async function() {
            // console.log(this.userValues);
            if(this.userValues){
                //post user values
                await axios
                .post("http://localhost:8000/users/login",this.userValues)
                .then(async (response) => {
                    console.log("response",response);
                    // axios.defaults.headers.common['authorization'] = response.data.accessToken;
                    // console.log(axios.defaults.headers.common['authorization']);

                    // tokenUser.accesToken = response.data.accessToken;
                    console.log("logindeki id",response.data.findUser._id);
                    // tokenUser.id = response.data.findUser._id;
                    // tokenUser.userValues = this.userValues;
                    // tokenUser.refreshToken = response.data.refreshToken;
                    localStorage.setItem("tokenUser-accesToken", response.data.accessToken);
                    localStorage.setItem("tokenUser-id", response.data.findUser._id);
                    localStorage.setItem("tokenUser-useremail",this.userValues.email);
                    localStorage.setItem("tokenUser-userpass", this.userValues.password);
                    localStorage.setItem("tokenUser-refreshToken", response.data.refreshToken);

                    if(response.data.findUser._id && response.data.accessToken){
                        //authorization
                        await axios
                        .post("http://localhost:8000/users/finduserbyidwithauth/"+ response.data.findUser._id,
                            this.userValues,
                            {
                                headers: {
                                    'authorization': response.data.accessToken,
                                }
                            }
                        )
                        .then( (res) => {
                            console.log("auth response : ",res);
                            this.$router.push('/');
                        })
                        .catch(err => console.log(err));
                        }
                    

                })
                .catch(err => console.log(err));
            }

            
        }
    }
}
</script>

<style>
    .v-navigation-drawer,header.v-sheet {
        display: none ;
    }
    main {
        padding: 0 !important;
    }
    #login_card {
        position: relative;
        top: 25vh;
        left: 55vh;
    }
</style>
