'use client';

import Image from 'next/image';

import ReuseButton from '@/app/components/ReuseButton';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';

import { Form } from '@/components/ui/form';
import { z } from 'zod';
import React, { useEffect, useState, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { docUploadSchema } from '@/common/FormSchema';
import { useRouter } from 'next/navigation';
import useStore from '@/store/store';
import useUploadIdStore from '@/store/uploadIdStore';

const UploadId = () => {
  const router = useRouter();
  const { stageData, updateCurrentStage } = useStore();
  const { uploadId, setUploadId } = useUploadIdStore();
  const form = useForm<z.infer<typeof docUploadSchema>>({
    resolver: zodResolver(docUploadSchema),
    defaultValues: {
      doc: undefined,
    },
  });
  function onSubmit(values: z.infer<typeof docUploadSchema>) {
    // Navigate to home "/"
    // router.push('/');

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const navigateToNext = () => {
    router.push(stageData?.nextStageRoute as string);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (
      file &&
      file.type.startsWith('image/') &&
      !file.type.endsWith('svg+xml')
    ) {
      const imageUrl = URL.createObjectURL(file);

      setUploadId(imageUrl);
      router.push('/secure/preview-id');
    } else {
      alert('Please select an image file.');
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // UPDATE CURRENT STAGE
  useEffect(() => {
    updateCurrentStage('DOCUMENT_CAPTURE');
  }, []);

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
      <main className="px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div
              className="h-[50vh] max-h-[408px] flex items-center justify-center border border-dotted cursor-pointer relative"
              onClick={handleClick}>
              <p>Click here to upload image</p>
            </div>
            <input
              type="file"
              accept="image/*"
              name="img"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </form>
        </Form>
      </main>

      {/* Footer */}
      <footer>
        <ReuseButton variant="default" action={() => navigateToNext()}>
          Upload
        </ReuseButton>
        <ReuseButton
          variant="secondary"
          action={() => router.push('capture-id')}>
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
