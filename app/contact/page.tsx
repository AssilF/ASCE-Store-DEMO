"use client";
import { useState } from "react";
import { Mail, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Contact us</h1>
      <div className="grid gap-3">
        <div className="flex items-center border rounded-lg px-2">
          <User className="w-4 h-4 mr-2" />
          <input
            className="w-full bg-transparent p-1 text-sm"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="flex items-center border rounded-lg px-2">
          <Mail className="w-4 h-4 mr-2" />
          <input
            className="w-full bg-transparent p-1 text-sm"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="flex items-start border rounded-lg px-2">
          <MessageSquare className="w-4 h-4 mr-2 mt-2" />
          <textarea
            className="w-full bg-transparent p-1 text-sm"
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>
        <Button className="justify-self-end">Send</Button>
      </div>
    </main>
  );
}
