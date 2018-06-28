import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';

@Entity()
export class Roles {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @Length(5, 20)
  @IsNotEmpty()
  name: string;
}