import { ActionsTable } from "../minor-components/ActionsTable"
import { useEffect, useState, useMemo } from "react"
import { getProducts } from "../../redux/Actions/ProductActions"
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "../minor-components/Modal"
import { AddProductsForm } from "../minor-components/AddProductsForm"
import { Loader } from "../minor-components/Loader"

const tableColumnsReal = [
    'Photo',
    'Name',
    'Type',
    'Category',
    'Sub-Category',
    'Brand',
    'Price',
    // 'Effects (upl, eup, ene, cre, foc)',
    'Actions'
]
export const Products = () => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)


    const { products } = useSelector(
        (state) => state.productReducer
    );
    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    useEffect(() => {
        dispatch(getProducts())
    }, [isOpen, isUpdateOpen])

    return (
        <>
            <div className="bg-gray-50   z-0">
            {/* {!loading ? ( */}
                <div className=" mt-24 bg-gray-50 ml-[20%]  w-[78%]">
                    <div className="flex items-center justify-end py-4 px-4">
                        <button onClick={() => {
                            setIsOpen(true)
                        }}
                            className='bg-myBg text-gray-600 px-4 py-2 cursor-pointer hover:bg-[#45b6fe]'>
                            Add Product
                        </button>
                    </div>
                    <Modal open={isOpen} onClose={() => setIsOpen(false)} >
                        <AddProductsForm modal={setIsOpen} isAdd={true} />
                    </Modal>
                    {
                        products.length === 0 ? (
                            <div className="flex justify-center items-center py-8 text-lg h-screen">No Products Found</div>
                        )
                            : (
                                <ActionsTable isOpen={isUpdateOpen} tableColumnsReal={tableColumnsReal} checkBox={true} isProduct={true} modal={setIsUpdateOpen} key={parseInt(Math.random() * 10000)} tableDataReal={products} />
                            )
                    }
                </div>
            {/* ):(
                <Loader />
            )} */}
               
            </div>
        </>
    )
}