import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectfoods } from '../../../StoreRedux/foodSlice';
import { useSelector } from 'react-redux';
function BookDetailPage() {
    const bookdata = useSelector(selectfoods)
    const { foodId } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const datadetail = bookdata.find(data => data._id === foodId)
        console.log(datadetail)
        setBook(datadetail);
          // eslint-disable-next-line
    }, [bookdata]);

    return (
        <div className="container mx-auto md:px-4">
            {book ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                      <img className='w-full h-[300px]' src={book.itemImageUrl} alt="fooditem" />
                    </div>
                    <div className="p-4">
                        <h3 className="text-2xl font-semibold text-purple-800 ">{book.title}</h3>
                        <p className="text-sm text-gray-600 my-2"><span className='text-purple-600 font-bold mr-2'>Price: </span> ${book.itemPrice}</p>
                        <p className="text-sm text-gray-600 my-2"><span className=' text-purple-600 font-bold mr-2'>Ingredients: </span>  {book.Ingredients}</p>
                        <p className="text-sm text-gray-600   border-purple-900 border-b-[2px] pb-8 "> <span className=' font-bold  text-purple-600 mr-2' >Description: </span> {book.Description}</p>
                    </div>
                </div>

            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default BookDetailPage;
