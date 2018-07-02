import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospitals } from './entity/hospitals.entity';
import {validate} from 'class-validator';

@Injectable()
export class HospitalsService {
  constructor(
    @InjectRepository(Hospitals)
    private readonly hospitalsRepository: Repository<Hospitals>,
  ) {}

  async create(hospitalObj): Promise<any> {
    let hospital = new Hospitals();
    hospital.name = hospitalObj.name;

    const errors = await validate(hospital);
    if (errors.length > 0) {
      throw new Error(JSON.stringify(errors[0].constraints));
    }
    return this.hospitalsRepository.save(hospital);
  }

  findAll(): Promise<any> {
    return this.hospitalsRepository.find();
  }

  findOne(hospitalName): Promise<any> {
    return this.hospitalsRepository.findOne({ where: { name: hospitalName} });
  }
}