import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
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

  const { id: productId } = await params;

  return (
    <ProductDetailsClient productId={productId} initialUser={parsedUser} />
  );
}
