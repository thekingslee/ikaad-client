import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import ReuseButton from './ReuseButton';
import ReuseInfoCard from './ReuseInfoCard';
import Title from '@/components/atoms/Title';
import Body from '@/components/atoms/Body';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

const ReuseDrawer = ({
  children,
  open,
  setOpen,
}: {
  children?: React.ReactNode;
  open: boolean;
  setOpen: (bol: boolean) => void;
}) => {
  const personalInfo = [
    {
      title: 'User Fullname',
      body: 'John Doe',
    },
    {
      title: 'Uploaded document type',
      body: 'NIN Slip',
    },
    {
      title: 'Card Authenticity Score',
      body: '0.98',
    },
    {
      title: 'NIN',
      body: '22233345567',
    },
    {
      title: '',
      body: '',
    },
  ];

  const faceMatchInfo = [
    {
      title: 'Facematch result',
      body: 'The Facematch with document uploaded',
    },
    {
      title: 'Facematch Score',
      body: '0.32',
    },
  ];

  const deviceInfo = [
    {
      title: 'Total time spent',
      body: '3: 00',
    },
    {
      title: 'Browser',
      body: 'Chrome 132.0.0.0',
    },
    {
      title: 'Operating System',
      body: 'Mac OS, x64',
    },
    {
      title: 'Device',
      body: 'Mobile',
    },
  ];

  const verificationResult = [
    {
      title: 'Verification Verdit',
      body: 'Failed',
    },
    {
      title: 'Reason for failure',
      body: 'Face don’t match',
    },
    {
      title: 'Refence ID',
      body: 'KF-6DD84A4480',
    },
  ];

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* <DrawerTrigger>tap</DrawerTrigger> */}
      <DrawerContent>
        <div
          className="mt-6 w-full sm:w-[420px] mx-auto overflow-y-scroll"
          style={{ height: 'calc(100vh - 100px)' }}
        >
          <DrawerHeader>
            <DialogTitle className="text-2xl font-semibold text-stone-900 mb-1 text-center">
              Verification result
            </DialogTitle>
            <DialogDescription className="mb-6 text-sm text-stone-600 text-center">
              Your data is encrypted and used only for verification.
            </DialogDescription>

            <ReuseInfoCard data={personalInfo} />
            <ReuseInfoCard data={faceMatchInfo} />
            <ReuseInfoCard data={deviceInfo} />
            <ReuseInfoCard data={verificationResult} />
          </DrawerHeader>
          <DrawerFooter>
            <ReuseButton action={() => setOpen(false)}>Got it</ReuseButton>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ReuseDrawer;
