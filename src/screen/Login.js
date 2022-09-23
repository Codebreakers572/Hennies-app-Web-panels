import { Link } from "react-router-dom"
import logo from '../assets/logo2.png'
import { useDispatch, useSelector } from "react-redux";
import { selectProgressBarState } from "../redux/Actions/ProgressBarActions";
import { adminLogin } from "../redux/Actions/ProfileActions";
import { useAlert } from 'react-alert'
import { useState } from "react";
import { axiosInstance } from "../constants/axiosInstance";
import { Loader } from "../components/minor-components/Loader";
import { useNavigate } from 'react-router';
export const Login = () => {
    const navigate = useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch()
    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );
    // const [email , setEmail] = useState('')
    // const [password , setPassword] = useState('')
    
    const [credentials, setcredentials] = useState({
        email: "",
        password: ""
      });

    const sendCreds=async()=>{
        dispatch(selectProgressBarState(true))
        // const res = await axiosInstance.post('/api/v1/admin/login', {
            
        //      email,password 
            
        //     })

        const { email, password } = credentials;
        const res = await axiosInstance.post('/api/v1/admin/login', {email , password })
        console.log(res.data + "  Res data" )
        if (res.data.success ) {
            dispatch(selectProgressBarState(false))
            dispatch(adminLogin(res.data.token))
            localStorage.setItem('token' , res.data.token)
            console.log(localStorage + " Locals Data")
            navigate('/')
            alert.show('Logged in successfully')

        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show(res.data.message)
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      };
    return (
        <>
        {!loading ? (
            <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-lg text-black w-full">
                    <img className='w-36 mx-auto' src={logo} alt="logo" />
                    <h1 className="mb-8 text-md my-4 text-center text-2xl">SIGN IN</h1>
                    <h2 className="text-sm my-2.5">Email</h2>
                    <input
                        type="email"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="email"
                        value={credentials.email} 
                        onChange={onChange}
                        placeholder="Email" />
                    <h2 className="text-sm my-2.5">Password</h2>
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="password"
                        valvalue={credentials.password}
                        onChange={onChange}
                        placeholder="Password" />

                    <button
                        type="submit"
                        className="w-full text-center py-2 rounded bg-myBg hover:bg-green-dark focus:outline-none my-1"
                        onClick={sendCreds}
                        disabled={credentials.email && credentials.password ? false :true}
                    >Login</button>

                    <div className="text-left text-sm text-grey-dark mt-4 my-4">
                        Do not  have an account? <span className="text-blue-600"><Link to='/signup'>Sign Up</Link></span>

                    </div>
                </div>
            </div>
        </div>
        ) :(
            <Loader />
        )}
       
        </>
    )
}