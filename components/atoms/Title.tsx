import clsx from 'clsx';

interface TitleProps {
  children: string;
  center?: boolean;
  className?: string;
}

const Title = ({ children, center, className }: TitleProps) => {
  return (
    <h1
      className={clsx(
        className,
        `text-2xl font-semibold text-stone-900 mb-1 ${center && 'text-center'}`
      )}
    >
      {children}
    </h1>
  );
};

export default Title;
