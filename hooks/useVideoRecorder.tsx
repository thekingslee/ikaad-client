import useLiveCaptureStore from '@/store/liveCaptureStore';
import { useState, useEffect, useRef, useCallback } from 'react';

const useVideoRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { setUserRecording } = useLiveCaptureStore();

  const startRecording = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };
    recorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm; codecs=vp8' });
      const url = URL.createObjectURL(blob);
      console.log('RECORdS', url);
      setUserRecording(url); // Save the media to liveCaptureStore
    };
    setMediaRecorder(recorder);
    recorder.start();
    setIsRecording(true);
  }, [recordedChunks]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }, [mediaRecorder, isRecording]);

  return { videoRef, startRecording, stopRecording, isRecording };
};

export default useVideoRecorder;
