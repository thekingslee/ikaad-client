import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type QRCodeProps = {
  value: string;
  size?: number;
  className?: string;
};

const QRCode = ({ value, size = 96, className }: QRCodeProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [currentValue, setCurrentValue] = useState('');

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update current value when value prop changes
  useEffect(() => {
    if (isClient && value) {
      setCurrentValue(value);
    }
  }, [value, isClient]);

  useEffect(() => {
    // Only run on client side
    if (!isClient || typeof window === 'undefined') return;

    const initQRCode = async () => {
      try {
        // Import QRCodeStyling dynamically
        const QRCodeStylingModule = await import('qr-code-styling');
        const QRCodeStylingClass = QRCodeStylingModule.default;

        // Create new QRCode instance with initial data
        qrCode.current = new QRCodeStylingClass({
          width: size,
          height: size,
          data: currentValue || 'https://example.com', // Provide fallback data
          image: '/images/logo.svg',
          type: 'svg',
          dotsOptions: {
            gradient: {
              type: 'radial',
              rotation: 0,
              colorStops: [
                {
                  offset: 0.6,
                  color: '#114B5F',
                },
                {
                  offset: 1,
                  color: '#000000',
                },
              ],
            },
            type: 'dots',
          },
          imageOptions: {
            crossOrigin: 'anonymous',
            margin: 5,
            hideBackgroundDots: true,
            imageSize: 0.2,
          },
          cornersSquareOptions: {
            type: 'dot',
            gradient: {
              type: 'linear',
              rotation: 0,
              colorStops: [
                {
                  offset: 0.6,
                  color: '#000000',
                },
                {
                  offset: 1,
                  color: '#114B5F',
                },
              ],
            },
          },
          qrOptions: {
            errorCorrectionLevel: 'M',
          },
          cornersDotOptions: {
            type: 'dot',
          },
          backgroundOptions: {
            color: '#ffffff',
          },
        });

        // Append to DOM
        if (qrRef.current) {
          qrRef.current.innerHTML = '';
          qrCode.current.append(qrRef.current);
        }

        // Update with actual value if available
        if (currentValue) {
          qrCode.current.update({
            data: currentValue,
            width: size,
            height: size,
          });
        }
      } catch (error) {
        console.error('Error initializing QR code:', error);
      }
    };

    initQRCode();
  }, [isClient, size, currentValue]);

  useEffect(() => {
    if (qrCode.current && currentValue && isClient) {
      try {
        console.log('Updating QR code with value:', currentValue);
        qrCode.current.update({
          data: currentValue,
          width: size,
          height: size,
        });
      } catch (error) {
        console.error('Error updating QR code:', error);
      }
    }
  }, [currentValue, size, isClient]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (qrCode.current) {
        qrCode.current = null;
      }
    };
  }, []);

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        Loading QR Code...
      </div>
    );
  }

  return <div ref={qrRef} className={className} />;
};

export default QRCode;
