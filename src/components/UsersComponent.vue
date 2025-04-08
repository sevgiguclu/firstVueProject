<template>
  <v-container>
    <h2>User Table</h2>

    <!-- add user dialog start -->
    <div>
      <v-dialog
        v-model="addUserDialog"
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
              @click="addUserDialog = false"
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
    <!-- add user dialog end -->


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

              <!-- <v-btn icon color="primary" @click="updateUser(item._id)">
                <v-icon> mdi-pencil </v-icon>
              </v-btn> -->

              <v-dialog 
                v-model="updateUserDialog"
                persistent
                max-width="600px"
                :retain-focus="false"
              >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                      class="my-3" 
                      color="primary" 
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click="openUpdateUserDialog(item._id)"
                    >
                      <v-icon> mdi-pencil </v-icon>
                    </v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    <span class="text-h5">Update User</span>
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

                          
                      <v-row>
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

                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="updateUserDialog = false;"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="updateUser()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>

              </v-dialog>

              <!-- <v-btn icon color="red" @click="deleteUser(item._id)">
                <v-icon> mdi-delete </v-icon>
              </v-btn> -->

              <v-dialog
                v-model="deleteUserDialog"
                max-width="290"
                :retain-focus="false"
              >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                      class="my-3" 
                      color="red" 
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click="deleteUserDialog = false;"
                    >
                      <v-icon> mdi-delete  </v-icon>
                    </v-btn>
                </template>

                <v-card>
                  <v-card-title class="text-h6">
                    Are you sure you want to delete this user?
                  </v-card-title>

                  <v-card-text>
                    Once you press the Okey key, this action cannot be undone.
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="green darken-1"
                      text
                      @click="deleteUserDialog = false"
                    >
                      Cancel
                    </v-btn>

                    <v-btn
                      color="green darken-1"
                      text
                      @click="deleteUser(item._id)"
                    >
                      Okey
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>



            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>


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
      addUserDialog: false,
      updateUserDialog : false,
      deleteUserDialog:false,
      addressSelectVisibility:false,
      addAddressBtnVisibility:true,
      snackbar:false,
      snackbarText:'',
      snackbarTimeout: 2000,
    };
  },
  methods: {
    initialize : async function(){
      await axios
      .get("http://localhost:8000/users")
      .then((response) => (this.userList = response.data));
    },
    openAddUserDialog: async function () {
        this.userOne = {};
        await axios
        .get("http://localhost:8000/companies")
        .then((response) => this.companyList = response.data)
        .catch((error) => console.log(error));

        await axios
        .get("http://localhost:8000/addresses")
        .then((response) => (this.addressList = response.data));

    },
    addUser: async function(){
      // if (event) {
      //   this.$router.push("/users/adduser");
      // }
      console.log(this.userOne);
      await axios
      .post('http://localhost:8000/users',this.userOne)
      .then((response) => {
          this.snackbarText = response.data;
          this.snackbar = true;
        
      })
      .catch((error) => {
          this.snackbarText = error.data;
          this.snackbar = true;
      });
      await this.initialize();
      


    },
    openUpdateUserDialog: async function(id){
      await axios
      .get("http://localhost:8000/users/finduserbyid/"+id)
      .then((response) => (this.userOne = response.data));
      await axios
        .get("http://localhost:8000/companies")
        .then((response) => this.companyList = response.data)
        .catch((error) => console.log(error));

        await axios
        .get("http://localhost:8000/addresses")
        .then((response) => (this.addressList = response.data));
    },
    updateUser: async function () {
      // this.$router.push("/users/updateuser/" + id);
      // console.log(this.userOne);
      await axios
      .patch('http://localhost:8000/users/updateuser/' + this.userOne._id,this.userOne)
      .then((response) => {
        this.snackbarText = response.data;
        this.snackbar = true;
      })
      .catch((error) => {
        this.snackbarText = error.data;
        this.snackbar = true;
      });
      
    },
    deleteUser: async function (id) {
      this.deleteUserDialog = false;
      await axios
        .delete("http://localhost:8000/users/deleteuser/" + id)
        .then((response) => {
          this.userList = response.data;
          this.snackbarText = "user deleted";
          this.snackbar = true;

        })
        .catch((error) => {
          this.snackbarText = error.data;
          this.snackbar = true;
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