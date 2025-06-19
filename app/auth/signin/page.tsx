'use client';

import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import Image from 'next/image';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

import { Form } from '@/components/ui/form';
import FormFieldComponent from '@/app/components/FormField';
import ReuseButton from '@/app/components/ReuseButton';
import ReuseAlert from '@/app/components/ReuseAlert';
import { useRouter } from 'next/navigation';
import { loginFormSchema } from '@/common/FormSchema';
import { useAuth } from '@/context/AuthContext';
import { setTokenInStorage } from '@/utils/auth';
import { authService } from '@/services/auth';

import Logo from '@/assets/logo.svg';

const Signin = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      passcode: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setError('');
    setIsLoading(true);

    try {
      const data = await authService.login({
        email: values.username.toLowerCase(),
        password: values.passcode,
      });

      if (data.status === 'success' && data.token) {
        setTokenInStorage(data.token);
        login(data.token);
        router.push('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Login failed');
      } else {
        setError('An error occurred during login');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <header className="px-0 sm:px-4">
        <Image
          aria-hidden
          src={Logo}
          alt="ISecure Logo"
          width={40}
          height={40}
          className="mx-auto mt-6 mb-4"
        />
        <Title center>ISecure Demo</Title>
        <Body center>
          Access to this prototype is limited to selected users as part of a
          closed test.
        </Body>
      </header>

      {/* Body */}
      <main className="px-0 sm:px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormFieldComponent
              form={form}
              name="username"
              label="Username"
              placeholder="e.g batman"
              type="text"
              disabled={isLoading}
            />
            <FormFieldComponent
              form={form}
              name="passcode"
              label="Passcode"
              placeholder="e.g #12345678"
              type="password"
              disabled={isLoading}
            />
          </form>
        </Form>

        {true && (
          <ReuseAlert
            variant="danger"
            title=""
            className="py-1 px-0 border-none bg-none"
          >
            {error}
          </ReuseAlert>
        )}
      </main>

      {/* Footer */}
      <footer className="px-0 sm:px-4">
        <ReuseAlert title="Don't have a passcode?">
          <>
            If you're interested in this product and would like to learn more.
            Please{' '}
            <span className="text-btn-text cursor-pointer underline">
              contact us
            </span>{' '}
            to request an access code.
          </>
        </ReuseAlert>

        <ReuseButton
          className="mt-3"
          action={form.handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Submit'}
        </ReuseButton>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default Signin;
