import Body from '@/components/atoms/Body';
import Subtitle from '@/components/atoms/Subtitle';
import clsx from 'clsx';

type ReuseAlertProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const ReuseAlert = ({ title, children, className }: ReuseAlertProps) => {
  return (
    <div
      className={clsx(
        className,
        'bg-stone-100 p-3 rounded-lg text-sm text-left'
      )}
    >
      <Subtitle>{title}</Subtitle>
      <Body className="text-xs">{children}</Body>
    </div>
  );
};

export default ReuseAlert;
