import { launchCardPropsFromApiDoc } from '@/schemas/adapters/launch-card-props-from-doc';

import mockData from '@/pages/api/launches/mock.json';

/**
 * Happy path
 */

test('launchCardPropsFromApiDoc() snapshot test against mock-data', () => {
  const cards = mockData.docs.map(launchCardPropsFromApiDoc);
  expect(cards).toMatchSnapshot();
});

/**
 * Unhappy path
 */

const empty = {
  id: null,
  name: null,
  dateUtc: null,
  coreSerial: null,
  payloadType: null,
  patchUrl: null,
  success: null,
  failureReason: null,
};

test.each([
  [NaN, empty],
  [undefined, empty],
  [null, empty],
  [0, empty],
  ['', empty],
  [{}, empty],

  // Missing core
  [{ cores: [{ core: { serial: undefined } }] }, empty],
  [{ cores: [{ core: undefined }] }, empty],
  [{ cores: [undefined] }, empty],
  [{ cores: [] }, empty],
  [{ cores: undefined }, empty],

  // Missing payload
  [{ payloads: [{ type: undefined }] }, empty],
  [{ payloads: [undefined] }, empty],
  [{ payloads: [] }, empty],
  [{ payloads: undefined }, empty],

  // Missing links
  [{ links: [{ patch: { small: undefined } }] }, empty],
  [{ links: [{ patch: undefined }] }, empty],
  [{ links: [undefined] }, empty],
  [{ links: [] }, empty],
  [{ links: undefined }, empty],
])(`launchCardPropsFromApiDoc(%p) fails gracefully`, (input, expected) => {
  expect(launchCardPropsFromApiDoc(input)).toEqual(expected);
});
