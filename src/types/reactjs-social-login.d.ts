declare module 'reactjs-social-login' {
  import { ReactNode } from 'react';
  
  interface LoginSocialTwitterProps {
    children: ReactNode;
  }

  export const LoginSocialTwitter: React.FC<LoginSocialTwitterProps>;
} 