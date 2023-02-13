import React from 'react';

type TCardProps = {
  className?: string;
  ImageSlot: JSX.Element;
  HeadingSlot: JSX.Element;
  BodySlot: JSX.Element;
  HeadingElement?: typeof React.Component;
};

export function Card(props: TCardProps) {
  const {
    className = '',
    ImageSlot,
    HeadingSlot,
    BodySlot,
    HeadingElement = 'h3',
  } = props;

  return (
    <figure
      className={`${className} day p-6 max-w-sm md:m-auto bg-slate-50 dark:bg-slate-600 rounded-lg text-black dark:text-white shadow-lg flex flex-col space-y-4 md:flex-row md:space-x-4`}
    >
      <div className="shrink-0 self-center">{ImageSlot}</div>
      <div className="text-gray-500 dark:text-gray-400">
        <HeadingElement className="text-gray-700 dark:text-gray-100 text-xl font-semibold">
          {HeadingSlot}
        </HeadingElement>
        {BodySlot}
      </div>
    </figure>
  );
}
