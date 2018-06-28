import { Injectable, Inject, forwardRef } from '@nestjs/common';
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
    @Inject(forwardRef(() => AuthService))
    private readonly usersRepository: Repository<Users>,
    private readonly rolesService: RolesService,
    private readonly hospitalService: HospitalsService,
    private readonly authService: AuthService,
  ) {}

  create(userObj) {
    return new Promise((resolve, reject) => {
      let user = new Users();
      user.email = userObj.email;
      user.password = userObj.password;
      user.username = userObj.username;

      this.rolesService.findOne(userObj.role).then((role) => {
        user.role = role[0];
        this.hospitalService.findOne(userObj.hospital).then((hospital) => {
          user.hospital = hospital[0];
          validate(user).then((errors) => {
            if (errors.length > 0) {
              reject(errors[0].constraints);
            } else {
              this.usersRepository.save(user).then((result) => {
                resolve(result);
              }).catch((err) => {
                reject(err);
              });
            }
          }).catch((err) => {
            reject(err);
          });
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.usersRepository.find().then((users) => {
        resolve(users);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  findUser(userEmail, userPassword) {
    // validation
    return new Promise((resolve, reject) => {
      this.usersRepository.findOne({ where: { email: userEmail, password: userPassword} }).then((user) => {
        resolve(user);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  login(userObj) {
    // validation
    // check email and password exists and matched with database
    // call auth service to generate token
    // return login successfully
    return new Promise((resolve, reject) => {
      const validator = new Validator();
      if (validator.isEmpty(userObj.email) && validator.isEmpty(userObj.password)) reject('Email and password fields are required!');
      if (!(validator.isEmail(userObj.email))) reject('Email is not in proper format');
      this.findUser(userObj.email, userObj.password).then((user) => {
        if (user) {
          this.authService.createToken({ email: user.email, username: user.username }).then((token) => {
            // working on it
          }).catch((err) => {
            reject(err);
          });
          resolve({message: 'User login successfully!', data: user});
        } else {
          resolve({message: 'User does not exist!', data: {}});
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }
}