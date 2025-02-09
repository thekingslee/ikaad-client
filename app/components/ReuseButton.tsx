import { Button } from '@/components/ui/button';
import clsx from 'clsx';

type ButtonProps = {
  action?: () => void;
  children?: React.ReactNode;
  className?: string;
  variant?: 'secondary' | 'ghost' | 'default';
};
const ReuseButton = ({ action, children, className, variant }: ButtonProps) => {
  return (
    <Button
      className={clsx(className, 'mb-2 rounded-full w-full py-6')}
      onClick={action}
      variant={variant || 'default'}
    >
      {children ? children : 'Submit'}
    </Button>
  );
};

export default ReuseButton;
