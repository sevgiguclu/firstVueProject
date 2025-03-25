<template>
  <div >
    
    <h3>
      Add User  Compenent
    </h3>

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="5">
            <v-text-field v-model="userName" label="Name" required></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-text-field v-model="userEmail" label="Email" :rules="emailRules" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn color="primary" @click="addUser">
            <v-icon>mdi-plus</v-icon>
            Add User
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
    
  </div>
</template>

<script>
const axios =  require('axios');

  export default{
    data: () => ({
      userName:'',
      userEmail:'',
      emailRules : [
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ]
    }),
    methods:{
      addUser:function(){
        if(this.userName.trim().length == 0 || this.userEmail.trim().length == 0 ){
          alert("please do not leave blank");
        }else {
          let req = {
            name:this.userName,
            email:this.userEmail
          }
          axios.post('http://localhost:8000/users',req)
          .then(function (response) {
            alert(response.data);
          
          })
          .catch(function (error) {
            console.log(error);
            alert("error.. :( )")
          });
        }
        

        
      }
    }
  }
</script>
