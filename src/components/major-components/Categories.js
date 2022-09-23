import { useState, useEffect } from "react"
import { Modal } from "../minor-components/Modal"
import { useDispatch, useSelector } from "react-redux";
import { selectProgressBarState } from "../../redux/Actions/ProgressBarActions";
import { axiosInstance } from "../../constants/axiosInstance";
import cannabisForm from '../../assets/cannabis-form.jpg'
import { Loader } from "../minor-components/Loader";
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router";

export const Categories = () => {
    const alert = useAlert()
    const navigate = useNavigate()
    const [state, setState] = useState({
        totalTax: '',
        pricePerMile: ''
    })
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );
    const token = useSelector(
        (state) => state.ProfileReducer
    );
    useEffect(() => {
        getTax()
    }, [])
    const getTax = async () => {
        dispatch(selectProgressBarState(true))
        try{
            const res = await axiosInstance.get('/api/v1/admin/gettax',{headers:{
                "Authorization":token
            }})
            console.log(res , " loging res")
            if (res.data.success) {
                dispatch(selectProgressBarState(false))
                setState(res.data.data)
            }
            else {
                dispatch(selectProgressBarState(false))
                alert.show('No Tax Found')
            }
        }
        catch(e){
            dispatch(selectProgressBarState(false))
            navigate('/')
        }
      
    }

    const addTax = async () => {
        dispatch(selectProgressBarState(true))
        try{
            const res = await axiosInstance.post('/api/v1/admin/settax', 
            { totalTax: state.totalTax, pricePerMile: state.pricePerMile },
            {headers:{
                "Authorization":token
            }})
            if (res.data.success) {
                dispatch(selectProgressBarState(false))
                alert.show('Tax added successfully')
                setIsOpen(false)
                setState(res.data.data)
            }
            else {
                dispatch(selectProgressBarState(false))
                alert.show('No Tax Found')
            }
        }
        catch(e){
            navigate('/')
        }
        
    }
    return (
        


        <div className='py-8 bg-gray-50 min-h-screen'>
            {/* {!loading ? ( */}
                <div className=" mt-24 bg-gray-50 ml-[20%]  w-[78%]">
                    <h4>Product List</h4>
                <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">Dashboard
                    </li>
                    <li>
                    <div class="flex items-center">
                        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>Product
                    </div>
                    </li>
                    <li aria-current="page">
                    <div class="flex items-center">
                        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Product List</span>
                    </div>
                    </li>
                </ol>
                </nav>
                </div>
        </div>
    )
}