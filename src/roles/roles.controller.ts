import { Controller, Get, Post, Body, Param, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Res() res) {
    try {
      const roles = await this.rolesService.findAll();
      res.status(HttpStatus.OK).json({data: roles});
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err: error.message});
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createRoleDto: CreateRoleDto, @Res() res) {
    try {
      const response = await this.rolesService.create(createRoleDto);
      res.status(HttpStatus.CREATED).json({message: 'Role is created successfully!'});
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err: error.message});
    }
  }
}