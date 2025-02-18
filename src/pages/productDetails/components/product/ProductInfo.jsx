import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../../../store/productSlice";
import { useNavigate } from "react-router-dom";
import {  atc } from "../../../../store/cartSlice";

export default function ProductInfo({ id: productId }) {
    // console.log("first")
    const dispatch = useDispatch()
    useEffect(() => {
        
        dispatch(fetchSingleProduct(productId))
    }, [])
    const { selectedProduct } = useSelector((state) => state.product)
    console.log("first")
    console.log(selectedProduct)
    console.log("last")
    // const product = selectedProduct?.product && selectedProduct?.product[0]

    const { data: user } = useSelector((state) => state.auth)
    // console.log(product[0])
    const reviews = selectedProduct.reviews
    console.log("first")
    console.log(reviews)    
    const navigate = useNavigate()

    const handleCart = () => {
        if (user.length == 0 && (localStorage.getItem('token') == "" || localStorage.getItem("token") == null || localStorage.getItem('token') == undefined)) {
            return navigate("/login")
        }
        //give the argument found and aliaed productId as a parameter for atc reducer
        dispatch(atc(productId))

    }
// renderer for ratings star
const renderStars = (rating) => {
    const stars = [];
    //taking number of ratings and adding stars according to the rating
    for (let i = 0; i < rating; i++) {
        stars.push(
            <svg key={i} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
            );
        }
        //returning stars
        return stars;
    };

    return (

        <section className="overflow-hidden text-gray-700 bg-white body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap mx-auto lg:w-4/5">
                    <img alt="ecommerce" className="object-cover object-center w-full border border-gray-200 rounded lg:w-1/2" src={selectedProduct.productImage} />
                    <div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
                        <h1 className="mb-1 text-3xl font-medium text-gray-900 title-font">{selectedProduct?.productName}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                {/* if reviews are done and hen show stars given at review */}
                            {reviews && reviews.length > 0 && renderStars(reviews[0].rating)}

                                <span className="ml-3 text-gray-600">{reviews?.length}</span>
                            </span>
                            <span className="flex py-2 pl-3 ml-3 border-l-2 border-gray-200">
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                    </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                    </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                    </svg>
                                </a>
                            </span>
                        </div>
                        <p className="leading-relaxed">{selectedProduct?.productDescription}</p>
                        <p className="leading-relaxed"> <span style={{ color: 'fontWeight:700px' }}>Status</span> : {selectedProduct?.productStatus}</p>
                        <div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-200">
                            <p className="leading-relaxed"> <span style={{ color: 'fontWeight:700px' }}>Stock Left</span> : {selectedProduct?.productStock}</p>

                        </div>
                        <div className="flex">
                            <span className="text-2xl font-medium text-gray-900 title-font">NPR {selectedProduct?.productPrice}</span>
                            {
                                selectedProduct?.productStock > 0 ? (
                                    <button className="flex px-6 py-2 ml-auto text-white bg-red-500 border-0 rounded focus:outline-none hover:bg-red-600" onClick={handleCart} >Add To Cart</button>
                                ) :
                                    (
                                        <button className="flex px-6 py-2 ml-auto text-white bg-red-500 border-0 rounded focus:outline-none hover:bg-red-600" disabled >Out of Stock</button>
                                    )
                            }
                            {/* <button className="inline-flex items-center justify-center w-10 h-10 p-0 ml-4 text-gray-500 bg-gray-200 border-0 rounded-full">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}