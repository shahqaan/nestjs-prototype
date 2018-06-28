import { Entity, Column, ObjectIdColumn, ObjectID, OneToMany } from 'typeorm';
import { Users } from '../../users/entity/users.entity';
import { Length, IsNotEmpty } from 'class-validator';

@Entity()
export class Hospitals {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @Length(10, 20)
  @IsNotEmpty()
  name: string;

  @OneToMany(type => Users, users => users.hospital)
  users: Users[];
}