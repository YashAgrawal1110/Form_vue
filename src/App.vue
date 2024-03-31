<template>
<!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <NavBar/> -->
  <!-- <header> -->
    <!-- <div id="nav"> -->
        <!-- <div> -->
            <!-- <router-link to="/">Home</router-link> -->
        <!-- </div> -->

        <!-- <div id="sub"> -->
            <!-- <router-link>Login</router-link> -->
            <!-- <router-link>Logout</router-link> -->
            <!-- <router-link>Register</router-link> -->

        <!-- </div> -->
    <!-- </div> -->
<!-- </header> -->
    <!-- cxvxcvxcv -->
      
<div>
    <router-view></router-view>
</div>
  <!-- <RegistrationForm/> -->
    <!-- <LoginSec/> -->

    <!-- <StoreData/> -->
</template>

<script setup>
// import NavBar from './components/NavBar.vue'
// import StoreData from './components/StoreData.vue'
// import LoginSec from './components/LoginSec.vue'
// import RegistrationForm from './components/RegistrationForm.vue'

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
#nav {
    display: flex;
    justify-content: space-evenly;
}
#sub{
    display: flex;
    gap: 5px;
}
</style>
