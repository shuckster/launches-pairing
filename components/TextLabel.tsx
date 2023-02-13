type TTextLabelProps = {
  label: string;
  children: string;
};

export function TextLabel(props: TTextLabelProps) {
  return (
    <dl className="mt-1 mb-2">
      <dt className="text-xs">{props.label}:</dt>
      <dd className="text-gray-700 dark:text-gray-200">{props.children}</dd>
    </dl>
  );
}
