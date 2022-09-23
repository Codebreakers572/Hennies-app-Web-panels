
import DashboardHeroSection from "./components/major-components/DashboardHeroSection";
import { Signup } from "./screen/Signup";
import { Login } from "./screen/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SideAndNavbar } from "./components/major-components/SideAndNavbar";
import { Products } from './components/major-components/Products'
import { Orders } from "./components/major-components/Orders";
import { Drivers } from "./components/major-components/Drivers";
import { Categories } from "./components/major-components/Categories";
import { Customers } from "./components/major-components/Customers";
import { SalesPromotion } from "./components/major-components/SalesPromotion";
import { Accounts } from "./components/major-components/Accounts";
import { StoreLocator } from "./components/major-components/StoreLocator";
import { WebsiteSetting } from "./components/major-components/WebsiteSetting";
import { AppSettings } from "./components/major-components/AppSettings";
import { Radius } from "./components/major-components/Radius";
import { Otp } from "./components/major-components/Otp";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "./redux/Actions/ProfileActions";
import { useJsApiLoader} from "@react-google-maps/api";
import { Account } from "./components/major-components/Account";
import { SingleRestaurant } from "./components/major-components/SingleRestaurant";
import { AllRestaurants } from "./components/major-components/AllRestaurants";
const places = ["places"]
function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyASE7MqDo7TNZ_4fmORznk_JMBFm0d_pKY',
    libraries: places,
  });
  const dispatch = useDispatch()
  const token = useSelector(
    (state) => state.ProfileReducer
  );
  useEffect(() => {
    getToken()
  })
  const getToken = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(adminLogin(token))
    }
  }
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Signup />} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/verification' element={<Otp />} />
            <Route path='/' element={localStorage.getItem('token') ? <SideAndNavbar /> : <Login />} >
            <Route index element={<DashboardHeroSection />} />
            <Route path='/products' element={<Products />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/drivers' element={<Drivers />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/salesPromotion' element={<SalesPromotion />} />
            <Route path='/accounts' element={<Accounts />} />
            <Route path='/storelocator' element={<StoreLocator />} />
            <Route path='/earnings' element={<WebsiteSetting />} />
            <Route path='/appSettings' element={<AppSettings />} />
            <Route path='/all-restaurants' element={<AllRestaurants />} />
            <Route path='/add-restaurant' element={<Radius />} />
            <Route path='/singleRestaurant/:restaurantName' element={<SingleRestaurant />} />
            {/* <Route path='account' element={<Account />} /> */}
          </Route>
        </Routes>
      </Router>

    </>
  );
}

export default App;
