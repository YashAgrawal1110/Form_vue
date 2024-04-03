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
  

  <div v-if="filter === 'false' && abc" class="scrollable-div"  >
    <div v-for="task in getPaginated" :key="task" id="c" v-show="abc.length > 0">
            <div id="card"  v-if="abc.length > 0">
                <h3 >{{ task.task }}</h3>
                <!-- <input v-else v-model="value" @blur="editMode = false" /> -->
                <p>{{ task.description }}</p>
                <button @click="deletetask(task.id)">remove</button>
          </div>
          <div v-show="abc.length === 0">
                       You need to add task
          </div>

    </div>
    <div v-show="abc.length === 0">
       You need to add task
    </div>
    <div>
      <button @click="previous" :disabled="page === 1">Previous</button>
      <span>Page {{ page1 }} of {{ totalPage }}</span>
      <button @click="next" :disabled="page1 === totalPage">Next</button>
    </div>
</div>





<div v-if="filter === 'Pending' && def " class="scrollable-div">
  <input type="search" placeholder="Search Task" id="checki" />
  <input type="button" id="check" value="check" @click="btnCheck()"/>

  <div v-if="btnCheck && result1" >
    <div v-for="(task,index) in result1" :key="index" id="c" >
      <div id="card">
                    <h3>{{ task.task }}</h3>
                    <p>{{ task.description }}</p>
                <div v-if="editMode && editingTaskId === task.id">
                  <input v-model="editedTask.task" /><br>
                   <textarea v-model="editedTask.description" rows="5" cols="62" /><br>
                  <button @click="saveEdi(task.id)">save</button>
                </div>
                <div v-else>
                  <button @click="editTas(task.id,index)">edit</button> 
                <button @click="deletetask(task.id)">remove</button>
                <button @click="statuschange(task.id)">done</button>
                </div>   
          </div>
    </div>
    <div v-if="result1.length == 0">
  no data found
</div>  
</div>



<div  class="hide">
  <div v-for="(task,index) in getPaginatedData" :key="index"  id="c"  v-show="def.length > 0">
            <div id="card">
                    <h3>{{ task.task }}</h3>
                    <p>{{ task.description }}</p>
                <div v-if="editMode && editingTaskId === task.id">
                  <input v-model="editedTask.task" /><br>
                   <textarea v-model="editedTask.description" rows="5" cols="62" /><br>
                  <button @click="saveEdit(task.id)">save</button>
                </div>
                <div v-else>
                  <button @click="editTask(task.id, index)">edit</button> 
                <button @click="deletetask(task.id)">remove</button>
                <button @click="statuschange(task.id)">done</button>
                </div>
          </div>
    </div>
    <div>
      <button @click="previousPage" :disabled="page === 1">Previous</button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page === totalPages">Next</button>
    </div>

</div>
  



    
<!-- <pagination v-model="page" :records="def.length" :per-page="limit" @paginate="myCallback"/> -->
<div v-show="def.length === 0">
       You need to add task
    </div>
</div>
<!-- <div v-else>

</div> -->
<!-- <div v-show="def.length == 0">
You need to add task  
</div> -->

    

<!-- <div v-if="filter === 'Pending' && def " class="scrollable-div" v-show="def.length > 0">
  <div v-for="(task, index) in def" :key="index" id="c">
      <div id="card">
        <h3>{{ task.task }}</h3>
        <p>{{ task.description }}</p>
        <button @click="deletetask(task.id)">remove</button>
        <button @click="statuschange(task.id)">done</button>
        <button @click="editTask(task.id, index)">edit</button> 
      </div>

      <div v-if="editMode && editingTaskId === task.id">
        <input v-model="editedTask.task" /><br>
        <input v-model="editedTask.description" />
        <button @click="saveEdit(index)">save</button>
      </div>
    </div>
</div>
<div v-if="def.length == 0">
You need to add task  
</div> -->
    


  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTaskStore } from '@/store/todoStore';
import axios from 'axios';
import { useRouter } from 'vue-router';

