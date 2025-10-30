import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardIndex() {
  const store = await cookies();
  const raw = store.get("lm_session")?.value;
  if (!raw) redirect("/login");
  // For now, send everyone to their profile page
  redirect("/dashboard/profile");
}


