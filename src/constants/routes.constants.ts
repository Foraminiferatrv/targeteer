export const ROUTES = {
  ALL: "*",
  ROOT: "/",

  LOGIN: "/auth/login",
  SIGN_UP: "/auth/signup",

  HOME: "/home",
};
export const API_ROUTES = {
  LOGIN: "/api/auth/login",
  SIGN_UP: "/api/auth/signup",
  SIGN_OUT: "/api/auth/sign-out",
};

export const PUBLIC_ROUTES = ["/"];

export const AUTH_ROUTES = [API_ROUTES.LOGIN, API_ROUTES.SIGN_UP];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
