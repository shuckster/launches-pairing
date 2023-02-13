// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  TSpaceXApiQueryResponse,
  TPartialLaunchesDocumentSchema,
} from '@/schemas/api/spacex.types';

/**
 * Endpoint and post body for querying launches
 *
 * @see file:///./launches.http
 * @see https://github.com/r-spacex/SpaceX-API/blob/master/docs/queries.md
 */
const endpoint = 'https://api.spacexdata.com/v5/launches/query';
const postBody = {
  query: {
    page: 1,
    limit: 10,
  },
  options: {
    populate: [
      {
        path: 'cores.core',
        select: {
          serial: 1,
        },
      },
      {
        path: 'payloads',
        select: {
          type: 1,
        },
      },
    ],
    /**
     * Selection matches {@link TPartialLaunchesDocumentSchema}
     */
    select: [
      'links.patch.small',
      'success',
      'failures.reason',
      'payloads',
      'name',
      'date_utc',
      'cores.core',
      'id',
    ],
  },
};

type TLaunchesApiResponse =
  TSpaceXApiQueryResponse<TPartialLaunchesDocumentSchema>;

export async function fetchLaunches() {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postBody),
  });
  const json = res.json() as Promise<TLaunchesApiResponse>;
  return json;
}

export default function launchesHandler(
  req: NextApiRequest,
  res: NextApiResponse<TLaunchesApiResponse>
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      fetchLaunches().then((data) => res.status(200).json(data));
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
