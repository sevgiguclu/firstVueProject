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
              <v-form
                ref="formAddUser"
                v-model="validAddUserForm"
              >
                  
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      label="Name*"
                      v-model="userOne.name"
                      :rules="formLengthRules"
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
                  >
                    <v-text-field
                      label="Password*"
                      v-model="userOne.password"
                      type="password"
                      :rules="passwordRules"
                      hint="Your password must be less than 10 characters"
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
                      :rules="companyRules"
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
                    @click="addressSelectVisibility= true; addAddressBtnVisibility=false;"
                    v-show="addAddressBtnVisibility">
                      Add Address
                    </v-btn>
                  </v-col>
                </v-row> 
              </v-form>
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
              :disabled="!validAddUserForm"
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

              <v-btn icon color="primary" @click="openUpdateUserDialog(item._id)">
                <v-icon> mdi-pencil </v-icon>
              </v-btn>

              <!-- <v-btn icon color="red" @click="deleteUser(item._id)">
                <v-icon> mdi-delete </v-icon>
              </v-btn> -->

              <v-btn icon color="red" @click="openDeleteUserDialog(item._id)">
                <v-icon> mdi-delete </v-icon>
              </v-btn>

            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- update user dialog start -->
    <div>
        <v-dialog 
          v-model="updateUserDialog"
          persistent
          max-width="600px"
        >

          <v-card>
            <v-card-title>
              <span class="text-h5">Update User</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form
                  ref="formUpdateUser"
                  v-model="validUpdateUserForm"
                >
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        label="Name*"
                        v-model="userOne.name"
                        :rules="formLengthRules"
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
                        :rules="companyRules"
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
                </v-form>
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
                :disabled="!validUpdateUserForm"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>
    </div>
    <!-- update user dialog end -->

    <!-- delete user dialog start -->
    <v-dialog
      v-model="deleteUserDialog"
      max-width="290"
    >

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
            @click="deleteUser()"
          >
            Okey
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- delete user dialog end -->

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
// const axiosService = require('../service/axiosService');
const axiosService = require('../service/axiosServiceWithAxiosCreate');
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
      formLengthRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 2) || 'Must be more than 2 characters',
      ],
      emailRules : [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      companyRules:[
        v=>!!v || 'Company is required'
      ],
      passwordRules:[
         v => (v && v.length >= 10) || 'Must be more than 10 characters',
      ],
      addUserDialog: false,
      updateUserDialog : false,
      deleteUserDialog:false,
      addressSelectVisibility:false,
      addAddressBtnVisibility:true,
      snackbar:false,
      snackbarText:'',
      snackbarTimeout: 2000,
      validAddUserForm:true,
      validUpdateUserForm:true,
    };
  },
  methods: {
    async openAddUserDialog () {
        this.userOne = {};
        this.companyList = await axiosService.getAllCompany();
        this.addressList = await axiosService.getAllAddress();
    },
    async addUser(){
      this.$refs.formAddUser.validate();
      if(this.userOne.name && this.userOne.company && this.userOne.email && this.userOne.password){
        this.snackbarText = await axiosService.addUser(this.userOne);
        this.snackbar = true;
        this.userList = await axiosService.getAllUser();
      }
      else{
        this.snackbarText = "please check your form";
        this.snackbar = true;
      }
    },
    async openUpdateUserDialog(id){
      this.updateUserDialog= true;
      this.userOne = await axiosService.findUserById(id);
      this.companyList = await axiosService.getAllCompany();
      this.addressList = await axiosService.getAllAddress();
    },
    async updateUser() {
      // this.$router.push("/users/updateuser/" + id);
      // console.log(this.userOne);
      this.$refs.formUpdateUser.validate();
      const update_response = await axiosService.updateUser(this.userOne._id,this.userOne);
      this.snackbarText = update_response;
      this.snackbar = true;
      this.userList = await axiosService.getAllUser();
    },
    async openDeleteUserDialog(id){
      this.deleteUserDialog = true;
      this.userOne = await axiosService.findUserById(id);
    },
    async deleteUser() {
      this.deleteUserDialog = false;
      const delete_response = await axiosService.deleteUser(this.userOne._id);
      this.userList = delete_response;
      if(typeof(delete_response) === "object")
        this.snackbarText = "user deleted";
      else
        this.snackbarText = delete_response;
      this.snackbar = true;
    },
    detailUser: function (id) {
      this.$router.push("/users/finduserbyid/" + id);
    }
  },
  async mounted() {
    // this.userList  = await axiosService.getAllUser();
    this.userList = await axiosService.getAllUser();
  }
};
</script>
<style>
.data_view_td:hover {
  cursor: pointer;
}
</style>