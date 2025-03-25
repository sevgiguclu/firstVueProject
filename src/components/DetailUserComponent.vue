<template>
  <div >
    
    <h3 class="mb-3">
        User Details 
    </h3>

    <!-- <p> {{ $route.params.id }}
    </p> -->

    <p> Id : {{ userDetails._id }}</p>
    <p> Name : {{ userDetails.name }}</p>
    <p> Email : {{ userDetails.email }}</p>

   
    
  </div>
</template>

<script>
const axios =  require('axios');


export default{
    data () {
      return {
        userDetails: {}
      }
    },
    mounted(){
        axios
        .get('http://localhost:8000/users/finduserbyid/' + this.$route.params.id)
        .then(response => (this.userDetails = response.data))
    }
}
</script>