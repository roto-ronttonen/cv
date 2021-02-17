import clsx from 'clsx';

type ContentContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export const ContentContainer = ({
  className,
  children,
}: ContentContainerProps) => {
  return (
    <div
      className={clsx(
        className,
        'px-8 md:px-18 h-full max-w-6xl',
        'lg:px-24 xl:mx-auto xl:px-0'
      )}
    >
      {children}
    </div>
  );
};
