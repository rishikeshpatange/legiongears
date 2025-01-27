import React from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {


  return (
    <div className='container p-10'>
      <h1 className="font-bold text-3xl my-8 text-center">CheckOut</h1>
      <h2 className='font-bold text-xl'>1. Deliverly Details</h2>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label for="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>
      <div className="px-2 w-full">
        <div className=" mb-4">
          <label for="addres" className="leading-7 text-sm text-gray-600">Address</label>
          <input type="address" id="address" name="address" />
          <textarea name="address" id="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 
          leading-8 transition-colors duration-200 ease-in-out" ></textarea>
          phone city this.state.first pincode
        </div>
      </div>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label for="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label for="City" className="leading-7 text-sm text-gray-600">City</label>
            <input type="City" id="City" name="City" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label for="State" className="leading-7 text-sm text-gray-600">State</label>
            <input type="State" id="State" name="State" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label for="Pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="Pincode" id="Pincode" name="Pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>
      <h2 className='font-semibold text-xl'>2. Review Cart Items</h2>
      <div className="sideCart  bg-gray-100 p-10 transition-transform mt-5">
        <ol className='list-decimal'>
          {Object.keys(cart).length == 0 && <div className='my-4 text-base font-normal'>Your cart is Empty!</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className='item flex my-5'>
                <div className='w-2/3'>{cart[k].name} ({cart[k].size}/ {cart[k].variant})</div>
                <div className='flex font-semibold items-center justify-center w-1/3 '>
                  <AiOutlineMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-gray-500' />
                  <span className='mx-2 text-sm'>{cart[k].qty}</span>
                  <AiOutlinePlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-gray-500' />
                </div>
              </div>
            </li>
          })}
        </ol>
        <div className='font-bold'>
          SubTotal: ₹{subTotal}
        </div>
      </div>
      <button className="flex mt-5 text-white bg-gray-500 border-0 py-2 px-2 focus:outline-none hover:bg-gray-600 rounded text-sm">Pay ₹{subTotal}</button>

    </div>
  )
}

export default checkout