import Link from "next/link";
import React from "react";
import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

const Helmets = ({ products }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mt-10 mb-10 p-4">
        <h1>Helmets</h1>
        <div className="flex flex-wrap">
          {products.map((item) => (
            <Link key={item._id} href={`/product/${item.slug}`}>
              <div className="w-full p-4 cursor-pointer">
                <div className="relative rounded overflow-hidden bg-gray-100">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full"
                    style={{ minHeight: "400px", width: "300px" }}
                    src={item.img}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    Helmets
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {item.title}
                  </h2>
                  <p className="mt-1">₹{item.price}</p>
                  <div className="mt-1">
                    {item.size.map((size) => (
                      <span key={size} className="border mx-1 border-gray-600 px-1">
                        {size}
                      </span>
                    ))}
                  </div>
                  <div className="mt-1">
                    {item.color.map((color) => (
                      <button
                        key={color}
                        className={`border-2 border-gray-300 ml-1 bg-${color}-500 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  await connectDb();

  // Aggregation pipeline to optimize query and reduce data transfer
  let products = await Product.aggregate([
    { $match: { category: "helmets" } },
    {
      $group: {
        _id: "$title",
        title: { $first: "$title" },
        slug: { $first: "$slug" },
        desc: { $first: "$desc" },
        img: { $first: "$img" },
        price: { $first: "$price" },
        availableQty: { $sum: "$availabelQty" },
        color: { $addToSet: "$color" },
        size: { $addToSet: "$size" },
      },
    },
  ]);

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default Helmets;
