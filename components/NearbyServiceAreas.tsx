import { businessConfig } from '@/config/business';

export function NearbyServiceAreas({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const Subheading = headingLevel === 2 ? 'h3' : 'h4';

  return (
    <div className="mt-6">
      <Heading className="font-bold text-[#123E61]">Nearby Service Areas</Heading>
      <ul className="mt-3 flex flex-wrap gap-2">
        {businessConfig.nearbyServiceAreas.map(area => (
          <li key={area} className="border border-[#D9DEE2] bg-white px-3 py-2 text-sm text-[#123E61]">{area}</li>
        ))}
      </ul>
      <Subheading className="mt-4 text-sm font-bold text-[#123E61]">Johannesburg South</Subheading>
      <ul className="mt-3 flex flex-wrap gap-2">
        {businessConfig.johannesburgSouthAreas.map(area => (
          <li key={area} className="border border-[#D9DEE2] bg-white px-3 py-2 text-sm text-[#123E61]">{area}</li>
        ))}
      </ul>
    </div>
  );
}
