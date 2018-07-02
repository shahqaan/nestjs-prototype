import { Injectable, Inject, forwardRef, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { validate, Validator } from 'class-validator';
import { RolesService } from '../roles/roles.service';
import { HospitalsService } from '../hospitals/hospitals.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly rolesService: RolesService,
    private readonly hospitalService: HospitalsService,
    private readonly authService: AuthService,
  ) {}

  async create(userObj): Promise<any> {
    let user = new Users();
    user.email = userObj.email;
    user.password = userObj.password;
    user.username = userObj.username;
    const role = await this.rolesService.findOne(userObj.role);
    if (role) {
      user.role = role;
    } else {
      throw new Error('Invalid role!');
    }
    const hospital = await this.hospitalService.findOne(userObj.hospital);
    if (hospital) {
      user.hospital = hospital;
    } else {
      throw new Error('Invalid hospital!');
    }
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new Error(JSON.stringify(errors[0].constraints));
    }

    return await this.usersRepository.save(user);
  }

  findAll(): Promise<any[]> {
    return this.usersRepository.find();
  }

  findUser(userEmail, userPassword): Promise<any> {
    return this.usersRepository.findOne({ where: { email: userEmail, password: userPassword} });
  }

  findOneByEmail(userEmail): Promise<any> {
    return this.usersRepository.findOne({ where: { email: userEmail } });
  }

  async login(userObj): Promise<any> {
    const validator = new Validator();
    if (validator.isEmpty(userObj.email) && validator.isEmpty(userObj.password)) {
      throw new Error('Email and password fields are required!');
    }
    if (!(validator.isEmail(userObj.email))) {
      throw new Error('Email is not in proper format');
    }

    const user = await this.findUser(userObj.email, userObj.password);
    if (user) {
      return await this.authService.createToken(user);
    } else {
      throw new Error('User does not exist!');
    }
  }
}