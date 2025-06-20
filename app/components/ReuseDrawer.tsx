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
import moment from 'moment';

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
  // Function to calculate time difference using moment
  const calculateTimeDifference = (createdAt: string, updatedAt: string) => {
    console.log('DateTime', createdAt, updatedAt);
    const created = moment(createdAt);
    const updated = moment(updatedAt);
    const duration = moment.duration(updated.diff(created));

    const minutes = Math.floor(duration.asMinutes());
    const seconds = Math.floor(duration.asSeconds()) % 60;

    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const personalInfo: {
    title: string;
    body: string | number | React.ReactNode;
  }[] = [
    {
      title: 'User Fullname',
      body: data?.last_name + ' ' + data?.first_name,
    },
    {
      title: 'User id',
      body: data?.id,
    },
  ];

  if (data.document_type === 'nin') {
    personalInfo.push({
      title: 'NIN',
      body: data.document as string,
    });
  }

  if (data.document_type) {
    personalInfo.push({
      title: 'Uploaded document type',
      body: data.document_type,
    });
  }

  if (data.card_authenticity_score) {
    personalInfo.push({
      title: 'Card Authenticity Score',
      body: data.card_authenticity_score,
    });
  }

  const faceMatchInfo: {
    title: string;
    body: string | number | React.ReactNode;
  }[] = [];

  if (data.face_match_score) {
    faceMatchInfo.push({
      title: 'Facematch result',
      body:
        data.face_match_score < 0.6 && data.face_match_score > 0.2
          ? 'Match'
          : 'No Match',
    });
  }
  if (data.face_match_score) {
    faceMatchInfo.push({
      title: 'Facematch Score',
      body: data.face_match_score || 0.0,
    });
  }

  const deviceInfo: {
    title: string;
    body: string | number | React.ReactNode;
  }[] = [];

  // Add time spent if we have the data
  if (data.created_at && data.updated_at) {
    deviceInfo.push({
      title: 'Total time spent',
      body: calculateTimeDifference(data.created_at, data.updated_at),
    });
  }

  // Extract browser information from metadata
  if (data.meta_data?.browserInfo) {
    deviceInfo.push({
      title: 'Browser',
      body: `${data.meta_data.browserInfo.browser} ${data.meta_data.browserInfo.browserVersion}`,
    });

    deviceInfo.push({
      title: 'Operating System',
      body: data.meta_data.browserInfo.os,
    });

    deviceInfo.push({
      title: 'Device',
      body: data.meta_data.browserInfo.deviceType,
    });
  }

  const verificationResult: {
    title: string;
    body: string | number | React.ReactNode;
  }[] = [
    {
      title: 'Status',
      body: (
        <StatusTablet
          status={(data.status as 'pending' | 'success' | 'fail') || 'pending'}
        />
      ),
    },

    {
      title: 'Refence ID',
      body: data.reference_id,
    },
  ];

  if (data.failure_reason) {
    verificationResult.push({
      title: 'Reason for failure',
      body: data.failure_reason,
    });
  }

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
            <DialogTitle className="text-2xl font-semibold text-stone-900 text-center">
              Verification result
            </DialogTitle>
            <DialogDescription className="mb-6 text-sm text-stone-600 text-center">
              Your data is encrypted and used only for verification.
            </DialogDescription>

            {personalInfo.length > 0 && <ReuseInfoCard data={personalInfo} />}
            {faceMatchInfo.length > 0 && <ReuseInfoCard data={faceMatchInfo} />}
            {deviceInfo.length > 0 && <ReuseInfoCard data={deviceInfo} />}
            {verificationResult.length > 0 && (
              <ReuseInfoCard data={verificationResult} />
            )}
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
