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

  create(hospitalObj) {
    return new Promise((resolve, reject) => {
      let hospital = new Hospitals();
      hospital.name = hospitalObj.name;

      validate(hospital).then((errors) => {
        if (errors.length > 0) {
          reject(errors[0].constraints);
        } else {
          this.hospitalsRepository.save(hospital).then((result) => {
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
      this.hospitalsRepository.find().then((hospitals) => {
        resolve(hospitals);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  findOne(hospitalName) {
    return new Promise((resolve, reject) => {
      this.hospitalsRepository.find({ where: { name: hospitalName} }).then((hospital) => {
        resolve(hospital);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}