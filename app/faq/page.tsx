export default function FAQPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">FAQ</h1>
      <div className="grid gap-4 text-sm">
        <div>
          <p className="font-medium">What is ASCE?</p>
          <p className="text-muted-foreground">
            ASCE is an ecosystem of modular autonomous craft for education and
            exploration.
          </p>
        </div>
        <div>
          <p className="font-medium">How do I order?</p>
          <p className="text-muted-foreground">
            Use the configurator to build a platform and add it to your cart,
            then visit the order page.
          </p>
        </div>
      </div>
    </main>
  );
}
