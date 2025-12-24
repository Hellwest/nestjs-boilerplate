import * as path from "path"

import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import depthLimit from "graphql-depth-limit"
import { DateScalarMode } from "@nestjs/graphql"

import { getBoolean } from "./get-boolean"

export const graphqlConfig: ApolloDriverConfig = {
  validationRules: [depthLimit(Number(process.env.GRAPHQL_DEPTH_LIMIT) || 10)],
  driver: ApolloDriver,
  debug: getBoolean(process.env.GRAPHQL_DEBUG, false),
  playground: getBoolean(process.env.GRAPHQL_PLAYGROUND, false),
  introspection: getBoolean(process.env.GRAPHQL_INTROSPECTION, false),
  autoSchemaFile: path.join(process.cwd(), "_schema.graphql"),
  buildSchemaOptions: {
    dateScalarMode:
      (process.env.GRAPHQL_DATE_SCALAR_MODE as DateScalarMode) || "isoDate",
  },
  context: ({ req, connection }: any): Record<string, unknown> => ({
    req,
    connection,
  }),
}
