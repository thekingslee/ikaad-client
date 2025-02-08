'use client';

import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import Image from 'next/image';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import FormFieldComponent from '@/app/components/FormField';
import ReuseButton from '@/app/components/ReuseButton';
import ReuseAlert from '@/app/components/ReuseAlert';
import { useRouter } from 'next/router';
import { loginFormSchema } from '@/common/FormSchema';

const Signin = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      passcode: '',
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // Navigate to home "/"
    const router = useRouter();
    router.push('/');

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <header className="mx-4 ">
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={40}
          height={40}
          className="mx-auto mt-6 mb-4"
        />
        <Title center>Closed Test Access</Title>
        <Body center>
          This prototype is in a closed test phase. Access is restricted to
          approved users only.
        </Body>
      </header>

      <main className="bg-red-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormFieldComponent
              form={form}
              name="username"
              label="Username"
              placeholder="e.g batman"
              type="text"
            />
            <FormFieldComponent
              form={form}
              name="passcode"
              label="Passcode"
              // description="The access code provided by the team"
              placeholder="e.g #12345678"
              type="password"
            />
          </form>
        </Form>
      </main>

      <footer>
        <ReuseButton action={form.handleSubmit(onSubmit)}>Submit</ReuseButton>

        <ReuseAlert title="Don’t have a passcode?">
          <>
            If you're interested in this product and would like to learn more.
            Please{' '}
            <span className="text-blue-600 cursor-pointer">contact us</span> to
            request an access code.
          </>
        </ReuseAlert>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default Signin;
