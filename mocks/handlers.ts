import { rest } from 'msw';
import mockData from '@/pages/api/launches/mock.json';

import type {
  TPartialLaunchesDocumentSchema,
  TSpaceXApiQueryResponse,
} from '@/schemas/api/spacex.types';

type TLaunchesApiResponse =
  TSpaceXApiQueryResponse<TPartialLaunchesDocumentSchema>;

export const handlers = [
  rest.post(
    'https://api.spacexdata.com/v5/launches/query',
    (_req, res, ctx) => {
      return res(ctx.json<TLaunchesApiResponse>(mockData));
    }
  ),
];
