import { defineStore } from "pinia";
import axios from "axios";



export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    posts: [],
    tasks:[],
    key: (localStorage.getItem("key")) || '', // Initialize key as an empty string if not found in localStorage
    jkid: ''
  }),
  getters: {
    gggg(){
      return this.tasks
    },
    pass(){
      console.log(this.tasks.filter(t => t.isPass))
      return this.tasks.filter(t => t.isPass === true)
  },
    give() {
      console.log(this.posts);
      console.log(typeof this.key);
      const foundItem = this.posts.some(item => item.Email === this.key);
      console.log(foundItem);
      this.jkid = foundItem ? foundItem.id : '';
    },
  },
  actions: {
    async post(data) {
      try {
        // const response = await axios.post("http://localhost:3000/todo/", data);
        const response = await axios.post(`http://localhost:3000/todo?id${this.jkid}`, data);
        this.posts = response.data;
        console.log(response.data);
        this.getTask()
      } catch (error) {
        console.error("Error posting data:", error);
      }
    },
    async getdata1() {
      try {
        const response = await axios.get("http://localhost:3000/data");
        this.posts.push(...response.data);
        console.log(response.data);
      } catch (error) {
        console.log("");
      }
    },
    getid1() {
      this.jkid = localStorage.getItem('iddd')
      console.log(this.jkid);
      return this.jkid;
    },
    async getTask() {
      const iddd = (localStorage.getItem('iddd'))
      try {
        // const response = await axios.get(`http://localhost:3000/todo/${this.jkid}`);
        const response = await axios.get(`http://localhost:3000/todo?createdBY=${iddd}`);
        this.tasks = (response.data);
        console.log( this.tasks);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    },
   async deleteData(id) {
    console.log("tgdfffffffffffffffffffffffffffffffffff",this.tasks)
    // let a = []
      await axios.delete(`http://localhost:3000/todo/${id}`)
        .then(response => {
          console.log(`Deleted post with ID ${id}`);
          console.log(response.data)
          this.tasks
          console.log("tgdfffffffffffffffffffffffffffffffffff",this.tasks)
          // a =  this.tasks[0]
          return this.tasks // Optionally return the response if needed
        })
        .catch(error => {
          console.error('Error deleting data:', error);
          throw error; // Optionally rethrow the error for handling elsewhere
        });
        // this.tasks[0].forEach((e) => {
          // this.tasks[0]
        //   a.push(e)
        // })
        // console.log("dddddddddddddddddddddddddddddd",a)
    },
   async togglePass(id){
      console.log(this.tasks)
      console.log(id)
      const data = this.tasks.find(t => t.id === id)
      // data.isPass = !data.isPass
      console.log(data)
      this.tasks
      // console.log(object)
      // location.reload(data);

      return await axios.patch(`http://localhost:3000/todo/${id}`,{
          "isPass":"done"
      })
      
  }
  },
});
