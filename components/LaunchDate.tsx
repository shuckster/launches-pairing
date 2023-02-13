function gmtDateStringFrom(date: number | Date) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'long',
    timeStyle: 'long',
    timeZone: 'Europe/London',
  }).format(date);
}

const commonClasses =
  'rounded-b-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-white px-3 py-2 border-t-2 text-sm';

type TLaunchDatePresentationProps = {
  TimeSlot: JSX.Element;
  DateSlot: JSX.Element;
  success: boolean;
};

function LaunchDatePresentation(props: TLaunchDatePresentationProps) {
  return (
    <div
      className={
        props.success
          ? `${commonClasses} border-lime-700`
          : `${commonClasses} border-red-500`
      }
    >
      <span className="whitespace-nowrap">{props.DateSlot}</span>{' '}
      <span className="whitespace-nowrap">- {props.TimeSlot}</span>
    </div>
  );
}

type TLaunchDateProps = {
  dateUtc: string;
  success: boolean;
};

export function LaunchDate(props: TLaunchDateProps) {
  const [date, time] = gmtDateStringFrom(new Date(props.dateUtc)).split(' at ');
  return (
    <LaunchDatePresentation
      success={props.success}
      DateSlot={<>{date}</>}
      TimeSlot={<>{time}</>}
    />
  );
}
