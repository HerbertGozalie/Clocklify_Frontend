export interface User {
  uuid: string;
  email: string;
}

export interface SignInResponse {
  status: string;
  message: string;
  user: User;
  token: string;
}

export interface SignUpResponse {
  status: string;
  message: string;
  user: User;
  token: string;
  emailToken: string;
}

export interface ForgotPassResponse {
  status: string;
  message: string;
}

export interface ResetPasswordResponse {
  status: string;
  message: string;
  loginToken: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (user: User, token: string) => void;
  signOut: () => void;
}