const page = ref(1);
const page1 = ref(1)
const limit = ref(5);
const editMode = ref(false);
const editingTaskId = ref(null);
const editedTask = ref({ id: null, task: '', description: '' });

const editTask = (id, index) => {
  editMode.value = true;
  editingTaskId.value = id;
  editedTask.value = { ...def.value[index] };
};


const editTas = (id, index) => {
  editMode.value = true;
  editingTaskId.value = id;
  editedTask.value = { ...result1.value[index] };
};




const saveEdit = (index) => {
  axios
    .patch(`http://localhost:3000/todo/${editedTask.value.id}`, {
      task: editedTask.value.task,
      description: editedTask.value.description,
    })
    .then(() => {
      getPaginatedData.value.splice(index, 1, editedTask.value);
      editMode.value = false;
      editingTaskId.value = null;
      editedTask.value = { id: null, task: '', description: '' };
      getData();
    })
    .catch((error) => {
      console.error('Error updating task:', error);
    });
};


const saveEdi = (index) => {
  axios
    .patch(`http://localhost:3000/todo/${editedTask.value.id}`, {
      task: editedTask.value.task,
      description: editedTask.value.description,
    })
    .then(() => {
      result1.value.splice(index, 1, editedTask.value);
      editMode.value = false;
      editingTaskId.value = null;
      editedTask.value = { id: null, task: '', description: '' };
      getData();
    })
    .catch((error) => {
      console.error('Error updating task:', error);
    });
};



const filter = ref('all');
const taskStore = useTaskStore();
const router = useRouter();

const tasks = taskStore.tasks;
localStorage.setItem('task', JSON.stringify(tasks));

const logout = () => {
  let key = localStorage.getItem('key');
  key = '';
  localStorage.setItem('key', key);
  return router.replace('/login');
};

onMounted(() => {
  filter.value = 'Pending';
  getData().then((res) => {
    console.log('STEP 1 FROM MOUNTED:::', res);
  }).catch((err) => {
    console.log(err);
  });
});

const deletetask = (id) => {
  alert('fdf');
  taskStore.deleteData(id);
  getData();
};

const statuschange = (id) => {
  taskStore.togglePass(id);
  getData();
};

const filteredData = ref([]);
const pendingData = ref([]);
const allData = ref([]);

const abc = computed(() => filteredData.value);
const def = computed(() => {
  getData();
  return pendingData.value;
});

const getData = async () => {
  try {
    let key = localStorage.getItem('iddd');
    const response = await axios.get(`http://localhost:3000/todo?createdBY=${key}`);
    filteredData.value = response.data.filter((t) => t.isPass === 'done');
    pendingData.value = response.data.filter((t) => t.isPass === 'false');
    allData.value = response.data.filter((t) => t.isPass === 'false' && t.isPass === 'done');
    return filteredData.value;
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};

const getPaginatedData = computed(() => {
  const start = (page.value - 1) * limit.value;
  const end = start + limit.value;
  return def.value.slice(start, end);
});
const totalPages = computed(() => Math.ceil(def.value.length / limit.value));
const previousPage = () => {
  if (page.value > 1) {
    page.value--;
  }
};
const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
  }
};


const getPaginated = computed(() => {
  const start = (page1.value - 1) * limit.value;
  const end = start + limit.value;
  return abc.value.slice(start, end);
});
const totalPage = computed(() => Math.ceil(abc.value.length / limit.value));
const previous = () => {
  if (page1.value > 1) {
    page1.value--;
  }
};
const next= () => {
  if (page1.value < totalPage.value) {
    page1.value++;
  }
};




let result1 = ref('')

function btnCheck() {
  let Check_value = document.getElementById("checki").value;
  // a = localStorage.getItem("AllData");
  // let aa = JSON.parse(a);
   result1.value = pendingData.value.filter((obj) => {
    return obj.task === Check_value;
  });
  console.log(result1.value);


  var x =document.getElementsByClassName('hide');
var i;
for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
}
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
.scrollable-div {
  margin: auto;
  width: 25%;
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
input {
    display: block;
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 5px;
}
</style>