<template>
    <header>
        <div id="nav">
                <!-- <router-link :to="{name:'Home'}">Home</router-link> -->
                <router-link to="/login">Login</router-link>
                <!-- <router-link to="/registration">Registration</router-link> -->
                <!-- <router-link to="/dashboard">Dashboard</router-link> -->
        </div>
    
     
     
            <!-- <router-view></router-view> -->
      
    
        <!-- <LoginSec/> -->
    
    
    </header>
    </template>
    
    <script setup>
    // import LoginSec from './LoginSec.vue';
    </script>
    
    
    <style >
    #nav {
        display: flex;
        /* justify-content: space-evenly; */
    }
    #sub{
        display: flex;
        gap: 5px;
    }
    
    </style>
    