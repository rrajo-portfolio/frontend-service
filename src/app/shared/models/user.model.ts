export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  phone?: string;
  roles: string[];
  createdAt: string;
  updatedAt?: string;
  active: boolean;
}
