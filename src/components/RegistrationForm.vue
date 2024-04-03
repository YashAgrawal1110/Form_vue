<template>
<form @submit.prevent="submitForm">
    <h3>Enter your details for Registration</h3>
    <!-- First Name -->
    <label>First Name</label>
    <input id="fname" type="text" v-model="nameInput" v-bind="text" @input="validateName" @keydown="handleKeyDown" placeholder="First Name">
    <!-- <div>
            <p id="error" v-if="!isValidName">please enter name</p>
          </div> -->
    <div id="nameerr" v-if="!isValidName"></div>
    <div v-show=" nameInput.length > 0 ">
        <p class="error" v-if="!isValidName">First Name must be atleat 2 character</p>
        <p class="noerror" v-else> valid Name.</p>
    </div>

    <!-- Last Name -->
    <label>Last Name</label>
    <input id="lname" type="text" v-model="lnameInput" v-bind="text" @input="validateLname" @keydown="handleKeyDown" placeholder="Last Name">
    <div id="lnameerr" v-if="!isValidLname"></div>
    <div v-show="lnameInput.length > 0">
        <p class="error" v-if="!isValidLname">Last Name must be atleat 2 character</p>
        <p class="noerror" v-else> valid Last Name</p>
    </div>

    <!-- Date of Birth -->
    <label>Date of Birth</label>
    <!-- <VueDatePicker id="birthday" class="dob" v-model="birthDate" @input="validateDate" :max-date="new Date()"></VueDatePicker> -->
    <input type="date" id="birthday" class="dob" v-model="birthDate" @input="validateDate" :max="maxDate">
    <div id="doberr" v-if="!isbirthDate">{{ }}</div>
    {{ birthDate }}
    <div v-show="isbirthDate == !NaN">
        <p class="error" v-if="!isbirthDate">Please Enter Date</p>
        <p class="noerror" v-else> Valid Date</p>
    </div>
    <label>Age</label>
    <input type="text" class="dob" id="age" disabled placeholder="Age">

    <!-- <div> -->
    <label for="emailInput">Enter your email:</label>
    <input type="email" id="emailInput" v-model="emailInput" @input="validateEmail" @keydown="handleKeyDown" placeholder="Email">
    <div id="emailerr" v-if="!isValidEmail"></div>
    <div v-show=" emailInput.length > 0">
        <p class="error" v-if="!isValidEmail">Please enter a valid email address.</p>
        <p class="noerror" v-else> valid email address.</p>
    </div>
    <!-- </div> -->

    <label>Hobbies</label><br>
    <input id="travel" type="checkbox" value="travel" v-model="hobbiesInput" :oninput=validateCheck()><label for="travel">Travel</label>
    <input id="music" type="checkbox" value="music" v-model="hobbiesInput" :oninput=validateCheck()><label for="music">MUSIC</label>
    <input id="sport" type="checkbox" value="sport" v-model="hobbiesInput" :oninput=validateCheck()><label for="sport">SPORT</label>
    <div v-if="!isChecked">{{ errorMessage }}</div>
    <div id="hobbieerr" v-if="!isChecked"></div>

    <div v-show="hobbiesInput.length >= 0">
        <span v-if="!isChecked"></span>
        <p class="noerror" v-else>{{ Selected }}</p>
        <!-- {{ hobbiesInput }} -->
    </div>

    <label>Gender</label><br>
    <input type="radio" value="Male" id="Male" v-model="radioInput" checked> <label for="Male">Male</label>
    <input type="radio" value="Female" id="Female" v-model="radioInput"> <label for="Female">Female</label>
    <!-- {{ radioInput }} -->

    <!-- <div>
        <label for="">Country</label>
        <select v-model="selected" @click="select()">
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>
          <div v-show=" selected.length > 0">
            <p id="error" v-if="!isSelected">Please Select atleast One Hobbies</p>
          <p id="noerror" v-else>Selected</p>
          </div>
      </div> -->

    <div>

        <label for="">Country</label>
        <select id="country" v-model="selected" @click="select()">
            <option value="" hidden>Select a country</option>
            <option value="india">India</option>
            <option value="vietnam">Vietnam</option>
            <option value="singapore">Singapore</option>
        </select>

        <div id="countryerr" v-if="!isSelected"></div>
        <div v-show=" selected.length > 0">
            <p class="error" v-if="!isSelected"></p>
            <p class="noerror" v-else>Selected</p>
        </div>
    </div>

    <div>
        <label for="">Password</label>
        <input type="text" id="password" placeholder="Password" v-bind="text" v-model="passwordInput" @input="validatePassword" @keydown="handleKeyDown">
        <div id="passwordErr" v-if="!isValidPassword"></div>
        <div v-show=" passwordInput.length > 0 ">
            <p class="error" v-if="!isValidPassword">Please enter strong</p>
            <p class="noerror" v-else> valid Password.</p>
        </div>

        <label for="">Confirm Password</label>
        <input type="text" id="confirmpassword" placeholder="Confirm Password" v-bind="text" v-model="conPasswordInput" @input="validateConPassword" @keydown="handleKeyDown">
        <div id="conpasswordErr" v-if="!isValidComPassword"></div>
        <div v-show=" conPasswordInput.length > 0 ">
            <p class="error" v-if="!isValidComPassword">Please enter Same password</p>
            <p class="noerror" v-if="isValidComPassword"> valid Password.</p>
        </div>
    </div>

    <button @click="submit()">
        Submit
    </button>
    <p>Already Have Account?
        <router-link to="/login" style="text-decoration: none;">
            Login
        </router-link>
    </p>
