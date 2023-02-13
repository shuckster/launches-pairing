type TLaunchStatusProps = {
  success: boolean;
  failureReason: string;
};

export function LaunchStatus(props: TLaunchStatusProps) {
  return props.success ? (
    <div className="rounded-t-lg text-lime-700 bg-lime-200 dark:bg-lime-900 dark:text-lime-100 py-1 px-3 mt-2 inline-block font-bold">
      Success
    </div>
  ) : (
    <div className="rounded-t-lg bg-red-100 dark:bg-opacity-20 dark:bg-red-900 dark:text-orange-200 py-2 px-3 mt-2 inline-block text-sm">
      <strong className="dark:text-white">Failure:</strong>{' '}
      {props.failureReason}
    </div>
  );
}
