'use client';

import Image from 'next/image';
import { Form } from '@/components/ui/form';
import FormFieldComponent from '@/app/components/FormField';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { bnvSchema } from '@/common/FormSchema';

import ReuseNav from '@/app/components/ReuseNav';
import ReuseButton from '@/app/components/ReuseButton';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import useUserDataStore from '@/store/userData';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/store/store';
import { applicationsService } from '@/services/applications';

const BVN = () => {
  const router = useRouter();
  const { userData, setUserData } = useUserDataStore();
  const { stageData, updateCurrentStage } = useStore();

  const form = useForm<z.infer<typeof bnvSchema>>({
    resolver: zodResolver(bnvSchema),
    defaultValues: userData || {
      bvn: '',
    },
  });

  const navigateToNext = () => {
    router.push(stageData?.nextStageRoute as string);
  };

  async function onSubmit(values: z.infer<typeof bnvSchema>) {
    setUserData({ ...userData, bvn: values.bvn });

    // Retrieve refId and applicationId from sessionStorage
    const refId = sessionStorage.getItem('applicationRef');
    const applicationId = sessionStorage.getItem('applicationId');

    if (!refId || !applicationId) {
      console.error('Missing application reference or ID.');
      return;
    }

    // Submit BVN data to the backend
    try {
      await applicationsService.submitDocumentData(refId, applicationId, {
        document: values.bvn,
        documentType: 'bvn',
      });

      // Navigate to next stage if successful
      navigateToNext();
    } catch (error: unknown) {
      console.error('Error submitting BVN data:', error);
      // Handle error appropriately (show error message to user)
    }
  }

  // UPDATE CURRENT STAGE
  useEffect(() => {
    updateCurrentStage('BVN');
  }, []);

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />

        <Image
          aria-hidden
          src="/images/verify.svg"
          alt="Globe icon"
          width={60}
          height={60}
          className="mx-auto mt-6 mb-4"
        />

        <Title center className="mt-6">
          BVN Verification
        </Title>
      </header>

      {/* Body */}
      <main className="px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormFieldComponent
              form={form}
              name="bvn"
              label="BVN"
              placeholder="e.g 22012345678"
              type="text"
            />
          </form>
        </Form>
      </main>

      {/* Footer */}
      <footer>
        <ReuseButton
          disabled={!form.formState.isValid}
          action={form.handleSubmit(onSubmit)}
        >
          Continue
        </ReuseButton>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default BVN;
