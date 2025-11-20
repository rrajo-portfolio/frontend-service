export interface AccountUser {
  id: string;
  name: string;
  email: string;
  username: string;
  roles: string[];
  phone?: string;
  avatar?: string;
  passwordUpdatedAt?: Date;
  twoFactorEnabled: boolean;
}

export interface UserStats {
  orderCount: number;
  memberSince: Date;
}

export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
}
