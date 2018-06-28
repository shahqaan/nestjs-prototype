import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';

@Controller('hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Get()
  findAll(@Res() res) {
    this.hospitalsService.findAll().then((hospitals) => {
      res.status(HttpStatus.OK).json({data: hospitals});
    }).catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err});
    });
  }

  @Post()
  create(@Body() createHospitalDto: CreateHospitalDto, @Res() res) {
    this.hospitalsService.create(createHospitalDto).then((response) => {
      res.status(HttpStatus.CREATED).json({message: 'Hospital is created successfully!'});
    }).catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err});
    });
  }
}