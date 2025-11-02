"use client";
import { useListOrdersQuery } from "@/lib/services/orderApi";
import { useListMyProductsQuery } from "@/lib/services/productApi";
import { useMeQuery } from "@/lib/services/authApi";

export default function SellerDashboardPage() {
  const { data: userData } = useMeQuery();
  const { data: ordersData, isLoading: ordersLoading } = useListOrdersQuery();
  const { data: productsData, isLoading: productsLoading } = useListMyProductsQuery();
  
  const orders = ordersData?.data || [];
  const products = productsData?.data || [];

  // Calculate analytics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);
  const pendingOrders = orders.filter((order: any) => 
    ["Pending Approval", "Processing"].includes(order.currentStatus)
  ).length;

  // Product analytics
  const lowStockProducts = products.filter((p: any) => p.stock < 10).length;
  const outOfStockProducts = products.filter((p: any) => p.stock === 0).length;

  // Top selling products based on orders
  const productStats: Record<string, { count: number; revenue: number }> = {};
  
  orders.forEach((order: any) => {
    order.products?.forEach((product: any) => {
      const title = product.title;
      if (!productStats[title]) {
        productStats[title] = { count: 0, revenue: 0 };
      }
      productStats[title].count += product.quantity || 0;
      productStats[title].revenue += (product.price || 0) * (product.quantity || 0);
    });
  });

  const sortedProducts = Object.entries(productStats).sort((a, b) => b[1].count - a[1].count);

  // Order status breakdown
  const orderStatusCounts = {
    "Pending Approval": orders.filter((o: any) => o.currentStatus === "Pending Approval").length,
    "Processing": orders.filter((o: any) => o.currentStatus === "Processing").length,
    "Out for Delivery": orders.filter((o: any) => o.currentStatus === "Out for Delivery").length,
    "Completed": orders.filter((o: any) => o.currentStatus === "Completed").length,
    "Cancelled/Rejected": orders.filter((o: any) => o.currentStatus === "Cancelled/Rejected").length,
  };

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

  if (ordersLoading || productsLoading) {
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
          <div className="text-sm text-blue-700 font-medium mb-2">Total Products</div>
          <div className="text-3xl font-bold text-blue-900">{totalProducts}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-6">
          <div className="text-sm text-green-700 font-medium mb-2">Total Revenue</div>
          <div className="text-3xl font-bold text-green-900">${totalRevenue.toLocaleString()}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-6">
          <div className="text-sm text-purple-700 font-medium mb-2">Total Orders</div>
          <div className="text-3xl font-bold text-purple-900">{totalOrders}</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200 p-6">
          <div className="text-sm text-yellow-700 font-medium mb-2">Pending Orders</div>
          <div className="text-3xl font-bold text-yellow-900">{pendingOrders}</div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-black/10 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4 border-b border-black/10">
            <h2 className="text-lg font-semibold">Stock Alerts</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <span className="font-medium">Out of Stock</span>
                <span className="text-2xl font-bold text-red-700">{outOfStockProducts}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span className="font-medium">Low Stock (&lt;10)</span>
                <span className="text-2xl font-bold text-yellow-700">{lowStockProducts}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-black/10 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-black/10">
            <h2 className="text-lg font-semibold">Order Status Breakdown</h2>
          </div>
          <div className="p-6">
            <div className="space-y-2">
              {Object.entries(orderStatusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{status}</span>
                  <span className={`font-bold ${getStatusColor(status)}`}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="mb-8 bg-white rounded-lg border border-black/10 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-black/10">
          <h2 className="text-lg font-semibold">Top Selling Products</h2>
          <p className="text-sm text-black/70 mt-1">Your best performing products</p>
        </div>
        <div className="p-6">
          {sortedProducts.length === 0 ? (
            <p className="text-black/70 text-center py-8">No sales data yet</p>
          ) : (
            <div className="space-y-4">
              {sortedProducts.slice(0, 5).map(([productName, stats]) => (
                <div key={productName} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-black/5">
                  <div className="flex-1">
                    <div className="font-medium text-lg">{productName}</div>
                    <div className="text-sm text-black/70 mt-1">
                      Units Sold: <span className="font-semibold">{stats.count}</span> • 
                      Revenue: <span className="font-semibold text-green-700">${stats.revenue.toLocaleString()}</span>
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
          <p className="text-sm text-black/70 mt-1">Latest order activity</p>
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
                      Buyer: {order.buyerName || order.buyerEmail || "Unknown"}
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

