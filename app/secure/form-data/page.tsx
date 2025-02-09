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

const FormData = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstname: '',
      middlename: '',
      lastname: '',
      // DOB: '',
    },
  });

  function onSubmit(values: z.infer<typeof userFormSchema>) {
    // Navigate to home "/"
    router.push('bvn');

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
              name="DOB"
              label="Date of Birth"
              placeholder="Enter a date"
              type="date"
            />
          </form>
        </Form>
      </main>

      {/* Footer */}
      <footer>
        <ReuseButton action={form.handleSubmit(onSubmit)}>Continue</ReuseButton>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default FormData;
