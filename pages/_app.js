import "@/styles/globals.css";
import '../styles/globals.css';
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/router";
import Fotter from "@/components/Fotter";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const router = useRouter();

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = { ...cart }; // avoid direct mutation
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }

    setCart(newCart);
    saveCart(newCart);
    toggleCart(); // Open the cart when an item is added
  };

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    saveCart({});
    let newCart = { itemCode: { qty: 1, price, name, size, variant } };
    setCart(newCart);
    saveCart(newCart);
    router.push('/checkout');
  };

  const clearCart = () => {
    setCart({});
  };

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = { ...cart };
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }

    setCart(newCart);
    saveCart(newCart);
  };

  const [isCartOpen, setIsCartOpen] = useState(false); // Cart open state
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <Navbar
        key={key}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        isCartOpen={isCartOpen} // Pass isCartOpen to Navbar
        toggleCart={toggleCart} // Pass toggleCart to Navbar
      />
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        buyNow={buyNow}
        {...pageProps}
      />
      <Fotter />
    </>
  );
}