</form>
</template>

    
<script setup>
import {
    watch,
    ref,
    computed

} from 'vue';
// import {onMounted } from 'vue'
import axios from 'axios';
import {
    useRouter
} from 'vue-router';
const router = useRouter()
// import {
//     useTaskStore
// } from '@/store/todoStore';
// import VueDatePicker from '@vuepic/vue-datepicker';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
let white_space = /\s/;

const handleKeyDown = (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        // Handle space key press
    }
};

const today = new Date();
const maxDate = computed(() => {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
});

const nameInput = ref('')
const isValidName = ref(false)

function validateName() {
    // document.getElementById('error').innerHTML = 'gdsfgsdgdfg'
    const firstNameRegex = /^[a-zA-Z]{2,10}/;
    isValidName.value = firstNameRegex.test(nameInput.value);
    if (!nameInput.value) {
        document.getElementById('nameerr').innerHTML = 'First name must be there'
    } else if (nameInput.value.match(white_space)) {
        document.getElementById('nameerr').innerHTML = 'should not be blank space'
    }
}

const lnameInput = ref('')
const isValidLname = ref(false)

function validateLname() {
    const LastNameRegex = /^[a-zA-Z]{2,10}/;
    isValidLname.value = LastNameRegex.test(lnameInput.value)
    if (!lnameInput.value) {
        document.getElementById('lnameerr').innerHTML = 'Last name must be there'
    }
}

let birthDate = ref(null)
let isbirthDate = ref(false)
let year = ref('')

function validateDate() {
    const current_date = new Date()
    const diff = current_date - new Date(birthDate.value)
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    year = ref((Math.floor(days / 365)))

    
    if (birthDate.value >= maxDate.value) {
        alert('The input date is in the future.');
        year.value = ""
        let input = document.getElementById('age')
        input.setAttribute('value', year.value)
        return isbirthDate.value = false

    }else if (isNaN(birthDate.value)) {
    const current_date = new Date()
    const diff = current_date - new Date(birthDate.value)
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    year = ref((Math.floor(days / 365)))
      let input = document.getElementById('age')
      input.setAttribute('value', year.value)
        return isbirthDate.value = true
    } else {
        // year.value = ""
        // derrorMessage.value = 'Date of birth must be there';
        return isbirthDate.value = false
    }  
}
const emailInput = ref('');
const isValidEmail = ref(false);

function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValidEmail.value = emailRegex.test(emailInput.value);

    axios.get("http://localhost:3000/data")
    .then((res) => {

       const emailE = res.data.some((item) => item.Email == emailInput.value)

    console.log(emailE)
        if (emailE) {
            toast("Email Exist",{
                autoClose: 1000,
            })
        } 
    }).catch(()=>{
        console.log("e")
    })

    if (!emailInput.value) {
        document.getElementById('emailerr').innerHTML = 'Email must be there'
    }
}

var hobbiesInput = ref([])
// console.log("hhhhhhhhh--",hobbiesInput.value)
const isChecked = ref(false)
const errorMessage = ref('');
const Selected = ref('')

function validateCheck() {

    // if (!hobbiesInput.value) {
    //     document.getElementById('hobbieerr').innerHTML = 'Hobbies must be there'
    //    }

    watch(hobbiesInput, (newValue) => {
        if (newValue.length === 0) {
            document.getElementById('hobbieerr').innerHTML = 'Hobbies must be there';
            document.getElementById('hobbieerr').style.color = 'red'
        } else {
            document.getElementById('hobbieerr').innerHTML = 'selected';
            document.getElementById('hobbieerr').style.color = 'green'
            // Clear the error message if hobbies are provided
        }
    });

    // watch(hobbiesInput, (newValue) => {
    //     if (newValue.length === 0) {
    //         errorMessage.value = 'Hobbies must be there';
    //     } else {
    //       Selected.value = 'selected'; // Clear the error message if hobbies are provided
    //     }
    // });

}

