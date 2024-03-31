<template>
<!-- <div id="nav"> -->
<!-- -->
<!-- <div id="sub">
            <router-link to="/login">Login</router-link>
            <router-link to="/registration">Registration</router-link>
            <router-link to="/registration">Add Task</router-link>

        </div> -->
<div id="navbar">
    <router-link id="rtext" :to="{name:'Home'}">Home</router-link>
    <router-link id="rtext"  to="/dashboard">Dashboard</router-link>
    <router-link id="rtext"  to="/taskManager">Task Manger</router-link>

    <button id='logout' @click="logout">logout</button>
</div>
<!-- Welcome {{ firstName }} -->

<!-- <div>
        <table>
        <tbody>
           <tr>
            <th>First Name</th>
            <td>{{ firstName }}</td>
           </tr>
           <tr>
            <th>Last Name</th>
            <td>{{ lastName }}</td>
           </tr>

        </tbody>
    </table>

    </div> -->

<div class="main">
    <div>
        <div class="row">
            <div>
                <h6>Full Name</h6>
            </div>
            <div> {{ firstName }}</div>
        </div>
        <hr>

        <div class="row">
            <div>
                <h6>Email</h6>
            </div>
            <div>{{ lastName }}</div>
        </div>
        <hr>
        <div class="row">
            <div>
                <h6>Date of Birth</h6>
            </div>
            <div>{{ date }}</div>
        </div>
        <hr>
        <div class="row">
            <div>
                <h6>Age</h6>
            </div>
            <div>{{ age }}</div>
        </div>
        <hr>
        <div class="row">
            <div>
                <h6>Email</h6>
            </div>
            <div>{{ email }}</div>
        </div>
        <hr>
        <div class="row">
            <div>
                <button><router-link to="/ProfileEdit">Edit</router-link></button>
            </div>
        </div>
    </div>
</div>

<br>
<!-- <button @click="yu">gfdgdf</button> -->
<!-- </div> -->
</template>

    
<script setup>
import axios from 'axios';
import {
    ref,
    computed
} from 'vue';
import {
    useRouter
} from 'vue-router'
const router = useRouter();
const posts = ref([])
axios
    .get('http://localhost:3000/data')
    .then((response) => {
        console.log(response.data);
        response.data.forEach((x) => {
            posts.value.push(x)
        })
    })
let key = JSON.parse(localStorage.getItem("key"))
console.log(key)

// function yu() {
//     posts.value.some((item) => {
//         if (item.Email == key.value) {
//             return (item.firstName)
//         }

//     })
// }
// const firstName = ref(yu())

const firstName = computed(() => {
    const foundItem = posts.value.find(item => item.Email === key);
    return foundItem ? foundItem.firstName : '';
});

const lastName = computed(() => {
    const foundItem = posts.value.find(item => item.Email === key);
    return foundItem ? foundItem.lastName : '';
});

const date = computed(() => {
    const foundItem = posts.value.find(item => item.Email === key);
    return foundItem ? foundItem.DateOfBirth : '';
});
const age = computed(() => {
    const foundItem = posts.value.find(item => item.Email === key);
    return foundItem ? foundItem.Age : '';
});
const email = computed(() => {
    const foundItem = posts.value.find(item => item.Email === key);
    return foundItem ? foundItem.Email : '';
});

const logout = () => {
    let key = localStorage.getItem("key")
    key = ''
    localStorage.setItem("key", key)
    return router.replace('/login')
}
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

#nav {
    /* display: flex;
        justify-content: space-evenly; */
    justify-content: center
}

#sub {
    display: flex;
    gap: 5px;
}

tbody {
    background-color: aliceblue;
}

th {
    background-color: chocolate;
}

td {
    background-color: bisque;
}

.main {
    margin: 15px auto;
    max-width: 450px;
    /* border: 1px solid black; */
    border-radius: 10px;
    text-align: left;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.row {
    padding: 8px;
}

button {
    text-align: center;
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
