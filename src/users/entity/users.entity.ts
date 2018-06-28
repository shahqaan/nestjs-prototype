import { Entity, Column, ObjectIdColumn, ObjectID, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Hospitals } from '../../hospitals/entity/hospitals.entity';
import { Operations } from '../../operations/entity/operations.entity';
import { Roles } from '../../roles/entity/roles.entity';
import { Length, IsNotEmpty, IsEmail } from 'class-validator';

@Entity()
export class Users {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @IsNotEmpty()
  @Length(10, 80)
  username: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @Length(10, 80)
  password: string;

  @ManyToOne(type => Hospitals, hospital => hospital.users)
  @IsNotEmpty()
  hospital: Hospitals;

  @OneToMany(type => Operations, operations => operations.user)
  operations: Operations[];

  @OneToOne(type => Roles)
  @JoinColumn()
  @IsNotEmpty()
  role: Roles;
}