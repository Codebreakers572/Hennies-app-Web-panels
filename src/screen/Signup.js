import { Link } from "react-router-dom"
import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../constants/axiosInstance";
import logo from '../assets/logo2.png'
import { authentication } from "../firebase-config";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { RecaptchaVerifier , signInWithPhoneNumber } from 'firebase/auth';


export const Signup = () => {

    const [credentials, setcredentials] = useState({
        firstName : "",
        lastName : "",
        email: "",
        password: ""
      });
      let navigate = useNavigate();
      const [value, setValue] = useState()
      // let alert = useAlert();
      const generateRecapture = () =>{
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
    
          }
        }, authentication);
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName , lastName ,email, password  } = credentials;
        const res = await axiosInstance.post('/api/v1/admin/signup', {firstName , lastName ,email, password })
        // const response =await fetch(
        //   "http://localhost:8080/api/v1/admin/signup",
        //   { 
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Authorization"       : localStorage.getItem('token')
        //     },
        //     body: JSON.stringify({name,email, password }),
        //  }
        // );
        // console.log(response);
        // const json = await response.json();
        // console.log(json.token +  " JSON token");
        // console.log(json +  "Its a JON");
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          generateRecapture();
          let appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(authentication , value , appVerifier)
          .then(conformatoinResult => {
           window.conformatoinResult = conformatoinResult;
           setTimeout(function(){
             console.log(value)
             navigate("/verification" , {state : {phoneNumber : value}});
         }, 4000);
          }).catch((error) => {
           console.log(error);
          })
          // alert.show('Logged in successfully')
        }else{
          // alert.show('Invalid')
        }
      };
    
      const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      };

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-lg text-black w-full">
                    <img className='w-36 mx-auto' src={logo} alt="logo" />
                    <h1 className="mb-8 text-md my-4 text-center text-2xl">SIGN UP</h1>
                    <form onSubmit={handleSubmit}>
                    <h2 className="text-sm my-2.5">First Name</h2>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="firstName"
                        value={credentials.firstName}
                        onChange={onChange}
                        placeholder="Full Name" />

                    <h2 className="text-sm my-2.5">Last Name</h2>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="lastName"
                        value={credentials.lastName}
                        onChange={onChange}
                        placeholder="Full Name" />
                    <h2 className="text-sm my-2.5">Email</h2>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        placeholder="Email" />
                    <h2 className="text-sm my-2.5">Phone Number</h2>
                    <PhoneInput
                        className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        international 
                        initialValueFormat="international"
                        countryCallingCodeEditable={false} 
                        defaultCountry="PK"
                        placeholder="Enter phone number"
                        value={value}
                        onChange={setValue}
                    />
                    <h2 className="text-sm my-2.5">Password</h2>
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                        placeholder="Password" />


                    <button
                        type="submit"
                        className="w-full text-center py-2 rounded bg-myBg hover:bg-green-dark focus:outline-none my-1"
                    >Sign Up</button>

                    <div className="text-left text-sm text-grey-dark mt-4 my-4">
                        Already have an account? <span className="text-blue-600"><Link to='/login'>Sign In</Link></span>
                    </div>
                        
                    </form>
                </div>
            </div>
            <div id="recaptcha-container">

            </div>
        </div>
    )
}