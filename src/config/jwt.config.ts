export interface JwtConfig {
  secret: string
}

export const jwtConfig: JwtConfig = {
  secret: process.env.JWT_SECRET || "nestjs-boilerplate",
}
