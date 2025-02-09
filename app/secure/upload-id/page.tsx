'use client';

import ReuseButton from '@/app/components/ReuseButton';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';

import { Form } from '@/components/ui/form';
import FormFieldComponent from '@/app/components/FormField';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { docUploadSchema } from '@/common/FormSchema';
import { useRouter } from 'next/navigation';

const UploadId = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof docUploadSchema>>({
    resolver: zodResolver(docUploadSchema),
    defaultValues: {
      doc: undefined,
    },
  });

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handle form submission.
   *
   * @param {z.infer<typeof docUploadSchema>} values - Form values.
   * @return {void}
   */
  /******  ab90168a-b717-49ba-b16d-b45c2722da67  *******/ function onSubmit(
    values: z.infer<typeof docUploadSchema>
  ) {
    // Navigate to home "/"
    // router.push('/');

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
          Upload ID
        </Title>

        <Body center className="text-xs mt-2">
          Please upload a file less than 5MB
        </Body>
      </header>

      {/* Main */}
      <main className="px-4 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormFieldComponent
              form={form}
              name="doc"
              label="Upload an image of your ID card"
              placeholder="Click here to upload document"
              type="file"
            />
          </form>
        </Form>
      </main>

      {/* Footer */}
      <footer>
        <ReuseButton variant="default">Upload</ReuseButton>
        <ReuseButton
          variant="secondary"
          action={() => router.push('capture-id')}
        >
          Capture Instead
        </ReuseButton>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default UploadId;