const radioInput = ref('Male')

const selected = ref('')
const isSelected = ref(false)

function select() {

    if (!selected.value) {
        document.getElementById('countryerr').innerHTML = 'Country must be there'
    }

    if (selected.value) {
        return isSelected.value = true
    } else {
        return isSelected.value = false
    }
}

// const taskStore = useTaskStore()
// const newData = ref('')
// const data = computed(() => {
//     return taskStore.userDetail
// })

const passwordInput = ref('')
const isValidPassword = ref(false)

function validatePassword() {
    const emailRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    isValidPassword.value = emailRegex.test(passwordInput.value);
    if (!passwordInput.value) {
        document.getElementById('passwordErr').innerHTML = 'Password must be there'
    }
}

const conPasswordInput = ref('')
const isValidComPassword = ref(false)

function validateConPassword() {
    // const pas = passwordInput.value
    // isValidComPassword.value = passwordInput.value.test(conPasswordInput.value)
    if (conPasswordInput.value === passwordInput.value) {
        return isValidComPassword.value = true
    }
    
    if (!conPasswordInput.value) {
        document.getElementById('conpasswordErr').innerHTML = 'Confirm Password must be there'
    }
    return isValidComPassword.value = false
}

// function submit() {

// console.log(isValidName.value )
// console.log(isValidLname.value )
// console.log(isbirthDate.value )
// console.log(isValidEmail.value )
// console.log(isChecked.value )
// console.log(isSelected.value )

// console.log(nameInput.value)
// console.log(lnameInput.value)
// console.log(birthDate.value)
// console.log(year.value)
// console.log(emailInput.value)
// console.log(hobbiesInput.value)
// console.log(radioInput.value)
// console.log(conPasswordInput.value)
// const data = computed(() => {
//     return taskStore.userDetail
// })
// const emailE = data.value.find((item) => item.email == emailInput.value || "")
//     if (emailE) {
//         alert("Email Exist")
//     } else 
//     if (isValidName.value == true && isValidLname.value == true && isbirthDate.value == true && isValidEmail.value == true && isChecked.value == false && isSelected.value == true) {
//         alert("registering....")
//         onMounted(() => {

//             axios
//                 .post('http://localhost:3000/data/',{
//                     "firstName": nameInput.value,
//                     "lastName": lnameInput.value,
//                     "DateOfBirth": birthDate.value,
//                     "Age": year.value,
//                     "Email":emailInput.value,
//                     "hobbies":hobbiesInput.value,
//                     "gender": radioInput.value,
//                     "pass": conPasswordInput.value
//                 })
//                 // .then(response => this.posts = response.data)
//                 .then((response) => response.data)
//                 .then((json) => console.log(json));
//             })
//                 } else {
//                     alert("please fill all data")
//                 }

//                 const posts = ref([])

//             axios
//                 .get('http://localhost:3000/data')
//                 .then((response) => {
//                 console.log(response.data);
//                 response.data.forEach((x) => {
//                 posts.value.push(x) 
//             })
//             })

//     if (!isValidName.value) {
//         document.getElementById('nameerr').innerHTML = "Please Enter First Name"
//     }

//     if (!isValidLname.value) {
//         document.getElementById('lnameerr').innerHTML = "Please Enter Last Name"
//     }

//     if (!isbirthDate.value) {
//         document.getElementById('doberr').innerHTML = "Please Select Date"
//     }

//     if (!isValidEmail.value) {
//         document.getElementById('emailerr').innerHTML = "Please Enter Email"
//     }

//     if (!hobbiesInput.value.length) {
//         document.getElementById('hobbieerr').innerHTML = "Please Select at least one hobbies"
//     }

//     if (!isSelected.value) {
//         document.getElementById('countryerr').innerHTML = "Please Select the Country"

//     }
//     if(!isValidPassword.value){
//       document.getElementById('passwordErr').innerHTML = "Please Enter Password"
//     }
//     // onMounted(fetchData);
// }

// .then((response) => response.data)
// .then((json) => console.log(json.email));
// const emailsForEach = [];
// data1.data.forEach(item => {
//   emailsForEach.push(item.Email);
// });

// console.log(emailsForEach);

