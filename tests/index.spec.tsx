import { render, screen } from '@testing-library/react';

import Home from '@/pages/index';
import mockData from '@/pages/api/launches/mock.json';
import { launchCardPropsFromApiDoc } from '@/schemas/adapters/launch-card-props-from-doc';

const cards = (mockData.docs ?? []).map(launchCardPropsFromApiDoc);

/**
 * @fixme - this test is of questionable value now that we have
 * an E2E Playwright test
 */

describe('Home', () => {
  it('renders the cards with mock-data', () => {
    render(<Home cards={cards} />);

    const heading = screen.getByRole('heading', { name: /FalconSat/i });
    expect(heading).toBeInTheDocument();
  });
});
