<template>
  <div>
    
    <h2>
      User Table
    </h2>
    <v-btn
      color="primary"
      elevation="1"
      rounded
      @click="addUser"
    >Create User</v-btn>
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
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in userList"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    
  </div>
</template>

<script>

import axios from 'axios'
  export default {
    data () {
      return {
        userList: {}
      }
    },
    methods:{
      addUser:function(event){
        if (event) {
          return this.$router.push('/users/adduser');

        }
      }
    },
    async mounted () {
    await  axios
      .get('http://localhost:8000/users')
      .then(response => (this.userList = response.data))
  }
  }

 
</script>
