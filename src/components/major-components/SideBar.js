import logo2 from '../../assets/logo2.png'
import { useState } from "react"
// import { ReactComponent as dashboardHome } from '../../assets/dashboard-home.svg'
import dashboardHome from '../../assets/dashboard-home.svg'
import restaurant from '../../assets/restaurant.svg'
import product from '../../assets/product.svg'
import order from '../../assets/order.svg'
import driver from '../../assets/driver.svg'
import customer from '../../assets/customer.svg'
import category from '../../assets/category.svg'
import account from '../../assets/account.svg'
import salesPromotion from '../../assets/sales-promotion.svg'
import storeLocator from '../../assets/store-locator.svg'
import websiteSetting from '../../assets/website-setting.svg'
import logout from '../../assets/logout.svg'
import { IconBg } from '../minor-components/IconBg'
import rightArrow from '../../assets/right-arrow.svg'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { axiosInstance } from "../../constants/axiosInstance";


let restaurantArray = [];

window.onload =async function (){
    
    const res = await axiosInstance.get('/api/v1/admin/getradius', {
        headers: {
            "authorization": localStorage.getItem('token')
        }
    })
    if (res.data.success) {
        console.log(res.data.data + " Sidebar data")
        res.data.data.forEach(function(restu){
            let obj = {
                title : restu.shopName,
                // path : `/singleRestaurant/${restu.products.restaurantName}`,
            }
            console.log(obj)
            console.log(restu)
            restaurantArray.push(obj)
        })
        // setCardData(res.data.data)
        // dispatch(selectProgressBarState(false))
    }
    else {
        // dispatch(selectProgressBarState(false))
        alert.show('Not Founf')
    }
}

// const getResName = async (e) => {
//     console.log(e.target.innerText)
//     let restaurant = e.target.innerText;
//     const res = await axiosInstance.get('/api/v1/admin/getSingleRadius', {restaurant} ,{
//         headers: {
//             "authorization": localStorage.getItem('token')
//         }
//     })
// }

const SideBar = () => {
    const navigate = useNavigate()
    
    const [open, setOpen] = useState(false)
    const sidebarData = [
        {
            title: 'Dashboard',
            path: '/',
            svg: dashboardHome,


        },
        {
            title: 'Products',
            path: '/products',
            svg: product,

        },
        {
            title: 'Restaurant',
            path: '/restaurant',
            childrens : restaurantArray,
            svg : product
        },
        {
            title: 'Orders',
            path: '/orders',
            svg: order,

        },
        {
            title: 'Drivers',
            path: '/drivers',
            svg: driver
        },
        {
            title: 'Earning',
            path: '/earnings',
            svg: driver
        },
        {
            title: 'App Setting',
            path: '/appSettings',
            svg: category
        }, 
        {
            title: 'Logout',
            path: '/logout',
            svg: logout
        }
    ]

    const loadWindow = (e) => {
        // console.log(e.target.innerHTML);
        const restaurantName = e.target.innerHTML;
        const res = restaurantName.toLowerCase();
        console.log(res)
        navigate(`/singleRestaurant/${res}` ,{state : {restaurantName : res}}).then(() => {
           
        })
        
    }

    return (
        <>

            <div style={{ scrollbarWidth: 'none' }} className=' shadow-xl bg-white fixed overflow-y-auto scroll-thin top-0 h-full left-0 w-[18%] 
             md:hidden'>
                <div className=' h-24 bg-gray-50 flex justify-center items-center p-0 m-0'>
                    <img className='mx-auto mt-0 w-[5.5rem]' src={logo2} alt='logo' />
                </div>
                <ul className='flex flex-col'>
                    {sidebarData.map((item, index) => (
                        <li key={index} className={` font-semibold p-5 flex justify-between  cursor-pointer`}>
                            <IconBg svg={item.svg} />
                            <div className='flex-1 flex justify-between items-center  pl-[20%] text-xs'>
                                {item.path === '/logout' ? (
                                    <p className='text-gray-800' onClick={()=>{
                                        localStorage.removeItem('token')
                                        navigate('/login')
                                    }}>{item.title}</p>
                                ):(
                                     <>
                                        {  item.childrens ? (
                                            <>
                                            {console.log(item.childrens)}
                                             <div className={open ? "sidebar-item open" : "sidebar-item"}>
                                                <div className="sidebar-title flex-1 flex justify-between ">
                                                    <span>
                                                        { item.icon && <i className={item.icon}></i> }
                                                        {item.title}    
                                                    </span> 
                                                    <i className="w-[5px] bi-chevron-down toggle-btn " onClick={() => setOpen(!open)}></i>
                                                </div>
                                                <div className="sidebar-content">
                                                <NavLink end to='/all-restaurants'   className={     ({ isActive }) => (isActive ? 'text-myBg' : 'text-gray-800')}>
                                                    All Restaurants
                                                    
                                                </NavLink><br  />
                                                <NavLink end to='/add-restaurant'   className={({ isActive }) => (isActive ? 'text-myBg' : 'text-gray-800')}>
                                                    Add Restaurants
                                                    
                                                </NavLink><br />
                                                    { item.childrens.map((child, index) =>
                                                    <>
                                                     <a key={index} onClick={loadWindow}   className={({ isActive }) => (isActive ? 'text-myBg' : 'text-gray-800')}><span className='mt-6'>{child.title.charAt(0).toUpperCase() + child.title.slice(1)}</span> </a>
                                                     <br />
                                                    </>
                                                     
                                                     ) }
                                                </div>
                                            </div>
                                            </>
                                        ) : (
                                            <NavLink end to={item.path}   className={({ isActive }) => (isActive ? 'text-myBg' : 'text-gray-800')}>
                                            {item.title}
                                            
                                        </NavLink>
                                        )}
                                        
                                    </>
                                )}
                            
                                {/* <img className='w-[5px]' src={rightArrow} alt='rightarrow' /> */}
                            </div>
                        </li>
                    ))}
                </ul>
                
            </div>
        </>
    )
}
export default SideBar