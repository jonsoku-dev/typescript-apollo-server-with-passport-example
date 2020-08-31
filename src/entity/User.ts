import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsEmail } from 'class-validator';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String)
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => Number)
  @Column({ default: 0 })
  view: number;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}
