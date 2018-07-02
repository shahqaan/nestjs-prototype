import { Controller, Get, Post, Body, Param, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Res() res) {
    try {
      const hospitals = await this.hospitalsService.findAll();
      res.status(HttpStatus.OK).json({data: hospitals});
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err: error.message});
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createHospitalDto: CreateHospitalDto, @Res() res) {
    try {
      await this.hospitalsService.create(createHospitalDto);
      res.status(HttpStatus.CREATED).json({message: 'Hospital is created successfully!'});
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err: error.message});
    }
  }
}