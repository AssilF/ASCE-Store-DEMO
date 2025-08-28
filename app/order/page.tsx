import { ShoppingCart } from "lucide-react";

export default function OrderPage() {
  return (
    <main className="max-w-md mx-auto p-6 text-center space-y-4">
      <ShoppingCart className="w-10 h-10 mx-auto" />
      <p className="text-sm text-muted-foreground">
        Items added from the configurator appear in your cart. Checkout is coming
        soon.
      </p>
    </main>
  );
}
