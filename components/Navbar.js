import React, { useRef, useState } from 'react';
import Link from "next/link";
import { AiFillCloseCircle, AiOutlineShoppingCart, AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";


const Navbar = ({Logout,user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {

  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal)
  const [dropdown, setDropdown] = useState(false)

  const toggleDropdown = () =>{
    setDropdown(!dropdown)
  }

  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }

  }

  const ref = useRef()



  return (
    <div>
      <nav className="bg-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white " aria-current="page">
                Legion Gears
              </Link>
          <button 
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-black  ">

              <Link href="/jacket" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white " aria-current="page">
                Jacket
              </Link>
              <Link href="/gloves" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white " aria-current="page">
                Gloves
              </Link>
              <Link href="/helmet" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white " aria-current="page">
                Helmets
              </Link>
              <button onClick={Logout} className='text-white '>logout</button>
              { user.value &&  <MdAccountCircle onMouseOver={toggleDropdown} onMouseLeave={toggleDropdown} className='text-xl md:text-2xl text-white' />}
              {!user.value && <Link href={'/login'}>
                <button className='bg-white px-2 py-1 rounded-md text-black text-sm'>login</button>
              </Link>}
              <div onClick={toggleCart} className='cart '>
                <AiOutlineShoppingCart className='text-xl md:text-2xl text-white' />
              </div>
     
            </ul>
          </div>
          <div ref={ref} className={`w-72 z-50 h-[100vh] sideCart absolute top-0 right-0 bg-pink-100 p-10 transition-transform 
              ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
            <h2 className="font-bold">this is my shopping cart</h2>
            <span onClick={toggleCart} className="absolute top-2 right-2 cursor-pointer text-2xl text-pink-500"><AiFillCloseCircle /></span>
            <ol className='list-decimal'>
              {Object.keys(cart).length == 0 && <div className='my-4 text-base font-normal'>Your cart is Empty!</div>}
              {Object.keys(cart).map((k) => {
                return <li key={k}>
                  <div className='item flex my-5'>
                    <div className='w-2/3 text-sm'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                    <div className='flex font-semibold items-center justify-center w-1/3 '>
                      <AiOutlineMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-pink-500' />
                      <span className='mx-2 text-sm'>{cart[k].qty}</span>
                      <AiOutlinePlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-pink-500' />
                    </div>
                  </div>
                </li>
              })}
            </ol>
            <span className='font-bold'>
              SubTotal: ₹{subTotal}
            </span>


            <div className="flex mt-5">
              <Link href={'/checkout'} className="flex mx-auto mx-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
                <button >CheckOut</button>
              </Link>
              <button onClick={clearCart} className="flex mx-auto mx-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Clear</button>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
