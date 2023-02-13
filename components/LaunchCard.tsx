import type { TLaunchCardSchema } from '../schemas/ui/launch-card.types';

import Image from 'next/image';
import { Card } from './Card';
import { LaunchStatus } from './LaunchStatus';
import { LaunchDate } from './LaunchDate';
import { TextLabel } from './TextLabel';

type TLaunchCoreSerialProps = { coreSerial: string };
function LaunchCoreSerial(props: TLaunchCoreSerialProps) {
  return <TextLabel label="Core serial">{props.coreSerial}</TextLabel>;
}

type TLaunchPayloadTypeProps = { payloadType: string };
function LaunchPayloadType(props: TLaunchPayloadTypeProps) {
  return <TextLabel label="Payload type">{props.payloadType}</TextLabel>;
}

type TLaunchCardProps = { data: TLaunchCardSchema };
export function LaunchCard(props: TLaunchCardProps) {
  const { data } = props;

  if (!data.name) {
    /**
     * LaunchCard: no name for card; is the rest of the data there?
     * @todo - log to Sentry, throw error to be captured by ErrorBoundary, etc.
     */
    return null;
  }

  return (
    <Card
      className="launch-card"
      ImageSlot={
        data.patchUrl && (
          <Image
            src={data.patchUrl}
            alt={`Insignia for ${data.name}`}
            width={125}
            height={125}
          />
        )
      }
      HeadingSlot={<>{data.name}</>}
      BodySlot={
        <>
          {data.coreSerial && <LaunchCoreSerial coreSerial={data.coreSerial} />}
          {data.payloadType && (
            <LaunchPayloadType payloadType={data.payloadType} />
          )}
          {
            <LaunchStatus
              success={data.success}
              failureReason={data.failureReason}
            />
          }
          {data.dateUtc && (
            <LaunchDate dateUtc={data.dateUtc} success={data.success} />
          )}
        </>
      }
    />
  );
}
