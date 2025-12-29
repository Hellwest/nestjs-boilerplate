import { QueryFailedError } from "typeorm"

const UNIQUE_CONSTRAINT_ERROR = "23505"

export class UniqueConstraintError extends Error {
  static is(error: any): error is QueryFailedError {
    if (!error) {
      return false
    }

    const isQueryFailedError = error.name === "QueryFailedError"

    const isUniqueConstraintError = error.code === UNIQUE_CONSTRAINT_ERROR

    return isQueryFailedError && isUniqueConstraintError
  }

  constructor(error: QueryFailedError) {
    super(`Unsatisfied unique constraint: ${(error as any).detail}`)
  }
}
