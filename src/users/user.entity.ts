import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Field, ID, ObjectType } from "@nestjs/graphql"
import { GraphQLScalarType } from "graphql"
import { BadRequestException } from "@nestjs/common"
import * as bcrypt from "bcryptjs"

import { EnhancedBaseEntity } from "../shared/entities/enhanced-base.entity"

@ObjectType({ description: "User object" })
@Entity("users")
export class User extends EnhancedBaseEntity {
  @Field((): GraphQLScalarType => ID, { description: "User ID" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field({ description: "User login" })
  @Column({ unique: true })
  login: string

  @Column()
  password: string

  @Column()
  salt: string

  @Field({ description: "User's registration date" })
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date

  async validatePassword(password: string): Promise<boolean> {
    if (!this.salt || !this.password) {
      throw new BadRequestException("api.invalidCredentials")
    }

    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }
}
