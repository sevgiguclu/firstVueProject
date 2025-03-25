<template>
  <div>
    
    <h2>
      User Table
    </h2>
    <v-btn class="my-3" color="primary" elevation="1" rounded @click="addUser">
      Create User
    </v-btn>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Email
            </th>
            <th>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in userList"
            :key="item._id"
          >
            <td class="data_view_td" @click="detailUser(item._id)">{{ item.name }}</td>
            <td class="data_view_td" @click="detailUser(item._id)">{{ item.email }}</td>
            <td>
              <v-btn icon color="primary" @click="updateUser(item._id)" >
                <v-icon >
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn icon color="red" @click="deleteUser(item._id)">
                <v-icon >
                  mdi-delete
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    
  </div>
</template>

<script>

const axios =  require('axios');

  export default {
    data () {
      return {
        userList: {}
      }
    },
    methods:{
      addUser: function(event){
        if (event) {
          this.$router.push('/users/adduser');
        }
      },
      updateUser: function(id){
         this.$router.push('/users/updateuser/'+id);
      },
      deleteUser : async function(id){
        await axios.delete('http://localhost:8000/users/deleteuser/' + id)
        .then(response => (this.userList = response.data))
        .catch(function (error) {
          console.log(error);
          alert("error.. :( )")
        });
      },
      detailUser:function(id){
        this.$router.push('/users/finduserbyid/'+id);
      }
    },
    async mounted () {
    await  axios
      .get('http://localhost:8000/users')
      .then(response => (this.userList = response.data))
  }
  }

 
</script>
<style>
.data_view_td:hover {
  cursor: pointer;
}
</style>