import {  useNavigate , useLocation } from "react-router-dom";
import React from "react";
import { useState } from "react";
import NavLogo from "../../assets/nav-logo.svg";
import { axiosInstance } from "../../constants/axiosInstance";
// import { Footer } from "./Footer";
// import { Navbar } from "./Navbar";

export const Otp = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [OTP , setOTP]   = useState('');
  console.log(location.state.phoneNumber);
  const PhoneNum = location.state.phoneNumber;
  console.log(PhoneNum)


  const addPhone = async () => {
    console.log(PhoneNum)
    const res = await axiosInstance.patch('/api/v1/admin/addadminNumber' , {PhoneNum} , {
        headers : {
            "authorization"       : localStorage.getItem('token')
        },
    });
    // const response = await fetch(
    //   "http://localhost:3000/api/v1/admin/addadminnumber",
    //   {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization"       : localStorage.getItem('token')
    //     },
    //     body: JSON.stringify({PhoneNumber}),
    //   }
    // );
    // const json =  res.json();
    console.log(res.data + " Phone No from JSON")
    setTimeout(function(){
      navigate("/" );
  }, 500);
    // if (json.success) {
      
    // }else{
    //   console.log("Can't Save Your Phone No");
    // }
  }

  const handleSubmit = async (e) => {
    console.log(OTP)
    if(OTP.length === 6){
      // console.log(otp);
      let  conformatoinResult =  window.conformatoinResult;
      conformatoinResult.confirm(OTP).then((result) => {
        // User signed in successfully.
        const user =  result.user;
        console.log(user);
        addPhone(); 
       
      }).catch((error) => {
        console.log(error + "OTP Fail");
      });
    }

   
    // setOTP(OTP);
    

  }

  const onChange = (e) => {
    setOTP(e.target.value);
  };

  
  return (
    <>
    {/* <div>
      <Navbar />
    </div> */}
    <div className="h-[100vh] flex bg-emerald-50 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-auto shadow-md rounded-md bg-white flex justify-center">
        <div floated={false} className="h-auto p-12">
          <div className="max-w-md w-full space-y-8">
            <div className="w-96">
              <img
                className="mx-auto  h-12 w-auto"
                src={NavLogo}
                alt="Workflow"
              />
              <h2 className="mt-2 pb-7 text-center text-2xl font-normal text-gray-600">
                Let's get Started
              </h2>
            </div>
            <form className="mt-8 space-y-6" >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <div className="mb-3 ml-4 ">
                    <label className="font-bold">Enter the code send to +92 000 0000000</label>
                  </div>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    value={OTP}
                    onChange={onChange}
                    minLength={6}
                    maxLength={6}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded relative block w-96 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-myBg-500 focus:border-myBg-500 focus:z-10 sm:text-sm"
                    placeholder="000000"
                  />
                </div>
              </div>

              <div>
                <button
                  type="button" onClick={handleSubmit}
                  className="group relative w-96 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-myBg hover:bg-myBg-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myBg-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                  Submit
                </button>
              </div>
            </form>


          </div>
        </div>
      </div>
    </div>
    {/* <div>
      <Footer />
    </div> */}
    </>
  );
};
