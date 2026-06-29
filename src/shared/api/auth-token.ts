export const AUTH_TOKEN_STOREGE_KEY = "events_auth_token";

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_STOREGE_KEY);
}

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_STOREGE_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_STOREGE_KEY);
  }
}
