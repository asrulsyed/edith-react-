export interface AuthContextType {
  isAuthenticated: boolean;
  isRegistered: boolean;
  login: (token: string) => void;
  logout: () => void;
  setUserRegisteration: (status: boolean) => void;
} 