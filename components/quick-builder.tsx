'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ModelViewer from '@/components/ui/model-viewer';
import { products, Product } from '@/lib/inventory';

const BASE_IDS = ['platform-microtomba', 'circuit-microtomba-evo-esp32', 'battery-1600-2s'];
const SENSOR_OPTIONS = [
  { id: 'sensor-light', name: 'Light sensor' },
  { id: 'sensor-color', name: 'Color sensor' },
  { id: 'sensor-texo-line', name: 'Texo line sensor array' },
];
const COLORS = ['red', 'blue', 'green'];

function hexFromIds(ids: string[]): string {
  return ids
    .join(',')
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}

export default function QuickBuilder() {
  const [sensors, setSensors] = useState<string[]>([]);
  const [color, setColor] = useState<string>(COLORS[0]);

  const ids = useMemo(() => [...BASE_IDS, ...sensors], [sensors]);

  const bom = useMemo(() => {
    const items = ids
      .map((id) => products.find((p) => p.sku === id))
      .filter(Boolean) as Product[];
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return { items, total };
  }, [ids]);

  const hex = useMemo(() => hexFromIds(ids), [ids]);

  const toggleSensor = (id: string) => {
    setSensors((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Configurator — Design your platform</h2>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Build your platform</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-medium mb-2">Sensors</div>
                {SENSOR_OPTIONS.map((s) => (
                  <label key={s.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={sensors.includes(s.id)}
                      onChange={() => toggleSensor(s.id)}
                    />
                    {s.name}
                  </label>
                ))}
              </div>
              <div>
                <div className="font-medium mb-2">Color</div>
                <select
                  className="border rounded-md px-2 py-1 text-sm"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  {COLORS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Estimate &amp; BOM</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="text-sm space-y-1">
                {bom.items.map((item) => (
                  <li key={item.sku} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between border-t pt-2 font-semibold">
                <span>Total</span>
                <span>${bom.total.toFixed(2)}</span>
              </div>
              <Button className="w-full mt-4" variant="outline">
                Pre-order (demo)
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-2">
          <ModelViewer label={`${color} µTomba`} />
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{hex}</pre>
        </div>

      </div>
    </section>
  );
}

