"use client";
import { useListOrdersQuery, useUpdateOrderStatusMutation } from "@/lib/services/orderApi";
import { useMeQuery } from "@/lib/services/authApi";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const { data: userData } = useMeQuery();
  const { data: ordersData, isLoading } = useListOrdersQuery();
  const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();
  
  const currentUser = userData?.data;
  const userRole = currentUser?.role;
  const orders = ordersData?.data || [];
  const isSeller = userRole === "seller";

  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus({ id: orderId, newStatus: status }).unwrap();
      toast.success(`Order status updated to ${status}`);
    } catch (error: any) {
      toast.error(error?.data?.error || "Failed to update status");
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Out for Delivery":
        return "bg-purple-100 text-purple-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled/Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return "⏳";
      case "Processing":
        return "⚙️";
      case "Out for Delivery":
        return "🚚";
      case "Completed":
        return "✓";
      case "Cancelled/Rejected":
        return "✕";
      default:
        return "●";
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-600 mt-2">Track and manage your orders</p>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <span className="text-gray-600">Loading orders...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-600 mt-2">
          {isSeller ? "Manage orders for your products" : userRole === "buyer" ? "Track your purchase history" : "View all platform orders"}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-16 text-center">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-gray-600 font-medium text-lg mb-2">No orders found</p>
          <p className="text-gray-500 text-sm">
            {isSeller ? "You haven't received any orders yet" : userRole === "buyer" ? "You haven't placed any orders yet" : "There are no orders in the system"}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={String(order._id)} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Order #{String(order._id).slice(-8).toUpperCase()}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })} at {new Date(order.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${getStatusBadgeColor(order.currentStatus)}`}>
                      <span className="text-base">{getStatusIcon(order.currentStatus)}</span>
                      {order.currentStatus}
                    </span>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-700">${order.totalAmount.toLocaleString()}</p>
                      <p className="text-xs text-gray-600 uppercase font-semibold">{order.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-8">
                {/* Customer/Seller Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 rounded-full p-2">
                      <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500 font-semibold">
                        {isSeller ? "Customer" : "Seller"}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {isSeller 
                          ? (order.buyerName || order.buyerEmail || "N/A")
                          : (order.sellerName || order.sellerEmail || "N/A")
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Products Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Products ({order.products?.length || 0})
                  </h4>
                  <div className="space-y-2">
                    {order.products?.map((prod: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg w-12 h-12 flex items-center justify-center text-white font-bold">
                            {prod.title.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{prod.title}</p>
                            <p className="text-xs text-gray-600">Quantity: {prod.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-700">${(prod.price * prod.quantity).toLocaleString()}</p>
                          <p className="text-xs text-gray-500">${prod.price.toLocaleString()} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seller Status Update Section */}
                {isSeller && (
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Update Status
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {order.currentStatus !== "Processing" && order.currentStatus !== "Completed" && order.currentStatus !== "Cancelled/Rejected" && (
                        <button
                          onClick={() => handleStatusUpdate(String(order._id), "Processing")}
                          disabled={isUpdating}
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-md hover:shadow-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Start Processing
                        </button>
                      )}
                      {order.currentStatus === "Processing" && (
                        <button
                          onClick={() => handleStatusUpdate(String(order._id), "Out for Delivery")}
                          disabled={isUpdating}
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 shadow-md hover:shadow-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          Ship Order
                        </button>
                      )}
                      {order.currentStatus === "Out for Delivery" && (
                        <button
                          onClick={() => handleStatusUpdate(String(order._id), "Completed")}
                          disabled={isUpdating}
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 shadow-md hover:shadow-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Mark Complete
                        </button>
                      )}
                      {order.currentStatus !== "Completed" && order.currentStatus !== "Cancelled/Rejected" && (
                        <button
                          onClick={() => handleStatusUpdate(String(order._id), "Cancelled/Rejected")}
                          disabled={isUpdating}
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 shadow-md hover:shadow-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Status History */}
                <details className="border-t border-gray-200 pt-6 mt-6">
                  <summary className="cursor-pointer text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-2 group">
                    <svg className={`w-5 h-5 transition-transform duration-300 group-open:rotate-180`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    View Status History
                  </summary>
                  <div className="mt-4 space-y-3">
                    {order.statusHistory?.map((hist: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg p-4">
                        <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-gray-900">{hist.status}</span>
                            <span className="text-xs text-gray-500 font-medium">
                              {new Date(hist.timestamp).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            <span className="font-semibold">Triggered by:</span> {hist.triggeredBy}
                            {hist.note && <span className="ml-2">• <span className="italic">{hist.note}</span></span>}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
