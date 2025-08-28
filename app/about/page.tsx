import { Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Heart className="w-5 h-5" /> About ASCE
      </h1>
      <p className="text-sm text-muted-foreground">
        ASCE (Autonomous Smart Craft Ecosystem) embraces open modular robotics.
        We design platforms that adapt to land, sea and air with a focus on
        hackability and community-driven development.
      </p>
    </main>
  );
}
