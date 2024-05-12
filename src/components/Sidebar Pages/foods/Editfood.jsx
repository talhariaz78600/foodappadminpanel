import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../../config";
import { Loader } from "../../Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { updatefoods, selectfoods } from "../../../StoreRedux/foodSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { PDFDocument } from 'pdf-lib';
const Editfood = () => {
    const allfoods = useSelector(selectfoods)
    const host = useNavigate();
    const { foodId } = useParams();
    const dispatch = useDispatch()

    const Doorerror = {
        title: "", Description: "", Ingredients: "", itemPrice: null
    }
    const [error, setError] = useState(Doorerror);
    const [addbook, setaddbook] = useState();
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const data = allfoods.find((item) => item._id === foodId);
        console.log(data)
        setaddbook(data);
          // eslint-disable-next-line
    }, [allfoods]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        if (value.trim() === "") {
            setError((prevError) => ({ ...prevError, [name]: `Required` }));
        } else {
            setError((prevError) => ({ ...prevError, [name]: "" }));
        }

        setaddbook((prev) => ({ ...prev, [name]: value }))
    }
 


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        console.log(addbook)
        try {
            setloading(true);
           
            const response = await axios.put(`${serverUrl}/api/food/updateitem/${foodId}`, {
                title: addbook.title,
                Ingredients: addbook.Ingredients,
                Description: addbook.Description,
                itemPrice: addbook.itemPrice
                
            });
            console.log(response)
            if (response && response.status === 200) {
                setloading(false);
                dispatch(updatefoods(response.data.item))
                console.log(response.data.item)
                toast.success(response.data.message);
                host('/Admin/foods')
             
            }
        } catch (error) {
            setloading(false);
            console.error(error);
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    }



    return (
        <>
            <form onSubmit={handleFormSubmit}>
                { addbook && <div className="space-y-12 h-screen">
                    <div>
                        <h2 className="text-3xl mt-4 font-bold tracking-tight text-purple-900 sm:text-4xl">
                            Edit Food
                        </h2>

                        <div className="my-4 grid grid-cols-3 gap-x-6 gap-y-2 ">
                            <div className=" col-sapn-3 sm:col-span-1">
                                <label htmlFor="title" className="block text-md font-medium leading-6 text-purple-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChangeInput}
                                        required
                                        type="text"
                                        name="title"
                                        value={addbook.title}
                                        placeholder="Title"
                                        className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.title && <p className="text-red-700 text-sm font-normal">{error.title}</p>}
                                </div>
                            </div>
                            <div className="col-sapn-3 sm:col-span-1">
                                <label htmlFor="itemPrice" className="block text-md font-medium leading-6 text-purple-900">
                                    price
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={addbook.itemPrice}
                                        name="itemPrice"
                                        onChange={handleChangeInput}
                                        type="number"
                                        placeholder="0"
                                        className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.itemPrice && <p className="text-red-700 text-sm font-normal">{error.itemPrice}</p>}
                                </div>
                            </div>
                            <div className="col-sapn-3 sm:col-span-1 mt-0.5">
                                <label htmlFor="Ingredients" className="block text-md font-medium py-1 text-purple-900 mr-2">
                                    Ingredients
                                </label>
                                <div className="flex items-center w-full">
                                    <input
                                        type="text"
                                        name="Ingredients"
                                        value={addbook.Ingredients}
                                        onChange={handleChangeInput}
                                        required
                                        placeholder="Ingredients"
                                        className="block w-full rounded-md border-0 py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.Ingredients && <p className="text-red-700 text-sm font-normal">{error.Ingredients}</p>}
                                </div>

                            </div>

                            <div className="col-span-3">
                                <label htmlFor="street-address" className="block text-md font-medium leading-6 text-purple-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={addbook.Description}
                                        placeholder="Description"
                                        name="Description"
                                        onChange={handleChangeInput}
                                        required
                                        className="block w-full border-0 rounded-md  py-1.5 text-purple-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                    />
                                    {error.Description && <p className="text-red-700 text-sm font-normal">{error.Description}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"

                            className="rounded-md mr-3 bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                        >
                            Update Food
                        </button>
                    </div>
                </div>}
            </form>
            <Loader loading={loading} />
        </>
    );
};

export default Editfood;