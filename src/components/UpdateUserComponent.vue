<template>
  <v-container >
    
    <h3>
      User Update
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
          <v-btn color="primary" @click="updateUser">
            <v-icon class="me-1">mdi-pencil</v-icon>
            Update User
            
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
   
    
  </v-container>
</template>

<script>
const axios =  require('axios');

export default {
  data:() => ({
    userName:'',
    userEmail:'',
    emailRules : [
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ]
  }),
  methods:{
    updateUser : async function(){
      // console.log(this.$route.params);
      if(this.userName.trim().length ==0 || this.userEmail.trim().length == 0)
        alert("please do not leave blank");
      else{
        let newData = {
          name: this.userName,
          email: this.userEmail
        }
        await axios
        .patch('http://localhost:8000/users/updateuser/'+ this.$route.params.id,newData)
        .then(response => {
          console.log(response.data);
          alert("user update");
        })
        .catch(function (error) {
            console.log(error);
            alert("error.. :( )")
        });
      }
      
    }
  },
  mounted(){
        axios
        .get('http://localhost:8000/users/finduserbyid/' + this.$route.params.id)
        .then(response => {
          this.userName = response.data.name;
          this.userEmail = response.data.email;
        })
        .catch(function (error) {
          console.log(error);
          alert("error.. :( )")
        });
    }
}

</script>