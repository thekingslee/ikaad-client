import clsx from 'clsx';

interface BodyProps {
  children: string | React.ReactNode;
  center?: boolean;
  className?: string;
}

const Body = ({ children, center, className }: BodyProps) => (
  <p
    className={clsx(
      className,
      `text-sm text-title-body ${center && 'text-center'}`
    )}
  >
    {children}
  </p>
);
export default Body;
