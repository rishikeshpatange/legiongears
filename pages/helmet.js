
import Link from 'next/link';
import React from 'react';
import Product from "@/models/Product";
import mongoose from "mongoose";



const helmets = ({ products }) => { 
  return (
    <section className="text-gray-600 body-font">
      <div className="container  mt-10 mb-10 p-4 ">
        <h1>helmets</h1>
        <div className="flex flex-wrap ">
          {Object.keys(products).map((item) => {
            return <Link key={item._id} href={`/product/${products[item].slug}`}>
              <div className="w-full p-4 cursor-pointer">
                <div className="relative rounded overflow-hidden bg-gray-100" >
                  <img alt="ecommerce" className="object-cover object-center w-full h-full" style={{minHeight: "400px", width: "300px"}}  src={products[item].img} />
                </div>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">helmets</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                  <p className="mt-1">₹{products[item].price}</p>
                  <div className="mt-1">
                    {products[item].size.includes('S') && <span className='border mx-1 border-gray-600 px-1 '>S</span>}
                    {products[item].size.includes('M') && <span className='border mx-1 border-gray-600 px-1 '>M</span>}
                    {products[item].size.includes('L') && <span className='border mx-1 border-gray-600 px-1 '>L</span>}
                    {products[item].size.includes('XL') && <span className='border mx-1 border-gray-600 px-1 '>XL</span>}
                    {products[item].size.includes('XLL') && <span className='border mx-1 border-gray-600 px-1 '>XLL</span>}
                  </div>
                  <div className="mt-1">
                    {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('brown') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  </div>

                </div>
              </div>
            </Link>
          })}
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL)
  }
  let products = await Product.find({ category: "helmets" })
  let helmets = {}
  for (let item of products) {
    if (item.title in helmets) {
      if (!helmets[item.title].color.includes(item.color) && item.availabelQty > 0) {
        helmets[item.title].color.push(item.color)
      }
      if (!helmets[item.title].size.includes(item.size) && item.availabelQty > 0) {
        helmets[item.title].size.push(item.size)
      }
    }
    else {
      helmets[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availabelQty > 0) {
        helmets[item.title].color = [item.color]
        helmets[item.title].size = [item.size]
      }

    }

  }


  return {
    props: { products: JSON.parse(JSON.stringify(helmets)) },
  }
}

export default helmets;

