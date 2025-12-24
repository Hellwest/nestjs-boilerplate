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

import { EnhancedBaseEntity } from "../shared/entities/enhanced-base.entity"

@ObjectType({ description: "User object" })
@Entity("users")
export class User extends EnhancedBaseEntity {
  @Field((): GraphQLScalarType => ID, { description: "User ID" })
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field({ description: "User login" })
  @Column()
  login: string

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date
}
