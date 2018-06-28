import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './entity/roles.entity';
import {validate} from 'class-validator';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  create(roleObj) {
    return new Promise((resolve, reject) => {
      let role = new Roles();
      role.name = roleObj.name;

      validate(role).then((errors) => {
        if (errors.length > 0) {
          reject(errors[0].constraints);
        } else {
          this.rolesRepository.save(role).then((result) => {
            resolve(result);
          }).catch((err) => {
            reject(err);
          });
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.rolesRepository.find().then((roles) => {
        resolve(roles);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  findOne(roleName) {
    return new Promise((resolve, reject) => {
      this.rolesRepository.find({ where: { name: roleName} }).then((role) => {
        resolve(role);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}