async function submit() {
    const isValidNamee = nameInput.value
    const isValidLnamee = lnameInput.value;
    // const isbirthDatee = birthDate.value;
    const isValidEmaill = /\S+@\S+\.\S+/.test(emailInput.value);
    const isCheckedd = hobbiesInput.value;
    const isSelectedd = selected.value;
    // const isValidPasswordd = conPasswordInput.value;


    // axios.get("http://localhost:3000/data")
    // .then((res) => {
    //    const emailE = res.data.some((item) => item.Email == emailInput.value)
    //     if (emailE) {
    //         toast("Email Exist",{
    //             autoClose: 1000,
    //         })
    //     } else if (isValidNamee && isValidLnamee && isbirthDatee && isValidEmaill && !isCheckedd && isSelectedd && isValidPasswordd) {
    //     try {
    //         // alert("Registering...");
    //         toast("Registering...",{
    //             autoClose: 1000,
    //         })
    //        axios.post("http://localhost:3000/data/", {
    //             firstName: nameInput.value.trim(),
    //             lastName: lnameInput.value.trim(),
    //             DateOfBirth: birthDate.value.trim(),
    //             Age: year.value,
    //             Email: emailInput.value.trim(),
    //             hobbies: hobbiesInput.value,
    //             gender: radioInput.value,
    //             pass: conPasswordInput.value.trim(),
    //         });

    //         // console.log("Data posted:", response.data);
    //         router.push({
    //             name: 'login'
    //         })
 
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // } else {
    //     toast("Please Fill the Form",{
    //             autoClose: 1000,
    //         })
    // }
    // })


 axios.get("http://localhost:3000/data")
    .then((res) => {
       const emailE = res.data.some((item) => item.Email == emailInput.value)
        if (emailE) {
            toast("Email Exist",{
                autoClose: 1000,
            })
        } else if (isValidNamee && isValidLnamee && isbirthDate.value == true && isValidEmaill && isCheckedd && isSelectedd && isValidComPassword.value) {
        try {
            // alert("Registering...");
            toast("Registering...",{
                autoClose: 1000,
            })
            axios.post("http://localhost:3000/data/", {
                firstName: nameInput.value.trim(),
                lastName: lnameInput.value.trim(),
                DateOfBirth: birthDate.value.trim(),
                Age: year.value,
                Email: emailInput.value.trim(),
                hobbies: hobbiesInput.value,
                gender: radioInput.value,
                pass: conPasswordInput.value.trim(),
            });

            // console.log("Data posted:", response.data);
            router.push({
                name: 'login'
            })
 
        } catch (error) {
            console.error("Error:", error);
        }
    } else {
        toast("Please Fill the Form",{
                autoClose: 1000,
            })
    }
})



    

    if (!isValidName.value) {
        document.getElementById('nameerr').innerHTML = "Please Enter First Name"
    }

    if (!isValidLname.value) {
        document.getElementById('lnameerr').innerHTML = "Please Enter Last Name"
    }

    if (!isbirthDate.value) {
        document.getElementById('doberr').innerHTML = "Please Select Date"
    }

    if (!isValidEmail.value) {
        document.getElementById('emailerr').innerHTML = "Please Enter Email"
    }

    if (!hobbiesInput.value.length) {
        document.getElementById('hobbieerr').innerHTML = "Please Select at least one hobbies"
    }

    if (!isSelected.value) {
        document.getElementById('countryerr').innerHTML = "Please Select the Country"

    }
    if(!isValidPassword.value){
      document.getElementById('passwordErr').innerHTML = "Please Enter Password"
    }

    if (!isValidComPassword.value) {
        document.getElementById('conpasswordErr').innerHTML = "Please Enter samePassword"
    }
    // onMounted(fetchData);

}
</script>

    
<style scoped>
form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    /* padding: 10px 20px; */
    /* transition: transform 0.2s; */
    /* width: 500px; */
    /* text-align: center; */
}

label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    /* font-size: 0.6em; */
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    /* display: block; */
    /* width: 100%; */
    margin-top: 10px;
    margin-bottom: 5px;
    /* text-align: left; */
    color: #555;
    font-weight: bold;
}

input {
    /* display: block; */
    /* width: 100%; */
    margin-bottom: 15px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 5px;
}

#emailInput,
#fname,
#lname,
.dob,
#country,
#password,
#confirmpassword {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    color: #555;
    border: 1px solid #ddd;
    border-radius: 5px;
    /* border-bottom: 1px solid #ddd; */
}

.error,
#nameerr,
#lnameerr,
#doberr,
#emailerr,
#hobbieerr,
#countryerr,
#passwordErr,
#conpasswordErr {
    color: red;
}

.noerror {
    color: green;
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

h3 {
    text-align: center;

}
</style>
