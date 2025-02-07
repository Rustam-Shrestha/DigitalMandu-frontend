import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createOrder } from '../../store/checkoutSlice';
const CheckOut = () => {
    const { items: products } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [paymentDetails, setPaymentDetails] = useState("COD");
    console.log(products,"dick" )

    const shippingAmount = 100;
    const subTotal = products.reduce((amount, item) => amount + item.quantity * item.product[0].productPrice, 0);
    const totalAmount = subTotal + shippingAmount;

    const handleOrder = (data) => {
        // console.log("Products in Checkout:", products);
        const orderDetails = {
            shippingAddress: data.billingAddress,
            totalAmount: totalAmount, // Ensure this is defined
            items: products.map(p => ({
                quantity: p.quantity, // Ensure each product has a quantity
                product: p.product[0]._id // Ensure each product has a product object with an _id
            })),
            paymentDetails: {
                method: paymentDetails, // Ensure this is defined
            },
        };
            // Further processing of orderDetails, like saving to database or sending to an API
        dispatch(createOrder(orderDetails));

        
        // console.log("Order Placed:", orderDetails);
        // dispatch(placeOrder(orderDetails)); // Uncomment if using Redux to manage orders
    };
    

     

    const handlePaymentChange = (e) => {
        setPaymentDetails(e.target.value);
    }

    return (
        <>
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32"></div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                {/* Order Summary */}
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Order Summary</p>
                    <p className="text-gray-400">Check your items and select a suitable shipping method.</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        {products.map((product) => (
                            <div key={product.product[0]._id} className="flex flex-col rounded-lg bg-white sm:flex-row">
                                <img
                                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                    src={product.product[0].productImage}
                                    alt={product.product[0].productName}
                                />
                                <div className="flex w-full flex-col px-4 py-4">
                                    <span className="font-semibold">{product.product[0].productName}</span>
                                    <span className="float-right text-gray-400">Qty: {product.quantity}</span>
                                    <p className="text-lg font-bold">Rs. {product.product[0].productPrice}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Payment Methods */}
                    <p className="mt-8 text-lg font-medium">Payment Methods</p>
                    <form noValidate onSubmit={handleSubmit(handleOrder)}>
                        <div className="mt-5 grid gap-6">
                            <div className="relative">
                                <input className="peer hidden" id="radio_1" type="radio" {...register("paymentMethod", { required: "Please select a payment method" })} value="COD" onChange={handlePaymentChange} />
                                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                                    <img className="w-14 object-contain" src="/images/cod.png" alt="" />
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold">COD (Cash On Delivery)</span>
                                    </div>
                                </label>
                            </div>
                            <div className="relative">
                                <input className="peer hidden" id="radio_2" type="radio" {...register("paymentMethod", { required: "Please select a payment method" })} value="khalti" onChange={handlePaymentChange} />
                                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                                    <img className="w-14 object-contain" src="/images/khalti.png" alt="" />
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold">Online (Khalti)</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <p className="text-red-500 text-sm">{errors.paymentMethod && errors.paymentMethod.message}</p>

                        {/* Submit Button */}
                        {/* <button type="submit" className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                            Place Order
                        </button> */}
                    </form>
                </div>

                {/* Payment Form */}
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="text-gray-400">Complete your order by providing your payment details.</p>

                    <form noValidate onSubmit={handleSubmit(handleOrder)}>
                        {/* Email Input */}
                        <label className="mt-4 mb-2 block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email must be specified" })}
                            className="w-full rounded-md border px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500"
                            placeholder="your.email@gmail.com"
                        />
                        <p className="text-red-500 text-sm">{errors.email && errors.email.message}</p>

                        {/* Shipping Address */}
                        <label className="mt-4 mb-2 block text-sm font-medium">Shipping Address</label>
                        <input
                            type="text"
                            {...register("billingAddress", { required: "Billing address must be specified" })}
                            className="w-full rounded-md border px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500"
                            placeholder="Street Address"
                        />
                        <p className="text-red-500 text-sm">{errors.billingAddress && errors.billingAddress.message}</p>

                        {/* Order Total */}
                        <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                <p className="font-semibold text-gray-900">Rs {subTotal}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Shipping</p>
                                <p className="font-semibold text-gray-900">Rs {shippingAmount}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Total</p>
                            <p className="text-2xl font-semibold text-gray-900">Rs {totalAmount}</p>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CheckOut;
