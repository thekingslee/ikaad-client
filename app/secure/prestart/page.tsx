'use client';

import { useRouter } from 'next/navigation';
import Title from '@/components/atoms/Title';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import Subtitle from '@/components/atoms/Subtitle';
import ReuseButton from '@/app/components/ReuseButton';

import { Form } from '@/components/ui/form';
import FormFieldComponent from '@/app/components/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { preStartSchema } from '@/common/FormSchema';
import Link from 'next/link';

const PreStart = () => {
  const form = useForm<z.infer<typeof preStartSchema>>({
    resolver: zodResolver(preStartSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof preStartSchema>) {
    // Navigate to home "/"
    const router = useRouter();
    router.push('/');

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
          Let’s get you started
        </Title>

        <Body center>
          For best experience, we recommend you continue this verification on
          your mobile device.
        </Body>
      </header>

      {/* Body */}
      <main>
        <div className="bg-stone-100 p-4 rounded-lg text-sm text-left mb-4 grid grid-cols-[auto_1fr] gap-4">
          <figure className="h-24 w-24 bg-stone-300 rounded-md"></figure>
          <div className="w-auto">
            <Subtitle>Scanning QR code</Subtitle>
            <Body className="text-xs">
              Scan the QR code with your camera app
            </Body>
          </div>
        </div>

        <div className="bg-stone-100 p-4 rounded-lg text-sm text-left">
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
      </main>

      <footer>
        <Body center className="text-xs mt-2">
          Don’t have a smartphone?{' '}
          <Link href={'start'} className="text-stone-400">
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

export default PreStart;
