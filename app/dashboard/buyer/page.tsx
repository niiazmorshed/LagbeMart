"use client";
import { useListOrdersQuery } from "@/lib/services/orderApi";
import { useMeQuery } from "@/lib/services/authApi";

export default function BuyerDashboardPage() {
  const { data: userData } = useMeQuery();
  const { data: ordersData, isLoading } = useListOrdersQuery();
  
  const orders = ordersData?.data || [];

  // Calculate analytics
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);
  const completedOrders = orders.filter((order: any) => order.currentStatus === "Completed").length;
  const pendingOrders = orders.filter((order: any) => 
    ["Pending Approval", "Processing", "Out for Delivery"].includes(order.currentStatus)
  ).length;

  // Product analytics
  const productStats: Record<string, { count: number; totalSpent: number }> = {};
  
  orders.forEach((order: any) => {
    order.products?.forEach((product: any) => {
      const title = product.title;
      if (!productStats[title]) {
        productStats[title] = { count: 0, totalSpent: 0 };
      }
      productStats[title].count += product.quantity || 0;
      productStats[title].totalSpent += (product.price || 0) * (product.quantity || 0);
    });
  });

  const sortedProducts = Object.entries(productStats).sort((a, b) => b[1].count - a[1].count);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return "text-yellow-600";
      case "Processing":
        return "text-blue-600";
      case "Out for Delivery":
        return "text-purple-600";
      case "Completed":
        return "text-green-600";
      case "Cancelled/Rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-6">
          <div className="text-sm text-blue-700 font-medium mb-2">Total Orders</div>
          <div className="text-3xl font-bold text-blue-900">{totalOrders}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-6">
          <div className="text-sm text-green-700 font-medium mb-2">Total Spent</div>
          <div className="text-3xl font-bold text-green-900">${totalSpent.toLocaleString()}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-6">
          <div className="text-sm text-purple-700 font-medium mb-2">Completed Orders</div>
          <div className="text-3xl font-bold text-purple-900">{completedOrders}</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200 p-6">
          <div className="text-sm text-yellow-700 font-medium mb-2">Pending Orders</div>
          <div className="text-3xl font-bold text-yellow-900">{pendingOrders}</div>
        </div>
      </div>

      {/* Product Analytics */}
      <div className="mb-8 bg-white rounded-lg border border-black/10 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-black/10">
          <h2 className="text-lg font-semibold">Product Analytics</h2>
          <p className="text-sm text-black/70 mt-1">Your most ordered products</p>
        </div>
        <div className="p-6">
          {sortedProducts.length === 0 ? (
            <p className="text-black/70 text-center py-8">No products ordered yet</p>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map(([productName, stats]) => (
                <div key={productName} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-black/5">
                  <div className="flex-1">
                    <div className="font-medium text-lg">{productName}</div>
                    <div className="text-sm text-black/70 mt-1">
                      Quantity: <span className="font-semibold">{stats.count}</span> • 
                      Total Spent: <span className="font-semibold text-green-700">${stats.totalSpent.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border border-black/10 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-black/10">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <p className="text-sm text-black/70 mt-1">Your latest order history</p>
        </div>
        <div className="p-6">
          {orders.length === 0 ? (
            <p className="text-black/70 text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map((order: any) => (
                <div key={String(order._id)} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-black/5 hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="font-medium">Order #{String(order._id).slice(-8)}</div>
                    <div className="text-sm text-black/70 mt-1">
                      {order.products?.map((p: any) => p.title).join(", ") || "No products"}
                    </div>
                    <div className="text-xs text-black/60 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${getStatusColor(order.currentStatus)}`}>
                      {order.currentStatus}
                    </div>
                    <div className="text-lg font-bold text-blue-700">${order.totalAmount}</div>
                  </div>
                </div>
              ))}
              {orders.length > 5 && (
                <div className="text-center pt-4 border-t border-black/10">
                  <a href="/dashboard/orders" className="text-sm text-blue-700 hover:text-blue-800 font-medium">
                    View all {orders.length} orders →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

