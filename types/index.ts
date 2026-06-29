export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  designation?: string;
  address?: string;
  notes?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}