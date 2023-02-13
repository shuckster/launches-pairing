/**
 * I considered importing the API from mongoose-paginate-v2 but just
 * went with a custom type instead.
 *
 * @see https://github.com/aravindnc/mongoose-paginate-v2
 */

export type TSpaceXApiQueryResponse<TDocumentSchema> = {
  docs: TDocumentSchema[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

/**
 * @see postBody in file://./../../pages/api/launches/index.ts
 */
export type TPartialLaunchesDocumentSchema = {
  links: {
    patch: {
      small: string;
    };
  };
  success: boolean;
  failures: { reason: string }[];
  payloads: { type: string; id: string }[];
  name: string;
  date_utc: string;
  cores: {
    core: { serial: string; id: string };
  }[];
  id: string;
};
