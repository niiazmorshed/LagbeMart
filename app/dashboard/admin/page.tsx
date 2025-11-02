"use client";
import { useListUsersQuery } from "@/lib/services/adminApi";
import { useListOrdersQuery } from "@/lib/services/orderApi";
import { useListProductsQuery } from "@/lib/services/productApi";

export default function AdminDashboardPage() {
  const { data: usersData, isLoading: usersLoading } = useListUsersQuery();
  const { data: ordersData, isLoading: ordersLoading } = useListOrdersQuery();
  const { data: productsData, isLoading: productsLoading } = useListProductsQuery();
  
  const users = usersData?.data || [];
  const orders = ordersData?.data || [];
  const products = productsData?.data || [];

  // Calculate analytics
  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);

  // User breakdown by role
  const userRoleCounts = {
    admin: users.filter((u: any) => u.role === "admin").length,
    seller: users.filter((u: any) => u.role === "seller").length,
    buyer: users.filter((u: any) => u.role === "buyer").length,
  };

  // Order status breakdown
  const orderStatusCounts = {
    "Pending Approval": orders.filter((o: any) => o.currentStatus === "Pending Approval").length,
    "Processing": orders.filter((o: any) => o.currentStatus === "Processing").length,
    "Out for Delivery": orders.filter((o: any) => o.currentStatus === "Out for Delivery").length,
    "Completed": orders.filter((o: any) => o.currentStatus === "Completed").length,
    "Cancelled/Rejected": orders.filter((o: any) => o.currentStatus === "Cancelled/Rejected").length,
  };

  // Top selling products
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

  if (usersLoading || ordersLoading || productsLoading) {
    return (
      <div className="p-6 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-6">
          <div className="text-sm text-blue-700 font-medium mb-2">Total Users</div>
          <div className="text-3xl font-bold text-blue-900">{totalUsers}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-6">
          <div className="text-sm text-green-700 font-medium mb-2">Total Products</div>
          <div className="text-3xl font-bold text-green-900">{totalProducts}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-6">
          <div className="text-sm text-purple-700 font-medium mb-2">Total Orders</div>
          <div className="text-3xl font-bold text-purple-900">{totalOrders}</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 p-6">
          <div className="text-sm text-orange-700 font-medium mb-2">Total Revenue</div>
          <div className="text-3xl font-bold text-orange-900">${totalRevenue.toLocaleString()}</div>
        </div>
      </div>

      {/* User & Order Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-black/10 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-black/10">
            <h2 className="text-lg font-semibold">User Breakdown</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <span className="font-medium">Admins</span>
                <span className="text-2xl font-bold text-red-700">{userRoleCounts.admin}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="font-medium">Sellers</span>
                <span className="text-2xl font-bold text-blue-700">{userRoleCounts.seller}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="font-medium">Buyers</span>
                <span className="text-2xl font-bold text-green-700">{userRoleCounts.buyer}</span>
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
          <p className="text-sm text-black/70 mt-1">Platform-wide best sellers</p>
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

      {/* Quick Actions & Recent Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-black/10 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-black/10">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <a
                href="/dashboard/admin/users"
                className="block w-full text-center rounded-md bg-black text-white px-4 py-3 text-sm font-medium hover:bg-black/90 transition-colors"
              >
                Manage All Users
              </a>
              <a
                href="/shop"
                className="block w-full text-center rounded-md border border-black/15 px-4 py-3 text-sm font-medium hover:bg-black/5 transition-colors"
              >
                View All Products
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-black/10 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-black/10">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <p className="text-sm text-black/70 mt-1">Latest platform activity</p>
          </div>
          <div className="p-6">
            {orders.length === 0 ? (
              <p className="text-black/70 text-center py-8">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 3).map((order: any) => (
                  <div key={String(order._id)} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-black/5">
                    <div className="flex-1">
                      <div className="font-medium text-sm">Order #{String(order._id).slice(-8)}</div>
                      <div className="text-xs text-black/60 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-blue-700">${order.totalAmount}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
