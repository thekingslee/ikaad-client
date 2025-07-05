import axios from 'axios';

export interface PredictResponse {
  status: string;
  message: string;
  data?: {
    prediction: string;
    confidence: number;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Service for ML model prediction endpoints
 */
export const modelService = {
  /**
   * Send an image file to the /model/predict endpoint to check for a document
   * @param file - The image file to be analyzed
   * @returns Promise<PredictResponse> with prediction result
   */
  predictDocument: async (file: File): Promise<PredictResponse> => {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await axios.post<PredictResponse>(
      `${API_URL}/model/predict`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return data;
  },
};
