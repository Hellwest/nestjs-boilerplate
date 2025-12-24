import { NestFactory } from "@nestjs/core"
import { Logger } from "@nestjs/common"
import "dotenv/config"

import { serverConfig } from "./config"
import { AppModule } from "./app.module"

async function bootstrap() {
  const logger = new Logger("Bootstrap")
  const app = await NestFactory.create(AppModule)

  try {
    await app.listen(serverConfig.port)
  } catch (error) {
    logger.error(`Application starting failed: ${JSON.stringify(error)}`)
    throw error
  }

  logger.log(`Application listening on port: ${serverConfig.port}`)
}

bootstrap()
