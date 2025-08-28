import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store, BookOpen } from "lucide-react";

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-center space-y-4">
      <Store className="w-12 h-12 mx-auto" />
      <h1 className="text-3xl font-bold">ASCE Store</h1>
      <p className="text-sm text-muted-foreground">
        Autonomous Smart Craft Ecosystem – modular platforms for land, sea and air.
      </p>
      <p className="text-sm text-muted-foreground">
        Explore our philosophy and build your own craft with the configurator.
      </p>
      <div className="flex justify-center gap-3 pt-2">
        <Button asChild>
          <Link href="/catalog">Browse Catalogue</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/store">Start Configurator</Link>
        </Button>
      </div>
      <div className="pt-6 text-xs text-muted-foreground flex items-center justify-center gap-1">
        <BookOpen className="w-4 h-4" />
        <span>Learn more about our mission on the About page.</span>
      </div>
    </main>
  );
}

