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
import { Application } from '@/services/applications';
import '../../styles/glow.css';
import StatusTablet from './StatusTablet';

const ReuseDrawer = ({
  // children,
  open,
  setOpen,
  data,
}: {
  children?: React.ReactNode;
  open: boolean;
  setOpen: (bol: boolean) => void;
  data: Application;
}) => {
  const personalInfo = [
    {
      title: 'User Fullname',
      body: data?.last_name + ' ' + data?.first_name,
    },
    {
      title: 'User id',
      body: data?.id,
    },
    {
      title: 'Uploaded document type',
      body: data.document_type,
    },
    {
      title: 'Card Authenticity Score',
      body: data.card_authenticity_score,
    },
    {
      title: '',
      body: '',
    },
  ];

  if (data.document_type === 'nin') {
    personalInfo.push({
      title: 'NIN',
      body: data.document as string,
    });
  }

  const faceMatchInfo = [
    {
      title: 'Facematch result',
      body:
        data.face_match_score < 0.6 && data.face_match_score > 0.2
          ? 'Match'
          : 'No Match',
    },
    {
      title: 'Facematch Score',
      body: data.face_match_score || 0.0,
    },
  ];

  const deviceInfo = [
    {
      title: 'Total time spent',
      body: 'e.g 3mins',
    },
    {
      title: 'Browser',
      body: 'e.g Chrome 132.0.0.0',
    },
    {
      title: 'Operating System',
      body: 'e.g Mac OS, x64',
    },
    {
      title: 'Device',
      body: 'e.g Mobile',
    },
  ];

  const verificationResult = [
    {
      title: 'Verification Verdit',
      body: (
        <StatusTablet
          status={(data?.status as 'pending' | 'success' | 'fail') || 'pending'}
        />
      ),
    },
    {
      title: 'Reason for failure',
      body: data.failure_reason,
    },
    {
      title: 'Refence ID',
      body: data.reference_id,
    },
  ];

  const aiOutputText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
tenetur architecto optio! Quas nisi dolores, pariatur vero
dignissimos id quisquam praesentium assumenda, provident quam,
beatae minima vitae? Doloribus, dolorem veritatis unde officia,
amet maiores, fugit minus quibusdam eligendi aspernatur tenetur.`;

  function renderTextAsSpans(text: string) {
    return text
      .split('')
      .map((char: string, idx: number) => <span key={idx}>{char}</span>);
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* <DrawerTrigger>tap</DrawerTrigger> */}
      <DrawerContent className="bg-white mx-2 mb-2 rounded-t-3xl rounded-b-xl">
        <div
          className="mt-6 w-full sm:w-[420px] mx-auto overflow-y-scroll hide-scrollbar"
          style={{
            height: 'calc(100vh - 100px)',
            scrollbarWidth: 'none' /* Firefox */,
            msOverflowStyle: 'none' /* IE and Edge */,
          }}
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
