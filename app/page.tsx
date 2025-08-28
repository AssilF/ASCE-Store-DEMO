import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store, Puzzle, Cpu, Users } from "lucide-react";
import QuickBuilder from "@/components/quick-builder";
import Showcase from "@/components/showcase";

export default function HomePage() {
  const FEATURES = [
    { icon: Puzzle, title: "Modular kits", desc: "Mix and match components for air, land, or sea." },
    { icon: Cpu, title: "Live builder", desc: "BOM and hex update instantly as you tweak." },
    { icon: Users, title: "Open ecosystem", desc: "Built for hackers, educators and researchers." },
  ];

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

      <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="text-center space-y-2">
            <f.icon className="w-8 h-8 mx-auto" />
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </section>

      <QuickBuilder />
      <Showcase />
    </main>
  );
}

