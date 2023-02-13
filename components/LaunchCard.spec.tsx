import { render, screen } from '@testing-library/react';
import { LaunchCard } from './LaunchCard';

import mockData from '@/pages/api/launches/mock.json';
import { launchCardPropsFromApiDoc } from '@/schemas/adapters/launch-card-props-from-doc';

const cards = (mockData.docs ?? []).map(launchCardPropsFromApiDoc);
const successCard = cards.find((card) => card.success === true);
const failureCard = cards.find((card) => card.success === false);

/**
 * Happy paths: renders card with complete data
 */

describe('<LaunchCard />', () => {
  it('renders nothing if we do not have at least a name', () => {
    const { asFragment } = render(
      <LaunchCard data={{ id: '1', name: null, success: null }} />
    );

    const heading = screen.queryByRole('heading', { name: successCard.name });
    expect(heading).not.toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a card with successful launch data', () => {
    const { asFragment } = render(<LaunchCard data={successCard} />);

    const heading = screen.getByRole('heading', { name: successCard.name });
    const serial = screen.getByText(successCard.coreSerial);
    const payload = screen.getByText(successCard.payloadType);
    const status = screen.getByText('Success');

    expect(heading).toBeInTheDocument();
    expect(serial).toBeInTheDocument();
    expect(payload).toBeInTheDocument();
    expect(status).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a card with failed launch data', () => {
    const { asFragment } = render(<LaunchCard data={failureCard} />);

    const heading = screen.getByRole('heading', { name: failureCard.name });
    const serial = screen.getByText(failureCard.coreSerial);
    const payload = screen.getByText(failureCard.payloadType);
    const status = screen.getByText('Failure:');

    expect(heading).toBeInTheDocument();
    expect(serial).toBeInTheDocument();
    expect(payload).toBeInTheDocument();
    expect(status).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
