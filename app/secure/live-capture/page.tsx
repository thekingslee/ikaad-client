'use client';

import ReuseNav from '@/app/components/ReuseNav';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Title from '@/components/atoms/Title';
import ReuseButton from '@/app/components/ReuseButton';
import Body from '@/components/atoms/Body';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import * as faceapi from 'face-api.js';
import useVideoRecorder from '@/hooks/useVideoRecorder';
import { useSnapshotCapture } from '@/hooks/useSnapshotCapture';
import { useAuth } from '@/context/AuthContext';

type Step = 'detect-face' | 'smile' | 'open-mouth' | 'complete';
const flow: { id: number; step: Step; message: string }[] = [
  {
    id: 0,
    step: 'detect-face',
    message: 'Please position your face within the frame',
  },
  { id: 1, step: 'smile', message: 'Please smile' },
  {
    id: 2,
    step: 'open-mouth',
    message: 'Open your mouth wide and raise your eyebrows',
  },
  { id: 3, step: 'complete', message: 'Done' },
];

const LiveCapture = () => {
  const router = useRouter();
  const { user } = useAuth();

  // const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { videoRef, startRecording, stopRecording, isRecording } =
    useVideoRecorder();
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const [ready, setReady] = useState(false);
  const [currentStep, setCurrentStep] = useState<{
    id: number;
    step: Step;
    message: string;
  }>();
  const [detectionData, setDetectionData] = useState<any>({});

  // Use the custom hook for snapshot capture
  const { captureAndUploadSnapshot } = useSnapshotCapture({
    videoRef,
    canvasRef,
  });

  const getVideo = useCallback(async () => {
    if (videoRef.current) {
      try {
        const stream = await navigator?.mediaDevices?.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.style.transform = 'scaleX(-1)';
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    }
  }, []);

  const stopVideo = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
      videoRef.current.srcObject = null;
      videoRef.current = null;
    }
  };

  const performFaceDetection = useCallback(async () => {
    const scaleFactor = 0.5;

    if (videoRef.current && canvasRef.current) {
      canvasRef.current.style.transform = 'scaleX(-1)';

      const detections = await faceapi
        .detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 128 })
        )
        .withFaceExpressions();
      // .withFaceLandmarks()

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
        setDetectionData(detections[0]);
      } else {
        console.log("Make sure there's just one person in the camera");
      }
      // const resizedDetections = faceapi.resizeResults(detections, displaySize);
      // faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      // faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      // faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
    }
  }, []);

  useEffect(() => {
    // LOAD MODELS FROM FACE API
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        // faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      ]);
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (ready) {
      intervalIdRef.current = setInterval(performFaceDetection, 1000);
      if (!isRecording) {
        startRecording();
      }
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      if (isRecording) {
        stopRecording();
      }
    };
  }, [ready, performFaceDetection, startRecording, stopRecording, isRecording]);

  const readyToStart = useCallback(() => {
    getVideo();
    setReady(true);
    setCurrentStep(flow[0]);
  }, [getVideo]);

  const completeOpenMouthTest = useCallback(() => {
    stopVideo();
    stopRecording();
  }, [stopRecording]);

  useEffect(() => {
    if (detectionData?.detection) {
      // If the current step is "detect-face"
      if (
        currentStep?.step === 'detect-face' &&
        detectionData?.detection?._score >= 0.5
      ) {
        // console.log('✅ Test1 Pass:: Face detected');
        setCurrentStep(flow[1]);
      }

      // If the current step is "smile"
      if (
        currentStep?.step === 'smile' &&
        detectionData?.expressions?.happy >= 0.95
      ) {
        // console.log('✅ Test2 Pass:: Smile detected');
        // Capture and upload snapshot
        captureAndUploadSnapshot();
        setCurrentStep(flow[2]);
      }

      // If the current step is "open-mouth"
      if (
        currentStep?.step === 'open-mouth' &&
        detectionData?.expressions?.surprised >= 0.005
        // some condition to check if the user open mouth
      ) {
        // console.log('✅ Test3 Pass:: Open mouth detected');
        completeOpenMouthTest();
        setCurrentStep(flow[3]);

        setTimeout(() => {
          router.push('confirm-video');
        }, 2000);
      }
    } else {
      console.log('No face detected');
    }
  }, [detectionData, currentStep]);

  useEffect(() => {
    return () => {
      // Clean up media stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null; // Clear the srcObject
      }

      // Clear interval
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [getVideo, videoRef]);

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />
      </header>

      {/* Body */}
      <main className="px-8 h-full flex flex-col justify-between">
        <div className="grid gap-4 ">
          <motion.div
            key={ready.toString()}
            initial={{ scale: 1 }}
            animate={{ scale: [0.4, 1.15, 1] }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              mass: 0.5,
            }}
            className="w-full h-auto bg-stone-900 border-4 border-stone-900 mx-auto relative overflow-hidden rounded-full aspect-square"
          >
            <video
              crossOrigin="anonymous"
              ref={videoRef}
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              playsInline={true}
              autoPlay
              className="rounded-full"
            ></video>

            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className="absolute top-0 left-0"
            />

            <motion.div
              key={currentStep?.step}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.025, 1] }}
              transition={{ duration: 1, repeat: 2 }}
              className="h-full w-full absolute border-4 border-stone-100 rounded-full top-0 left-0 "
            />
            {/* <AnimatePresence>
              {infoMsg && (
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-transparent border border-stone-900 rounded-full px-2 py-1 text-xs mx-auto absolute inset-0 flex items-center justify-center"
              >
              <span className="bg-stone-50 px-2 py-1 rounded-full">
              {infoMsg}
              </span>
              </motion.div>
              )}
            </AnimatePresence> */}
          </motion.div>

          {/* Progress visulaizer */}
          <div className="relative h-12 flex items-center ">
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
                    <div className="w-5 h-5 rounded-full bg-custom-green flex items-center justify-center">
                      <Check
                        className="w-3 h-3 text-[#fff]"
                        strokeWidth={1.5}
                      />
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
              <div className="w-4 h-[3px] bg-stone-200">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{
                    width:
                      flow.findIndex(
                        (item) => item.step === currentStep?.step
                      ) > flow.findIndex((item) => item.step === 'detect-face')
                        ? '100%'
                        : '0%',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="h-[3px] w-4 bg-custom-green"
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
                    <div className="w-5 h-5 rounded-full bg-custom-green flex items-center justify-center">
                      <Check
                        className="w-3 h-3 text-[#fff]"
                        strokeWidth={1.5}
                      />
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
              <div className="w-4 h-[3px] bg-stone-200">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{
                    width:
                      flow.findIndex(
                        (item) => item.step === currentStep?.step
                      ) > flow.findIndex((item) => item.step === 'smile')
                        ? '100%'
                        : '0%',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="h-[3px] w-4 bg-custom-green"
                ></motion.div>
              </div>
              {flow.findIndex((item) => item.step === currentStep?.step) >
              flow.findIndex((item) => item.step === 'open-mouth') ? (
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
                    <div className="w-5 h-5 rounded-full bg-custom-green flex items-center justify-center">
                      <Check
                        className="w-3 h-3 text-[#fff]"
                        strokeWidth={1.5}
                      />
                    </div>
                  </motion.span>
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={
                    currentStep?.step === 'open-mouth'
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
        </div>

        <div className="relative h-full mt-4">
          <AnimatePresence>
            <motion.div
              key={currentStep?.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute', width: '100%' }}
            >
              <Title center>
                {currentStep?.message || 'Press Ready to begin capture'}
              </Title>

              {!!currentStep?.message && currentStep.id === 0 && (
                <Body className="mt-4 text-xs" center>
                  {' '}
                  Not detecting your face?{' '}
                  <span
                    className="text-custom-text cursor-pointer underline"
                    onClick={() => window.location.reload()}
                  >
                    Reload models
                  </span>
                </Body>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer>
        {/* Remove Next step buton */}
        {/* <ReuseButton
          action={() => {
            setCurrentStep((prevStep) => {
              const currentIndex = flow.findIndex(
                (item) => item.step === prevStep?.step
              );
              const nextIndex = (currentIndex + 1) % flow.length;
              return flow[nextIndex];
            });
          }}
          variant="secondary"
        >
          Next Step
        </ReuseButton> */}
        {!ready && <ReuseButton action={readyToStart}>Ready </ReuseButton>}

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400"> IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default LiveCapture;
