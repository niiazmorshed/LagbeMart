import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
  const store = await cookies();
  const raw = store.get("lm_session")?.value;
  if (!raw) redirect("/login");
  const session = JSON.parse(raw) as { role?: string };
  
  // Route to role-specific dashboards
  if (session.role === "admin") {
    redirect("/dashboard/admin");
  } else if (session.role === "seller") {
    redirect("/dashboard/products");
  } else if (session.role === "buyer") {
    redirect("/dashboard/orders");
  }
  
  redirect("/login");
}


