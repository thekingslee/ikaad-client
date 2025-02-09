'use client';

import { Form } from '@/components/ui/form';
import FormFieldComponent from '@/app/components/FormField';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { bnvSchema } from '@/common/FormSchema';
import { useRouter } from 'next/navigation';

import ReuseNav from '@/app/components/ReuseNav';
import ReuseButton from '@/app/components/ReuseButton';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';

const BVN = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof bnvSchema>>({
    resolver: zodResolver(bnvSchema),
    defaultValues: {
      bvn: '',
    },
  });

  function onSubmit(values: z.infer<typeof bnvSchema>) {
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
        <ReuseButton action={form.handleSubmit(onSubmit)}>Continue</ReuseButton>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default BVN;
