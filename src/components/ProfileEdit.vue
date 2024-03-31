<template>
  <div>
    <div id="navbar">
    <router-link id="rtext" :to="{name:'Home'}">Home</router-link>
    <router-link id="rtext"  to="/dashboard">Dashboard</router-link>
    <router-link id="rtext"  to="/taskManager">Task Manger</router-link>

    <button id='logout' @click="logout">logout</button>
</div>
    fsfsd  
  </div>
</template>

<script setup>

</script>
<style scoped>
#navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #2386b7;
    color: white;
}
#rtext{
    color: aliceblue;
     text-decoration: none;
}
#logout {
    width: min-content;
    background-color: white;
    color: #2386b7;
}
button {
    padding: 5px;
    border-radius: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    border: none;
    color: white;
    cursor: pointer;
    background-color: #2386b7;
    width: 100%;
    font-size: 16px;
}


</style>