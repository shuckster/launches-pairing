export type TLaunchCardSchema = {
  id: string;
  name?: string;
  dateUtc?: string;
  coreSerial?: string;
  payloadType?: string;
  patchUrl?: string;
  success?: boolean;
  failureReason?: string;
};
