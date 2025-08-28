import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";
import QuickBuilder from "@/components/quick-builder";
import Showcase from "@/components/showcase";

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-12">
      <section className="text-center space-y-4">
        <Store className="w-12 h-12 mx-auto" />
        <h1 className="text-3xl font-bold">Build the robotic platform you need</h1>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          ASCE Platforms is a modular toolkit to assemble air, ground, or stationary robots tailored to your use-case. Use the configurator to explore options and place a demo pre-order.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Button asChild>
            <Link href="/store">Start configuring</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="#showcase">View showcase</Link>
          </Button>
        </div>
      </section>
      <QuickBuilder />
      <Showcase />
    </main>
  );
}

