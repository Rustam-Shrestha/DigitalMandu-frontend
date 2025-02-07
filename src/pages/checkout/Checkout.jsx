import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createOrder } from "../../store/checkoutSlice";
import { STATUSES } from "../../globals/miscellanouous/statuses";
import { current } from "@reduxjs/toolkit";

const CheckOut = () => {
    const { items: products } = useSelector((state) => state.cart);
    const status = useSelector((state) => state.checkout.status);
    const data = useSelector((state) => state.checkout.data); // Corrected from "data"
    console.log(data,"ass")
    console.log(status,"ass")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [paymentDetails, setPaymentDetails] = useState("COD");

    const shippingAmount = 100;
    const subTotal = products.reduce((amount, item) => amount + item.quantity * item.product[0].productPrice, 0);
    const totalAmount = subTotal + shippingAmount;

    const handleOrder = (data) => {
        const orderDetails = {
            shippingAddress: data.billingAddress,
            totalAmount,
            items: products.map((p) => ({
                quantity: p.quantity,
                product: p.product[0]._id,
            })),
            paymentDetails: {
                method: paymentDetails,
            },
        };

        dispatch(createOrder(orderDetails));
    };

    const handlePaymentChange = (e) => {
        setPaymentDetails(e.target.value);
    };

    const handleClick = () => {
        if (status === STATUSES.SUCCESS && data.length > 0) {
            const currentOrder = data[data.length];
            
            if (paymentDetails === "khalti") {
                console.log("Navigating to Khalti:", data);
            } else if (paymentDetails === "COD") {
                alert("Successfully placed an order");
                console.log("Order details:", currentOrder);
            }
        } else {
            console.warn("Order data is empty or not yet available.");
        }
    };
    
    return (
        <>
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32"></div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
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

                    <p className="mt-8 text-lg font-medium">Payment Methods</p>
                    <form noValidate onSubmit={handleSubmit(handleOrder)}>
                        <div className="mt-5 grid gap-6">
                            <div className="relative">
                                <input
                                    className="peer hidden"
                                    id="radio_1"
                                    type="radio"
                                    {...register("paymentMethod", { required: "Please select a payment method" })}
                                    value="COD"
                                    onChange={handlePaymentChange}
                                />
                                <label
                                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                    htmlFor="radio_1"
                                >
                                    <img className="w-14 object-contain" src="/images/cod.png" alt="" />
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold">COD (Cash On Delivery)</span>
                                    </div>
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    className="peer hidden"
                                    id="radio_2"
                                    type="radio"
                                    {...register("paymentMethod", { required: "Please select a payment method" })}
                                    value="khalti"
                                    onChange={handlePaymentChange}
                                />
                                <label
                                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                    htmlFor="radio_2"
                                >
                                    <img className="w-14 object-contain" src="/images/khalti.png" alt="" />
                                    <div className="ml-5">
                                        <span className="mt-2 font-semibold">Online (Khalti)</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <p className="text-red-500 text-sm">{errors.paymentMethod && errors.paymentMethod.message}</p>
                    </form>
                </div>

                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <form noValidate onSubmit={handleSubmit(handleOrder)}>
                        <label className="mt-4 mb-2 block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email must be specified" })}
                            className="w-full rounded-md border px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500"
                            placeholder="your.email@gmail.com"
                        />
                        <p className="text-red-500 text-sm">{errors.email && errors.email.message}</p>

                        <label className="mt-4 mb-2 block text-sm font-medium">Shipping Address</label>
                        <input
                            type="text"
                            {...register("billingAddress", { required: "Billing address must be specified" })}
                            className="w-full rounded-md border px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500"
                            placeholder="Street Address"
                        />
                        <p className="text-red-500 text-sm">{errors.billingAddress && errors.billingAddress.message}</p>

                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Total</p>
                            <p className="text-2xl font-semibold text-gray-900">Rs {totalAmount}</p>
                        </div>

                        <button type="submit" onClick={handleClick} className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CheckOut;
