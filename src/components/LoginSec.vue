<template>
    <!-- <router-link to="/login">Login</router-link> -->

<!-- <div>
Enter Your Username and Password
<hr>
<input type="text" placeholder="UserName"><br>
<input type="text" placeholder="Password"><br>
<button>Login</button>
</div> -->
<div id="nav">
<div class="main">
<h3>Enter your login credentials</h3>
<form>
    <label for="first">
        Username:
    </label>
    <input type="email" id="email" name="email" placeholder="Enter your Email" v-model="emailInput" v-bind="text">
    <div id="emailerr"></div>
    {{ emailInput }}

    <label for="password">
        Password:
    </label>
    <input type="password" id="password" name="password" v-model="passInput" v-bind="password" placeholder="Enter your Password">
    <div id="passerr"></div>

    {{ passInput }}
    <div id="wrap">
        <button @click="match">
           <router-link to="">Submit</router-link> 
        </button>
        <!-- <button @click="match" v-else>
           <router-link to="/profile">Submit</router-link> 
        </button> -->
    </div>
</form>
<p>Not registered?
    <router-link to="/registration" style="text-decoration: none;">
        Create an account
    </router-link>
</p>
</div>
</div>
<tr v-for="post in posts.value" :key="post.id">
<!-- <td>{{ post.userId }}</td> -->
<td>{{ post.Email }} </td>
<td>{{ post.pass }} </td>
<!-- <td>{{ post.title }}</td> -->
<!-- <td>{{ post.body }}</td> -->
</tr>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router = useRouter()

const posts = ref([])
const emailInput = ref('')
const passInput = ref('')
axios
.get('http://localhost:3000/data')
.then((response) => {
console.log(response.data);
response.data.forEach((x) => {
            posts.value.push(x) 
        })
    })

 const match = () => {
    
    // posts.value.forEach((x) => {
    //     if (emailInput.value === x.posts) {
    //     alert('gfdgjkdfk')
    // } else {
    //     alert('not')
    // }
    // })
if(emailInput.value.length === 0){
    document.getElementById('emailerr').innerHTML = 'email must be there';
            document.getElementById('emailerr').style.color = 'red'
}

    let bt = ref(false)
    const emailE = posts.value.find((item) => item.Email == emailInput.value)
    console.log(emailE)
    

    if(emailInput.value.length === 0){
    document.getElementById('emailerr').innerHTML = 'email must be there';
    document.getElementById('emailerr').style.color = 'red'
    document.getElementById('passerr').innerHTML = 'password must be there';
    document.getElementById('passerr').style.color = 'red'
            toast("please enter Credential",{
                autoClose: 1000,
            })
}else if (emailE.pass == passInput.value) {
        console.log("object")
          localStorage.setItem("iddd",emailE.id)  
        const passE = posts.value.some((item) => item.pass == passInput.value)
        if (emailE && passE) {
            // alert("gud")
            document.isAuthenticated = true;
            localStorage.setItem("key", JSON.stringify(emailInput.value ))
            // localStorage.setItem("key",))  
            toast("login Success",{
                autoClose: 3000,
            })  

          router.push({name:'Home'})
          return  bt.value = true
        } else{
            toast("login Success",{
                autoClose: 3000,
            })
            alert('Please Enter Correct Credential')
        }


    // e.preventDefault();
    }else{
        console.log("fsdfsdfsd")
    }
   



}

</script>

<style scoped>
.nav {
display: flex;
align-items: center;
justify-content: center;
font-family: sans-serif;
line-height: 1.5;
min-height: 100vh;
background: #f3f3f3;
flex-direction: column;
margin: 0;
}

.main {
background-color: #fff;
border-radius: 15px;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
padding: 10px 20px;
transition: transform 0.2s;
width: 500px;
text-align: center;
}

h1 {
color: #4CAF50;
}

label {
display: block;
width: 100%;
margin-top: 10px;
margin-bottom: 5px;
text-align: left;
color: #555;
font-weight: bold;
}

input {
display: block;
width: 100%;
margin-bottom: 15px;
padding: 10px;
box-sizing: border-box;
border: 1px solid #ddd;
border-radius: 5px;
}

button {
padding: 15px;
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

#wrap {
display: flex;
justify-content: center;
align-items: center;
}
</style>
