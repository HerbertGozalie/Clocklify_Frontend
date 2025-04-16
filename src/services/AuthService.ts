import axios from "axios";
import Cookies from "js-cookie";

import {
  SignInResponse,
  SignUpResponse,
  ForgotPassResponse,
  ResetPasswordResponse,
} from "../types/user";

import { API_URL_DEV } from "../config";
// import { API_URL } from "../config"; //=> for online api

export async function loginUser(
  email: string,
  password: string
): Promise<SignInResponse> {
  const response = await axios.post<SignInResponse>(
    // `${API_URL}/api/v1/user/login`,
    `${API_URL_DEV}/api/v1/user/login`,
    { email, password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  Cookies.set("token", response.data.token, { expires: 2 });
  console.log(response.data);
  return response.data;
}

export async function registerUser(
  email: string,
  password: string,
  confirmPassword: string
): Promise<SignUpResponse> {
  const response = await axios.post<SignUpResponse>(
    // `${API_URL}/api/v1/user/register`,
    `${API_URL_DEV}/api/v1/user/register`,
    { email, password, confirmPassword },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log(response.data);
  return response.data;
}

export async function forgotPassword(
  email: string
): Promise<ForgotPassResponse> {
  const response = await axios.post<ForgotPassResponse>(
    // `${API_URL}/api/v1/user/forgotpassword`,
    `${API_URL_DEV}/api/v1/user/forgotpassword`,
    { email },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log(response.data);
  return response.data;
}

export async function resetPassword(
  resetToken: string,
  newPassword: string,
  confirmPassword: string
): Promise<ResetPasswordResponse> {
  const response = await axios.patch<ResetPasswordResponse>(
    // `${API_URL}/api/v1/user/resetpassword`,
    `${API_URL_DEV}/api/v1/user/resetpassword`,
    { resetToken, newPassword, confirmPassword },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log(response.data);
  return response.data;
}
