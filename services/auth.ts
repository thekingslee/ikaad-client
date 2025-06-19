import axios from 'axios';

export interface LoginResponse {
  status: string;
  token: string;
  message: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
}

export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  application_count: number;
  application_credit: number;
  created_at: string;
  image_url: string;
}

export interface UserDataResponse {
  status: string;
  message: string;
  data: UserData;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await axios.post<LoginResponse>(
      `${API_URL}/auth/login`,
      credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  },

  getUser: async (): Promise<UserDataResponse> => {
    const { data } = await axios.get<UserDataResponse>(`${API_URL}/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  },
};
