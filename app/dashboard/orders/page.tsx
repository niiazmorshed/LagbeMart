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

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({ id: orderId, newStatus }).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
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

  if (isLoading) {
    return (
      <div className="p-6 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
        <div className="text-center py-12">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {orders.length === 0 ? (
        <div className="rounded-md border border-black/10 p-8 text-center">
          <p className="text-black/70">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={String(order._id)} className="bg-white rounded-lg border border-black/10 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Order #{String(order._id).slice(-8)}</h3>
                  <p className="text-sm text-black/70">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm text-black/70 mt-1">
                    {isSeller ? "Buyer" : "Seller"}: {isSeller 
                      ? (order.buyerName || order.buyerEmail || "N/A")
                      : (order.sellerName || order.sellerEmail || "N/A")
                    }
                  </p>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.currentStatus)}`}>
                    {order.currentStatus}
                  </span>
                  <p className="text-lg font-bold text-blue-700">${order.totalAmount}</p>
                  <p className="text-xs text-black/70">Payment: {order.paymentMethod}</p>
                </div>
              </div>

              <div className="border-t border-black/10 pt-4 mb-4">
                <h4 className="font-medium mb-2">Products:</h4>
                <div className="space-y-2">
                  {order.products?.map((prod: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{prod.title} × {prod.quantity}</span>
                      <span className="font-medium">${prod.price * prod.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {isSeller && (
                <div className="border-t border-black/10 pt-4">
                  <h4 className="font-medium mb-2">Update Status:</h4>
                  <div className="flex flex-wrap gap-2">
                    {order.currentStatus !== "Processing" && order.currentStatus !== "Completed" && order.currentStatus !== "Cancelled/Rejected" && (
                      <button
                        onClick={() => handleStatusUpdate(String(order._id), "Processing")}
                        disabled={isUpdating}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        Mark as Processing
                      </button>
                    )}
                    {order.currentStatus === "Processing" && (
                      <button
                        onClick={() => handleStatusUpdate(String(order._id), "Out for Delivery")}
                        disabled={isUpdating}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-colors disabled:opacity-50"
                      >
                        Ship Order
                      </button>
                    )}
                    {order.currentStatus === "Out for Delivery" && (
                      <button
                        onClick={() => handleStatusUpdate(String(order._id), "Completed")}
                        disabled={isUpdating}
                        className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        Mark as Completed
                      </button>
                    )}
                    {order.currentStatus !== "Completed" && order.currentStatus !== "Cancelled/Rejected" && (
                      <button
                        onClick={() => handleStatusUpdate(String(order._id), "Cancelled/Rejected")}
                        disabled={isUpdating}
                        className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        Cancel/Reject
                      </button>
                    )}
                  </div>
                </div>
              )}

              <details className="border-t border-black/10 pt-4 mt-4">
                <summary className="cursor-pointer text-sm font-medium text-blue-700 hover:text-blue-800">
                  View Status History
                </summary>
                <div className="mt-3 space-y-2">
                  {order.statusHistory?.map((hist: any, idx: number) => (
                    <div key={idx} className="text-xs bg-gray-50 p-2 rounded border border-black/5">
                      <div className="flex justify-between">
                        <span className="font-medium">{hist.status}</span>
                        <span className="text-black/60">
                          {new Date(hist.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-black/70 mt-1">
                        Triggered by: {hist.triggeredBy}
                        {hist.note && ` • ${hist.note}`}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
