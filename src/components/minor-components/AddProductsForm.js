import cannabisForm from '../../assets/cannabis-form.jpg'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Slider } from 'rsuite';
import ImageHolder from '../../assets/upload.svg'
import 'rsuite/dist/rsuite.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { addProduct } from '../../redux/Actions/ProductActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert'
import { baseURL } from '../../constants/baseURL';
import { updateProduct } from '../../redux/Actions/ProductActions';




const SignupSchema = Yup.object().shape({
    productPhoto: Yup.string().required('Image is required'),
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    type: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    category: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    subCategory: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    brand: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    price: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    // effects: Yup.object().shape({
    //     uplifted: Yup.number().required('Required'),
    //     euphoric: Yup.number().required('Required'),
    //     energetic: Yup.number().required('Required'),
    //     creative: Yup.number().required('Required'),
    //     focused: Yup.number().required('Required'),
    // }),
});

export const AddProductsForm = (props) => {
    console.log('these are props : ', props)
    const status = !props.isAdd ? props.isAdd : true
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [filePreview, setFilePreview] = useState(null)
    const [editItem, setEditItem] = useState([])
    const [imgCheck, setImgCheck] = useState(false)
    const { products } = useSelector(
        (state) => state.productReducer
    );
    useEffect(() => {
        if (!status) {
            setEditItem(products.filter(
                (product) => product._id === global.editId
            ))
        }
    }, [])
    return (
        <>
            <div className='w-full h-[85vh]'>
                {console.log("edit item : ", editItem)}
                <div style={{ scrollbarWidth: 'thin' }} className="container h-full mx-auto overflow-y-scroll">
                    <div className="flex justify-center">
                        <div className="w-full flex ">
                            <div
                                className="w-full h-auto  lg:block lg:w-5/12 bg-cover md:hidden "
                                style={{
                                    backgroundImage: `linear-gradient( to right, rgba(0,0,0,0.2) ,rgba(0, 0, 0, 0.2)) ,url(${cannabisForm})`, backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >

                            </div>

                            <div className="w-full xl:w-[65%] md:w-full bg-white rounded-lg ">
                                <h3 className="pt-4 text-2xl text-center mt-8 font-bold">{!status ? 'Product Details' : "Add Product"}</h3>
                                <Formik
                                    enableReinitialize
                                    initialValues={
                                        {
                                            productPhoto: editItem.length !== 0 ? `${editItem[0].productPhoto}` : '',
                                            name: editItem.length !== 0 ? `${editItem[0].name}` : '',
                                            type: editItem.length !== 0 ? `${editItem[0].type}` : '',
                                            category: editItem.length !== 0 ? `${editItem[0].category}` : '',
                                            description: editItem.length !== 0 ? `${editItem[0].description}` : '',
                                            subCategory: editItem.length !== 0 ? `${editItem[0].subCategory}` : '',
                                            brand: editItem.length !== 0 ? `${editItem[0].brand}` : '',
                                            price: editItem.length !== 0 ? `${editItem[0].price}` : '',
                                            // effects: {
                                            //     uplifted: editItem.length !== 0 ? parseInt(editItem[0].effects.uplifted) : 0,
                                            //     euphoric: editItem.length !== 0 ? parseInt(editItem[0].effects.euphoric) : 0,
                                            //     energetic: editItem.length !== 0 ? parseInt(editItem[0].effects.energetic) : 0,
                                            //     creative: editItem.length !== 0 ? parseInt(editItem[0].effects.creative) : 0,
                                            //     focused: editItem.length !== 0 ? parseInt(editItem[0].effects.focused) : 0,
                                            // }
                                        } 
                                    }
                                    validationSchema={SignupSchema}
                                    onSubmit={async (values) => {
                                        var formData = new FormData();
                                        if (!status) {
                                            if (imgCheck) {
                                                let image = values.productPhoto
                                                formData.append('image', image)
                                                dispatch(updateProduct(values, formData, navigate, alert, props.modal))
                                            }
                                            else {
                                                dispatch(updateProduct(values, formData, navigate, alert, props.modal))
                                            }
                                        }
                                        else {
                                            let image = values.productPhoto
                                            formData.append('image', image)
                                            dispatch(addProduct(values, formData, navigate, alert, props.modal))
                                        }
                                    }}
                                >
                                    {({ isSubmitting, values, setFieldValue, handleChange }) => (
                                        <Form className="px-8 pt-6 pb-8 mb-4  bg-white rounded">
                                            <div className="flex mx-auto justify-center">
                                                <div className=" md:mr-2 md:mb-0 md:w-full justify-center mx-auto">
                                                    <label htmlFor="upload" className='w-[120px] h-[120px] block rounded-[50%] cursor-pointer mx-auto mb-2'>
                                                        <img className='w-[125px] h-[125px] block rounded-[50%] cursor-pointer mb-2 ' src={!status && editItem.length !== 0 && !imgCheck ? baseURL + editItem[0].productPhoto : !values.productPhoto ? ImageHolder : filePreview} alt='img' />
                                                        <input className='hidden' id="upload" name="image" type="file" accept="image/*" onChange={(event) => {

                                                            setFieldValue("productPhoto", event.currentTarget.files[0]);
                                                            setFilePreview(URL.createObjectURL(event.target.files[0]))
                                                            setImgCheck(true)
                                                        }} />
                                                    </label>

                                                    <label className="block mb-2 text-sm font-bold text-gray-700 md:mt-2 text-center " name='productPhoto'>
                                                        Product Image
                                                    </label>
                                                    <ErrorMessage className='text-red-600 text-xs text-center' name="productPhoto" component="div" />
                                                </div>
                                            </div>
                                            <div className='flex justify-around '>

                                                <div className='flex flex-col'>
                                                    <div className='flex flex-col justify-around  my-3'>

                                                        <div className=" md:flex md:justify-between w-60 xl:w-44 lg:w-36 md:w-full md:mb-0">
                                                            <div className=" md:mr-2 md:mb-0 md:w-full">
                                                                <label className="block mb-2 text-sm font-bold text-gray-700 md:mt-2" htmlFor="name">
                                                                    Name
                                                                </label>
                                                                <Field className='w-full px-3 py-2  text-xs leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' type="text" name="name" />
                                                                <ErrorMessage className='text-red-600 text-xs' name="name" component="div" />

                                                            </div>
                                                        </div>

                                                        <div className=" md:flex md:justify-between w-60 xl:w-44 lg:w-36 md:w-full md:mb-0">
                                                            <div className=" md:mr-2 md:mb-0 md:w-full">
                                                                <label className="block mb-2 text-sm mt-2 font-bold text-gray-700 md:mt-2" htmlFor="type">
                                                                    Type
                                                                </label>
                                                                <Field placeholder="Optional" className='w-full px-3 py-2 text-xs leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' type="text" name="type" />
                                                                {/* <ErrorMessage className='text-red-600 text-xs' name="type" component="div" /> */}

                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className='flex justify-around flex-col '>

                                                        <div className=" md:flex md:justify-between w-60 xl:w-44 lg:w-36 md:w-full md:mb-0">
                                                            <div className=" md:mr-2 md:mb-0 md:w-full">
                                                                <label className="block mb-2 text-sm font-bold text-gray-700 md:mt-2" htmlFor="category">
                                                                    Category
                                                                </label>
                                                                <Field className='w-full px-3 py-2 text-xs leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' type="text" name="category" />
                                                                <ErrorMessage className='text-red-600 text-xs' name="category" component="div" />

                                                            </div>

                                                        </div>
                                                        <div className=" md:flex md:justify-between w-60 xl:w-44 lg:w-36 md:w-full md:mb-0">
                                                            <div className=" md:mr-2 md:mb-0 md:w-full">
                                                                <label className="block mb-2 mt-2 text-sm font-bold text-gray-700 md:mt-2" htmlFor="description">
                                                                    Description
                                                                </label>
                                                                <Field className='w-full px-3 py-2 text-xs leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' type="text" name="description" />
                                                                <ErrorMessage className='text-red-600 text-xs' name="description" component="div" />

                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col justify-around my-2'>

                                                        <div className=" md:flex md:justify-between w-60 xl:w-44 lg:w-36 md:w-full md:mb-0">
                                                            <div className=" md:mr-2 md:mb-0 md:w-full">
                                                                <label className="block mb-2 text-sm font-bold text-gray-700 md:mt-2" htmlFor="subCategory">
                                                                    Sub-Category
                                                                </label>
                                                                <Field placeholder="Optional" className='w-full px-3 py-2 text-xs leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' type="text" name="subCategory" />
                                                                {/* <ErrorMessage className='text-red-600 text-xs font-thin' name="subCategory" component="div" /> */}

                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='flex flex-col justify-around my-3'>
                                                        <div className=" md:flex md:justify-between w-60 xl:w-44 lg:w-36 md:w-full md:mb-0">
                                                            <div className=" md:mr-2 md:mb-0 md:w-full">
                                                                <label className="block mb-2  text-sm font-bold text-gray-700 md:mt-2" htmlFor="brand">
                                                                    Brand
                                                                </label>
                                                                <Field placeholder="Optional" className='w-full px-3 py-2  text-xs leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' type="text" name="brand" />
                                                                {/* <ErrorMessage className='text-red-600 text-xs font-thin' name="brand" component="div" /> */}

                                                            </div>

                                                        </div>

                                                        <div className=" md:flex md:justify-between w-60 xl:w-44 lg:w-36 md:w-full md:mb-0">
                                                            <div className=" md:mr-2 md:mb-0 md:w-full">
                                                                <label className="block mb-2 mt-2 text-sm font-bold text-gray-700 md:mt-2" htmlFor="price">
                                                                    Price
                                                                </label>
                                                                <Field className='w-full px-3 py-2  text-xs leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' type="text" name="price" id='price' />
                                                                <ErrorMessage className='text-red-600 text-xs font-thin' name="price" component="div" />

                                                            </div>

                                                        </div>

                                                        {/* <div className="md:flex md:justify-between w-60 xl:w-44 lg:w-36 md:w-full md:mb-0">
                                                            <div className=" md:mr-2 md:mb-0 md:w-full">
                                                                <div className="block mb-2 text-sm font-bold text-gray-700 md:mt-2">
                                                                    <p className="block mb-2 text-sm mt-2 font-bold text-gray-700 md:mt-2">Effects</p>
                                                                    <div className='pl-4'>
                                                                        <div>
                                                                            <label className="block mb-2 text-xs py-1 text-gray-700 md:mt-2" htmlFor="effects.uplifted">
                                                                                -uplifted
                                                                            </label>

                                                                            <Slider
                                                                                className='ml-4 mb-2'
                                                                                progress
                                                                                name='effects.uplifted'
                                                                                defaultValue={0}
                                                                                value={values.effects.uplifted}
                                                                                handleClassName={'block cursor-pointer'}
                                                                                onChange={(value) => {
                                                                                    setFieldValue('effects.uplifted', value)

                                                                                }}

                                                                            />
                                                                            <ErrorMessage className='text-red-600 text-xs font-thin' name="effects.uplifted" component="div" />

                                                                        </div>
                                                                        <div>
                                                                            <label className="block mb-2 text-xs py-1  text-gray-700 md:mt-2" htmlFor="effects.euphoric">
                                                                                -euphoric

                                                                            </label>

                                                                            <Slider
                                                                                className='ml-4 mb-2'
                                                                                progress
                                                                                defaultValue={0}
                                                                                name='effects.euphoric'
                                                                                value={values.effects.euphoric}
                                                                                handleClassName={'block cursor-pointer'}
                                                                                onChange={(value) => {
                                                                                    setFieldValue('effects.euphoric', value)
                                                                                }}
                                                                            />
                                                                            <ErrorMessage className='text-red-600 text-xs font-thin' name="effects.euphoric" component="div" />
                                                                        </div>
                                                                        <div>
                                                                            <label className="block mb-2 text-xs py-1  text-gray-700 md:mt-2" htmlFor="effects.energetic">
                                                                                -energetic

                                                                            </label>

                                                                            <Slider
                                                                                className='ml-4 mb-2'
                                                                                progress
                                                                                defaultValue={0}
                                                                                value={values.effects.energetic}
                                                                                name='effects.energetic'
                                                                                handleClassName={'block cursor-pointer'}
                                                                                onChange={(value) => {
                                                                                    setFieldValue('effects.energetic', value)
                                                                                }}
                                                                            />
                                                                            <ErrorMessage className='text-red-600 text-xs font-thin' name="effects.energetic" component="div" />
                                                                        </div>
                                                                        <div>
                                                                            <label className="block mb-2 text-xs py-1 text-gray-700 md:mt-2" htmlFor="effects.creative">
                                                                                -creative

                                                                            </label>

                                                                            <Slider
                                                                                className='ml-4 mb-2'
                                                                                progress
                                                                                defaultValue={0}
                                                                                value={values.effects.creative}
                                                                                name='effects.creative'
                                                                                handleClassName={'block cursor-pointer'}
                                                                                onChange={(value) => {
                                                                                    setFieldValue('effects.creative', value)
                                                                                }}
                                                                            />
                                                                            <ErrorMessage className='text-red-600 text-xs font-thin' name="effects.creative" component="div" />

                                                                        </div>
                                                                        <div>
                                                                            <label className="block mb-2 text-xs py-1 text-gray-700 md:mt-2" htmlFor="effects.focused">
                                                                                -focused
                                                                            </label>

                                                                            <Slider
                                                                                className='ml-4 mb-2'
                                                                                progress
                                                                                name='effects.focused'
                                                                                value={values.effects.focused}
                                                                                defaultValue={0}
                                                                                handleClassName={'block cursor-pointer'}
                                                                                onChange={(value) => {
                                                                                    setFieldValue('effects.focused', value)
                                                                                }}
                                                                            />
                                                                            <ErrorMessage className='text-red-600 text-xs font-thin' name="effects.focused" component="div" />

                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="mb-6 flex items-center justify-center gap-2 sm:flex-col text-center">
                                                <button
                                                    className="w-36 px-4 py-2 font-semibold text-gray-600 bg-[#E9C95D] rounded hover:bg-[#E9D95D] focus:outline-none focus:shadow-outline"
                                                    type="submit" disabled={isSubmitting}
                                                >
                                                    {!status ? 'Update' : 'Submit'}
                                                </button>
                                                <button className={`w-36 px-4 py-2 font-semibold text-gray-600 bg-[#E9C95D] rounded hover:bg-[#E9D95D] focus:outline-none focus:shadow-outline ${!status ? 'hidden' : ''}`} type="reset">Reset</button>
                                            </div>


                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}