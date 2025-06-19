'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useStore, {
  allVerificationsStageData,
  VericationStageTypes,
} from '@/store/store';
import Title from '@/components/atoms/Title';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import Subtitle from '@/components/atoms/Subtitle';
import ReuseButton from '@/app/components/ReuseButton';
import QRCode from '@/app/components/QRCode';

import { Form } from '@/components/ui/form';
import FormFieldComponent from '@/app/components/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { preStartSchema } from '@/common/FormSchema';
import useDeviceType from '@/hooks/useDeviceType';

const PreStartPage: React.FC = () => {
  const router = useRouter();
  const { deviceType } = useDeviceType();
  const { setVerificationStages } = useStore();

  const form = useForm<z.infer<typeof preStartSchema>>({
    resolver: zodResolver(preStartSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof preStartSchema>) {
    // Navigate to home "/"

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  useEffect(() => {
    // Skip page for mobile screens
    if (deviceType === 'mobile') {
      console.log('Device Type', deviceType);
      router.replace('start');
    }
  }, [deviceType]);

  useEffect(() => {
    // Get verificationStages from URL
    const url = new URL(window.location.href);
    const stagesParam = url.searchParams.get('verification-stages');

    if (stagesParam) {
      const stages = JSON.parse(decodeURIComponent(stagesParam));
      // Check is the content of the stages are of type VericationStageTypes
      if (
        !stages.every(
          (stage: VericationStageTypes) =>
            stage === 'START' ||
            stage === 'LIVELINESS_TEST' ||
            stage === 'DOCUMENT_CAPTURE' ||
            stage === 'BVN' ||
            stage === 'FINISH'
        )
      ) {
        // TODO: Redirect to a error screen
        return;
      }
      const generatedVerificationMap = stages?.map(
        (stage: VericationStageTypes) => {
          const stageIndex = allVerificationsStageData.findIndex(
            (item) => item.stage === stage
          );
          return {
            stage: stage,
            route: allVerificationsStageData[stageIndex]?.startRoute || '',
            nextStageRoute:
              allVerificationsStageData[stageIndex + 1]?.startRoute || '',
            completed: false,
          };
        }
      );

      sessionStorage.setItem(
        'generatedVerificationMap',
        JSON.stringify(generatedVerificationMap)
      );

      // Save the current stage to session storage
      sessionStorage.setItem('currentStage', JSON.stringify(0));
      setVerificationStages(stages);

      // Remove verificationStages from URL
      url.searchParams.delete('verificationStages');
      const newUrl = `${url.pathname}?${url.searchParams.toString()}`;
      window.history.replaceState(null, '', newUrl);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        console.log('You are using a mobile device');
      } else {
        console.log('You are using a desktop device');
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />

        <Title center className="mt-6">
          Let's get you started
        </Title>

        <Body center>
          For best experience, we recommend you continue this verification on
          your mobile device.
        </Body>
      </header>

      {/* Body */}
      <main>
        <div className="bg-[#FFFEFD] border border-textbody/50 rounded-lg text-sm text-left mb-4 grid grid-cols-[auto_1fr] gap-4 overflow-hidden py-3">
          <QRCode
            value={window.location.href}
            size={120}
            className="h-28 w-28 rounded-md relative top-[-4px]"
          />
          <div className="w-auto py-4">
            <Subtitle>Scanning QR code</Subtitle>
            <Body className="text-xs">
              Scan the QR code with your camera app
            </Body>
          </div>
        </div>
      </main>

      <footer>
        <div className="bg-[#FFF8E8]/50 border border-textbody/20 p-4 rounded-lg text-sm text-left mb-4">
          <Subtitle>Send link via email</Subtitle>
          <Body className="text-xs">
            A link will be sent to your email address to start verification
          </Body>

          <div className="flex flex-col gap-2 mt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormFieldComponent
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="e.g brucewayne@gmail.com"
                  type="email"
                />
              </form>
            </Form>

            <ReuseButton action={form.handleSubmit(onSubmit)}>
              Send link
            </ReuseButton>
          </div>
        </div>
        <Body center className="text-xs mt-2">
          Don't have a smartphone?{' '}
          <Link href={'start'} className="text-custom-text underline">
            Continue with the device
          </Link>
        </Body>
        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default PreStartPage;
