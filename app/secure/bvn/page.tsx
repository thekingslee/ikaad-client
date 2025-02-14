'use client';

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
import { useRouter, usePathname } from 'next/navigation';
import useStore from '@/store/store';

const BVN = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userData, setUserData } = useUserDataStore();
  const { currentStage, stageData, verificationStages, updateCurrentStage } =
    useStore();

  const form = useForm<z.infer<typeof bnvSchema>>({
    resolver: zodResolver(bnvSchema),
    defaultValues: userData || {
      bvn: '',
    },
  });

  const navigateToNext = () => {
    router.push(stageData?.startRoute);
  };

  function onSubmit(values: z.infer<typeof bnvSchema>) {
    console.log('UserData', userData);
    setUserData({ ...userData, bvn: values.bvn });
    // Navigate to home "/"
    // router.push('/');

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (true) {
      navigateToNext();
    }
    console.log(values);
  }

  useEffect(() => {
    // Update StageData with the next stage if this is the endRoute of the current stage
    if (stageData?.endRoute === pathname) {
      updateCurrentStage(verificationStages[currentStage + 1]); // TODO: Have a more sustainable approach
    }
  }, []);

  console.log('stageData', stageData);
  console.log('verificationStages', verificationStages);

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />

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
