'use client';

import { Form } from '@/components/ui/form';
import FormFieldComponent from '@/app/components/FormField';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { userFormSchema } from '@/common/FormSchema';
import { useRouter } from 'next/navigation';

import ReuseNav from '@/app/components/ReuseNav';
import ReuseButton from '@/app/components/ReuseButton';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import useUserDataStore from '@/store/userData';
import useStore from '@/store/store';
import { useEffect } from 'react';
import { applicationsService } from '@/services/applications';

const FormData = () => {
  const router = useRouter();
  const { userData, setUserData } = useUserDataStore();
  const { updateCurrentStage } = useStore();

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: userData
      ? { ...userData, dob: userData.dob ? new Date(userData.dob) : undefined }
      : {
          firstname: '',
          middlename: '',
          lastname: '',
          dob: undefined,
        },
  });

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    setUserData({
      ...values,
      dob: values.dob.toISOString(),
    });
    console.log(values);

    // Retrieve refId and applicationId from sessionStorage
    const refId = sessionStorage.getItem('applicationRef');
    const applicationId = sessionStorage.getItem('applicationId');

    if (!refId || !applicationId) {
      console.log('Missing application reference or ID.');
      return;
    }

    // Submit form data to the backend
    try {
      await applicationsService.submitUserInfo(refId, applicationId, {
        firstName: values.firstname,
        middleName: values.middlename,
        lastName: values.lastname,
        dob: values.dob.toISOString(),
      });
      // Navigate to bvn "/secure/bvn"
      router.push('bvn');
    } catch (error: unknown) {
      console.error(error);
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

        <Title center className="mt-6">
          User Data
        </Title>
        <Body center>Fill in the form as appears on your valid ID</Body>
      </header>

      {/* Body */}
      <main className="px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormFieldComponent
              form={form}
              name="firstname"
              label="First Name"
              placeholder="e.g Bruce"
              type="text"
            />

            <FormFieldComponent
              form={form}
              name="middlename"
              label="Middle Name"
              placeholder="e.g batman"
              type="text"
            />

            <FormFieldComponent
              form={form}
              name="lastname"
              label="Lastname"
              placeholder="e.g Wayne"
              type="text"
            />

            <FormFieldComponent
              form={form}
              name="dob"
              label="Date of Birth"
              placeholder="Enter a date"
              type="date"
            />
          </form>
        </Form>
      </main>

      {/* Footer */}
      <footer>
        <ReuseButton
          action={form.handleSubmit(onSubmit)}
          disabled={!form.formState.isValid}
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

export default FormData;
