import React from 'react';
import Image from 'next/image';

const order = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">#8977</h1>
  
          <p className="leading-relaxed mb-4">Your order has been successfully placed</p>
          <div className="flex border-t border-gray-200 py-2">
            <span className="text-pink-500">Item discription</span>
            <span className="ml-auto text-pink-500">Quantity</span>
            <span className="ml-auto text-pink-500">Item Total</span>
          </div>
          <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Wear the Code (Xl/black)</span>
            <span className="ml-auto text-gray-900  mr-auto">1</span>
            <span className="ml-auto text-gray-900 ">499</span>
          </div>
          <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Wear the Code (Xl/black)</span>
            <span className="ml-auto text-gray-900  mr-auto">1</span>
            <span className="ml-auto text-gray-900 ">499</span>
          </div>
          <div className="flex border-t border-gray-200 py-2">
            <span className="text-gray-500">Wear the Code (Xl/black)</span>
            <span className="ml-auto text-gray-900  mr-auto">1</span>
            <span className="ml-auto text-gray-900 ">499</span>
          </div>
  
          <div className="flex mt-5">
            <span className="title-font font-medium text-2xl text-gray-900">SuubTotal: ₹58.00</span>
          </div>
            <button className="flex mt-5 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
        </div>
        <Image alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
      </div>
    </div>
  </section>
  )
}

export default order