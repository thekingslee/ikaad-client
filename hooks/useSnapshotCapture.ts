import { useCallback } from 'react';
import { applicationsService } from '@/services/applications';
import { useAuth } from '@/context/AuthContext';

interface UseSnapshotCaptureProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const useSnapshotCapture = ({
  videoRef,
  canvasRef,
}: UseSnapshotCaptureProps) => {
  const { user } = useAuth();

  const captureAndUploadSnapshot = useCallback(async () => {
    if (videoRef.current && canvasRef.current) {
      try {
        // Create a temporary canvas to capture the snapshot
        const tempCanvas = document.createElement('canvas');
        const tempContext = tempCanvas.getContext('2d');

        if (!tempContext) {
          console.error('Could not get canvas context');
          return;
        }

        // Set canvas dimensions to match video
        tempCanvas.width = videoRef.current.videoWidth;
        tempCanvas.height = videoRef.current.videoHeight;

        // Draw the video frame to canvas
        tempContext.drawImage(videoRef.current, 0, 0);

        // Convert canvas to blob
        tempCanvas.toBlob(
          async (blob) => {
            if (!blob) {
              console.error('Could not create blob from canvas');
              return;
            }

            try {
              // Use the applications service to upload the snapshot
              const result = await applicationsService.uploadSnapshot(
                blob,
                user?.id!
              );
              console.log('✅ Snapshot uploaded successfully:', result);

              // Save application data to session storage
              if (result.data) {
                sessionStorage.setItem(
                  'applicationId',
                  result.data.id.toString()
                );
                sessionStorage.setItem('applicationRef', result.data.ref);
              }
            } catch (error) {
              // console.error('❌ Error uploading snapshot:', error);
            }
          },
          'image/jpeg',
          0.8
        );
      } catch (error) {
        // console.error('❌ Error capturing snapshot:', error);
      }
    }
  }, [user?.id]);

  return { captureAndUploadSnapshot };
};
