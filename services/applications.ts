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
  meta_data: {
    userAgent?: string;
    browserInfo?: {
      browser: string;
      browserVersion: string;
      os: string;
      deviceType: string;
    };
  };
}

export interface ApplicationsResponse {
  status: string;
  message: string;
  data: Application[];
}

export interface UploadSnapshotResponse {
  status: string;
  message: string;
  data?: any;
}

// APPLICATIONS SERVICE
// This service handles all API calls related to applications including:
// - Getting list of applications
// - Uploading snapshots and documents
// - Submitting user information

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

  /**
   * Get a single application by reference ID
   * @param refId - Application reference ID
   * @returns Promise with the application data
   */
  getApplicationByRefId: async (refId: string): Promise<Application> => {
    const token = getTokenFromStorage();
    if (!token) {
      throw new Error('No authentication token found');
    }
    const { data } = await axios.get<{
      status: string;
      message: string;
      data: {
        success: boolean;
        data: Application[];
      };
    }>(`${API_URL}/applications/${refId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data.data[0];
  },

  /**
   * Upload image captured during liveness test
   * This endpoint accepts a blob file and user ID to store the snapshot
   * @param file - Blob containing the captured image
   * @param userId - ID of the user to associate the image with
   * @returns Promise<UploadSnapshotResponse> with status and message
   */
  uploadSnapshot: async (
    file: Blob,
    userId: number
  ): Promise<UploadSnapshotResponse> => {
    const token = getTokenFromStorage();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const formData = new FormData();
    formData.append('image', file, 'snapshot.jpg');

    const { data } = await axios.post<UploadSnapshotResponse>(
      `${API_URL}/applications/upload/${userId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },

  /**
   * Submit user information for an application
   * @param refId - Application reference ID
   * @param applicationId - ID of the application
   * @param formData - User form data containing firstname, middlename, lastname, dob and bvn
   * @returns Promise with the API response data
   */
  submitUserInfo: async (
    refId: string,
    applicationId: string,
    formData: any
  ): Promise<any> => {
    const token = getTokenFromStorage();
    if (!token) {
      throw new Error('No authentication token found');
    }
    const { data } = await axios.post(
      `${API_URL}/applications/info/${refId}/${applicationId}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },

  /**
   * Submit document data for an application
   * @param refId - Application reference ID
   * @param applicationId - ID of the application
   * @param formData - Document form data (e.g., BVN)
   * @returns Promise with the API response data
   */
  submitDocumentData: async (
    refId: string,
    applicationId: string,
    formData: any
  ): Promise<any> => {
    const token = getTokenFromStorage();
    if (!token) {
      throw new Error('No authentication token found');
    }
    const { data } = await axios.post(
      `${API_URL}/applications/document/${refId}/${applicationId}`,
      formData,
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
