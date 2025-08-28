import { products } from "@/lib/inventory";
import ImgPh from "@/components/ui/img-ph";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CatalogPage() {
  const platforms = products.filter((p) => p.category === "platform");
  return (
    <main className="max-w-6xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Catalogue</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {platforms.map((p) => (
          <Card key={p.sku} className="p-4 flex flex-col gap-2">
            <ImgPh label={p.name} />
            <div className="text-sm font-semibold">{p.name}</div>
            <Button size="sm" variant="secondary">Details</Button>
          </Card>
        ))}
      </div>
    </main>
  );
}
