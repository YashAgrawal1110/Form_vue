<template>
  <div id="navbar">
    <router-link id="rtext" :to="{name:'Home'}">Home</router-link>
    <router-link id="rtext"  to="/dashboard">Dashboard</router-link>
    <router-link id="rtext"  to="/taskManager">Task Manger</router-link>

    <button id='logout' @click="logout">logout</button>
</div>




  <!-- <div>dashboard</div> -->
  <div id="nav">
    <div class="main">
        <h3>Add Tasks</h3>
        <form>
          <label for="">Task</label>
          <!-- <input type="text" placeholder="Task" v-model="addData"  @input="taskInput"/> -->
          <input type="text" placeholder="Task" v-model="addData"  @input="taskInput"/>
          <div id="taskerr"></div>
          <div v-show=" addData.length > 0 ">
        <p class="error" v-if="!isaddData">Task must be atleat 2 character</p>
        <p class="noerror" v-else> valid Task.</p>
    </div>
          <label for="">Description</label>
          <textarea name="" id="" placeholder="Description" v-model="addDescription"  @input="desInput"></textarea>
          <div id="decerr"></div>
          <div v-show=" addDescription.length > 0 ">
        <p class="error" v-if="!isdesData">Task must be atleat 10 character</p>
        <p class="noerror" v-else> valid</p>
      </div>
            <div id="wrap">
              <button @click="add">Add</button>
            </div>
        </form>
        <!-- <button @click="logout">logout</button> -->
    </div>
</div>
  <!-- <showTodo/> -->



<!-- 
  <form>
    <label for="">TASk</label><input type="text" placeholder="Task" v-model="addData"/>
    <br>
    <label for="">Description</label><textarea name="" id="" ></textarea>
    <button @click="add">Add</button>
  </form>
  <button @click="logout">logout</button> -->



</template>

<script setup>
import {  ref, defineProps } from 'vue';
import {
    useRouter
} from 'vue-router'
// import showTodo from './ShowTodo.vue'
import { useTaskStore } from '@/store/todoStore';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const taskStore = useTaskStore()

console.log(taskStore)

const router = useRouter();

const logout = () => {
    let key = localStorage.getItem("key")
    key = ''
    localStorage.setItem("key", key)
    return router.replace('/login')
}

let key = localStorage.getItem("key");
console.log(key)




// console.log(object)
taskStore.getdata1()
// taskStore.give
// console.log(taskStore.id)
const id = taskStore.getid1()

console.log(id)

const addData = ref([])
const isaddData = ref(false)
const addDescription = ref('')
const isdesData = ref(false)


function taskInput(){
  const taskRegex = /^[a-zA-Z0-9][\w\d\s]{1,}$/;
  isaddData.value = taskRegex.test(addData.value)
  console.log("tasssssssssssssssssssssssss",isaddData.value)
  if (!addData.value) {
    document.getElementById('taskerr').innerHTML = 'Task must be there'
    document.getElementById('taskerr').style.color = 'red'

  }else{
    document.getElementById('taskerr').innerHTML = ''

  }

}

function desInput(){
  const desRegex = /^[a-zA-Z0-9][\w\d\s]{9,}$/;
  isdesData.value = desRegex.test(addDescription.value)
  console.log("tasssssssssssssssssssssssss",isdesData.value)

  if (!addDescription.value) {
    document.getElementById('decerr').innerHTML = 'Description must be there'
    document.getElementById('decerr').style.color = 'red'

  }
  else{
    document.getElementById('decerr').innerHTML = ''
  }

}



function add(e){
  
if (isaddData.value == true && isdesData.value == true && addDescription.value.length > 0) {
  console.log(addData.value)
  taskStore.getTask()
  const data = {
  createdBY:id,
  task:addData.value.trim(),
  description:addDescription.value,
  isPass:"false",
  
}
taskStore.post(data)
toast("Task Added...",{
                autoClose: 1000,
            })
addData.value=""
addDescription.value = ""
document.getElementById('taskerr').innerHTML = ''

document.getElementById('decerr').innerHTML = ''

}else{
  document.getElementById('decerr').innerHTML = 'Description must be there'
  document.getElementById('decerr').style.color = 'red'
  document.getElementById('taskerr').innerHTML = 'Task must be there'
  document.getElementById('taskerr').style.color = 'red'
  toast("Please add task...",{
                autoClose: 1000,
            })
}





e.preventDefault();


}
let date = new Date()
console.log(Date.parse(date))

defineProps({
  taskk : String,
  descriptions : String,
  addData:String
})





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
    margin-top: 15px;
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

input,textarea {
    display: block;
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 5px;
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

#wrap {
    display: flex;
    justify-content: center;
    align-items: center;
}
.error{
  color: red;
}
.noerror{
  color: green
}
</style>