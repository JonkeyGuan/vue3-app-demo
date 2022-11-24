<script setup>
  import { ref, onMounted, reactive,getCurrentInstance } from 'vue'
  import { getToken,getRoles, getUsername,logout} from "../keycloak";
  import axios from 'axios';
  const {
    proxy
  }=getCurrentInstance();
  // reactive state
  const count = ref(0)
  const user = getUsername();
  const roles = getRoles();

  const msg = "";
  const adminMsg = ref('');
  const customerMsg = ref('');

  // 创建双向绑定的数据对象
  const d=reactive({
     userName:'',
     password: ''
  });
  



  // functions that mutate state and trigger updates
  function increment() {
    count.value++;
    
  };
  

  /**
   * 不需要提供登录认证token
   * 可匿名访问，用来验证服务是否就绪
   * 将返回 “Hello world ！”
   */
   function getCustomer(){
    //alert(getmytoken());
    axios({
      method: 'get',
      url: import.meta.env.VITE_URL_USERMANAGE+'/home/index'
    })
    .then(response=>{
      customerMsg.value = response.data;
    })
    .catch(error => {
      customerMsg.value = error
      console.log(error)
    })
  };

  /**
   * 需要提供登录认证token才能访问
   * 将返回 登录用户信息
   */
  function getLoginUserInfo(){
   // alert(getmytoken());
    axios({
      method: 'get',
      url: import.meta.env.VITE_URL_USERMANAGE+'/home/userinfo',
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



  /**
   * 实现用户注册，将提交的数据保持到数据库
   */
  function singupUser(){
    //alert("获取全局变量："+proxy["appConfig"].url);
    const data= {
      name:d.userName,
      password:d.password
    }
    console.log("user data:",data);
    axios({
      method: 'post',
      url: import.meta.env.VITE_URL_USERMANAGE+'/person/sign-up/',
      data:data,
      headers: {'Authorization': 'Bearer ' + getToken()}
    })
    .then(response=>{
      customerMsg.value = response.data;
    })
    .catch(error => {
      customerMsg.value = error.response.data.message;
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
    <div>
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

  <div class="contact-form">
    <div class="contact-title mb-35">
      <h2>注册用户</h2>
    </div>
      <div >
        <div>
          <input placeholder="name: " type="text" v-model="d.userName">
        </div>
        <div>
          <input placeholder="password: " type="password" v-model="d.password">
        </div>
        <div>
          <button @click="singupUser">注册用户</button> |
        </div>
      </div>
</div>
<br>
<div>
  <button @click="getCustomer">Hello world</button> |
  <button @click="getLoginUserInfo">Login user info</button> |
  <button @click="logOut">LogOut</button>
</div>
</template>

<style scoped>
.mydiv {
  float:left;
  width: 800px;
  height: 580px;
  background: #e6d3d3;
  margin: 10px;
}


.contact-form input {
    border: 1px solid #d1d1d1;
    height: 34px;
    margin-bottom: 20px;
    padding: 0 15px;
    width: 100%;
    color: #6a6a6a;
    font-size: 14px;
    font-weight: 400;
    background: 0;
}

</style>

