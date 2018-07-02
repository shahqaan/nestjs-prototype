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

  async create(roleObj): Promise<any> {
    let role = new Roles();
    role.name = roleObj.name;

    const errors = await validate(role);
    if (errors.length > 0) {
      throw new Error(JSON.stringify(errors[0].constraints));
    }

    return await this.rolesRepository.save(role);
  }

  findAll(): Promise<any> {
    return this.rolesRepository.find();
  }

  findOne(roleName): Promise<any> {
    return this.rolesRepository.findOne({ where: { name: roleName} });
  }
}