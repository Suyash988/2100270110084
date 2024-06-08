import Products from "@/components/ProductsHomePage";
import { Suspense } from "react";
import ProductSkeleton from "@/components/ui/Skeleton";

export default function Page() {
  return (
    <main className="w-full h-full overflow-hidden bg-white">
  <Suspense fallback={<ProductSkeleton />}>
    <Products />
  </Suspense>    
</main>
  )
}
