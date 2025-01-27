import Link from "next/link";
import React from "react";
import product from "../data/product.json";

const Jackets = ({ products }) => {
  return (
    <section className="text-gray-600 body-font mt-10 m-4 p-4 ">
      <div className="container mx-auto p-0 mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold text-black mb-6">
          Motorcycle Jackets
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
          {Object.keys(products).map((item) => {
            return (
              <Link
                key={products[item].slug}
                href={`/product/${products[item].slug}`}
              >
                <div className="cursor-pointer p-1">
                  <div className="relative rounded overflow-hidden bg-gray-100">
                    <img
                      alt="ecommerce"
                      className="object-contain w-full h-full aspect-w-1 aspect-h-1"
                      src={products[item].img}
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-900 title-font text-sm sm:text-base md:text-lg lg:text-xl font-medium mt-2">
                      {products[item].title}
                    </h2>

                    <div className="flex justify-between mt-3">
                      <div className="mt-1 ">
                        {products[item].size.includes("S") && (
                          <span className="border mx-1 border-gray-600 px-1">
                            S
                          </span>
                        )}
                        {products[item].size.includes("M") && (
                          <span className="border mx-1 border-gray-600 px-1">
                            M
                          </span>
                        )}
                        {products[item].size.includes("L") && (
                          <span className="border mx-1 border-gray-600 px-1">
                            L
                          </span>
                        )}
                        {products[item].size.includes("XL") && (
                          <span className="border mx-1 border-gray-600 px-1">
                            XL
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex  space-x-2">
                        {products[item].color.includes("red") && (
                          <button className="border-2 border-gray-300 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("blue") && (
                          <button className="border-2 border-gray-300 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("purple") && (
                          <button className="border-2 border-gray-300 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("black") && (
                          <button className="border-2 border-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("white") && (
                          <button className="border-2 border-gray-300 bg-white rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                      </div>
                    </div>
                    <p className="mt-4 text-gray-900 ">
                      ₹{products[item].price}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  // Filter products by category ("Jackets")
  const Jackets = product.filter((product) => product.category === "jacket");

  // Group products by title and merge their sizes/colors
  let groupedProducts = {};
  for (let item of Jackets) {
    if (item.title in groupedProducts) {
      if (!groupedProducts[item.title].color.includes(item.color[0])) {
        groupedProducts[item.title].color.push(...item.color);
      }
      if (!groupedProducts[item.title].size.includes(item.size[0])) {
        groupedProducts[item.title].size.push(...item.size);
      }
    } else {
      groupedProducts[item.title] = { ...item };
    }
  }

  return {
    props: { products: groupedProducts },
  };
}

export default Jackets;
