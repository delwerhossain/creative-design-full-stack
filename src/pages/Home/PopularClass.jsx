const PopularClass = ({product}) => {
  return (
    <>
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="#">
          <img
            src={product.pictureURL}
            alt="Product"
            className="h-80 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
            <div className="flex justify-between">
              <p className="text-lg font-bold text-black truncate block capitalize">
                {product.name}
              </p>
              <p className="text-lg p-2 bg-green-100 rounded-xl text-black truncate block capitalize">
                {" "}
                ${product.price}
              </p>
            </div>
            {/* Price and add to cart button */}
          </div>
        </a>
      </div>
    </>
  );
};

export default PopularClass;
