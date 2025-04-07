<template>
  <v-container>
    <h2>User Table</h2>

    <!-- dialog start -->
    <div>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          class="my-3" 
          color="primary"
          elevation="1" 
          rounded
          v-bind="attrs"
          v-on="on"
          @click="openAddUserDialog"
        >
          Create User
        </v-btn>
      </template>
      
      <v-card>
        <v-card-title>
          <span class="text-h5">User Create</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Name*"
                  v-model="userOne.name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="E-mail"
                  v-model="userOne.email"
                  hint="Your email must include @"
                  :rules="emailRules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  v-model="userOne.age"
                  label="Age"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="companyList"
                  item-text="name"
                  item-value="_id"
                  label="Company*"
                  v-model="userOne.company"
                  required
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Job"
                  v-model="userOne.job"
                ></v-text-field>
              </v-col>
            </v-row>


            <!-- address start-->
            <!-- <v-row>
              <v-col col="12">
                <v-text-field 
                  label="Adress Name"
                  v-model="userOne.address.name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col col="12">
                <v-text-field 
                  label="Adress"
                  v-model="userOne.address.value"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                col="12"
              >
                <v-text-field
                  label="Adress City"
                  v-model="userOne.address.city"
                ></v-text-field>
              </v-col>
            </v-row> -->
            <!-- address end -->
                
            <v-row v-show="addressSelectVisibility">
              <v-col col="12">
                <v-autocomplete
                  :items="addressList"
                  item-text="name"
                  item-value="_id"
                  label="Address"
                  v-model="userOne.address"
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                col="12"
              >
                <v-btn 
                @click="addressSelectVisibility= true;addAddressBtnVisibility=false;"
                v-show="addAddressBtnVisibility">
                  Add Address
                </v-btn>
              </v-col>
            </v-row> 

          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addUser"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>


      </v-dialog>
    </div>
    <!-- dialog end -->


    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userList" :key="item._id">
            <td class="data_view_td" @click="detailUser(item._id)">
              {{ item.name }}
            </td>
            <td class="data_view_td" @click="detailUser(item._id)">
              {{ item.email }}
            </td>
            <td>
              <v-btn icon color="primary" @click="updateUser(item._id)">
                <v-icon> mdi-pencil </v-icon>
              </v-btn>
              <v-btn icon color="red" @click="deleteUser(item._id)">
                <v-icon> mdi-delete </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      userList: {},
      companyList:[],
      addressList:[],
      userOne : {
        name:'',
        email:'',
        age:'',
        company:'',
      },
      emailRules : [
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      dialog: false,
      addressSelectVisibility:false,
      addAddressBtnVisibility:true
    };
  },
  methods: {
    initialize : async function(){
      await axios
      .get("http://localhost:8000/users")
      .then((response) => (this.userList = response.data));
    },
    openAddUserDialog: async function () {
        await axios
        .get("http://localhost:8000/companies")
        .then((response) => this.companyList = response.data)
        .catch((error) => console.log(error));

        await axios
        .get("http://localhost:8000/addresses")
      . then((response) => (this.addressList = response.data));

    },
    addUser: async function(){
      // if (event) {
      //   this.$router.push("/users/adduser");
      // }
      console.log(this.userOne);
      await axios.post('http://localhost:8000/users',this.userOne)
        .then(function (response) {
          alert(response.data);
        
        })
        .catch(function (error) {
          console.log(error);
          alert("error.. :( )")
        });
      await this.initialize();


    },
    updateUser: function (id) {
      this.$router.push("/users/updateuser/" + id);
    },
    deleteUser: async function (id) {
      await axios
        .delete("http://localhost:8000/users/deleteuser/" + id)
        .then((response) => (this.userList = response.data))
        .catch(function (error) {
          console.log(error);
          alert("error.. :( )");
        });
    },
    detailUser: function (id) {
      this.$router.push("/users/finduserbyid/" + id);
    }
  },
  async mounted() {
    await axios
      .get("http://localhost:8000/users")
      .then((response) => (this.userList = response.data));
  },
};
</script>
<style>
.data_view_td:hover {
  cursor: pointer;
}
</style>