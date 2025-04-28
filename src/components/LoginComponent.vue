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

            <v-snackbar
                v-model="snackbar"
                :timeout="snackbarTimeout"
                >
                {{ snackbarText }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                    >
                    Close
                    </v-btn>
                </template>
            </v-snackbar>

        </v-card>

        
        
</template>

<script>
const axios = require("axios");

export default {
    data(){
        return {
            userValues:{
                email:null,
                password:null
            },
            emailRules : [
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            snackbar:false,
            snackbarText:'',
            snackbarTimeout: 2000,
        }
    },
    methods: {
        login: async function() {
            localStorage.clear();
            console.log(this.userValues.email);
            if(this.userValues){
                //post user values
                await axios
                .post("http://localhost:8000/users/login",this.userValues)
                .then(async (response) => {
                    // console.log("logindeki id",response.data.findUser._id);
                    localStorage.setItem("tokenUser-accesToken", response.data.accessToken);
                    localStorage.setItem("tokenUser-id", response.data.findUser._id);
                    localStorage.setItem("tokenUser-useremail",this.userValues.email);
                    localStorage.setItem("tokenUser-userpass", this.userValues.password);
                    localStorage.setItem("tokenUser-refreshToken", response.data.refreshToken);

                    if(response.data.findUser._id && response.data.accessToken){
                        //authorization
                        await axios
                            .get("http://localhost:8000/users/finduserbyid/"+ response.data.findUser._id,
                                {
                                    headers: {
                                        'authorization': response.data.accessToken,
                                    }
                                }
                            )
                            .then( () => {
                                // console.log("auth response : ",res);
                                this.$router.push('/');
                            })
                            .catch((err) => {
                                console.log(err);
                            }
                            );
                    }
                    
                })
                .catch(()=>{
                    // err => console.log(err);
                    this.snackbarText = "please check your form";
                    this.snackbar = true;
                    }
                    
                );
            }
              
        }
    }
}
</script>

<style>
    #login_card {
        position: relative;
        top: 25vh;
        left: 55vh;
    }
</style>
