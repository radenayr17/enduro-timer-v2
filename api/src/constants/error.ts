export enum ErrorMessage {
  INVALID_CREDENTIALS = "Invalid credentials",
  USER_NOT_FOUND = "User not found",
  USERNAME_ALREADY_EXISTS = "Username already exists",
  UNAUTHORIZED = "Unauthorized",
  INVALID_TOKEN = "Invalid token",
  EXPIRED_TOKEN = "Expired token",
  INTERNAL_SERVER_ERROR = "Internal server error",
  RACE_NOT_FOUND = "Race not found",
  NOT_ALLOWED = "Not allowed",
}

export enum RaceErrorMessage {
  RACE_CANNOT_BE_DELETED = "Race cannot be deleted at this moment",
}

export enum JWTError {
  INVALID_TOKEN = "invalid token",
  EXPIRED_TOKEN = "jwt expired",
}
