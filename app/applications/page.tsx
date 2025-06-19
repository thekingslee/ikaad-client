'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Body from '@/components/atoms/Body';
import ReuseAlert from '../components/ReuseAlert';
import Title from '@/components/atoms/Title';
import ReuseTable from '../components/ReuseTable';
import ReuseDrawer from '../components/ReuseDrawer';
import ReuseNav from '../components/ReuseNav';
import { applicationsService, Application } from '@/services/applications';
import ProtectedRoute from '@/components/ProtectedRoute';

// import { useMediaQuery } from "@/hooks/use-media-query"
// const isDesktop = useMediaQuery("(min-width: 768px)")

const ApplicationsPage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await applicationsService.getApplications();
        setApplications(response.data);
      } catch (err) {
        console.error('Error fetching applications:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred while fetching applications');
        }
        setApplications([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  console.log('applications', applications);

  return (
    <ProtectedRoute>
      {/* Header */}
      <header>
        <ReuseNav />
        <Image
          aria-hidden
          src="/images/lock.svg"
          alt="Globe icon"
          width={40}
          height={40}
          className="mx-auto mt-6 mb-4"
        />

        <Title center className="mb-3">
          Your Applications
        </Title>

        <ReuseAlert title="Important Notice">
          The information displayed here is sensitive. As a tester, ensure all
          information remains secure and confidential.
        </ReuseAlert>
      </header>

      {/* Body */}
      <main className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center py-8">
            <Body>Loading applications...</Body>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <Body className="text-red-600">{error}</Body>
          </div>
        ) : (
          <ReuseTable
            data={applications}
            selected={selectedApplication}
            setSelected={setSelectedApplication}
            setOpen={setOpen}
          />
        )}

        {selectedApplication && (
          <ReuseDrawer
            setOpen={setOpen}
            open={open}
            data={selectedApplication}
          />
        )}
      </main>
      {/* Footer */}
      <footer>
        <Body center className="text-xs mt-2">
          Powered by <span className="text-stone-400">IKaad</span>
        </Body>
      </footer>
    </ProtectedRoute>
  );
};

export default ApplicationsPage;
