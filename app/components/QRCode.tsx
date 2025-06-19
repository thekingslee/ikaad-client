import Image from 'next/image';
import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

type QRCodeProps = {
  value: string;
  size?: number;
  className?: string;
};

const QRCode = ({ value, size = 96, className }: QRCodeProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrCode.current) {
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
  }, []);

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
