<template>
<div class="task">
    <!-- -->
    <h3>{{ props.todo.task }} </h3>
</div>
</template>

    
<script setup>
// import {
//     useTaskStore
// } from '@/stores/TaskStore';
import {
    defineProps
} from 'vue';

const props = defineProps({
    task: Object
})
// 
// const taskStore = useTaskStore()
</script>

    
<style scoped>
.task {
    padding: 6px 20px;
    background: #fff;
    border-radius: 4px;
    margin-top: 20px;
    margin-bottom: 10px;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.icons {
    display: inline-block;
}

i img {
    height: 15px;
}

i {
    cursor: pointer;
}
</style>
