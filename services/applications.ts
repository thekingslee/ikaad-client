import axios from 'axios';
import { getTokenFromStorage } from '@/utils/auth';
import { ApplicationDocumentType } from '@/common/enums';

export interface Application {
  user_id: number;
  image_url: string;
  reference_id: string;
  is_completed: boolean;
  first_name: string;
  last_name: string;
  middle_name: string;
  dob: string;
  status: string;
  document_type: ApplicationDocumentType;
  card_authenticity_score: number;
  failure_reason: string;
  created_at: string;
  updated_at: string;
  document: null | string;
  doc_image: string;
  id: number;
  face_match_score: number;
}

export interface ApplicationsResponse {
  status: string;
  message: string;
  data: Application[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const applicationsService = {
  getApplications: async (): Promise<ApplicationsResponse> => {
    const token = getTokenFromStorage();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const { data } = await axios.get<ApplicationsResponse>(
      `${API_URL}/applications`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },
};
