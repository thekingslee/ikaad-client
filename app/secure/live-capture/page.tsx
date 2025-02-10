'use client';

import ReuseNav from '@/app/components/ReuseNav';
import { useRef, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Title from '@/components/atoms/Title';
import ReuseButton from '@/app/components/ReuseButton';
import Body from '@/components/atoms/Body';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import * as faceapi from 'face-api.js'; //TODO install

type Step = 'detect-face' | 'smile' | 'blink' | 'complete';
const flow: { step: Step; message: string }[] = [
  {
    step: 'detect-face',
    message: 'Please position your face within the frame',
  },
  { step: 'smile', message: 'Please smile' },
  { step: 'blink', message: 'Please blink' },
  { step: 'complete', message: 'Done' },
];

const LiveCapture = () => {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const [currentStep, setCurrentStep] = useState<{
    step: Step;
    message: string;
  }>(flow[0]);
  const [detectionData, setDetectionData] = useState<any>({});

  const faceMyDetect = () => {
    let count = 0;
    const scaleFactor = 0.5;

    const performFaceDetection = async () => {
      if (videoRef.current && canvasRef.current) {
        // console.log(count, "Run")
        count += 1;
        canvasRef.current.style.transform = 'scaleX(-1)';

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions({ inputSize: 128 })
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        // Clear the canvas
        const context =
          canvasRef && canvasRef.current && canvasRef.current.getContext('2d');
        context!.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        const displaySize = {
          width: videoRef.current.clientWidth * scaleFactor,
          height: videoRef.current.clientHeight * scaleFactor,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        if (detections.length === 1) {
          // WHEN ONE FACE IS DETECTED
          // setError(null);
          setDetectionData(detections[0]);
          console.log('One face detected');
        } else if (detections.length > 1) {
          // setFacingDirection(null);
          console.error("Make sure there's just one person in the camera");
        } else {
          console.log('Null area');
        }
        console.log(count, 'Run >>>>', detections);
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }
    };

    intervalIdRef.current = setInterval(performFaceDetection, 1000);
  };

  const memoizedPerformFaceDetection = useMemo(
    () => faceMyDetect,
    [videoRef?.current]
  );

  useEffect(() => {
    // LOAD MODELS FROM FACE API
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'), // For Face Detection
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'), // For Blink
        faceapi.nets.faceExpressionNet.loadFromUri('/models'), // For Smile
      ]).then(() => {
        console.log('Models loaded');
      });
    };

    loadModels();
  }, []);

  useEffect(() => {
    async function getVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.style.transform = 'scaleX(-1)';
          memoizedPerformFaceDetection();
        }
      } catch (err) {
        console.error('Error accessing webcam: ', err);
      }
    }

    getVideo();
  }, []);

  useEffect(() => {
    // TODO: Check if the model is loaded and update state

    if (detectionData.detection) {
      // If the current step is "detect-face"
      if (
        currentStep?.step === 'detect-face' &&
        detectionData.detection._score >= 0.5
      ) {
        console.log('✅ Test1 Pass:: Face detected');
        setCurrentStep(flow[1]);
      }

      // If the current step is "smile"
      if (
        currentStep?.step === 'smile' &&
        detectionData.expressions.happy >= 0.95
      ) {
        console.log('✅ Test2 Pass:: Smile detected');
        setCurrentStep(flow[2]);
      }

      // If the current step is "blink"
      if (
        currentStep?.step === 'blink' &&
        detectionData.expressions.happy < 0.95
        // some condition to check if the user blinked
      ) {
        console.log('✅ Test3 Pass:: Blink detected');
        setCurrentStep(flow[3]);
      }
    } else {
      console.log('No face detected');
    }
  }, [detectionData, currentStep]);

  // TODO:
  // Load the camera into the video component
  // Prepare the model, make sure they running
  // Write algorithms to test the 3 liveliness tests
  // - Detect face in recording area
  // - Detect a smile
  // - Detect a blink
  // Display appropriate instuctions for each test
  // Navigate the confirm-video page

  const navigateToNext = () => {
    router.push('confirm-video');
  };

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />
      </header>

      {/* Body */}
      <main className="px-8 h-full flex flex-col justify-between">
        <div className="grid gap-4">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [0, 1.15, 1] }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              mass: 0.5,
            }}
            className=" w-72 h-72 bg-stone-900 border-4 border-stone-900 mx-auto rounded-full relative overflow-hidden"
          >
            <video
              crossOrigin="anonymous"
              height="694"
              ref={videoRef}
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              playsInline={true}
              autoPlay
              className="rounded-full"
            ></video>

            <canvas
              ref={canvasRef}
              height="694"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className="absolute top-0 left-0 hidden"
            />

            <motion.div
              key={currentStep.step}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.025, 1] }}
              transition={{ duration: 1, repeat: 2 }}
              className="h-full w-full absolute border-4 border-stone-100 rounded-full top-0 left-0 "
            />
          </motion.div>

          <div className="flex items-center mx-auto">
            {flow.findIndex((item) => item.step === currentStep?.step) >
            flow.findIndex((item) => item.step === 'detect-face') ? (
              <AnimatePresence>
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5,
                  }}
                  className=""
                >
                  <div className="w-5 h-5 rounded-full bg-stone-900 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#fff]" strokeWidth={1.5} />
                  </div>
                </motion.span>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ scale: 1 }}
                animate={
                  currentStep?.step === 'detect-face'
                    ? { scale: [1, 2] }
                    : { scale: 1 }
                }
                className="h-6 w-6 border border-stone-900 bg-stone-100 rounded-full mx-0"
              >
                <Image
                  aria-hidden
                  src="/images/svg/face.svg"
                  alt="Profile photo"
                  width={160}
                  height={160}
                  className="rounded-full h-full"
                />
              </motion.div>
            )}

            {/* The step divider */}
            <div className="w-4 h-1 bg-stone-200">
              <motion.div
                initial={{ width: '0%' }}
                animate={{
                  width:
                    flow.findIndex((item) => item.step === currentStep?.step) >
                    flow.findIndex((item) => item.step === 'detect-face')
                      ? '100%'
                      : '0%',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-1 w-4 bg-stone-900"
              ></motion.div>
            </div>

            {flow.findIndex((item) => item.step === currentStep?.step) >
            flow.findIndex((item) => item.step === 'smile') ? (
              <AnimatePresence>
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5,
                  }}
                  className=""
                >
                  <div className="w-5 h-5 rounded-full bg-stone-900 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#fff]" strokeWidth={1.5} />
                  </div>
                </motion.span>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ scale: 1 }}
                animate={
                  currentStep?.step === 'smile'
                    ? { scale: [1, 1.8] }
                    : { scale: 1 }
                }
                className="h-6 w-6 border border-stone-900 bg-stone-100 rounded-full mx-0"
              >
                <Image
                  aria-hidden
                  src="/images/svg/face.svg"
                  alt="Profile photo"
                  width={160}
                  height={160}
                  className="rounded-full h-full"
                />
              </motion.div>
            )}

            {/* The step divider */}
            <div className="w-4 bg-stone-200">
              <motion.div
                initial={{ width: '0%' }}
                animate={{
                  width:
                    flow.findIndex((item) => item.step === currentStep?.step) >
                    flow.findIndex((item) => item.step === 'smile')
                      ? '100%'
                      : '0%',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-1 w-4 bg-stone-900"
              ></motion.div>
            </div>

            {flow.findIndex((item) => item.step === currentStep?.step) >
            flow.findIndex((item) => item.step === 'blink') ? (
              <AnimatePresence>
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5,
                  }}
                  className=""
                >
                  <div className="w-5 h-5 rounded-full bg-stone-900 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#fff]" strokeWidth={1.5} />
                  </div>
                </motion.span>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ scale: 1 }}
                animate={
                  currentStep?.step === 'blink'
                    ? { scale: [1, 1.8] }
                    : { scale: 1 }
                }
                className="h-6 w-6 border border-stone-900 bg-stone-100 rounded-full mx-0"
              >
                <Image
                  aria-hidden
                  src="/images/svg/face.svg"
                  alt="Profile photo"
                  width={160}
                  height={160}
                  className="rounded-full h-full"
                />
              </motion.div>
            )}
          </div>
        </div>

        <div className="relative h-10 mt-4">
          <AnimatePresence>
            <motion.div
              key={currentStep.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute', width: '100%' }}
            >
              <Title center>{currentStep.message}</Title>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer>
        {/* Remove Next step buton */}
        <ReuseButton
          action={() => {
            setCurrentStep((prevStep) => {
              const currentIndex = flow.findIndex(
                (item) => item.step === prevStep.step
              );
              const nextIndex = (currentIndex + 1) % flow.length;
              return flow[nextIndex];
            });
          }}
          variant="secondary"
        >
          Next Step
        </ReuseButton>
        <ReuseButton action={navigateToNext}>Ready</ReuseButton>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default LiveCapture;
