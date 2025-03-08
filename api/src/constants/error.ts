export enum ErrorMessage {
  INVALID_CREDENTIALS = "Invalid credentials",
  USER_NOT_FOUND = "User not found",
  USERNAME_ALREADY_EXISTS = "Username already exists",
  UNAUTHORIZED = "Unauthorized",
  INVALID_TOKEN = "Invalid token",
  EXPIRED_TOKEN = "Expired token",
  INTERNAL_SERVER_ERROR = "Internal server error",
  NOT_ALLOWED = "Not allowed",
  NOT_FOUND = "Not found",
  INVALID_REQUEST = "Invalid request",
}

export enum RaceErrorMessage {
  RACE_CANNOT_BE_DELETED = "Race cannot be deleted at this moment",
  RACE_NOT_FOUND = "Race not found",
}

export enum JWTError {
  INVALID_TOKEN = "invalid token",
  EXPIRED_TOKEN = "jwt expired",
}
