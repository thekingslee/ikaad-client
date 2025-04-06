'use client';

import { useEffect, useRef, useState } from 'react';
import ReuseAlert from '@/app/components/ReuseAlert';
import ReuseNav from '@/app/components/ReuseNav';
import Body from '@/components/atoms/Body';
import Title from '@/components/atoms/Title';
import ReuseButton from '@/app/components/ReuseButton';
import { useRouter } from 'next/navigation';
import useUploadIdStore from '@/store/uploadIdStore';

const CaptureID = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { uploadId, setUploadId } = useUploadIdStore();

  // Start camera stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Use rear camera
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access the camera. Please check permissions.');
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  // Capture photo from video stream
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        // Set canvas dimensions to match video
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Draw video frame to canvas
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        // Convert canvas to image URL
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);

        // Stop camera after capture
        stopCamera();

        // You can now use imageDataUrl (e.g., save to state, send to server)
        setUploadId(imageDataUrl);
        console.log('Captured image:', imageDataUrl);
      }
    }
  };

  // Handle navigation to preview with captured image
  const handlePreview = () => {
    if (capturedImage) {
      router.push(`/secure/preview-id`);
    } else {
      alert('Please capture an image first');
    }
  };

  // Initialize camera when component mounts
  useEffect(() => {
    startCamera();

    // Cleanup camera on unmount
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <>
      {/* Header */}
      <header>
        <ReuseNav />

        <Title center className="mt-6">
          Capture ID
        </Title>

        <Body center className="text-xs mt-2">
          Please make sure you are in a well lit environment
        </Body>
      </header>

      {/* Main */}
      <main className="px-4 ">
        <div className="h-52 w-full border-4 border-stone-900 mx-auto rounded-xl relative">
          {capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured ID"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <video
                crossOrigin="anonymous"
                ref={videoRef}
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                playsInline={true}
                autoPlay></video>
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </>
          )}
        </div>

        <ReuseAlert
          className="text-center relative bottom-8 max-w-64 mx-auto px-4"
          title="Capture the front of your ID ">
          Make sure your NIN Slip is properly placed, and hold it still for a
          few seconds
        </ReuseAlert>
      </main>

      {/* Footer */}
      <footer>
        <div className="grid gap-2">
          {!capturedImage ? (
            <>
              {isCameraOn ? (
                <ReuseButton action={capturePhoto}>Capture</ReuseButton>
              ) : (
                <ReuseButton action={startCamera}>Start Camera</ReuseButton>
              )}
              <ReuseButton
                variant="secondary"
                action={() => {
                  stopCamera();
                  router.push('upload-id');
                }}>
                Upload Instead
              </ReuseButton>
            </>
          ) : (
            <>
              <ReuseButton action={handlePreview}>
                Continue to Preview
              </ReuseButton>
              <ReuseButton
                variant="secondary"
                action={() => setCapturedImage(null)}>
                Retake Photo
              </ReuseButton>
            </>
          )}
        </div>

        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </>
  );
};

export default CaptureID;
