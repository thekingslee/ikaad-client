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

export const userFormSchema = z.object({
  firstname: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(50, {
      message: 'Username must be less than 50 characters.',
    }),
  middlename: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(50, {
      message: 'Username must be less than 50 characters.',
    }),
  lastname: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(50, {
      message: 'Username must be less than 50 characters.',
    }),
  dob: z.string(),
});

export const bnvSchema = z.object({
  bvn: z
    .string()
    .min(11, {
      message: 'BVN must be 11 characters.',
    })
    .max(11, {
      message: 'BVN must be 11 characters.',
    }),
});

export const docUploadSchema = z.object({
  doc: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size must be less than 5MB.',
    })
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
      message: 'File must be a JPEG, or PNG.',
    }),
});
