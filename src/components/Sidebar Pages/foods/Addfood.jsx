import React, { useState } from "react";
import imageCompression from 'browser-image-compression';
import axios from "axios";
import { serverUrl } from "../../../config";
import { Loader } from "../../Loader/loader";
import { useDispatch } from "react-redux";
import { AddNewfood } from "../../../StoreRedux/foodSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import storeimage from '../../../firebase/firebase'
// import { PDFDocument } from 'pdf-lib';
const Addbook = () => {
    const host=useNavigate();
    const dispatch = useDispatch()
    const doorinitial = {
        title: "",  Description: "", Ingredients:"", itemPrice: null , Image1: null
    }
    const Doorerror = {
        title: "",  Description: "", Ingredients:"", itemPrice: null , Image1: null
    }
    const [error, setError] = useState(Doorerror);
    const [addbook, setaddbook] = useState(doorinitial);
    const [loading, setloading] = useState(false);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        if (value.trim() === "") {
            setError((prevError) => ({ ...prevError, [name]: `Required` }));
        } else {
            setError((prevError) => ({ ...prevError, [name]: "" }));
        }

        setaddbook((prev) => ({ ...prev, [name]: value }))
    }
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };



    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        console.log(addbook)
        try {
            setloading(true);
            const img= await imageCompression(addbook.Image1,options)
             const data=await storeimage(img)
            const response = await axios.post(`${serverUrl}/api/food/addfooditem`, {
                title: addbook.title,
                Ingredients: addbook.Ingredients,
                Description: addbook.Description,
                itemPrice: addbook.itemPrice, 
                itemImageUrl:data
            });
            console.log(response)
            if (response && response.status === 200) {
                setloading(false);
                dispatch(AddNewfood(response.data.item))
                console.log(response.data.item)
                toast.success(response.data.message);
                host('/Admin/foods')
                setaddbook(doorinitial);
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
                <div className="space-y-12 h-screen">
                    <div>
                        <h2 className="text-3xl mt-4 font-bold tracking-tight text-purple-900 sm:text-4xl">
                            Add Food
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
                    <div className="max-w-5xl mx-auto my-1">
                        <div className="border-l-2 border-purple-600 pl-8">
                            <div className="flex flex-col md:flex-row md:justify-between">
                                <div className="mb-4 md:mb-0">
                                    <h3 className="text-xl text-purple-900 font-bold mb-2">Food image</h3>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={ async (e) =>{ 
                                       
                                        setaddbook((prev) => ({ ...prev, Image1:e.target.files[0]}))
                                     
                                }}
                                    className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                                />
                                {error.Image1 && <p className="text-red-700 text-sm font-normal">{error.Image1}</p>}
                            </div>
                     
                        </div>
                    </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        
                        className="rounded-md mr-3 bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                    >
                        Add Food
                    </button>
                </div>
                </div>
            </form>
            <Loader loading={loading} />
        </>
    );
};

export default Addbook;
