/* Error Types */
const AUTHENTICATION = "authentication";
const AUTHORIZATION = "authorization";

export type AuthType = typeof AUTHENTICATION | typeof AUTHORIZATION;

export interface AuthError {
  statusCode: number;
  message: string;
  type: AuthType;
}

export interface AuthErrorOptions {
  message?: string;
}

/* Get Error Actions */
export const getAuthError = (type: AuthType, payload?: AuthErrorOptions) => {
  switch (type) {
    case AUTHENTICATION:
      return getAuthenticationError(payload?.message);
    case AUTHORIZATION:
      return getAuthorizationError(payload?.message);
  }
};

const getAuthenticationError = (message?: string) => {
  return {
    type: AUTHENTICATION,
    statusCode: 401,
    message: message || "Unauthorized",
  };
};

const getAuthorizationError = (message?: string) => {
  return {
    type: AUTHORIZATION,
    statusCode: 403,
    message: message || "Permission denied",
  };
};
