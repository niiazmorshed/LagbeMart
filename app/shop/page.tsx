import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ShopPageClient from "./ShopPageClient";

export default async function ShopPage() {
  const store = await cookies();
  const rawSession = store.get("lm_session")?.value;

  if (!rawSession) {
    redirect("/login");
  }

  let parsedUser: any = null;
  try {
    parsedUser = rawSession ? JSON.parse(rawSession) : null;
  } catch {
    redirect("/login");
  }

  if (!parsedUser) {
    redirect("/login");
  }

  return <ShopPageClient initialUser={parsedUser} />;
}


