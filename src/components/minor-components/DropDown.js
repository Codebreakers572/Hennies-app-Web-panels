
import { Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import dropDown from '../../assets/down-arrow.svg'
import { useDispatch } from 'react-redux'
import { updateDriverStatus } from '../../redux/Actions/DriverActions'
import { useAlert } from 'react-alert'
import { axiosInstance } from '../../constants/axiosInstance'
import { selectProgressBarState } from '../../redux/Actions/ProgressBarActions'
export const Dropdown = ({ verified, blocked, id,orders,forceReload,setForceReload}) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const updateOrderStatus=async()=>{
        dispatch(selectProgressBarState(true))
        const updatedOrder = await axiosInstance.patch('api/v1/order/updateorderstatusadmin',{status:1},{params:{
            orderId:id
        }})
        if(updatedOrder.data.success){
            dispatch(selectProgressBarState(false))
            alert.show('Order Updated Successfully')
            setForceReload(!forceReload)
        }
        else{
            dispatch(selectProgressBarState(false))
            alert.show('Failed to Update Order')
        }
    }
    return (
        <Menu className=''>
            {({ open }) => (
                <>
                    <Menu.Button ><img className={`w-[15px] cursor-pointer ${orders?"mr-12":null}`} src={dropDown} alt="drop down" /></Menu.Button>

                    {/* Use the Transition component. */}
                    <Transition
                        show={open}
                    // enter="transition duration-100 ease-out"
                    // enterFrom="transform scale-95 opacity-0"
                    // enterTo="transform scale-100 opacity-100"
                    // leave="transition duration-75 ease-out"
                    // leaveFrom="transform scale-100 opacity-100"
                    // leaveTo="transform scale-95 opacity-0"
                    >
                        {/* Mark this component as `static` */}
                        <Menu.Items static className='absolute top-18 left-[-45px] z-50 flex flex-col'>
                        {!orders ? (
                            <>
                            <Menu.Item>
                                {({ active }) => (

                                    <button
                                        className={`py-2 px-4 no-underline border-1 ${verified ? 'hidden' : ''} ${active ? 'bg-myBg' : 'bg-gray-200'
                                            }`}
                                        onClick={() => dispatch(updateDriverStatus({ checkVerify: true }, alert, navigate, id, dispatch))}
                                    >
                                        Verify Driver
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`py-2 px-4 no-underline  ${active ? 'bg-myBg' : 'bg-gray-200'
                                            }`}
                                        onClick={(e) => dispatch(updateDriverStatus({ checkBlock: blocked ? false : true }, alert, navigate, id, dispatch))}
                                    >
                                        {!blocked ? <p>Block Driver</p> : <p>Un-block Driver</p>}

                                    </button>
                                )}
                            </Menu.Item>
                            </>
                        ):(
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`py-2 px-4 no-underline  ${active ? 'bg-myBg' : 'bg-gray-200'
                                            }`}
                                        onClick={()=>{
                                            updateOrderStatus()
                                        }}
                                    >
                                        Approve Order

                                    </button>
                                )}
                            </Menu.Item>
                        )}
                           

                        </Menu.Items>
                    </Transition>
                </>
            )
            }
        </Menu >
    )
}