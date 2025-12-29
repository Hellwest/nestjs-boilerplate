import { Injectable, PipeTransform } from "@nestjs/common"
import { GraphQLError } from "graphql"
import set from "lodash/set"
import { ZodError, ZodSchema } from "zod"

export interface ValidationError {
  [name: string]: string
}

export const zodToValidationErrors = (zodError: ZodError): ValidationError => {
  let errors: ValidationError = {}

  for (const issue of zodError.issues) {
    const path = issue.path.join(".")

    if (!path) {
      continue
    }

    if (errors[path]) {
      continue
    }

    errors = set(errors, path, issue.message)
  }

  return errors
}

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private readonly schema: ZodSchema<T>) {}

  transform(value: unknown): T {
    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = zodToValidationErrors(error)

        throw new GraphQLError("Validation failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            validationErrors,
          },
        })
      }

      throw error
    }
  }
}
