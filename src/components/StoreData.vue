<script>
import axios from 'axios';

export default {
    data() {
        return {
            posts: [],
            id: '',
            title: '',
            body: ''
        }
    },
    mounted() {
        axios
            .get('http://localhost:4000/user')
            // .then(response => this.posts = response.data)
            .then((response) => response.data)
            .then((json) => console.log(json));

        // axios
        // .post('https://jsonplaceholder.typicode.com/posts',{
        //     "id": "7",
        //     "name": "Apple MacBook Pro 16",
        //     "data": {
        //         "year": 2019,
        //         "price": 1849.99,
        //         "CPU model": "Intel Core i9",
        //         "Hard disk size": "1 TB"
        //     },
        //     "createdAt": "2022-11-21T20:06:23.986Z"
        // })
        // .then(response => console.log("post------",response))
        // axios
        //     .put('https://jsonplaceholder.typicode.com/posts/1', {
        //         id: 1,
        //         title: 'foo',
        //         body: 'bar',
        //         userId: 1,
        //     })
        //     .then(response => console.log("put-------",response))

        // axios
        //     .patch('http://localhost:3000/products/1',{
        //         title: 'foo',
        //     })
        //     .then(response =>this.posts = response.data)

        // axios
        //     .delete('https://jsonplaceholder.typicode.com/posts/1')
        //     .then(response => console.log("delete-------",response))
    },
    // methods: {
    //     change(){
    //          axios
    //         .patch('http://localhost:3000/products/' + this.id,{
    //                 id: this.id,
    //                 title: this.title
    //             })
    //             .then(response =>this.posts = response.data)
    //             location.reload()
    //             // e.preventDefault();

    //     },
    //     deletee(){
    //         axios
    //         .delete('http://localhost:3000/products/'+ this.id)
    //         .then(response =>this.posts = response.data)

    //             location.reload()
    //     },
    //     postt(){
    //         axios
    //             .post('http://localhost:3000/products/',{
    //                 "userId": 11,
    //                 "id": this.id,
    //                 "title": this.title,
    //                 "body":this.body
    //             })
    //             .then(response => this.posts = response.data)
    //     }

    // }

}
</script>
