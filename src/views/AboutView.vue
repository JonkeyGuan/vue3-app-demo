<script setup>
  import { ref, onMounted } from 'vue'
  import { getToken,getRoles, getUsername,logout} from "../keycloak";
  import axios from 'axios';

  // reactive state
  const count = ref(0)
  const user = getUsername();
  const roles = getRoles();

  const msg = "";
  const adminMsg = ref('');
  const customerMsg = ref('');



  // functions that mutate state and trigger updates
  function increment() {
    count.value++;
    
  };
  
  function getAdmin(){
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8282/admin',
      headers: {'Authorization': 'Bearer ' + getToken()}
    })
    .then(response=>{
      adminMsg.value = response.data;
    })
    .catch(error => {
      adminMsg.value = error
      console.log(error);
    })
  };

  function getCustomer(){
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8282/customer',
      headers: {'Authorization': 'Bearer ' + getToken()}
    })
    .then(response=>{
      customerMsg.value = response.data;
    })
    .catch(error => {
      customerMsg.value = error
      console.log(error)
    })
  };

  function logOut(){
    logout();
  };
  // lifecycle hooks
  onMounted(() => {
    console.log(`The initial count is ${count.value}.`)
  })
  </script>


<template>
    <div>
    <h1>This is an about page</h1>
    </div>
    <div class="mydiv">
    <h1>{{ msg }}</h1>

    <p>
      current user: {{user}}
    </p>

    <p>
      roles: {{roles}}
    </p>

    <p>
      admin-request: {{adminMsg}}
    </p>

    <p>
      customer-request: {{customerMsg}}
    </p>
  </div>
  <div>
    <button @click="getAdmin">call admin</button> |

    <button @click="getCustomer">call Customer</button> |

    <button @click="logOut">call LogOut</button>
  </div>
</template>

<style scoped>
.mydiv {
  float:left;
  width: 800px;
  height: 180px;
  background: #e6d3d3;
  margin: 10px;
}
</style>

