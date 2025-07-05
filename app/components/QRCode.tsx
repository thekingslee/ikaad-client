import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
// Dynamic import to avoid SSR issues
// import QRCodeStyling from 'qr-code-styling';

type QRCodeProps = {
  value: string;
  size?: number;
  className?: string;
};

const QRCode = ({ value, size = 96, className }: QRCodeProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<any>(null);
  const [QRCodeStyling, setQRCodeStyling] = useState<any>(null);

  useEffect(() => {
    // Dynamically import QRCodeStyling only in browser environment
    const loadQRCodeStyling = async () => {
      if (typeof window !== 'undefined') {
        try {
          const QRCodeStylingModule = await import('qr-code-styling');
          setQRCodeStyling(QRCodeStylingModule.default);
        } catch (error) {
          console.error('Error loading qr-code-styling:', error);
        }
      }
    };

    loadQRCodeStyling();
  }, []);

  useEffect(() => {
    if (!qrCode.current && QRCodeStyling) {
      qrCode.current = new QRCodeStyling({
        width: size,
        height: size,
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
    }

    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.current.append(qrRef.current);
    }
  }, [QRCodeStyling, size]);

  useEffect(() => {
    if (qrCode.current && value) {
      qrCode.current.update({
        data: value,
        width: size,
        height: size,
      });
    }
  }, [value, size]);

  return <div ref={qrRef} className={className} />;
};

export default QRCode;
