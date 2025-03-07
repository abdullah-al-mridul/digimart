import React, { useEffect } from "react";
import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoveRight,
} from "lucide-react";
import adminStore from "../store/adminStore";
import { Link } from "react-router-dom";

const Admin = () => {
  const { dashboard, getDashboard, orders, loading } = adminStore();
  console.log(dashboard);
  useEffect(() => {
    getDashboard();
  }, []);
  useEffect(() => {
    console.log(orders);
  }, [orders]);
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

  const getPaymentIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-5 h-5" />;
      case "pending":
        return <Clock className="w-5 h-5" />;
      case "failed":
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };
  if (loading)
    return (
      <div className="border-level-4 border-dashed border-b-2">
        <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
          <div className="h-8 w-48 bg-level-4/20 rounded-lg animate-pulse mb-8" />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="border-2 border-dashed border-level-4 rounded-xl p-6 bg-level-2/60"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-level-4/20 rounded animate-pulse" />
                    <div className="h-8 w-16 bg-level-4/20 rounded animate-pulse" />
                  </div>
                  <div className="p-4 bg-level-2 rounded-xl border-2 border-dashed border-level-4">
                    <div className="w-6 h-6 bg-level-4/20 rounded animate-pulse" />
                  </div>
                </div>
                {i === 0 && (
                  <div className="mt-4 space-y-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="flex justify-between">
                        <div className="h-4 w-20 bg-level-4/20 rounded animate-pulse" />
                        <div className="h-4 w-8 bg-level-4/20 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Recent Orders Skeleton */}
          <div className="border-2 border-dashed border-level-4 rounded-xl">
            <div className="p-4 border-b-2 border-dashed border-level-4">
              <div className="h-6 w-32 bg-level-4/20 rounded animate-pulse" />
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="border-2 border-dashed border-level-4 rounded-xl p-4 bg-level-2/60"
                  >
                    <div className="flex flex-wrap gap-6 justify-between">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="space-y-2">
                          <div className="h-4 w-24 bg-level-4/20 rounded animate-pulse" />
                          <div className="h-5 w-32 bg-level-4/20 rounded animate-pulse" />
                          <div className="h-4 w-28 bg-level-4/20 rounded animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        <h2 className="text-3xl font-semibold text-level-5 relative before:content-[''] before:w-5 before:h-full before:bg-level-5 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 ml-7 mb-8">
          Dashboard
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Orders */}
          <div className="border-2 border-dashed border-level-4 rounded-xl p-6 bg-level-2/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-level-5/70">Total Orders</p>
                <h3 className="text-3xl font-bold text-level-5 mt-1">
                  {dashboard.totalOrders}
                </h3>
              </div>
              <div className="p-4 bg-level-2 rounded-xl border-2 border-dashed border-level-4">
                <ShoppingBag className="w-6 h-6 text-level-5" />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              {dashboard.ordersByStatus.map((status) => (
                <div
                  key={status._id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-level-5/70 capitalize">
                    {status._id}
                  </span>
                  <span className={`font-medium ${getStatusColor(status._id)}`}>
                    {status.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Customers */}
          <div className="border-2 border-dashed border-level-4 rounded-xl p-6 bg-level-2/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-level-5/70">Total Customers</p>
                <h3 className="text-3xl font-bold text-level-5 mt-1">
                  {dashboard.totalCustomers}
                </h3>
              </div>
              <div className="p-4 bg-level-2 rounded-xl border-2 border-dashed border-level-4">
                <Users className="w-6 h-6 text-level-5" />
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="border-2 border-dashed border-level-4 rounded-xl p-6 bg-level-2/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-level-5/70">Total Revenue</p>
                <h3 className="text-3xl font-bold text-level-5 mt-1">
                  ৳{formatPrice(dashboard.totalRevenue)}
                </h3>
              </div>
              <div className="p-4 bg-level-2 rounded-xl border-2 border-dashed border-level-4">
                <DollarSign className="w-6 h-6 text-level-5" />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              {dashboard.ordersByPaymentStatus.map((status) => (
                <div
                  key={status._id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-level-5/70 capitalize">
                    {status._id}
                  </span>
                  <span
                    className={`font-medium ${getPaymentStatusColor(
                      status._id
                    )}`}
                  >
                    ৳{formatPrice(status.total)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Link
            to={"/admin/control"}
            className="border-2 border-dashed flex group items-center justify-center border-level-4 rounded-xl p-6 bg-level-2/60"
          >
            <div className="flex items-center flex-col gap-5 justify-between">
              <div>
                <p className="text-level-5 font-bold text-3xl">Control Zone!</p>
              </div>
              <div className="p-4 bg-level-2 group-hover:-rotate-15 transition-all rounded-xl border-2 border-dashed border-level-4">
                <MoveRight className="w-6 h-6 text-level-5" />
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="border-2 border-dashed border-level-4 rounded-xl">
          <div className="p-4 border-b-2 border-dashed border-level-4">
            <h3 className="text-xl font-semibold text-level-5">
              Recent Orders
            </h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border-2 border-dashed border-level-4 rounded-xl p-4 bg-level-2/60"
                >
                  <div className="flex flex-wrap gap-6 justify-between">
                    {/* Order Info */}
                    <div className="space-y-1">
                      <p className="text-level-5/70">Order ID</p>
                      <p className="font-medium text-level-5">#{order._id}</p>
                      <p className="text-level-5/70">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-1">
                      <p className="text-level-5/70">Customer</p>
                      <p className="font-medium text-level-5">
                        {order.user.email}
                      </p>
                      <p className="text-level-5/70">
                        {order.shippingAddress.phone}
                      </p>
                    </div>

                    {/* Order Status */}
                    <div className="space-y-1">
                      <p className="text-level-5/70">Status</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`capitalize font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                        <span className="text-level-5/50">|</span>
                        <span
                          className={`flex items-center gap-1 capitalize ${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {getPaymentIcon(order.paymentStatus)}
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>

                    {/* Order Total */}
                    <div className="space-y-1">
                      <p className="text-level-5/70">Total</p>
                      <p className="text-xl font-bold text-level-5">
                        ৳{formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
