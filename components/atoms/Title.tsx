import clsx from 'clsx';

interface TitleProps {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}

const Title = ({ children, center, className }: TitleProps) => {
  return (
    <h1
      className={clsx(
        'text-2xl font-bold text-title',
        center && 'text-center',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Title;
