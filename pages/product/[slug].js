import { useRouter } from 'next/router';
import { useState } from 'react';
import productData from "../../data/product.json"; // Importing local JSON data
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = ({ addToCart, product, variants, buyNow }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [pin, setPin] = useState();
  const [service, setService] = useState();

  const checkServiceability = async () => {
    let pins = await fetch('http://localhost:3000/api/pincode');
    let pinJson = await pins.json();
    if (pinJson.includes(parseInt(pin))) {
      setService(true);
      toast.success('Your Pincode is Serviceable', {
        autoClose: 1000,
      });
    } else {
      setService(false);
      toast.error('Your Pincode is not Serviceable', {
        autoClose: 1000,
      });
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);

  const refreshVariant = (newSize, newColor) => {
    let url = `/product/${variants[newColor][newSize]['slug']}`;
    window.location = url;
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer />
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).map((variantColor) => (
                    <button
                      key={variantColor}
                      onClick={() => { refreshVariant(size, variantColor) }}
                      className={`border-2 rounded-full w-6 h-6 focus:outline-none ${color === variantColor ? 'border-black' : 'border-gray-300'} ml-1`}
                      style={{ backgroundColor: variantColor }}
                    />
                  ))}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500 text-base pl-3 pr-10">
                      {Object.keys(variants[color]).map((variantSize) => (
                        <option key={variantSize} value={variantSize}>{variantSize}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
                <button className="flex ml-8 text-white bg-gray-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-gray-600 rounded" onClick={() => { buyNow(slug, 1, product.price, product.title, size, color) }}>Buy Now</button>
                <button onClick={() => { addToCart(slug, 1, product.price, product.title, size, color) }} className="flex ml-4 text-white bg-gray-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-gray-600 rounded">Add to Cart</button>
              </div>
              <div className="pin mt-5 flex space-x-2">
                <input onChange={onChangePin} type="text" className='rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500 text-base pl-3 pr-10' placeholder='Pincode' />
                <button onClick={checkServiceability} className='flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded'>Check</button>
              </div>

              {(!service && service != null) && <div className='text-red-700 text-sm mt-3'>Sorry! We do not deliver to this pincode yet</div>}
              {(service && service != null) && <div className='text-green-700 text-sm mt-3'>We do deliver to this pincode</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query;

  // Filter product by slug from the local JSON
  const product = productData.find(item => item.slug === slug);

  // Get variants for the product (assuming variants are grouped by color)
  const variants = {};
  productData.forEach(item => {
    if (item.title === product.title && item.category === product.category) {
      if (!variants[item.color]) {
        variants[item.color] = {};
      }
      variants[item.color][item.size] = item;
    }
  });

  return {
    props: {
      product,
      variants
    },
  };
}

export default Post;
