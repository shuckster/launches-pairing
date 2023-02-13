import type { TLaunchCardSchema } from '@/schemas/ui/launch-card.types';
import { LaunchCard } from './LaunchCard';

type TLaunchCardListProps = {
  data: TLaunchCardSchema[];
};

export function LaunchCardList(props: TLaunchCardListProps) {
  const { data } = props;
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {data.map((launch) => (
        <LaunchCard key={launch.id} data={launch} />
      ))}
    </section>
  );
}
