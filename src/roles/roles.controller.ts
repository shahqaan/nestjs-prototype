import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll(@Res() res) {
    this.rolesService.findAll().then((roles) => {
      res.status(HttpStatus.OK).json({data: roles});
    }).catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err});
    });
  }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto, @Res() res) {
    this.rolesService.create(createRoleDto).then((response) => {
      res.status(HttpStatus.CREATED).json({message: 'Role is created successfully!'});
    }).catch((err) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err});
    });
  }
}