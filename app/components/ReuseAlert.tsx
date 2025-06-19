import Body from '@/components/atoms/Body';
import Subtitle from '@/components/atoms/Subtitle';
import clsx from 'clsx';

type ReuseAlertProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'danger';
};

const ReuseAlert = ({
  title,
  children,
  className,
  variant = 'default',
}: ReuseAlertProps) => {
  return (
    <div
      className={clsx(
        className,
        'p-4 rounded-lg text-sm text-left',
        variant === 'danger'
          ? 'border border-red-500 bg-transparent text-red-500'
          : 'border border-textbody/50 bg-[#FFFEFD]'
      )}
    >
      <Subtitle className={variant === 'danger' ? 'text-red-500' : ''}>
        {title}
      </Subtitle>
      <Body className={clsx('text-xs', variant === 'danger' && 'text-red-800')}>
        {children}
      </Body>
    </div>
  );
};

export default ReuseAlert;
