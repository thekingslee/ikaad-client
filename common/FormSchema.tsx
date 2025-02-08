import { z } from 'zod';

export const preStartSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(50, {
      message: 'Username must be less than 50 characters.',
    }),
});

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(50, {
      message: 'Username must be less than 50 characters.',
    }),

  passcode: z
    .string()
    .min(7, {
      message: 'Passcode must be at least 7 characters.',
    })
    .max(50),
});
