import { Button } from '@/components/ui/button';
import clsx from 'clsx';

type ButtonProps = {
  action?: () => void;
  children?: React.ReactNode;
  className?: string;
};
const ReuseButton = ({ action, children, className }: ButtonProps) => {
  return (
    <Button
      className={clsx(className, 'mb-2 rounded-full w-full py-6')}
      onClick={action}
    >
      {children ? children : 'Submit'}
    </Button>
  );
};

export default ReuseButton;
