import { useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import Link from "next/link";

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="bg-zinc-900 text-white relative">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link href="/" className="text-2xl font-bold">
          Legion Gears
        </Link>

        <div className="flex ">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link href="/jackets" className="hover:text-gray-500">
              Jackets
            </Link>
            <Link href="/helmet" className="hover:text-gray-500">
              Helmets
            </Link>
            <Link href="/gloves" className="hover:text-gray-500">
              Gloves
            </Link>
          </div>
          {/* Shopping Cart and Hamburger */}
          <div className="flex space-x-4 ml-4">
            <div className="cursor-pointer" onClick={toggleCart}>
              <AiOutlineShoppingCart className="text-2xl" />
            </div>
            <button
              onClick={toggleNav}
              className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden"
            >
              <HiMenuAlt3 className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white text-gray-900 p-6 transform transition-transform duration-500 ${
          isNavOpen ? "translate-y-0" : "-translate-y-full"
        } z-50`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Menu</h2>
          <AiFillCloseCircle
            onClick={toggleNav}
            className="text-2xl cursor-pointer"
          />
        </div>
        <ul className="space-y-4 text-center">
          <li>
            <Link
              href="/jacket"
              className="hover:text-gray-500"
              onClick={toggleNav}
            >
              Jacket
            </Link>
          </li>
          <li>
            <Link
              href="/helmet"
              className="hover:text-gray-500"
              onClick={toggleNav}
            >
              Helmet
            </Link>
          </li>
          <li>
            <Link
              href="/Gloves"
              className="hover:text-gray-500"
              onClick={toggleNav}
            >
              Gloves
            </Link>
          </li>
        </ul>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white text-gray-900 w-80 p-6 shadow-xl transform transition-transform duration-500 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <AiFillCloseCircle
            onClick={toggleCart}
            className="text-2xl cursor-pointer"
          />
        </div>

        {/* Cart Items */}
        <ol className="space-y-4">
          {Object.keys(cart).length === 0 && (
            <div className="text-center text-gray-400">Your cart is Empty!</div>
          )}
          {Object.keys(cart).map((k) => (
            <li key={k} className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{cart[k].name}</h3>
                <p className="text-sm text-gray-400">Size: {cart[k].size}</p>
                <p className="text-sm text-gray-400">Color: {cart[k].color}</p>
                <p className="text-sm text-gray-400">Price: ₹{cart[k].price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <AiOutlineMinusCircle
                  onClick={() =>
                    removeFromCart(
                      k,
                      1,
                      cart[k].price,
                      cart[k].name,
                      cart[k].size,
                      cart[k].variant
                    )
                  }
                  className="cursor-pointer text-gray-500 text-xl"
                />
                <span className="font-semibold">{cart[k].qty}</span>
                <AiOutlinePlusCircle
                  onClick={() =>
                    addToCart(
                      k,
                      1,
                      cart[k].price,
                      cart[k].name,
                      cart[k].size,
                      cart[k].variant
                    )
                  }
                  className="cursor-pointer text-gray-500 text-xl"
                />
              </div>
            </li>
          ))}
        </ol>

        {/* Subtotal */}
        {Object.keys(cart).length > 0 && (
          <>
            <div className="mt-6 border-t border-gray-700 pt-4">
              <h3 className="text-lg font-bold">Subtotal: ₹{subTotal}</h3>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex space-x-4">
              <Link href="/checkout">
                <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
                  Checkout
                </button>
              </Link>
              <button
                onClick={clearCart}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
