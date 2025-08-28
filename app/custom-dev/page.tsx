"use client";
import { useState } from "react";
import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomDevPage() {
  const [req, setReq] = useState("");
  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Custom development</h1>
      <div className="flex items-start border rounded-lg px-2">
        <Wrench className="w-4 h-4 mr-2 mt-2" />
        <textarea
          className="w-full bg-transparent p-1 text-sm"
          placeholder="Describe your project"
          value={req}
          onChange={(e) => setReq(e.target.value)}
        />
      </div>
      <Button className="mt-3">Request Quote</Button>
    </main>
  );
}
