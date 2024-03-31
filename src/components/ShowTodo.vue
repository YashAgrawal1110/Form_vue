<template>
 <div id="navbar">
    <router-link id="rtext" :to="{name:'Home'}">Home</router-link>
    <router-link id="rtext"  to="/dashboard">Dashboard</router-link>
    <router-link id="rtext"  to="/taskManager">Task Manger</router-link>

    <button id='logout' @click="logout">logout</button>
</div>
    <!-- -->
    <nav class="filter">
        <!-- <button @click="filter =  'all'">All</button> -->
        <button @click="filter = 'Pending'">Pending</button>
        <button @click="filter = 'false'">Complete</button>
    </nav>
  
  <!-- <div v-if="filter ===  'all'">
    <div v-for="task in u" :key="task" >
         <div id="c" v-for="t in task" :key="t">
            <div id="card">
                <h3>{{ t.task }}</h3>
                <p>{{ t.description }}</p>
                <button @click="taskStore.deleteData(t.id)">remove</button>
                <button @click="taskStore.togglePass(t.id)">done</button>
             </div>
          </div>
        </div>
  </div> -->
<!-- {{filteredData}} -->


  <div v-if="filter === 'false' && filteredData" class="scrollable-div">
    <div v-for="task in filteredData" :key="task" id="c">
            <div id="card"  v-if="filteredData.length > 0">
                <h3>{{ task.task }}</h3>
                <p>{{ task.description }}</p>
                <button @click="taskStore.deleteData(task.id)">remove</button>
                
          </div>
          <div v-if="filteredData.length === 0">
              ggfdg rt retr ret
          </div>
    </div>
</div>


<div v-if="filter === 'Pending' && pendingData" class="scrollable-div">
    <div v-for="task in pendingData" :key="task" id="c">
            <div id="card">
                <h3>{{ task.task }}</h3>
                <p>{{ task.description }}</p>
                <button @click="taskStore.deleteData(task.id)">remove</button>
                <button @click="taskStore.togglePass(task.id)">done</button>
                
          </div>
    </div>
</div>
      
    
  
</template>

<script setup>
import {ref , onMounted  } from 'vue';
import { useTaskStore } from '@/store/todoStore';
import axios from "axios";
import {
    useRouter
} from 'vue-router'
const router = useRouter();



const filter = ref("all")
const taskStore = useTaskStore()


const tasks = [taskStore.tasks]


localStorage.setItem('task',JSON.stringify(tasks))




const logout = () => {
    let key = localStorage.getItem("key")
    key = ''
    localStorage.setItem("key", key)
    return router.replace('/login')
}


onMounted( ()=>{
  filter.value = 'Pending'
  getData().then((res)=>{
    console.log('STEP 1 FROM MOUTED:::;',res)
  })
  .catch((eer)=>{
    console.log(eer);
  })
})



console.log(tasks)


// async function getData() {
//   return new Promise((resolve, reject) => {
//     let key = localStorage.getItem("iddd");
//     console.log(key);
//     axios.get(`http://localhost:3000/todo?createdBY=${key}`)
//       .then(response => {
//         console.log(`Received data:`, response.data);

//         console.log(response.data.filter((t) => t.isPass ==="false"))
//         resolve(response.data); 
//       })
//       .catch(error => {
//         console.error('Error getting data:', error);
//         reject(error); 
//       });
//   });
// }

const filteredData = ref([])
const pendingData = ref([])
const allData = ref([])
async function getData() {
  try {
    let key = localStorage.getItem("iddd");
    console.log(key);
    const response = await axios.get(`http://localhost:3000/todo?createdBY=${key}`)
    console.log(`Received data:`, response.data);

    filteredData.value = response.data.filter(t => t.isPass === "done");
    pendingData.value = response.data.filter(t => t.isPass === 'false')
    allData.value = response.data.filter(t => t.isPass === 'false' && t.isPass === 'done')

    console.log(filteredData.value);
    return filteredData.value;
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
}


// function getData() {
  
//     let key = localStorage.getItem("iddd");
//     console.log(key);
//     axios.get(`http://localhost:3000/todo?createdBY=${key}`)
//       .then(response => {
//         console.log(`Received data:`, response.data);
//         ar.value = response.data
// console.log(ar.value)
// return ar.value
// })
  
//       .catch(error => {
//         console.error('Error getting data:', error);
    
    
//   });
// }


// function check(){
//     return data1.value.filter(t => t.isPass === true)
// }
// console.log(check())
//   console.log(data1.value)

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
.scrollable-div {
  margin: auto;

  /* max-width: 1300px; */
  width: 25%;
  height: 500px; /* set a fixed height for the div */
  overflow-y: scroll; /* enable vertical scrollbar */
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
    /* width: 100%; */
    font-size: 16px;
}
#c{
    margin: auto;
    background-color: aliceblue;
    /* display: flex; */
    /* padding: 15px; */
    /* height: 25px; */
    /* width: 25%; */
    text-align: left;

}
.filter{
  width: 640px;
  margin: 10px auto;
  text-align: right;
}
</style>