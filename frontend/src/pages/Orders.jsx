import React from "react";
import { Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const orders = [
  {
    shippingAddress: {
      street: "madrasamor",
      city: "natore",
      state: "rajshahi",
      postalCode: "6400",
      country: "Bangladesh",
      phone: "+8801576969706",
    },
    paymentMethod: {
      type: "cash_on_delivery",
      details: "cash on delivery",
    },
    _id: "67c918eee7946eb9638efd43",
    user: "67c5986f7129094499c51b98",
    items: [
      {
        product: {
          _id: "67c8191c68175954d604f8fa",
          name: "bettary",
          description: "bettary description  okay",
          price: 10000,
          images: [
            "https://res.cloudinary.com/dj5cslczv/image/upload/v1741262389/products/images-1741262388773-268977497_xplciq.png",
            "https://res.cloudinary.com/dj5cslczv/image/upload/v1741262390/products/images-1741262388776-340431677_bqbadr.png",
            "https://res.cloudinary.com/dj5cslczv/image/upload/v1741262391/products/images-1741262388776-271590988_wmeynf.jpg",
          ],
          category: "67c5bdb98690000e3abde1a6",
          brand: "tech",
          stock: 10,
          rating: 0,
          discount: 80,
          isFeatured: true,
          createdAt: "2025-03-05T09:27:56.384Z",
          updatedAt: "2025-03-06T11:59:53.388Z",
          slug: "bettary",
          __v: 0,
        },
        quantity: 2,
        price: 10000,
        _id: "67c918eee7946eb9638efd44",
      },
    ],
    paymentStatus: "pending",
    status: "processing",
    totalAmount: 20000,
    subtotal: 20000,
    shippingCost: 0,
    tax: 0,
    total: 20000,
    statusHistory: [
      {
        status: "processing",
        date: "2025-03-06T05:46:02.918Z",
        _id: "67c9369a7f882fbb2c9bf760",
      },
    ],
    createdAt: "2025-03-06T03:39:26.965Z",
    updatedAt: "2025-03-06T05:46:02.917Z",
    __v: 1,
  },
  {
    shippingAddress: {
      street: "madrasamor",
      city: "natore",
      state: "rajshahi",
      postalCode: "6400",
      country: "Bangladesh",
      phone: "+8801576969706",
    },
    paymentMethod: {
      type: "cash_on_delivery",
      details: "cash on delivery",
    },
    _id: "67c895cfd5ebf5020efaf113",
    user: "67c5986f7129094499c51b98",
    items: [
      {
        product: {
          _id: "67c8191c68175954d604f8fa",
          name: "bettary",
          description: "bettary description  okay",
          price: 10000,
          images: [
            "https://res.cloudinary.com/dj5cslczv/image/upload/v1741262389/products/images-1741262388773-268977497_xplciq.png",
            "https://res.cloudinary.com/dj5cslczv/image/upload/v1741262390/products/images-1741262388776-340431677_bqbadr.png",
            "https://res.cloudinary.com/dj5cslczv/image/upload/v1741262391/products/images-1741262388776-271590988_wmeynf.jpg",
          ],
          category: "67c5bdb98690000e3abde1a6",
          brand: "tech",
          stock: 10,
          rating: 0,
          discount: 80,
          isFeatured: true,
          createdAt: "2025-03-05T09:27:56.384Z",
          updatedAt: "2025-03-06T11:59:53.388Z",
          slug: "bettary",
          __v: 0,
        },
        quantity: 2,
        price: 10000,
        _id: "67c895cfd5ebf5020efaf114",
      },
    ],
    paymentStatus: "failed",
    status: "pending",
    totalAmount: 20000,
    subtotal: 20000,
    shippingCost: 0,
    tax: 0,
    total: 20000,
    statusHistory: [],
    createdAt: "2025-03-05T18:19:59.519Z",
    updatedAt: "2025-03-06T03:37:28.368Z",
    __v: 0,
  },
  {
    shippingAddress: {
      street: "madrasamor",
      city: "natore",
      state: "rajshahi",
      postalCode: "6400",
      country: "Bangladesh",
      phone: "+8801576969706",
    },
    paymentMethod: {
      type: "cash_on_delivery",
      details: "cash on delivery",
    },
    _id: "67c82d21d9f3ed3d66c078fb",
    user: "67c5986f7129094499c51b98",
    items: [
      {
        product: {
          _id: "67c8191c68175954d604f8fa",
          name: "bettary",
          description: "bettary description  okay",
          price: 10000,
          images: [
            "https://res.cloudinary.com/dj5cslczv/image/upload/v1741262389/products/images-1741262388773-268977497_xplciq.png",
            "https://res.cloudinary.com/dj5cslczv/image/upload/v1741262390/products/images-1741262388776-340431677_bqbadr.png",
            "https://res.cloudinary.com/dj5cslczv/image/upload/v1741262391/products/images-1741262388776-271590988_wmeynf.jpg",
          ],
          category: "67c5bdb98690000e3abde1a6",
          brand: "tech",
          stock: 10,
          rating: 0,
          discount: 80,
          isFeatured: true,
          createdAt: "2025-03-05T09:27:56.384Z",
          updatedAt: "2025-03-06T11:59:53.388Z",
          slug: "bettary",
          __v: 0,
        },
        quantity: 2,
        price: 10000,
        _id: "67c82d21d9f3ed3d66c078fc",
      },
    ],
    paymentStatus: "paid",
    status: "pending",
    totalAmount: 20000,
    subtotal: 20000,
    shippingCost: 0,
    tax: 0,
    total: 20000,
    statusHistory: [],
    createdAt: "2025-03-05T10:53:21.481Z",
    updatedAt: "2025-03-05T17:46:45.427Z",
    __v: 0,
  },
];

const Orders = () => {
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "text-blue-500";
      case "shipped":
        return "text-yellow-500";
      case "delivered":
        return "text-green-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-level-5";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-level-5";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Clock className="w-5 h-5" />;
      case "shipped":
        return <Truck className="w-5 h-5" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5" />;
      case "cancelled":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const needsPayment = (order) => {
    return (
      order.paymentStatus === "pending" || order.paymentStatus === "failed"
    );
  };

  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        <h2 className="text-3xl font-semibold text-level-5 relative before:content-[''] before:w-5 before:h-full before:bg-level-5 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 ml-7 mb-8">
          My Orders
        </h2>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border-2 border-dashed border-level-4 rounded-xl overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-level-2/60 p-4 border-b-2 border-dashed border-level-4">
                  <div className="flex flex-wrap gap-4 justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-level-5/70">Order ID</p>
                      <p className="font-medium text-level-5">#{order._id}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-level-5/70">Order Date</p>
                      <p className="font-medium text-level-5">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-4 p-4 border-2 border-dashed border-level-4 rounded-xl bg-level-2/30"
                    >
                      {/* Product Image */}
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="w-20 h-20 border-2 border-dashed border-level-4 rounded-lg p-2 bg-level-1"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link
                          to={`/product/${item.product.slug}`}
                          className="text-lg font-semibold text-level-5 hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-level-5/70">
                          Brand: {item.product.brand}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-level-5">
                            ৳{formatPrice(item.price)} × {item.quantity}
                          </p>
                          <p className="font-semibold text-level-5">
                            ৳{formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Order Summary */}
                  <div className="flex flex-wrap gap-6 justify-between items-start mt-4 pt-4 border-t-2 border-dashed border-level-4">
                    {/* Shipping Address */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-level-5">
                        Shipping Address
                      </h4>
                      <div className="text-level-5/70">
                        <p>{order.shippingAddress.street}</p>
                        <p>
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.state}{" "}
                          {order.shippingAddress.postalCode}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                        <p>{order.shippingAddress.phone}</p>
                      </div>
                    </div>

                    {/* Order Status with Pay Now Button */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-level-5">
                        Order Status
                      </h4>
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex items-center gap-1 ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                        <span className="text-level-5/50">|</span>
                        <span
                          className={`${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                      <p className="text-level-5/70">
                        Payment Method: {order.paymentMethod.type}
                      </p>
                      {needsPayment(order) && (
                        <button className="mt-2 w-full bg-level-5 text-white py-2 px-4 rounded-lg hover:bg-level-5/90 transition-colors flex items-center justify-center gap-2">
                          Pay Now ৳{formatPrice(order.total)}
                        </button>
                      )}
                    </div>

                    {/* Order Total */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-level-5">
                        Order Total
                      </h4>
                      <div className="space-y-1">
                        <div className="flex justify-between gap-8">
                          <span className="text-level-5/70">Subtotal:</span>
                          <span className="text-level-5">
                            ৳{formatPrice(order.subtotal)}
                          </span>
                        </div>
                        <div className="flex justify-between gap-8">
                          <span className="text-level-5/70">Shipping:</span>
                          <span className="text-level-5">
                            ৳{formatPrice(order.shippingCost)}
                          </span>
                        </div>
                        <div className="flex justify-between gap-8 font-semibold">
                          <span className="text-level-5">Total:</span>
                          <span className="text-level-5">
                            ৳{formatPrice(order.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-level-5 mb-4">
              No orders yet
            </h2>
            <p className="text-level-5/70 mb-8">
              Looks like you haven't placed any orders yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 hover:bg-level-5 border-2 border-dashed border-level-5 text-level-5 cursor-pointer hover:text-white py-3 px-6 rounded-xl transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
