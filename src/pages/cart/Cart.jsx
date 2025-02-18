import { useNavigate } from "react-router-dom";
import { deleteCart, updateCartItem } from "../../store/cartSlice";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { items: productsOnCart } = useSelector((state) => state.cart);

    const totalItems = productsOnCart.reduce((total, item) => total + item.quantity, 0);
    const totalAmountOfCart = productsOnCart.reduce((amount, item) => amount + item.quantity * item.product[0].productPrice, 0);

    const handleQtyChange = (productId, quantity) => {
        dispatch(updateCartItem(productId, quantity));
    };
    const deleteCartProduct = (productId) => {
        dispatch(deleteCart(productId));
    };
    

    return (
        <div className="h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {productsOnCart.map((product) => (
                        <div key={product._id} className="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                            <img src={product.product[0].productImage} alt={product.product[0].productName} className="w-full rounded-lg sm:w-40" />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                    <h2 className="text-lg font-bold text-gray-900">{product.product[0].productName}</h2>
                                    <p className="mt-1 text-xs text-gray-700">{product.product[0].productStatus}</p>
                                </div>
                                <div className="mt-4 flex justify-between sm:mt-0 sm:block sm:space-x-6">
                                    <div className="flex items-center border-gray-100">
                                        <button
                                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-white"
                                            onClick={() => handleQtyChange(product._id, product.quantity - 1)}
                                        >-</button>

                                        <input
                                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                                            type="number"
                                            value={product.quantity}
                                            min="1"
                                            onChange={(e) => handleQtyChange(product._id, parseInt(e.target.value))}
                                        />

                                        <button
                                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-white"
                                            onClick={() => handleQtyChange(product._id, product.quantity + 1)}
                                        >+</button>

                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <p className="text-sm">Rs. {product.product[0].productPrice}</p>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                                            onClick={() => deleteCartProduct(product._id)} // Corrected line
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Total items</p>
                        <p className="text-gray-700">{totalItems}</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total Price</p>
                        <div>
                            <p className="mb-1 text-lg font-bold">Rs. {totalAmountOfCart}</p>
                            <p className="text-sm text-gray-700">including VAT</p>
                        </div>
                    </div>
                    <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-white hover:bg-blue-600" onClick = {() => navigate('/checkout')}>
                        Check out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
