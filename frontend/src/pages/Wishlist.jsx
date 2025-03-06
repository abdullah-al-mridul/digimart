import React from "react";
import { ShoppingCart, Trash2, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlist = [
    {
      _id: "67c8191c68175954d604f8fa",
      name: "bettary",
      description: "bettary description okay",
      price: 10000,
      images: [
        "https://res.cloudinary.com/dj5cslczv/image/upload/v1741262389/products/images-1741262388773-268977497_xplciq.png",
      ],
      category: "67c5bdb98690000e3abde1a6",
      brand: "tech",
      stock: 10,
      rating: 0,
      discount: 80,
      isFeatured: true,
      slug: "bettary",
    },
  ];

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        {wishlist.length > 0 ? (
          <>
            <h2 className="text-3xl font-semibold text-level-5 relative before:content-[''] before:w-5 before:h-full before:bg-level-5 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 ml-7 mb-8">
              My Wishlist ({wishlist.length})
            </h2>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((product) => {
                const discountedPrice =
                  product.price - (product.price * product.discount) / 100;

                return (
                  <div
                    key={product._id}
                    className="border-2 border-level-4 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Product Image */}
                    <Link to={`/product/${product.slug}`}>
                      <div className="relative h-52 overflow-hidden flex items-center justify-center p-4 bg-level-2/60">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-11/12 h-11/12 rounded-xl bg-level-1 object-cover transition-transform duration-300"
                        />
                        {product.discount > 0 && (
                          <div className="absolute top-5 left-5 bg-level-5 text-white px-3 py-1 rounded-lg text-sm font-medium transform -rotate-12">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-5 space-y-4">
                      {/* Category & Brand */}
                      <div className="flex justify-between items-center">
                        {/* <span className="text-sm text-white bg-level-5 px-2 py-1 rounded-sm">
                          {product.category}
                        </span> */}
                        <span className="text-sm bg-level-5 py-1 px-2 rounded-sm text-white">
                          {product.brand}
                        </span>
                      </div>

                      {/* Product Name */}
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="text-xl font-bold text-level-5 mb-2 truncate transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 transition-colors ${
                                i < product.rating
                                  ? "text-level-5 fill-level-5"
                                  : "text-level-4"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-level-5/60 ml-2">
                          ({product.rating})
                        </span>
                      </div>

                      {/* Price & Stock */}
                      <div className="flex justify-between items-center pt-2">
                        <div className="space-y-1">
                          <span className="text-2xl font-bold text-level-5">
                            ৳{formatPrice(discountedPrice)}
                          </span>
                          {product.discount > 0 && (
                            <div className="text-sm text-level-5/80 line-through">
                              ৳{formatPrice(product.price)}
                            </div>
                          )}
                        </div>
                        <span className="text-sm bg-level-5 px-3 py-1 rounded-full text-white">
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button className="flex-1 hover:bg-level-5 border-2 border-dashed border-level-5 text-level-5 cursor-pointer hover:text-white py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                        <button className="p-2 hover:bg-red-500 hover:border-red-500 hover:text-white border-2 border-dashed border-level-4 rounded-xl text-level-5 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-level-5 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-level-5/70 mb-8">
              Looks like you haven't added any items to your wishlist yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 hover:bg-level-5 border-2 border-dashed border-level-5 text-level-5 cursor-pointer hover:text-white py-3 px-6 rounded-xl transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
