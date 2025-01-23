import Link from 'next/link';
import React from 'react';
import product from "../data/product.json"; // Import local JSON file

const Gloves = ({ products }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mt-10 mb-10 p-4">
        <h1>Gloves</h1>
        <div className="flex flex-wrap">
          {Object.keys(products).map((item) => {
            return (
              <Link key={products[item].slug} href={`/product/${products[item].slug}`}>
                <div className="w-full p-4 cursor-pointer">
                  <div className="relative rounded overflow-hidden bg-gray-100">
                    <img
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full"
                      style={{ minHeight: "400px", width: "300px" }}
                      src={products[item].img}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Gloves</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="mt-1">
                      {products[item].size.includes("S") && (
                        <span className="border mx-1 border-gray-600 px-1">S</span>
                      )}
                      {products[item].size.includes("M") && (
                        <span className="border mx-1 border-gray-600 px-1">M</span>
                      )}
                      {products[item].size.includes("L") && (
                        <span className="border mx-1 border-gray-600 px-1">L</span>
                      )}
                      {products[item].size.includes("XL") && (
                        <span className="border mx-1 border-gray-600 px-1">XL</span>
                      )}
                    </div>
                    <div className="mt-1">
                      {products[item].color.includes("red") && (
                        <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                      {products[item].color.includes("blue") && (
                        <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      )}
                    </div>
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
  // Filter products by category ("Gloves")
  const gloves = product.filter((product) => product.category === "gloves");

  // Group products by title and merge their sizes/colors
  let groupedProducts = {};
  for (let item of gloves) {
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

export default Gloves;
