'use client';

import Image from 'next/image';
import { modelService } from '@/services/modelService';
import { ApplicationDocumentType } from '@/common/enums';
import useUserDataStore from '@/store/userData';

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
import Loader from '@/app/components/Loader';
import ReuseAlert from '@/app/components/ReuseAlert';

const UploadId = () => {
  const router = useRouter();
  const { stageData, updateCurrentStage } = useStore();
  const { uploadId, setUploadId } = useUploadIdStore();
  const { userData } = useUserDataStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');
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
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (
      file &&
      file.type.startsWith('image/') &&
      !file.type.endsWith('svg+xml')
    ) {
      const imageUrl = URL.createObjectURL(file);

      setUploadId(imageUrl);
      setSelectedFile(file);
      setIsLoading(true);
      setError(null);
      try {
        const { status, data } = await modelService.predictDocument(file);
        // TODO: Check if the image match the document type selected
        if (status !== 'passed') {
          setError('Please upload a valid ID image.');
          setIsLoading(false);
          return;
        }
        // Compare selected docType with prediction
        if (
          userData?.docType &&
          data?.prediction &&
          userData.docType !== data.prediction
        ) {
          setError('Uploaded ID does not match the selected document type.');
          setIsLoading(false);
          return;
        }
        // Optionally, you can store prediction/confidence in a store or state here
        setIsLoading(false);
        router.push('/secure/preview-id?source=upload');
      } catch (error) {
        setError('Please upload a valid ID image.');
        setIsLoading(false);
      }
    } else {
      setError('Please select a valid image file.');
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

        <Body center className="text-sm mt-2">
          Please upload a file less than 5MB
        </Body>
      </header>

      {/* Main */}
      <main className="px-4">
        {isLoading ? (
          <Loader />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* TODO: Height too much */}
              <div
                className={`rounded-lg h-[50vh] max-h-[250px] flex items-center justify-center border border-dotted ${
                  error
                    ? 'border-red-100 text-red-500 bg-red-50/30'
                    : 'border border-textbody/50 bg-[#FFFEFD]'
                }  cursor-pointer relative`}
                onClick={handleClick}
              >
                <div className="flex justify-center gap-2 flex-col items-center">
                  <Image
                    aria-hidden
                    src={'/images/upload.svg'}
                    alt="Profile photo"
                    width={48}
                    height={48}
                    className=""
                  />
                  <p className="text-sm text-center mx-auto">
                    {error || 'Click here to upload image'}
                  </p>
                </div>
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
        )}
      </main>

      {/* Footer */}
      <footer>
        {!isLoading && (
          <>
            <ReuseButton variant="default" action={handleClick}>
              Upload
            </ReuseButton>
            <ReuseButton
              variant="secondary"
              action={() => router.replace('capture-id')}
            >
              Capture Instead
            </ReuseButton>
          </>
        )}
        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default UploadId;
