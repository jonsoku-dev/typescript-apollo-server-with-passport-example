import { Entity, PrimaryColumn, Column, BeforeInsert, BaseEntity } from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('text')
  password: string;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
