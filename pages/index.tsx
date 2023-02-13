import type { TLaunchCardSchema } from '@/schemas/ui/launch-card.types';

import { fetchLaunches } from './api/launches';
import { launchCardPropsFromApiDoc } from '@/schemas/adapters/launch-card-props-from-doc';
import { LaunchCardList } from '@/components/LaunchCardList';

export async function getServerSideProps() {
  const [apiData, error] = await fetchLaunches()
    .then((data) => [data, null])
    .catch((error) => [null, error.message]);

  const cards = (apiData?.docs ?? []).map(launchCardPropsFromApiDoc);
  return { props: { cards, error } };
}

type THomeProps = {
  cards: TLaunchCardSchema[];
  error?: string;
};

export default function Home(props: THomeProps) {
  const { cards, error } = props;

  if (error) {
    return (
      <main className="m-2 md:m-4 lg:m-8">
        <h1 className="text-xl m-3 text-center">
          Sorry, no launches to display. Please try later.
        </h1>
        <p>We saw this error: {error}</p>
      </main>
    );
  }

  return (
    <main className="m-2 md:m-4 lg:m-8">
      <h1 className="text-xl m-3 text-center">SpaceX's First 10 Launches</h1>
      <LaunchCardList data={cards} />
    </main>
  );
}
