import type { TPartialLaunchesDocumentSchema } from '../api/spacex.types';
import type { TLaunchCardSchema } from '../ui/launch-card.types';

/**
 * input is expected to be TLaunchesDocumentSchema, but since
 * it comes from an external API, we can't guarantee that.
 *
 * Could also use Zod et al for schema validation, but trying
 * to keep it basic for this task.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function launchCardPropsFromApiDoc(apiDoc: any): TLaunchCardSchema {
  const input = (apiDoc || {}) as TPartialLaunchesDocumentSchema;
  return {
    id: input.id ?? null,
    name: input.name ?? null,
    dateUtc: input.date_utc ?? null,
    coreSerial: input.cores?.[0]?.core?.serial ?? null,
    payloadType: input.payloads?.[0]?.type ?? null,
    patchUrl: input.links?.patch?.small ?? null,
    success: input.success ?? null,
    failureReason: input.failures?.[0]?.reason ?? null,
  };
}
