import ImgPh from '@/components/ui/img-ph';
import { Card, CardContent } from '@/components/ui/card';

const SHOWCASES = [
  { id: 'drongaz', title: 'Drongaz — Research Quadcopter', type: 'Aerial' },
  { id: 'microtomba', title: 'µTomba — 2WD Line Follower', type: 'Ground' },
  { id: 'afus', title: 'AFUS — Desktop Robotic Arm', type: 'Stationary' },
];

export default function Showcase() {
  return (
    <section id="showcase" className="space-y-4">
      <h2 className="text-xl font-semibold">Showcase — Recent builds</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {SHOWCASES.map((s) => (
          <Card key={s.id}>
            <CardContent className="p-4 space-y-2">
              <ImgPh label={s.type} />
              <div className="font-medium text-sm">{s.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

