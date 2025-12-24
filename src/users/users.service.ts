import { Injectable } from "@nestjs/common"

import { UserRepository } from "../repositories/user.repository"

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async test(): Promise<void> {
    return await this.userRepository.test()
  }
}
