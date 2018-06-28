import { Entity, Column, ObjectIdColumn, ObjectID, ManyToOne } from 'typeorm';
import { Users } from '../../users/entity/users.entity';

@Entity()
export class Operations {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @ManyToOne(type => Users, user => user.operations)
  user: Users;
}