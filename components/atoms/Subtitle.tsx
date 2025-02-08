import clsx from 'clsx';

interface SubtitleProps {
  children: string;
  center?: boolean;
  className?: string;
}

const Subtitle = ({ children, center, className }: SubtitleProps) => {
  return (
    <h1
      className={clsx(
        className,
        `text-md font-semibold text-stone-900 mb-1 ${center && 'text-center'}`
      )}
    >
      {children}
    </h1>
  );
};

export default Subtitle;
